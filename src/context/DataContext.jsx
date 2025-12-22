import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { flightsData } from "../data/mockData";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [flights, setFlights] = useState(flightsData);
  // Bookings hanya dari user booking, bukan dari mockData
  const [bookings, setBookings] = useState([]);
  const isInitialized = useRef(false);

  // Load data dari localStorage saat pertama kali mount
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    try {
      const storedFlights = localStorage.getItem("flights");
      const storedBookings = localStorage.getItem("bookings");

      if (storedFlights) {
        try {
          const parsedFlights = JSON.parse(storedFlights);
          if (Array.isArray(parsedFlights) && parsedFlights.length > 0) {
            setFlights(parsedFlights);
          } else {
            // Jika data di localStorage tidak valid, gunakan flightsData
            setFlights(flightsData);
            localStorage.setItem("flights", JSON.stringify(flightsData));
          }
        } catch (e) {
          console.error("Error parsing flights:", e);
          localStorage.removeItem("flights");
          // Set ke flightsData jika parsing gagal
          setFlights(flightsData);
          localStorage.setItem("flights", JSON.stringify(flightsData));
        }
      } else {
        // Jika tidak ada data di localStorage, inisialisasi dengan flightsData
        setFlights(flightsData);
        localStorage.setItem("flights", JSON.stringify(flightsData));
      }

      // Load bookings dari localStorage jika ada, jika tidak mulai dengan array kosong
      if (storedBookings) {
        try {
          const parsedBookings = JSON.parse(storedBookings);
          if (Array.isArray(parsedBookings)) {
            setBookings(parsedBookings);
          } else {
            setBookings([]);
          }
        } catch (e) {
          console.error("Error parsing bookings:", e);
          localStorage.removeItem("bookings");
          setBookings([]);
        }
      } else {
        // Jika tidak ada data di localStorage, mulai dengan array kosong
        setBookings([]);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, []);

  // Simpan data ke localStorage setiap kali ada perubahan
  useEffect(() => {
    if (!isInitialized.current) return;

    try {
      localStorage.setItem("flights", JSON.stringify(flights));
    } catch (error) {
      console.error("Error saving flights to localStorage:", error);
    }
  }, [flights]);

  useEffect(() => {
    if (!isInitialized.current) return;

    try {
      localStorage.setItem("bookings", JSON.stringify(bookings));
    } catch (error) {
      console.error("Error saving bookings to localStorage:", error);
    }
  }, [bookings]);

  // Listen untuk storage events dari tab/window lain (untuk sync antar tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "flights" && e.newValue) {
        try {
          const parsedFlights = JSON.parse(e.newValue);
          if (Array.isArray(parsedFlights)) {
            setFlights(parsedFlights);
          }
        } catch (error) {
          console.error("Error parsing flights from storage event:", error);
        }
      }

      if (e.key === "bookings" && e.newValue) {
        try {
          const parsedBookings = JSON.parse(e.newValue);
          if (Array.isArray(parsedBookings)) {
            setBookings(parsedBookings);
          }
        } catch (error) {
          console.error("Error parsing bookings from storage event:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const addBooking = (newBooking) => {
    // Generate unique ID menggunakan timestamp untuk menghindari bentrok
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substr(2, 4).toUpperCase();
    const uniqueId = `BK${timestamp}${randomSuffix}`;

    // Pastikan status selalu Pending saat booking baru dibuat
    // Payment status otomatis Paid karena pembayaran sudah dilakukan saat booking
    const bookingWithDefaults = {
      ...newBooking,
      id: newBooking.id || uniqueId,
      status: "Pending", // Status selalu Pending saat booking baru
      paymentStatus: "Paid", // Payment status otomatis Paid karena sudah bayar saat booking
      bookingDate:
        newBooking.bookingDate || new Date().toISOString().split("T")[0],
    };

    setBookings((prev) => {
      const updated = [...prev, bookingWithDefaults];
      // Simpan langsung ke localStorage untuk memastikan data tersimpan
      try {
        localStorage.setItem("bookings", JSON.stringify(updated));
      } catch (error) {
        console.error("Error saving booking to localStorage:", error);
      }
      return updated;
    });
  };

  const updateBooking = (id, updatedBooking) => {
    setBookings((prev) => {
      const updated = prev.map((b) => (b.id === id ? updatedBooking : b));
      // Simpan langsung ke localStorage untuk memastikan data tersimpan
      try {
        localStorage.setItem("bookings", JSON.stringify(updated));
      } catch (error) {
        console.error("Error saving updated booking to localStorage:", error);
      }
      return updated;
    });
  };

  const deleteBooking = (id) => {
    setBookings((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      // Simpan langsung ke localStorage untuk memastikan data tersimpan
      try {
        localStorage.setItem("bookings", JSON.stringify(updated));
      } catch (error) {
        console.error("Error saving deleted booking to localStorage:", error);
      }
      return updated;
    });
  };

  const addFlight = (newFlight) => {
    setFlights((prev) => [
      ...prev,
      {
        ...newFlight,
        id: "FL" + (prev.length + 1).toString().padStart(3, "0"),
      },
    ]);
  };

  const updateFlight = (id, updatedFlight) => {
    setFlights((prev) => prev.map((f) => (f.id === id ? updatedFlight : f)));
  };

  const deleteFlight = (id) => {
    setFlights((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        flights,
        bookings,
        addBooking,
        updateBooking,
        deleteBooking,
        addFlight,
        updateFlight,
        deleteFlight,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
