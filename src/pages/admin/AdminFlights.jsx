import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import FlightCard from "../../components/FlightCard";
import BookingForm from "../../components/BookingForm";
import AlertModal from "../../components/AlertModal";
import ConfirmModal from "../../components/ConfirmModal";
import { useData } from "../../context/DataContext";
import {
  searchFlights,
  sortFlights,
  formatPrice,
  airlines,
  airports,
  getStatusBadge,
} from "../../data/mockData";
import {
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineSearch,
  AiOutlineFilter,
  AiOutlineSortAscending,
  AiOutlineReload,
  AiOutlineClose,
  AiOutlineSave,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineUser,
  AiOutlineDollarCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import {
  FaPlane,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";

const AdminFlights = () => {
  const { flights, addFlight, updateFlight, deleteFlight } = useData();
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState("price-asc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchFilters, setSearchFilters] = useState({
    flightNumber: "",
    airline: "",
    from: "",
    to: "",
    departureDate: "",
  });
  const [headerSearch, setHeaderSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showForm, setShowForm] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [alert, setAlert] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });
  const [confirmDelete, setConfirmDelete] = useState({
    isOpen: false,
    flightId: null,
  });
  const [formData, setFormData] = useState({
    flightNumber: "",
    airline: "Garuda Indonesia",
    airlineCode: "GA",
    from: "Jakarta (CGK)",
    fromCode: "CGK",
    to: "Denpasar (DPS)",
    toCode: "DPS",
    departureTime: "",
    arrivalTime: "",
    departureDate: "",
    duration: "",
    durationMinutes: 0,
    price: 0,
    prices: {
      economy: 0,
      business: 0,
      first: 0,
    },
    class: "Ekonomi",
    availableSeats: 0,
    totalSeats: 180,
    status: "Tersedia",
    aircraft: "Boeing 737-800",
    terminal: "Terminal 3",
    gate: "",
    baggageAllowance: 20,
    amenities: [],
    transit: false,
    stops: 0,
  });

  useEffect(() => {
    setFilteredFlights(flights);
    setCurrentPage(1); // Reset ke halaman 1 ketika flights berubah
  }, [flights]);

  const applySearchFilters = (filters) => {
    let results = [...flights];

    // Filter by header search (flight number, airline, or route)
    if (headerSearch) {
      results = results.filter(
        (f) =>
          f.flightNumber.toLowerCase().includes(headerSearch.toLowerCase()) ||
          f.airline.toLowerCase().includes(headerSearch.toLowerCase()) ||
          f.from.toLowerCase().includes(headerSearch.toLowerCase()) ||
          f.to.toLowerCase().includes(headerSearch.toLowerCase()) ||
          f.route?.toLowerCase().includes(headerSearch.toLowerCase())
      );
    }

    // Filter by flight number
    if (filters.flightNumber) {
      results = results.filter((f) =>
        f.flightNumber
          .toLowerCase()
          .includes(filters.flightNumber.toLowerCase())
      );
    }

    // Filter by airline
    if (filters.airline) {
      results = results.filter(
        (f) =>
          f.airlineCode === filters.airline ||
          f.airline.toLowerCase().includes(filters.airline.toLowerCase())
      );
    }

    // Filter by from
    if (filters.from) {
      results = results.filter(
        (f) => f.fromCode === filters.from || f.from.includes(filters.from)
      );
    }

    // Filter by to
    if (filters.to) {
      results = results.filter(
        (f) => f.toCode === filters.to || f.to.includes(filters.to)
      );
    }

    // Filter by departure date
    if (filters.departureDate) {
      results = results.filter(
        (f) => f.departureDate === filters.departureDate
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      results = results.filter(
        (flight) => flight.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    // Apply sorting
    results = sortFlights(results, sortBy);
    setFilteredFlights(results);
    setCurrentPage(1); // Reset ke halaman 1 ketika filter berubah
  };

  const handleHeaderSearch = (value) => {
    setHeaderSearch(value);
  };

  // Apply filters whenever dependencies change
  useEffect(() => {
    let results = [...flights];

    // Filter by header search (flight number, airline, or route)
    if (headerSearch) {
      results = results.filter(
        (f) =>
          f.flightNumber.toLowerCase().includes(headerSearch.toLowerCase()) ||
          f.airline.toLowerCase().includes(headerSearch.toLowerCase()) ||
          f.from.toLowerCase().includes(headerSearch.toLowerCase()) ||
          f.to.toLowerCase().includes(headerSearch.toLowerCase()) ||
          f.route?.toLowerCase().includes(headerSearch.toLowerCase())
      );
    }

    // Filter by flight number
    if (searchFilters.flightNumber) {
      results = results.filter((f) =>
        f.flightNumber
          .toLowerCase()
          .includes(searchFilters.flightNumber.toLowerCase())
      );
    }

    // Filter by airline
    if (searchFilters.airline) {
      results = results.filter(
        (f) =>
          f.airlineCode === searchFilters.airline ||
          f.airline.toLowerCase().includes(searchFilters.airline.toLowerCase())
      );
    }

    // Filter by from
    if (searchFilters.from) {
      results = results.filter(
        (f) =>
          f.fromCode === searchFilters.from ||
          f.from.includes(searchFilters.from)
      );
    }

    // Filter by to
    if (searchFilters.to) {
      results = results.filter(
        (f) => f.toCode === searchFilters.to || f.to.includes(searchFilters.to)
      );
    }

    // Filter by departure date
    if (searchFilters.departureDate) {
      results = results.filter(
        (f) => f.departureDate === searchFilters.departureDate
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      results = results.filter(
        (flight) => flight.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    // Apply sorting
    results = sortFlights(results, sortBy);
    setFilteredFlights(results);
    setCurrentPage(1);
  }, [headerSearch, searchFilters, filterStatus, sortBy, flights]);

  const handleSearch = (filters) => {
    setIsSearching(true);
    setTimeout(() => {
      let results = searchFlights(filters);

      if (filterStatus !== "all") {
        results = results.filter(
          (flight) => flight.status.toLowerCase() === filterStatus.toLowerCase()
        );
      }

      results = sortFlights(results, sortBy);
      setFilteredFlights(results);
      setIsSearching(false);
    }, 500);
  };

  const handleSort = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1); // Reset ke halaman 1 ketika sorting berubah
    const sorted = sortFlights([...filteredFlights], newSortBy);
    setFilteredFlights(sorted);
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    setCurrentPage(1); // Reset ke halaman 1
    applySearchFilters({ ...searchFilters });
  };

  const handleAddFlight = () => {
    setEditingFlight(null);
    setFormData({
      flightNumber: "",
      airline: "Garuda Indonesia",
      airlineCode: "GA",
      from: "Jakarta (CGK)",
      fromCode: "CGK",
      to: "Denpasar (DPS)",
      toCode: "DPS",
      departureTime: "",
      arrivalTime: "",
      departureDate: "",
      duration: "",
      durationMinutes: 0,
      price: 0,
      prices: {
        economy: 0,
        business: 0,
        first: 0,
      },
      class: "Ekonomi",
      availableSeats: 0,
      totalSeats: 180,
      status: "Tersedia",
      aircraft: "Boeing 737-800",
      terminal: "Terminal 3",
      gate: "",
      baggageAllowance: 20,
      amenities: [],
      transit: false,
      stops: 0,
    });
    setShowForm(true);
  };

  const handleEditFlight = (flight) => {
    setEditingFlight(flight);
    setFormData({
      ...flight,
      prices: flight.prices || {
        economy: flight.price || 0,
        business: (flight.price || 0) * 2,
        first: (flight.price || 0) * 4,
      },
    });
    setShowForm(true);
  };

  const handleDeleteFlight = (id) => {
    setConfirmDelete({ isOpen: true, flightId: id });
  };

  const confirmDeleteFlight = () => {
    if (confirmDelete.flightId) {
      deleteFlight(confirmDelete.flightId);
      setConfirmDelete({ isOpen: false, flightId: null });
      setAlert({
        isOpen: true,
        type: "success",
        title: "Berhasil!",
        message: "Penerbangan berhasil dihapus",
      });
    }
  };

  const handleSaveFlight = () => {
    // Validation
    if (
      !formData.flightNumber ||
      !formData.from ||
      !formData.to ||
      !formData.departureDate
    ) {
      setAlert({
        isOpen: true,
        type: "warning",
        title: "Form Belum Lengkap",
        message: "Mohon lengkapi semua field yang wajib!",
      });
      return;
    }

    const flightData = {
      ...formData,
      price: formData.prices?.economy || formData.price,
      id:
        editingFlight?.id ||
        "FL" + (flights.length + 1).toString().padStart(3, "0"),
    };

    if (editingFlight) {
      updateFlight(editingFlight.id, flightData);
    } else {
      addFlight(flightData);
    }

    setShowForm(false);
    setEditingFlight(null);
  };

  const clearFilters = () => {
    setFilteredFlights(flights);
    setFilterStatus("all");
    setSortBy("price-asc");
    setCurrentPage(1);
    setSearchFilters({
      flightNumber: "",
      airline: "",
      from: "",
      to: "",
      departureDate: "",
    });
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredFlights.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFlights = filteredFlights.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen transition-colors bg-gray-50 dark:bg-gray-900">
      <Header
        title="Kelola Penerbangan"
        subtitle="Kelola dan pantau semua penerbangan yang tersedia"
        onSearch={handleHeaderSearch}
        searchPlaceholder="Cari nomor penerbangan, maskapai, atau rute..."
      />

      <div className="p-4 md:p-6">
        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Daftar Penerbangan ({filteredFlights.length})
          </h2>
          <button
            onClick={handleAddFlight}
            className="flex items-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <AiOutlinePlus size={18} />
            Tambah Penerbangan
          </button>
        </div>

        {/* Search Form - Admin Specific */}
        <div className="mb-6">
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <AiOutlineSearch size={20} />
              Cari Penerbangan (Admin)
            </h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Pencarian dapat dilakukan berdasarkan: Nomor Penerbangan,
              Maskapai, Rute, atau Tanggal Keberangkatan
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nomor Penerbangan
                </label>
                <input
                  type="text"
                  placeholder="GA-123"
                  value={searchFilters.flightNumber}
                  onChange={(e) => {
                    setSearchFilters({
                      ...searchFilters,
                      flightNumber: e.target.value,
                    });
                    applySearchFilters({
                      ...searchFilters,
                      flightNumber: e.target.value,
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Maskapai
                </label>
                <select
                  value={searchFilters.airline}
                  onChange={(e) => {
                    setSearchFilters({
                      ...searchFilters,
                      airline: e.target.value,
                    });
                    applySearchFilters({
                      ...searchFilters,
                      airline: e.target.value,
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Semua Maskapai</option>
                  {airlines.map((airline) => (
                    <option key={airline.code} value={airline.code}>
                      {airline.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dari
                </label>
                <select
                  value={searchFilters.from}
                  onChange={(e) => {
                    setSearchFilters({
                      ...searchFilters,
                      from: e.target.value,
                    });
                    applySearchFilters({
                      ...searchFilters,
                      from: e.target.value,
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Semua Kota</option>
                  {airports.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                      {airport.city} ({airport.code})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ke
                </label>
                <select
                  value={searchFilters.to}
                  onChange={(e) => {
                    setSearchFilters({ ...searchFilters, to: e.target.value });
                    applySearchFilters({
                      ...searchFilters,
                      to: e.target.value,
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Semua Kota</option>
                  {airports.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                      {airport.city} ({airport.code})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tanggal Berangkat
                </label>
                <input
                  type="date"
                  value={searchFilters.departureDate}
                  onChange={(e) => {
                    setSearchFilters({
                      ...searchFilters,
                      departureDate: e.target.value,
                    });
                    applySearchFilters({
                      ...searchFilters,
                      departureDate: e.target.value,
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => {
                  setSearchFilters({
                    flightNumber: "",
                    airline: "",
                    from: "",
                    to: "",
                    departureDate: "",
                  });
                  setFilteredFlights(flights);
                  setFilterStatus("all");
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <AiOutlineReload size={16} />
                Reset
              </button>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Menampilkan:{" "}
                <strong className="text-gray-900 dark:text-white">
                  {filteredFlights.length}
                </strong>{" "}
                dari{" "}
                <strong className="text-gray-900 dark:text-white">
                  {flights.length}
                </strong>{" "}
                penerbangan
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 mb-6 transition-colors bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <AiOutlineFilter size={18} />
                Filter Status:
              </span>
              <div className="flex space-x-2">
                {[
                  { key: "all", label: "Semua" },
                  { key: "tersedia", label: "Tersedia" },
                  { key: "hampir penuh", label: "Hampir Penuh" },
                  { key: "penuh", label: "Penuh" },
                ].map((status) => (
                  <button
                    key={status.key}
                    onClick={() => handleStatusFilter(status.key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filterStatus === status.key
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <AiOutlineSortAscending size={18} />
                Urutkan:
              </span>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="px-4 py-2 text-gray-800 transition-colors bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="price-asc">Harga Terendah</option>
                <option value="price-desc">Harga Tertinggi</option>
                <option value="duration-asc">Durasi Terpendek</option>
                <option value="departure-asc">Waktu Berangkat</option>
              </select>

              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 transition-colors border border-gray-300 rounded-lg dark:text-gray-300 hover:text-gray-800 dark:hover:text-white dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <AiOutlineReload size={16} />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Search Indicator */}
        {headerSearch && (
          <div className="mb-4 p-3 text-sm bg-gray-100 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            Menampilkan hasil untuk:{" "}
            <strong className="text-gray-900 dark:text-white">
              "{headerSearch}"
            </strong>
          </div>
        )}

        {/* Flight List */}
        {isSearching ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-t-2 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            <span className="ml-4 text-gray-600 dark:text-gray-300">
              Mencari penerbangan...
            </span>
          </div>
        ) : filteredFlights.length > 0 ? (
          <>
            <div className="grid gap-6">
              {paginatedFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="p-6 transition-shadow duration-300 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700 hover:shadow-md"
                >
                  {/* Header with Airline and Actions */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          {flight.flightNumber.split("-")[0]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 dark:text-white">
                          {flight.airline}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {flight.flightNumber}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          flight.status
                        )}`}
                      >
                        {flight.status}
                      </span>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditFlight(flight)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                          title="Edit Penerbangan"
                        >
                          <AiOutlineEdit size={16} />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteFlight(flight.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all shadow-sm hover:shadow-md"
                          title="Hapus Penerbangan"
                        >
                          <AiOutlineDelete size={16} />
                          <span className="hidden sm:inline">Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Flight Details */}
                  <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
                    {/* Departure */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">
                        {flight.departureTime}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {flight.from}
                      </div>
                      <div className="flex items-center justify-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <AiOutlineCalendar size={12} className="mr-1" />
                        {flight.departureDate}
                      </div>
                    </div>

                    {/* Flight Info */}
                    <div className="text-center">
                      <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">
                        {flight.duration}
                      </div>
                      <div className="relative">
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                        <div className="relative z-10 flex items-center justify-center w-8 h-8 mx-auto bg-blue-600 rounded-full">
                          <FaPlane size={14} className="text-white" />
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {flight.class}
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">
                        {flight.arrivalTime}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {flight.to}
                      </div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <AiOutlineClockCircle
                          size={12}
                          className="inline mr-1"
                        />
                        Estimasi
                      </div>
                    </div>
                  </div>

                  {/* Footer with Price and Seats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <AiOutlineUser size={16} className="mr-1" />
                        {flight.availableSeats} kursi tersedia
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {formatPrice(flight.price)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        per orang
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8 p-4 bg-white border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Menampilkan{" "}
                  <strong className="text-gray-900 dark:text-white">
                    {startIndex + 1}
                  </strong>{" "}
                  -{" "}
                  <strong className="text-gray-900 dark:text-white">
                    {Math.min(endIndex, filteredFlights.length)}
                  </strong>{" "}
                  dari{" "}
                  <strong className="text-gray-900 dark:text-white">
                    {filteredFlights.length}
                  </strong>{" "}
                  penerbangan
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-4 py-2 text-sm rounded-lg transition-colors ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-600"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    }`}
                  >
                    <AiOutlineLeft size={16} />
                    Sebelumnya
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => {
                        // Show first page, last page, current page, and pages around current
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                currentPage === page
                                  ? "bg-blue-600 text-white"
                                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <span
                              key={page}
                              className="px-2 text-gray-500 dark:text-gray-400"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      }
                    )}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-4 py-2 text-sm rounded-lg transition-colors ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-600"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    }`}
                  >
                    Selanjutnya
                    <AiOutlineRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center">
            <FaPlane
              size={80}
              className="mx-auto mb-6 text-gray-300 dark:text-gray-600"
            />
            <h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Tidak ada penerbangan ditemukan
            </h3>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Coba ubah kriteria pencarian atau filter Anda
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Tampilkan Semua Penerbangan
            </button>
          </div>
        )}

        {/* Add/Edit Flight Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg">
                    <FaPlaneDeparture size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {editingFlight
                        ? "Edit Penerbangan"
                        : "Tambah Penerbangan Baru"}
                    </h2>
                    <p className="text-sm text-blue-100">
                      {editingFlight
                        ? "Ubah informasi penerbangan"
                        : "Tambahkan penerbangan baru ke sistem"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                  title="Tutup"
                >
                  <AiOutlineClose size={24} />
                </button>
              </div>

              {/* Form Sections */}
              <div className="space-y-8">
                {/* Basic Information */}
                <div className="p-6 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600">
                  <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <AiOutlineInfoCircle
                      size={20}
                      className="text-blue-600 dark:text-blue-400"
                    />
                    Informasi Dasar
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FaPlane size={14} />
                        Nomor Penerbangan *
                      </label>
                      <input
                        type="text"
                        value={formData.flightNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            flightNumber: e.target.value,
                          })
                        }
                        placeholder="GA-123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FaPlaneDeparture size={14} />
                        Maskapai *
                      </label>
                      <select
                        value={formData.airlineCode}
                        onChange={(e) => {
                          const airline = airlines.find(
                            (a) => a.code === e.target.value
                          );
                          setFormData({
                            ...formData,
                            airlineCode: e.target.value,
                            airline: airline?.name || formData.airline,
                          });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {airlines.map((airline) => (
                          <option key={airline.code} value={airline.code}>
                            {airline.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Route Information */}
                <div className="p-6 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600">
                  <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FaMapMarkerAlt
                      size={20}
                      className="text-green-600 dark:text-green-400"
                    />
                    Informasi Rute
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FaPlaneDeparture size={14} />
                        Dari *
                      </label>
                      <select
                        value={formData.fromCode}
                        onChange={(e) => {
                          const airport = airports.find(
                            (a) => a.code === e.target.value
                          );
                          setFormData({
                            ...formData,
                            fromCode: e.target.value,
                            from: airport
                              ? `${airport.city} (${airport.code})`
                              : formData.from,
                          });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {airports.map((airport) => (
                          <option key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FaPlaneArrival size={14} />
                        Ke *
                      </label>
                      <select
                        value={formData.toCode}
                        onChange={(e) => {
                          const airport = airports.find(
                            (a) => a.code === e.target.value
                          );
                          setFormData({
                            ...formData,
                            toCode: e.target.value,
                            to: airport
                              ? `${airport.city} (${airport.code})`
                              : formData.to,
                          });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {airports.map((airport) => (
                          <option key={airport.code} value={airport.code}>
                            {airport.city} ({airport.code})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Schedule Information */}
                <div className="p-6 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600">
                  <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <AiOutlineCalendar
                      size={20}
                      className="text-purple-600 dark:text-purple-400"
                    />
                    Jadwal Penerbangan
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <AiOutlineCalendar size={14} />
                        Tanggal Keberangkatan *
                      </label>
                      <input
                        type="date"
                        value={formData.departureDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            departureDate: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <AiOutlineClockCircle size={14} />
                        Waktu Keberangkatan *
                      </label>
                      <input
                        type="time"
                        value={formData.departureTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            departureTime: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <AiOutlineClockCircle size={14} />
                        Waktu Kedatangan *
                      </label>
                      <input
                        type="time"
                        value={formData.arrivalTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            arrivalTime: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <FaPlane size={14} />
                        Durasi (contoh: 3j 30m)
                      </label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData({ ...formData, duration: e.target.value })
                        }
                        placeholder="3j 30m"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Price & Availability */}
                <div className="p-6 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-600">
                  <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <AiOutlineDollarCircle
                      size={20}
                      className="text-yellow-600 dark:text-yellow-400"
                    />
                    Harga & Ketersediaan
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <AiOutlineDollarCircle size={14} />
                        Harga Ekonomi *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                          Rp
                        </span>
                        <input
                          type="number"
                          value={formData.prices?.economy || formData.price}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              price: parseInt(e.target.value),
                              prices: {
                                ...formData.prices,
                                economy: parseInt(e.target.value),
                              },
                            })
                          }
                          placeholder="1200000"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <HiOutlineUserGroup size={14} />
                        Kursi Tersedia *
                      </label>
                      <input
                        type="number"
                        value={formData.availableSeats}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            availableSeats: parseInt(e.target.value),
                          })
                        }
                        placeholder="24"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <AiOutlineInfoCircle size={14} />
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Tersedia">Tersedia</option>
                        <option value="Hampir Penuh">Hampir Penuh</option>
                        <option value="Penuh">Penuh</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 flex items-center justify-end gap-4 p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  <AiOutlineClose size={18} />
                  Batal
                </button>
                <button
                  onClick={handleSaveFlight}
                  className="flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl font-medium"
                >
                  <AiOutlineSave size={18} />
                  {editingFlight ? "Simpan Perubahan" : "Tambah Penerbangan"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Alert Modal */}
        <AlertModal
          isOpen={alert.isOpen}
          onClose={() => setAlert({ ...alert, isOpen: false })}
          type={alert.type}
          title={alert.title}
          message={alert.message}
        />

        {/* Confirm Delete Modal */}
        <ConfirmModal
          isOpen={confirmDelete.isOpen}
          onClose={() => setConfirmDelete({ isOpen: false, flightId: null })}
          onConfirm={confirmDeleteFlight}
          type="danger"
          title="Hapus Penerbangan"
          message="Apakah Anda yakin ingin menghapus penerbangan ini? Tindakan ini tidak dapat dibatalkan."
          confirmText="Ya, Hapus"
          cancelText="Batal"
        />
      </div>
    </div>
  );
};

export default AdminFlights;
