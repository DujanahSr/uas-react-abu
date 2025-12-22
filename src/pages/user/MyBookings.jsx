import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { formatPrice, formatDate, getStatusBadge } from "../../data/mockData";
import BookingDetailModal from "../../components/BookingDetailModal";
import ETicketModal from "../../components/ETicketModal";
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineDownload,
  AiOutlineEye,
  AiOutlineSearch,
} from "react-icons/ai";
import { FaPlane, FaMapMarkerAlt } from "react-icons/fa";

const MyBookings = () => {
  const { bookings } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showETicketModal, setShowETicketModal] = useState(false);

  const userBookings = bookings.filter((b) => b.email === user?.email);

  const filteredBookings = userBookings.filter((booking) => {
    // Tab filter
    if (activeTab === "upcoming") {
      const departureDate = new Date(booking.departureDate);
      const today = new Date();
      if (departureDate < today || booking.status === "Cancelled") return false;
    }
    if (activeTab === "completed") {
      const departureDate = new Date(booking.departureDate);
      const today = new Date();
      if (departureDate >= today || booking.status !== "Confirmed")
        return false;
    }
    if (activeTab === "cancelled") {
      if (booking.status !== "Cancelled") return false;
    }

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        booking.bookingCode.toLowerCase().includes(search) ||
        booking.flightNumber.toLowerCase().includes(search) ||
        booking.airline.toLowerCase().includes(search) ||
        booking.route.toLowerCase().includes(search)
      );
    }

    return true;
  });

  const tabs = [
    { id: "all", label: "Semua", count: userBookings.length },
    {
      id: "upcoming",
      label: "Upcoming",
      count: userBookings.filter((b) => {
        const date = new Date(b.departureDate);
        return date >= new Date() && b.status !== "Cancelled";
      }).length,
    },
    {
      id: "completed",
      label: "Completed",
      count: userBookings.filter((b) => {
        const date = new Date(b.departureDate);
        return date < new Date() && b.status === "Confirmed";
      }).length,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      count: userBookings.filter((b) => b.status === "Cancelled").length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-6xl px-4 py-8 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
            Riwayat Pemesanan
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kelola dan lihat detail semua pemesanan Anda
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <AiOutlineSearch
              className="absolute text-gray-400 left-3 top-3 dark:text-gray-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari berdasarkan kode booking, nomor penerbangan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-10 pr-4 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {tab.label}
              <span
                className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="py-32 text-center">
            <FaPlane
              size={80}
              className="mx-auto mb-6 text-gray-300 dark:text-gray-700"
            />
            <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
              {searchTerm ? "Tidak ada hasil ditemukan" : "Belum ada booking"}
            </h2>
            <p className="mb-10 text-xl text-gray-600 dark:text-gray-400">
              {searchTerm
                ? "Coba ubah kata kunci pencarian Anda"
                : "Mulai cari tiket dan pesan sekarang!"}
            </p>
            {!searchTerm && (
              <button
                onClick={() => navigate("/")}
                className="px-10 py-5 text-xl font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700"
              >
                Cari Tiket Pesawat
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  {/* Left Section */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {booking.bookingCode}
                      </div>
                      <div className="flex gap-2">
                        <span
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusBadge(
                            booking.status
                          )}`}
                        >
                          {booking.status === "Confirmed" && (
                            <AiOutlineCheckCircle size={14} />
                          )}
                          {booking.status === "Pending" && (
                            <AiOutlineClockCircle size={14} />
                          )}
                          {booking.status === "Cancelled" && (
                            <AiOutlineCloseCircle size={14} />
                          )}
                          {booking.status}
                        </span>
                        <span
                          className={`px-4 py-1.5 rounded-full text-xs font-semibold ${getStatusBadge(
                            booking.paymentStatus
                          )}`}
                        >
                          {booking.paymentStatus}
                        </span>
                      </div>
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <FaPlane size={18} />
                      {booking.flightNumber} • {booking.airline}
                    </h3>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <FaMapMarkerAlt size={16} />
                        {booking.route}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <AiOutlineCalendar size={16} />
                        {formatDate(booking.departureDate)}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <AiOutlineClockCircle size={16} />
                        {booking.departureTime} - {booking.arrivalTime}
                      </div>
                      <div className="text-gray-700 dark:text-gray-300">
                        {booking.passengers?.length || booking.passengers}{" "}
                        penumpang • {booking.class}
                      </div>
                    </div>

                    {booking.passengers &&
                      Array.isArray(booking.passengers) &&
                      booking.passengers.length > 0 && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-700/50">
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Penumpang:
                          </div>
                          <div className="space-y-1">
                            {booking.passengers.map((p, i) => (
                              <div
                                key={i}
                                className="text-sm text-gray-600 dark:text-gray-400"
                              >
                                {p.title} {p.name}{" "}
                                {p.seat && `- Kursi ${p.seat}`}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col items-end gap-4">
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {formatPrice(booking.totalPrice)}
                      </div>
                      <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Dipesan pada {formatDate(booking.bookingDate)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowDetailModal(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <AiOutlineEye size={16} />
                        Detail
                      </button>
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowETicketModal(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        <AiOutlineDownload size={16} />
                        E-Ticket
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <BookingDetailModal
        booking={selectedBooking}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedBooking(null);
        }}
      />
      <ETicketModal
        booking={selectedBooking}
        isOpen={showETicketModal}
        onClose={() => {
          setShowETicketModal(false);
          setSelectedBooking(null);
        }}
      />
    </div>
  );
};

export default MyBookings;
