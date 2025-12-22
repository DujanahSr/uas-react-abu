import React, { useState } from 'react';
import Header from '../../components/Header';
import { useData } from '../../context/DataContext';
import { formatPrice, formatDate, airlineStats, popularRoutes } from '../../data/mockData';
import {
  AiOutlineDollarCircle,
  AiOutlineCalendar,
  AiOutlineRise,
  AiOutlineBarChart,
  AiOutlineLineChart,
  AiOutlineDownload
} from 'react-icons/ai';
import { FaPlane } from 'react-icons/fa';

const AdminAnalytics = () => {
  const { bookings, flights } = useData();
  const [dateRange, setDateRange] = useState('month');

  // Calculate analytics
  const totalRevenue = bookings
    .filter(b => b.paymentStatus === 'Paid')
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const cancelledBookings = bookings.filter(b => b.status === 'Cancelled').length;

  const totalTickets = bookings.reduce((sum, b) => 
    sum + (b.passengers?.length || b.passengers || 1), 0
  );

  const averageBookingValue = totalBookings > 0 
    ? totalRevenue / totalBookings 
    : 0;

  // Revenue by airline
  const revenueByAirline = airlineStats.map(airline => ({
    ...airline,
    revenue: Math.round(totalRevenue * (airline.percentage / 100))
  }));

  // Bookings trend (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const bookingsTrend = last7Days.map(date => ({
    date,
    count: bookings.filter(b => b.bookingDate === date).length,
    revenue: bookings
      .filter(b => b.bookingDate === date && b.paymentStatus === 'Paid')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0)
  }));

  const maxCount = Math.max(...bookingsTrend.map(t => t.count), 1);
  const maxRevenue = Math.max(...bookingsTrend.map(t => t.revenue), 1);

  return (
    <div className="min-h-screen transition-colors bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Analitik & Laporan" 
        subtitle="Analisis data pemesanan dan pendapatan"
        onSearch={null}
      />
      
      <div className="p-4 md:p-6">
        {/* Date Range Selector */}
        <div className="mb-6">
          <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <span className="font-medium text-gray-700 dark:text-gray-300">Periode:</span>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Hari Ini</option>
              <option value="week">Minggu Ini</option>
              <option value="month">Bulan Ini</option>
              <option value="year">Tahun Ini</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(totalRevenue)}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">Total Revenue</div>
              </div>
              <AiOutlineDollarCircle size={32} className="text-green-500" />
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalBookings}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">Total Bookings</div>
              </div>
              <AiOutlineCalendar size={32} className="text-blue-500" />
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalTickets}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">Tiket Terjual</div>
              </div>
              <FaPlane size={32} className="text-purple-500" />
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(averageBookingValue)}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">Avg Booking Value</div>
              </div>
              <AiOutlineRise size={32} className="text-orange-500" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Bookings Trend */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <AiOutlineLineChart size={20} />
                Trend Pemesanan (7 Hari Terakhir)
              </h3>
            </div>
            <div className="space-y-4">
              {bookingsTrend.map((day, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(day.date)}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {day.count} booking
                    </span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className="h-4 bg-blue-600 rounded-full transition-all"
                      style={{ width: `${(day.count / maxCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Trend */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <AiOutlineBarChart size={20} />
                Trend Revenue (7 Hari Terakhir)
              </h3>
            </div>
            <div className="space-y-4">
              {bookingsTrend.map((day, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(day.date)}
                    </span>
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {formatPrice(day.revenue)}
                    </span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className="h-4 bg-green-600 rounded-full transition-all"
                      style={{ width: `${(day.revenue / maxRevenue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue by Airline */}
        <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FaPlane size={20} />
              Revenue by Airline
            </h3>
            <div className="space-y-4">
              {revenueByAirline.map((airline, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {airline.name}
                    </span>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {formatPrice(airline.revenue)}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className={`h-3 rounded-full ${airline.color}`}
                      style={{ width: `${airline.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Status Distribution */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
              Distribusi Status Booking
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Confirmed</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {confirmedBookings}
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="h-3 bg-green-500 rounded-full"
                    style={{ width: `${totalBookings > 0 ? (confirmedBookings / totalBookings) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Pending</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {pendingBookings}
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="h-3 bg-yellow-500 rounded-full"
                    style={{ width: `${totalBookings > 0 ? (pendingBookings / totalBookings) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Cancelled</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {cancelledBookings}
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="h-3 bg-red-500 rounded-full"
                    style={{ width: `${totalBookings > 0 ? (cancelledBookings / totalBookings) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Routes */}
        <div className="p-6 mt-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <AiOutlineRise size={20} />
              Top Routes
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600">
              <AiOutlineDownload size={16} />
              Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase dark:text-gray-300">
                    Rute
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase dark:text-gray-300">
                    Bookings
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase dark:text-gray-300">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {popularRoutes.map((route, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      {route.route}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {route.bookings}
                    </td>
                    <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400">
                      {formatPrice(route.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
