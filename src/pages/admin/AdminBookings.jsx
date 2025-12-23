// import React, { useState, useEffect } from 'react';
// import Header from '../components/Header';
// import { bookingsData, formatPrice, formatDate, getStatusBadge } from '../data/mockData';

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('bookingDate');

//   useEffect(() => {
//     setBookings(bookingsData);
//     setFilteredBookings(bookingsData);
//   }, []);

//   useEffect(() => {
//     let filtered = [...bookings];

//     // Apply status filter
//     if (filterStatus !== 'all') {
//       filtered = filtered.filter(booking =>
//         booking.status.toLowerCase() === filterStatus ||
//         booking.paymentStatus.toLowerCase() === filterStatus
//       );
//     }

//     // Apply search filter
//     if (searchTerm) {
//       filtered = filtered.filter(booking =>
//         booking.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         booking.passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         booking.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         booking.route.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Apply sorting
//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case 'bookingDate':
//           return new Date(b.bookingDate) - new Date(a.bookingDate);
//         case 'departureDate':
//           return new Date(a.departureDate) - new Date(b.departureDate);
//         case 'price':
//           return b.totalPrice - a.totalPrice;
//         case 'passenger':
//           return a.passengerName.localeCompare(b.passengerName);
//         default:
//           return 0;
//       }
//     });

//     setFilteredBookings(filtered);
//   }, [bookings, filterStatus, searchTerm, sortBy]);

//   const handleStatusChange = (bookingId, newStatus) => {
//     setBookings(prev => prev.map(booking =>
//       booking.id === bookingId ? { ...booking, status: newStatus } : booking
//     ));
//   };

//   const handlePaymentStatusChange = (bookingId, newStatus) => {
//     setBookings(prev => prev.map(booking =>
//       booking.id === bookingId ? { ...booking, paymentStatus: newStatus } : booking
//     ));
//   };

//   const deleteBooking = (bookingId) => {
//     if (window.confirm('Apakah Anda yakin ingin menghapus booking ini?')) {
//       setBookings(prev => prev.filter(booking => booking.id !== bookingId));
//     }
//   };

//   const clearFilters = () => {
//     setFilterStatus('all');
//     setSearchTerm('');
//     setSortBy('bookingDate');
//   };

//   const totalRevenue = filteredBookings
//     .filter(b => b.paymentStatus === 'Paid')
//     .reduce((sum, booking) => sum + booking.totalPrice, 0);

//   const stats = {
//     total: filteredBookings.length,
//     confirmed: filteredBookings.filter(b => b.status === 'Confirmed').length,
//     pending: filteredBookings.filter(b => b.status === 'Pending').length,
//     paid: filteredBookings.filter(b => b.paymentStatus === 'Paid').length,
//     revenue: totalRevenue
//   };

//   return (
//     <div>
//       <Header
//         title="Kelola Pemesanan"
//         subtitle="Kelola dan pantau semua pemesanan tiket pesawat"
//       />

//       <main className="p-6">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-5">
//           <div className="p-6 bg-white border-l-4 border-blue-500 shadow-sm dark:bg-slate-800/90 rounded-xl">
//             <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
//             <div className="text-sm text-gray-600">Total Pemesanan</div>
//           </div>
//           <div className="p-6 bg-white border-l-4 border-green-500 shadow-sm dark:bg-slate-800/90 rounded-xl">
//             <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
//             <div className="text-sm text-gray-600">Confirmed</div>
//           </div>
//           <div className="p-6 bg-white border-l-4 border-yellow-500 shadow-sm dark:bg-slate-800/90 rounded-xl">
//             <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
//             <div className="text-sm text-gray-600">Pending</div>
//           </div>
//           <div className="p-6 bg-white border-l-4 border-purple-500 shadow-sm dark:bg-slate-800/90 rounded-xl">
//             <div className="text-2xl font-bold text-purple-600">{stats.paid}</div>
//             <div className="text-sm text-gray-600">Paid</div>
//           </div>
//           <div className="p-6 bg-white border-l-4 border-indigo-500 shadow-sm dark:bg-slate-800/90 rounded-xl">
//             <div className="text-lg font-bold text-indigo-600">{formatPrice(stats.revenue)}</div>
//             <div className="text-sm text-gray-600">Total Revenue</div>
//           </div>
//         </div>

//         {/* Filters and Controls */}
//         <div className="p-6 mb-6 bg-white shadow-sm dark:bg-slate-800/90 rounded-xl">
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//             {/* Search */}
//             <div>
//               <label className="block mb-2 text-sm font-medium text-gray-700">Cari</label>
//               <input
//                 type="text"
//                 placeholder="Kode booking, nama, nomor flight..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Status Filter */}
//             <div>
//               <label className="block mb-2 text-sm font-medium text-gray-700">Filter Status</label>
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="all">Semua Status</option>
//                 <option value="confirmed">Confirmed</option>
//                 <option value="pending">Pending</option>
//                 <option value="paid">Paid</option>
//                 <option value="unpaid">Unpaid</option>
//               </select>
//             </div>

//             {/* Sort */}
//             <div>
//               <label className="block mb-2 text-sm font-medium text-gray-700">Urutkan</label>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="bookingDate">Tanggal Booking</option>
//                 <option value="departureDate">Tanggal Berangkat</option>
//                 <option value="price">Harga</option>
//                 <option value="passenger">Nama Penumpang</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex justify-end mt-4">
//             <button
//               onClick={clearFilters}
//               className="px-4 py-2 text-gray-600 transition-colors border border-gray-300 rounded-lg hover:text-gray-800 hover:bg-gray-50"
//             >
//               Reset Filter
//             </button>
//           </div>
//         </div>

//         {/* Results Summary */}
//         <div className="mb-6">
//           <h2 className="text-xl font-bold text-gray-800">
//             {filteredBookings.length} Pemesanan Ditemukan
//           </h2>
//         </div>

//         {/* Bookings Table */}
//         <div className="overflow-hidden bg-white shadow-sm dark:bg-slate-800/90 rounded-xl">
//           {filteredBookings.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50 dark:bg-slate-800/90">
//                   <tr>
//                     <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//                       Booking Info
//                     </th>
//                     <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//                       Penumpang
//                     </th>
//                     <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//                       Penerbangan
//                     </th>
//                     <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//                       Total
//                     </th>
//                     <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-800/90">
//                   {filteredBookings.map((booking) => (
//                     <tr key={booking.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div>
//                           <div className="text-sm font-medium text-gray-900">{booking.bookingCode}</div>
//                           <div className="text-sm text-gray-500">{formatDate(booking.bookingDate)}</div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div>
//                           <div className="text-sm font-medium text-gray-900">{booking.passengerName}</div>
//                           <div className="text-sm text-gray-500">{booking.passengers} Penumpang</div>
//                           <div className="text-sm text-gray-500">{booking.email}</div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div>
//                           <div className="text-sm font-medium text-gray-900">{booking.flightNumber}</div>
//                           <div className="text-sm text-gray-500">{booking.airline}</div>
//                           <div className="text-sm text-gray-500">{booking.route}</div>
//                           <div className="text-sm text-gray-500">{booking.departureDate} {booking.departureTime}</div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="space-y-2">
//                           <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(booking.status)}`}>
//                             {booking.status}
//                           </span>
//                           <br />
//                           <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(booking.paymentStatus)}`}>
//                             {booking.paymentStatus}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">{formatPrice(booking.totalPrice)}</div>
//                         <div className="text-sm text-gray-500">{booking.class}</div>
//                       </td>
//                       <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
//                         <div className="flex space-x-2">
//                           <select
//                             value={booking.status}
//                             onChange={(e) => handleStatusChange(booking.id, e.target.value)}
//                             className="px-2 py-1 text-xs border border-gray-300 rounded"
//                           >
//                             <option value="Confirmed">Confirmed</option>
//                             <option value="Pending">Pending</option>
//                             <option value="Cancelled">Cancelled</option>
//                           </select>
//                           <select
//                             value={booking.paymentStatus}
//                             onChange={(e) => handlePaymentStatusChange(booking.id, e.target.value)}
//                             className="px-2 py-1 text-xs border border-gray-300 rounded"
//                           >
//                             <option value="Paid">Paid</option>
//                             <option value="Pending">Pending</option>
//                             <option value="Failed">Failed</option>
//                           </select>
//                           <button
//                             onClick={() => deleteBooking(booking.id)}
//                             className="px-2 py-1 text-red-600 border border-red-300 rounded hover:text-red-800 hover:bg-red-50"
//                           >
//                             Hapus
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="py-20 text-center">
//               <div className="mb-4 text-6xl text-gray-400">📋</div>
//               <h3 className="mb-2 text-xl font-medium text-gray-900">Tidak ada pemesanan ditemukan</h3>
//               <p className="mb-6 text-gray-500">Coba ubah filter atau kata kunci pencarian Anda</p>
//               <button
//                 onClick={clearFilters}
//                 className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
//               >
//                 Tampilkan Semua Pemesanan
//               </button>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Bookings;

import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useData } from "../../context/DataContext";
import { formatPrice, formatDate, getStatusBadge } from "../../data/mockData";
import BookingDetailModal from "../../components/BookingDetailModal";
import ETicketModal from "../../components/ETicketModal";
import ConfirmModal from "../../components/ConfirmModal";
import {
  AiOutlineFileText,
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineDollarCircle,
  AiOutlineTeam,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineCloseCircle,
  AiOutlineCreditCard,
  AiOutlineSearch,
  AiOutlineFilter,
  AiOutlineSortAscending,
  AiOutlineReload,
  AiOutlineDownload,
  AiOutlineEye,
  AiOutlineDelete,
} from "react-icons/ai";
import { FaPlane, FaUserFriends } from "react-icons/fa";

const AdminBookings = () => {
  const { bookings, updateBooking, deleteBooking } = useData();
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("bookingDate");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showETicketModal, setShowETicketModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({
    isOpen: false,
    bookingId: null,
  });

  useEffect(() => {
    let filtered = [...bookings];

    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (booking) =>
          booking.status?.toLowerCase() === filterStatus ||
          booking.paymentStatus?.toLowerCase() === filterStatus
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.bookingCode
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking.passengerName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking.flightNumber
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking.route?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "bookingDate":
          return new Date(b.bookingDate || 0) - new Date(a.bookingDate || 0);
        case "departureDate":
          return (
            new Date(a.departureDate || 0) - new Date(b.departureDate || 0)
          );
        case "price":
          return (b.totalPrice || 0) - (a.totalPrice || 0);
        case "passenger":
          return (a.passengerName || "").localeCompare(b.passengerName || "");
        default:
          return 0;
      }
    });

    setFilteredBookings(filtered);
  }, [bookings, filterStatus, searchTerm, sortBy]);

  const handleStatusChange = (bookingId, newStatus) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      // Update booking dengan status baru, mempertahankan semua data lainnya
      const updatedBooking = {
        ...booking,
        status: newStatus,
      };
      updateBooking(bookingId, updatedBooking);
    }
  };

  const handleDeleteBooking = (bookingId) => {
    setConfirmDelete({ isOpen: true, bookingId });
  };

  const confirmDeleteBooking = () => {
    if (confirmDelete.bookingId) {
      deleteBooking(confirmDelete.bookingId);
      setConfirmDelete({ isOpen: false, bookingId: null });
    }
  };

  const clearFilters = () => {
    setFilterStatus("all");
    setSearchTerm("");
    setSortBy("bookingDate");
  };

  // Export to Excel dengan format yang rapi
  const exportToExcel = () => {
    const today = new Date();
    const dateStr = today.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const timeStr = today.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Format harga untuk Excel
    const formatPriceForExcel = (price) => {
      return `Rp ${price.toLocaleString("id-ID")}`;
    };

    // Buat HTML table dengan styling yang bagus
    let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }
    .header p {
      margin: 5px 0 0 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .summary {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      border-left: 4px solid #667eea;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 15px;
      margin-top: 10px;
    }
    .summary-item {
      text-align: center;
    }
    .summary-item .label {
      font-size: 12px;
      color: #6c757d;
      margin-bottom: 5px;
    }
    .summary-item .value {
      font-size: 18px;
      font-weight: bold;
      color: #212529;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      font-size: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    thead {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    th {
      padding: 12px 8px;
      text-align: left;
      font-weight: 600;
      border: 1px solid #5a67d8;
      white-space: nowrap;
    }
    td {
      padding: 10px 8px;
      border: 1px solid #dee2e6;
      vertical-align: top;
    }
    tbody tr:nth-child(even) {
      background-color: #f8f9fa;
    }
    tbody tr:hover {
      background-color: #e9ecef;
    }
    .status-confirmed {
      background-color: #d4edda;
      color: #155724;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 600;
      display: inline-block;
    }
    .status-pending {
      background-color: #fff3cd;
      color: #856404;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 600;
      display: inline-block;
    }
    .status-cancelled {
      background-color: #f8d7da;
      color: #721c24;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 600;
      display: inline-block;
    }
    .status-paid {
      background-color: #d1ecf1;
      color: #0c5460;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 600;
      display: inline-block;
    }
    .price {
      font-weight: bold;
      color: #28a745;
    }
    .footer {
      margin-top: 30px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      text-align: center;
      font-size: 12px;
      color: #6c757d;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>📋 Laporan Data Pemesanan Tiket Pesawat</h1>
    <p>FlyBook - Export Date: ${dateStr} ${timeStr}</p>
  </div>

  <table>
    <thead>
      <tr>
        <th>No</th>
        <th>Kode Booking</th>
        <th>Nama Penumpang</th>
        <th>Email</th>
        <th>Telepon</th>
        <th>Jumlah Penumpang</th>
        <th>Nomor Penerbangan</th>
        <th>Maskapai</th>
        <th>Rute</th>
        <th>Tanggal Berangkat</th>
        <th>Waktu Berangkat</th>
        <th>Kelas</th>
        <th>Status Booking</th>
        <th>Status Pembayaran</th>
        <th>Total Harga</th>
        <th>Tanggal Booking</th>
      </tr>
    </thead>
    <tbody>
`;

    filteredBookings.forEach((b, index) => {
      const passengerCount = Array.isArray(b.passengers)
        ? b.passengers.length
        : b.passengers || 0;

      const statusClass =
        b.status === "Confirmed"
          ? "status-confirmed"
          : b.status === "Pending"
          ? "status-pending"
          : "status-cancelled";

      html += `
      <tr>
        <td>${index + 1}</td>
        <td><strong>${b.bookingCode || "-"}</strong></td>
        <td>${b.passengerName || "-"}</td>
        <td>${b.email || "-"}</td>
        <td>${b.phone || "-"}</td>
        <td style="text-align: center;">${passengerCount}</td>
        <td>${b.flightNumber || "-"}</td>
        <td>${b.airline || "-"}</td>
        <td>${b.route || "-"}</td>
        <td>${b.departureDate || "-"}</td>
        <td>${b.departureTime || "-"}</td>
        <td>${b.class || "-"}</td>
        <td><span class="${statusClass}">${b.status || "-"}</span></td>
        <td><span class="status-paid">${b.paymentStatus || "Paid"}</span></td>
        <td class="price">${formatPrice(b.totalPrice || 0)}</td>
        <td>${b.bookingDate ? formatDate(b.bookingDate) : "-"}</td>
      </tr>
    `;
    });

    html += `
    </tbody>
  </table>

  <div class="footer">
    <p><strong>Total Data:</strong> ${filteredBookings.length} pemesanan</p>
    <p>Dokumen ini dihasilkan secara otomatis dari sistem FlyBook</p>
    <p>© ${new Date().getFullYear()} FlyBook - All Rights Reserved</p>
  </div>
</body>
</html>
`;

    // Buat blob dan download
    const blob = new Blob([html], {
      type: "application/vnd.ms-excel",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Laporan_Pemesanan_${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "_")}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const totalRevenue = filteredBookings
    .filter((b) => b.paymentStatus === "Paid")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const stats = {
    total: filteredBookings.length,
    confirmed: filteredBookings.filter((b) => b.status === "Confirmed").length,
    pending: filteredBookings.filter((b) => b.status === "Pending").length,
    paid: filteredBookings.filter((b) => b.paymentStatus === "Paid").length,
    revenue: totalRevenue,
  };

  const handleHeaderSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <Header
        title="Kelola Pemesanan"
        subtitle="Kelola dan pantau semua pemesanan tiket pesawat"
        onSearch={handleHeaderSearch}
        searchPlaceholder="Cari kode booking, nama, atau nomor penerbangan..."
      />

      <div className="relative z-10 p-4 md:p-6">
        {/* Search Indicator */}
        {searchTerm && (
          <div className="mb-4 p-3 text-sm bg-gray-100/80 backdrop-blur-sm border-b border-gray-200/50 dark:bg-slate-700/50 dark:border-slate-600/50 rounded-lg animate-slideInUp">
            Menampilkan hasil untuk:{" "}
            <strong className="text-gray-900 dark:text-white">
              "{searchTerm}"
            </strong>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-5">
          <div
            className="p-4 bg-white/90 backdrop-blur-sm border-l-4 border-blue-500 shadow-lg dark:bg-slate-800/90 rounded-xl card-3d animate-slideInUp sm:p-5"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                  {stats.total}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Total Pemesanan
                </div>
              </div>
              <AiOutlineFileText size={24} className="text-blue-500" />
            </div>
          </div>
          <div
            className="p-4 bg-white/90 backdrop-blur-sm border-l-4 border-green-500 shadow-lg dark:bg-slate-800/90 rounded-xl card-3d animate-slideInUp sm:p-5"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                  {stats.confirmed}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Confirmed
                </div>
              </div>
              <AiOutlineCheckCircle size={24} className="text-green-500" />
            </div>
          </div>
          <div
            className="p-4 bg-white/90 backdrop-blur-sm border-l-4 border-yellow-500 shadow-lg dark:bg-slate-800/90 rounded-xl card-3d animate-slideInUp sm:p-5"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                  {stats.pending}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Pending
                </div>
              </div>
              <AiOutlineClockCircle size={24} className="text-yellow-500" />
            </div>
          </div>
          <div className="p-5 bg-white border-l-4 border-purple-500 shadow-sm dark:bg-slate-800/90 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                  {stats.paid}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Paid
                </div>
              </div>
              <AiOutlineCreditCard size={24} className="text-purple-500" />
            </div>
          </div>
          <div className="p-5 bg-white border-l-4 border-indigo-500 shadow-sm dark:bg-slate-800/90 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-bold text-gray-800 dark:text-white">
                  {formatPrice(stats.revenue)}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Total Revenue
                </div>
              </div>
              <AiOutlineDollarCircle size={24} className="text-indigo-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 mb-6 bg-white shadow-sm dark:bg-slate-800/90 rounded-xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Cari Pemesanan
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Kode booking, nama, nomor flight..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
                <AiOutlineSearch
                  className="absolute text-gray-400 left-3 top-3 dark:text-gray-500"
                  size={18}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Filter Status
              </label>
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white appearance-none"
                >
                  <option value="all">Semua Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <AiOutlineFilter
                  className="absolute text-gray-400 left-3 top-3 dark:text-gray-500"
                  size={18}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Urutkan Berdasarkan
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white appearance-none"
                >
                  <option value="bookingDate">Tanggal Booking (Terbaru)</option>
                  <option value="departureDate">Tanggal Berangkat</option>
                  <option value="price">Harga (Tertinggi)</option>
                  <option value="passenger">Nama Penumpang (A-Z)</option>
                </select>
                <AiOutlineSortAscending
                  className="absolute text-gray-400 left-3 top-3 dark:text-gray-500"
                  size={18}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Menampilkan{" "}
              <span className="font-semibold text-gray-800 dark:text-white">
                {filteredBookings.length}
              </span>{" "}
              dari{" "}
              <span className="font-semibold text-gray-800 dark:text-white">
                {bookings.length}
              </span>{" "}
              pemesanan
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearFilters}
                className="px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <AiOutlineReload size={16} />
                Reset Filter
              </button>
              <button
                onClick={exportToExcel}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
              >
                <AiOutlineDownload size={16} />
                Export ke Excel
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {filteredBookings.length} Pemesanan Ditemukan
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Klik pada tombol aksi untuk mengubah status pemesanan
          </p>
        </div>

        {/* Table */}
        <div className="overflow-hidden bg-white shadow-sm dark:bg-slate-800/90 rounded-xl">
          {filteredBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead className="border-b border-gray-200 bg-gray-50 dark:bg-gray-900/50 dark:border-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <AiOutlineFileText size={16} /> Booking Info
                      </div>
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <AiOutlineUser size={16} /> Penumpang
                      </div>
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <FaPlane size={16} /> Penerbangan
                      </div>
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <AiOutlineCheckCircle size={16} /> Status
                      </div>
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <AiOutlineDollarCircle size={16} /> Total
                      </div>
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <AiOutlineCalendar size={16} /> Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {booking.bookingCode}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <AiOutlineCalendar size={12} />{" "}
                          {formatDate(booking.bookingDate)}
                        </div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          ID: {booking.id}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm font-semibold text-gray-900 dark:text-white">
                          <AiOutlineUser size={14} /> {booking.passengerName}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <FaUserFriends size={12} />{" "}
                          {Array.isArray(booking.passengers)
                            ? booking.passengers.length
                            : booking.passengers || 0}{" "}
                          Penumpang
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <AiOutlineMail size={12} /> {booking.email}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <AiOutlinePhone size={12} /> {booking.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {booking.flightNumber}
                        </div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {booking.airline}
                        </div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {booking.route}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <AiOutlineCalendar size={12} />{" "}
                          {booking.departureDate} {booking.departureTime}
                        </div>
                        <div className="inline-block px-2 py-1 mt-1 text-xs text-gray-700 bg-gray-100 rounded dark:bg-slate-700 dark:text-gray-300">
                          {booking.class}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusBadge(
                              booking.status
                            )}`}
                          >
                            {booking.status === "Confirmed" ? (
                              <AiOutlineCheckCircle size={12} />
                            ) : booking.status === "Pending" ? (
                              <AiOutlineClockCircle size={12} />
                            ) : (
                              <AiOutlineCloseCircle size={12} />
                            )}
                            {booking.status}
                          </span>
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            <AiOutlineCheckCircle size={12} />
                            Paid
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-base font-bold text-gray-900 dark:text-white">
                          {formatPrice(booking.totalPrice)}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <AiOutlineTeam size={12} />{" "}
                          {Array.isArray(booking.passengers)
                            ? booking.passengers.length
                            : booking.passengers || 0}{" "}
                          tiket
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2 min-w-[180px]">
                          <div className="flex gap-2">
                            <select
                              value={booking.status}
                              onChange={(e) =>
                                handleStatusChange(booking.id, e.target.value)
                              }
                              className="flex-1 px-3 py-2 text-xs bg-white border border-gray-300 rounded dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500"
                            >
                              <option>Confirmed</option>
                              <option>Pending</option>
                              <option>Cancelled</option>
                            </select>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedBooking(booking);
                                setShowDetailModal(true);
                              }}
                              className="flex items-center justify-center flex-1 gap-1 px-3 py-2 text-xs text-white bg-blue-600 rounded hover:bg-blue-700"
                            >
                              <AiOutlineEye size={12} /> Detail
                            </button>
                            <button
                              onClick={() => {
                                setSelectedBooking(booking);
                                setShowETicketModal(true);
                              }}
                              className="flex items-center justify-center flex-1 gap-1 px-3 py-2 text-xs text-white bg-green-600 rounded hover:bg-green-700"
                            >
                              <AiOutlineDownload size={12} /> E-Ticket
                            </button>
                            <button
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="flex items-center justify-center flex-1 gap-1 px-3 py-2 text-xs text-white bg-red-600 rounded hover:bg-red-700"
                            >
                              <AiOutlineDelete size={12} /> Hapus
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-4 py-16 text-center">
              <AiOutlineFileText
                size={80}
                className="mx-auto mb-6 text-gray-300 dark:text-gray-600"
              />
              <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
                Tidak ada pemesanan ditemukan
              </h3>
              <p className="max-w-md mx-auto mb-8 text-lg text-gray-500 dark:text-gray-400">
                Coba ubah filter atau kata kunci pencarian Anda untuk menemukan
                pemesanan yang dicari
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button
                  onClick={clearFilters}
                  className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <AiOutlineReload size={16} /> Tampilkan Semua Pemesanan
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredBookings.length > 0 && (
          <div className="flex items-center justify-between p-4 mt-6 bg-white shadow-sm dark:bg-slate-800/90 rounded-xl">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Halaman 1 dari 1
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg dark:text-gray-400 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                Sebelumnya
              </button>
              <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                1
              </button>
              <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg dark:text-gray-400 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </div>

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

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        onClose={() => setConfirmDelete({ isOpen: false, bookingId: null })}
        onConfirm={confirmDeleteBooking}
        type="danger"
        title="Hapus Pemesanan"
        message="Apakah Anda yakin ingin menghapus pemesanan ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Ya, Hapus"
        cancelText="Batal"
      />
    </div>
  );
};

export default AdminBookings;
