import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import StatCard from "../../components/StatCard";
import FlightList from "../../components/FlightList";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { formatPrice, formatDate } from "../../data/mockData";
import {
  AiOutlineDollarCircle,
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineRise,
  AiOutlineFileText,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { FaPlane } from "react-icons/fa";

const AdminDashboard = () => {
  const { flights, bookings } = useData();
  const { admin } = useAuth();
  const navigate = useNavigate();
  const [headerSearch, setHeaderSearch] = useState("");

  const handleHeaderSearch = (value) => {
    setHeaderSearch(value);
  };

  // Filter flights and bookings based on search
  const filteredFlights = headerSearch
    ? flights.filter(
        (f) =>
          f.flightNumber.toLowerCase().includes(headerSearch.toLowerCase()) ||
          f.airline.toLowerCase().includes(headerSearch.toLowerCase()) ||
          f.from.toLowerCase().includes(headerSearch.toLowerCase()) ||
          f.to.toLowerCase().includes(headerSearch.toLowerCase())
      )
    : flights;

  const filteredBookings = headerSearch
    ? bookings.filter(
        (b) =>
          b.bookingCode?.toLowerCase().includes(headerSearch.toLowerCase()) ||
          b.passengerName?.toLowerCase().includes(headerSearch.toLowerCase()) ||
          b.flightNumber?.toLowerCase().includes(headerSearch.toLowerCase()) ||
          b.route?.toLowerCase().includes(headerSearch.toLowerCase())
      )
    : bookings;

  // Calculate real statistics
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(
    (b) => b.status === "Confirmed"
  ).length;
  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === "Paid")
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const totalTickets = bookings.reduce(
    (sum, b) => sum + (b.passengers?.length || b.passengers || 1),
    0
  );
  const activeFlights = flights.filter((f) => f.status === "Tersedia").length;

  // Recent bookings (last 5) - filtered by search if any
  const recentBookings = [...filteredBookings]
    .sort((a, b) => new Date(b.bookingDate || 0) - new Date(a.bookingDate || 0))
    .slice(0, 5);

  // Calculate Top Airlines from real bookings data
  const topAirlines = useMemo(() => {
    if (bookings.length === 0) return [];

    // Group bookings by airline
    const airlineMap = {};

    bookings.forEach((booking) => {
      if (!booking.airline) return;

      const airlineName = booking.airline;
      const passengerCount = Array.isArray(booking.passengers)
        ? booking.passengers.length
        : booking.passengers || 1;
      const revenue =
        booking.paymentStatus === "Paid" ? booking.totalPrice || 0 : 0;

      if (!airlineMap[airlineName]) {
        airlineMap[airlineName] = {
          name: airlineName,
          sales: 0, // Total tiket terjual
          revenue: 0, // Total revenue
          bookings: 0, // Jumlah booking
        };
      }

      airlineMap[airlineName].sales += passengerCount;
      airlineMap[airlineName].revenue += revenue;
      airlineMap[airlineName].bookings += 1;
    });

    // Convert to array and sort by sales (tiket terjual) - DESCENDING (tertinggi ke terendah)
    const airlines = Object.values(airlineMap)
      .sort((a, b) => b.sales - a.sales) // b.sales - a.sales = descending (tertinggi dulu)
      .slice(0, 5); // Top 5

    // Calculate percentage based on the highest sales (first item after sorting)
    const maxSales = airlines.length > 0 ? airlines[0].sales : 1;

    // Calculate percentage for each airline
    // Maskapai dengan sales tertinggi akan dapat 100%, yang lebih rendah akan dapat persentase lebih kecil
    return airlines.map((airline, index) => {
      const percentage = maxSales > 0 ? (airline.sales / maxSales) * 100 : 0;

      return {
        ...airline,
        percentage: percentage,
        color: `bg-blue-${500 + index * 100}`,
      };
    });
  }, [bookings]);

  // Calculate Popular Routes from real bookings data
  const popularRoutes = useMemo(() => {
    if (bookings.length === 0) return [];

    // Group bookings by route
    const routeMap = {};

    bookings.forEach((booking) => {
      if (!booking.route) return;

      const route = booking.route;
      const revenue =
        booking.paymentStatus === "Paid" ? booking.totalPrice || 0 : 0;
      const passengerCount = Array.isArray(booking.passengers)
        ? booking.passengers.length
        : booking.passengers || 1;

      if (!routeMap[route]) {
        routeMap[route] = {
          route: route,
          bookings: 0,
          revenue: 0,
          tickets: 0,
        };
      }

      routeMap[route].bookings += 1;
      routeMap[route].revenue += revenue;
      routeMap[route].tickets += passengerCount;
    });

    // Convert to array and sort by bookings count
    return Object.values(routeMap)
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 5); // Top 5
  }, [bookings]);

  const stats = [
    {
      title: "Total Pemesanan",
      value: totalBookings.toLocaleString("id-ID"),
      change: 12.5,
      icon: <AiOutlineCalendar size={24} />,
      color: "blue",
    },
    {
      title: "Pendapatan",
      value: formatPrice(totalRevenue).replace("Rp", "Rp "),
      change: 8.3,
      icon: <AiOutlineDollarCircle size={24} />,
      color: "green",
    },
    {
      title: "Penerbangan Aktif",
      value: activeFlights.toString(),
      change: 5.7,
      icon: <FaPlane size={24} />,
      color: "purple",
    },
    {
      title: "Tiket Terjual",
      value: totalTickets.toLocaleString("id-ID"),
      change: 15.2,
      icon: <AiOutlineRise size={24} />,
      color: "orange",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header
        title="Dashboard Admin"
        subtitle={`Selamat datang, ${admin?.email || "Admin"}`}
        onSearch={handleHeaderSearch}
        searchPlaceholder="Cari penerbangan (contoh: GA-123) atau booking (contoh: FBK12345)..."
      />
      <div className="p-4 md:p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Flights */}
          <div className="lg:col-span-2">
            <div className="p-6 mb-6 transition-colors bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  <FaPlane size={20} />
                  Penerbangan Tersedia
                  {headerSearch && (
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      ({filteredFlights.length} hasil)
                    </span>
                  )}
                </h2>
                <button
                  onClick={() => navigate("/admin/flights")}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  Lihat Semua
                </button>
              </div>
              {headerSearch && (
                <div className="mb-4 p-3 text-sm bg-gray-100 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  Menampilkan hasil untuk:{" "}
                  <strong className="text-gray-900 dark:text-white">
                    "{headerSearch}"
                  </strong>
                </div>
              )}
              <FlightList flights={filteredFlights.slice(0, 3)} />
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="p-6 transition-colors bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <AiOutlineFileText size={18} />
                Pemesanan Terbaru
              </h3>
              <button
                onClick={() => navigate("/admin/bookings")}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Lihat Semua
              </button>
            </div>
            <div className="space-y-4">
              {headerSearch && (
                <div className="mb-2 p-3 text-sm bg-gray-100 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  Menampilkan hasil untuk:{" "}
                  <strong className="text-gray-900 dark:text-white">
                    "{headerSearch}"
                  </strong>
                </div>
              )}
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 transition-colors border border-gray-100 rounded-lg dark:border-gray-600 bg-gray-50 dark:bg-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => navigate("/admin/bookings")}
                  >
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {booking.flightNumber} • {booking.route}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {booking.passengerName} •{" "}
                        {booking.passengers?.length || booking.passengers}{" "}
                        Penumpang
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600 dark:text-blue-400">
                        {formatPrice(booking.totalPrice)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(booking.bookingDate)}
                      </p>
                    </div>
                  </div>
                ))
              ) : headerSearch ? (
                <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                  Tidak ada booking ditemukan untuk{" "}
                  <strong className="text-gray-900 dark:text-white">
                    "{headerSearch}"
                  </strong>
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                  Belum ada pemesanan
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Airlines & Routes */}
        <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
          <div className="p-6 transition-colors bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
            <h3 className="mb-6 font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FaPlane size={18} />
              Maskapai Terlaris
            </h3>
            {topAirlines.length > 0 ? (
              <div className="relative">
                {/* Trend Arrow - Above bars */}
                {/* Garis trend harus mengikuti tinggi bar: bar tertinggi (kiri) = garis tinggi, bar lebih rendah (kanan) = garis lebih rendah */}
                {topAirlines.length > 1 && (
                  <div className="relative h-12 mb-1 -mt-2">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 400 50"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id="arrowGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#3b82f6"
                            stopOpacity="0.6"
                          />
                          <stop
                            offset="100%"
                            stopColor="#22c55e"
                            stopOpacity="0.9"
                          />
                        </linearGradient>
                      </defs>
                      {/* Path: Y kecil = tinggi, Y besar = rendah */}
                      {/* Bar tertinggi (kiri) = Y kecil (tinggi), bar lebih rendah (kanan) = Y besar (rendah) */}
                      {/* Jadi path harus turun dari kiri ke kanan: 10 (tinggi) → 15 → 30 → 40 → 50 (rendah) */}
                      <path
                        d={`M 30 10 Q 100 20, 170 30 T 310 45 T 370 50`}
                        stroke="url(#arrowGradient)"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polygon
                        points="365,50 375,50 370,55"
                        fill="#22c55e"
                        opacity="0.9"
                      />
                    </svg>
                  </div>
                )}

                {/* Bar Chart Container */}
                {/* Urutan: Index 0 = tiket TERBANYAK = bar TERTINGGI, Index selanjutnya = tiket lebih sedikit = bar lebih rendah */}
                <div className="flex items-end justify-between gap-4 h-34 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  {topAirlines.map((airline, index) => {
                    // heightPercentage: 100% untuk maskapai dengan tiket terbanyak (index 0)
                    // Semakin rendah index, semakin tinggi bar-nya (karena sudah di-sort descending)
                    const heightPercentage = airline.percentage;

                    // Warna sesuai gambar: Biru, Teal/Cyan, Hijau
                    const barColors = [
                      { from: "#3b82f6", to: "#2563eb" }, // Biru (Blue)
                      { from: "#14b8a6", to: "#0d9488" }, // Teal/Cyan
                      { from: "#22c55e", to: "#16a34a" }, // Hijau (Green)
                      { from: "#8b5cf6", to: "#7c3aed" }, // Purple (fallback)
                      { from: "#f59e0b", to: "#d97706" }, // Orange (fallback)
                    ];

                    const colors = barColors[index] || barColors[0];

                    return (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center group"
                      >
                        {/* Bar */}
                        <div className="relative w-full flex flex-col items-center justify-end">
                          <div
                            className="w-full rounded-t-lg transition-all duration-500 hover:shadow-xl hover:scale-105"
                            style={{
                              height: `${Math.max(
                                heightPercentage * 2.2,
                                15
                              )}%`,
                              background: `linear-gradient(to top, ${colors.to}, ${colors.from})`,
                              boxShadow: `0 4px 12px -2px rgba(0, 0, 0, 0.15), 0 2px 6px -1px rgba(0, 0, 0, 0.1), inset 0 -3px 6px rgba(255, 255, 255, 0.15)`,
                              transform: "perspective(600px) rotateX(8deg)",
                            }}
                          >
                            {/* Glass effect overlay */}
                            <div
                              className="absolute inset-0 rounded-t-lg opacity-40"
                              style={{
                                background:
                                  "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
                              }}
                            />
                          </div>
                        </div>
                        {/* Airline Name and Ticket Count */}
                        <div className="mt-4 text-center">
                          <p className="text-sm font-semibold text-gray-800 dark:text-white leading-tight mb-1">
                            {airline.name.length > 18
                              ? airline.name.substring(0, 18) + "..."
                              : airline.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                            {airline.sales} tiket
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Total Tiket
                    </p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">
                      {topAirlines.reduce((sum, a) => sum + a.sales, 0)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Total Revenue
                    </p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      {formatPrice(
                        topAirlines.reduce((sum, a) => sum + a.revenue, 0)
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <FaPlane
                  size={48}
                  className="mx-auto mb-4 text-gray-300 dark:text-gray-600"
                />
                <p className="text-gray-500 dark:text-gray-400">
                  Belum ada data booking
                </p>
                <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
                  Data akan muncul setelah ada pemesanan
                </p>
              </div>
            )}
          </div>

          <div className="p-6 transition-colors bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
            <h3 className="mb-4 font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <AiOutlineRise size={18} />
              Rute Terpopuler
            </h3>
            {popularRoutes.length > 0 ? (
              <div className="space-y-4">
                {popularRoutes.map((route, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-lg dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 dark:text-white">
                        {route.route}
                      </p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <span>{route.bookings} pemesanan</span>
                        <span>•</span>
                        <span>{route.tickets} tiket</span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-bold text-green-600 dark:text-green-400">
                        {formatPrice(route.revenue)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Revenue
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <AiOutlineRise
                  size={48}
                  className="mx-auto mb-4 text-gray-300 dark:text-gray-600"
                />
                <p className="text-gray-500 dark:text-gray-400">
                  Belum ada data booking
                </p>
                <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
                  Data akan muncul setelah ada pemesanan
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
