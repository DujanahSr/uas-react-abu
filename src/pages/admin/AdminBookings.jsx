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
//           <div className="p-6 bg-white border-l-4 border-blue-500 shadow-sm dark:bg-gray-800 rounded-xl">
//             <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
//             <div className="text-sm text-gray-600">Total Pemesanan</div>
//           </div>
//           <div className="p-6 bg-white border-l-4 border-green-500 shadow-sm dark:bg-gray-800 rounded-xl">
//             <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
//             <div className="text-sm text-gray-600">Confirmed</div>
//           </div>
//           <div className="p-6 bg-white border-l-4 border-yellow-500 shadow-sm dark:bg-gray-800 rounded-xl">
//             <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
//             <div className="text-sm text-gray-600">Pending</div>
//           </div>
//           <div className="p-6 bg-white border-l-4 border-purple-500 shadow-sm dark:bg-gray-800 rounded-xl">
//             <div className="text-2xl font-bold text-purple-600">{stats.paid}</div>
//             <div className="text-sm text-gray-600">Paid</div>
//           </div>
//           <div className="p-6 bg-white border-l-4 border-indigo-500 shadow-sm dark:bg-gray-800 rounded-xl">
//             <div className="text-lg font-bold text-indigo-600">{formatPrice(stats.revenue)}</div>
//             <div className="text-sm text-gray-600">Total Revenue</div>
//           </div>
//         </div>

//         {/* Filters and Controls */}
//         <div className="p-6 mb-6 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
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
//         <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-xl">
//           {filteredBookings.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50 dark:bg-gray-800">
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
//                 <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
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

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { bookingsData, formatPrice, formatDate, getStatusBadge } from '../../data/mockData';
import { 
  AiOutlineFileText, AiOutlineUser, AiOutlineCalendar, AiOutlinePhone, AiOutlineMail,
  AiOutlineDollarCircle, AiOutlineTeam, AiOutlineCheckCircle, AiOutlineClockCircle,
  AiOutlineCloseCircle, AiOutlineCreditCard, AiOutlineSearch, AiOutlineFilter,
  AiOutlineSortAscending, AiOutlineReload, AiOutlineDownload, AiOutlineEye, AiOutlineDelete
} from 'react-icons/ai';
import { FaPlane, FaUserFriends } from 'react-icons/fa';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('bookingDate');

  useEffect(() => {
    setBookings(bookingsData);
    setFilteredBookings(bookingsData);
  }, []);

  useEffect(() => {
    let filtered = [...bookings];

    if (filterStatus !== 'all') {
      filtered = filtered.filter(booking => 
        booking.status.toLowerCase() === filterStatus ||
        booking.paymentStatus.toLowerCase() === filterStatus
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.passengerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.route.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'bookingDate':
          return new Date(b.bookingDate) - new Date(a.bookingDate);
        case 'departureDate':
          return new Date(a.departureDate) - new Date(b.departureDate);
        case 'price':
          return b.totalPrice - a.totalPrice;
        case 'passenger':
          return a.passengerName.localeCompare(b.passengerName);
        default:
          return 0;
      }
    });

    setFilteredBookings(filtered);
  }, [bookings, filterStatus, searchTerm, sortBy]);

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  const handlePaymentStatusChange = (bookingId, newStatus) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, paymentStatus: newStatus } : booking
    ));
  };

  const deleteBooking = (bookingId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus booking ini?')) {
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
    }
  };

  const clearFilters = () => {
    setFilterStatus('all');
    setSearchTerm('');
    setSortBy('bookingDate');
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Kode Booking','Nama Penumpang','Email','Telepon','Penumpang','Flight','Maskapai','Rute','Tanggal Berangkat','Jam','Kelas','Status Booking','Status Pembayaran','Total Harga','Tanggal Booking'];
    const rows = filteredBookings.map(b => [
      b.bookingCode, b.passengerName, b.email, b.phone, b.passengers,
      b.flightNumber, b.airline, b.route, b.departureDate, b.departureTime,
      b.class, b.status, b.paymentStatus, b.totalPrice, b.bookingDate
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pemesanan_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  const totalRevenue = filteredBookings
    .filter(b => b.paymentStatus === 'Paid')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const stats = {
    total: filteredBookings.length,
    confirmed: filteredBookings.filter(b => b.status === 'Confirmed').length,
    pending: filteredBookings.filter(b => b.status === 'Pending').length,
    paid: filteredBookings.filter(b => b.paymentStatus === 'Paid').length,
    revenue: totalRevenue
  };

  return (
    <div className="min-h-screen transition-colors bg-gray-50 dark:bg-gray-900">
      <Header title="Kelola Pemesanan" subtitle="Kelola dan pantau semua pemesanan tiket pesawat" />
      
      <main className="p-4 md:p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-5">
          <div className="p-5 bg-white border-l-4 border-blue-500 shadow-sm dark:bg-gray-800 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800 dark:text-white">{stats.total}</div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">Total Pemesanan</div>
              </div>
              <AiOutlineFileText size={24} className="text-blue-500" />
            </div>
          </div>
          <div className="p-5 bg-white border-l-4 border-green-500 shadow-sm dark:bg-gray-800 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800 dark:text-white">{stats.confirmed}</div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">Confirmed</div>
              </div>
              <AiOutlineCheckCircle size={24} className="text-green-500" />
            </div>
          </div>
          <div className="p-5 bg-white border-l-4 border-yellow-500 shadow-sm dark:bg-gray-800 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800 dark:text-white">{stats.pending}</div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">Pending</div>
              </div>
              <AiOutlineClockCircle size={24} className="text-yellow-500" />
            </div>
          </div>
          <div className="p-5 bg-white border-l-4 border-purple-500 shadow-sm dark:bg-gray-800 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800 dark:text-white">{stats.paid}</div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">Paid</div>
              </div>
              <AiOutlineCreditCard size={24} className="text-purple-500" />
            </div>
          </div>
          <div className="p-5 bg-white border-l-4 border-indigo-500 shadow-sm dark:bg-gray-800 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-base font-bold text-gray-800 dark:text-white">{formatPrice(stats.revenue)}</div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">Total Revenue</div>
              </div>
              <AiOutlineDollarCircle size={24} className="text-indigo-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 mb-6 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Cari Pemesanan</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Kode booking, nama, nomor flight..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <AiOutlineSearch className="absolute text-gray-400 left-3 top-3 dark:text-gray-500" size={18} />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Filter Status</label>
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
                >
                  <option value="all">Semua Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <AiOutlineFilter className="absolute text-gray-400 left-3 top-3 dark:text-gray-500" size={18} />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Urutkan Berdasarkan</label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
                >
                  <option value="bookingDate">Tanggal Booking (Terbaru)</option>
                  <option value="departureDate">Tanggal Berangkat</option>
                  <option value="price">Harga (Tertinggi)</option>
                  <option value="passenger">Nama Penumpang (A-Z)</option>
                </select>
                <AiOutlineSortAscending className="absolute text-gray-400 left-3 top-3 dark:text-gray-500" size={18} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Menampilkan <span className="font-semibold text-gray-800 dark:text-white">{filteredBookings.length}</span> dari <span className="font-semibold text-gray-800 dark:text-white">{bookings.length}</span> pemesanan
            </div>
            <div className="flex gap-3">
              <button onClick={clearFilters} className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                <AiOutlineReload size={16} />
                Reset Filter
              </button>
              <button onClick={exportToCSV} className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <AiOutlineDownload size={16} />
                Export Data
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
        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-xl">
          {filteredBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead className="border-b border-gray-200 bg-gray-50 dark:bg-gray-900/50 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">
                      <div className="flex items-center gap-2"><AiOutlineFileText size={16} /> Booking Info</div>
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">
                      <div className="flex items-center gap-2"><AiOutlineUser size={16} /> Penumpang</div>
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">
                      <div className="flex items-center gap-2"><FaPlane size={16} /> Penerbangan</div>
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">
                      <div className="flex items-center gap-2"><AiOutlineCheckCircle size={16} /> Status</div>
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">
                      <div className="flex items-center gap-2"><AiOutlineDollarCircle size={16} /> Total</div>
                    </th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">
                      <div className="flex items-center gap-2"><AiOutlineCalendar size={16} /> Actions</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{booking.bookingCode}</div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <AiOutlineCalendar size={12} /> {formatDate(booking.bookingDate)}
                        </div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">ID: {booking.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm font-semibold text-gray-900 dark:text-white">
                          <AiOutlineUser size={14} /> {booking.passengerName}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <FaUserFriends size={12} /> {booking.passengers} Penumpang
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <AiOutlineMail size={12} /> {booking.email}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <AiOutlinePhone size={12} /> {booking.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{booking.flightNumber}</div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{booking.airline}</div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{booking.route}</div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <AiOutlineCalendar size={12} /> {booking.departureDate} {booking.departureTime}
                        </div>
                        <div className="inline-block px-2 py-1 mt-1 text-xs text-gray-700 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
                          {booking.class}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <span className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusBadge(booking.status)}`}>
                            {booking.status === 'Confirmed' ? <AiOutlineCheckCircle size={12} /> : 
                             booking.status === 'Pending' ? <AiOutlineClockCircle size={12} /> : 
                             <AiOutlineCloseCircle size={12} />}
                            {booking.status}
                          </span>
                          <span className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusBadge(booking.paymentStatus)}`}>
                            {booking.paymentStatus === 'Paid' ? <AiOutlineCheckCircle size={12} /> : <AiOutlineCreditCard size={12} />}
                            {booking.paymentStatus}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-base font-bold text-gray-900 dark:text-white">
                          {formatPrice(booking.totalPrice)}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <AiOutlineTeam size={12} /> {booking.passengers} tiket
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2 min-w-[180px]">
                          <div className="flex gap-2">
                            <select
                              value={booking.status}
                              onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                              className="flex-1 px-3 py-2 text-xs bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                            >
                              <option>Confirmed</option>
                              <option>Pending</option>
                              <option>Cancelled</option>
                            </select>
                            <select
                              value={booking.paymentStatus}
                              onChange={(e) => handlePaymentStatusChange(booking.id, e.target.value)}
                              className="flex-1 px-3 py-2 text-xs bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                            >
                              <option>Paid</option>
                              <option>Pending</option>
                              <option>Failed</option>
                            </select>
                          </div>
                          <div className="flex gap-2">
                            <button className="flex items-center justify-center flex-1 gap-1 px-3 py-2 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">
                              <AiOutlineEye size={12} /> Detail
                            </button>
                            <button
                              onClick={() => deleteBooking(booking.id)}
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
              <AiOutlineFileText size={80} className="mx-auto mb-6 text-gray-300 dark:text-gray-600" />
              <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
                Tidak ada pemesanan ditemukan
              </h3>
              <p className="max-w-md mx-auto mb-8 text-lg text-gray-500 dark:text-gray-400">
                Coba ubah filter atau kata kunci pencarian Anda untuk menemukan pemesanan yang dicari
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button onClick={clearFilters} className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  <AiOutlineReload size={16} /> Tampilkan Semua Pemesanan
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredBookings.length > 0 && (
          <div className="flex items-center justify-between p-4 mt-6 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Halaman 1 dari 1
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg dark:text-gray-400 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                Sebelumnya
              </button>
              <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                1
              </button>
              <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg dark:text-gray-400 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminBookings;