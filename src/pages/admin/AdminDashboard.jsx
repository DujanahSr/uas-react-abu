import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import StatCard from "../../components/StatCard";
import FlightList from "../../components/FlightList";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import {
  formatPrice,
  formatDate,
  airlineStats,
  popularRoutes,
} from "../../data/mockData";
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
            <h3 className="mb-4 font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FaPlane size={18} />
              Maskapai Terlaris
            </h3>
            <div className="space-y-4">
              {airlineStats.map((airline, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800 dark:text-white">
                      {airline.name}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {airline.sales} tiket
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-600">
                    <div
                      className={`${airline.color} h-2 rounded-full transition-all`}
                      style={{ width: `${airline.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 transition-colors bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
            <h3 className="mb-4 font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <AiOutlineRise size={18} />
              Rute Populer
            </h3>
            <div className="space-y-4">
              {popularRoutes.map((route, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                >
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {route.route}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {route.bookings} pemesanan
                    </p>
                  </div>
                  <div className="text-right">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
