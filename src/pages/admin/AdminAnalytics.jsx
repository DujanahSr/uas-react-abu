import React from 'react';
import Header from '../../components/Header';
import { AiOutlineRise, AiOutlineFall } from 'react-icons/ai';

const AdminAnalytics = () => {
  const revenueData = [
    { month: 'Jan', revenue: 45, bookings: 120 },
    { month: 'Feb', revenue: 52, bookings: 145 },
    { month: 'Mar', revenue: 48, bookings: 138 },
    { month: 'Apr', revenue: 61, bookings: 165 },
    { month: 'May', revenue: 55, bookings: 152 },
    { month: 'Jun', revenue: 68, bookings: 180 },
    { month: 'Jul', revenue: 72, bookings: 195 },
    { month: 'Aug', revenue: 65, bookings: 178 },
    { month: 'Sep', revenue: 70, bookings: 188 },
    { month: 'Oct', revenue: 75, bookings: 205 },
    { month: 'Nov', revenue: 80, bookings: 220 },
    { month: 'Dec', revenue: 85, bookings: 235 },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
  const maxBookings = Math.max(...revenueData.map(d => d.bookings));

  return (
    <div>
      <Header 
        title="Analitik" 
        subtitle="Analisis data dan performa pemesanan tiket" 
      />
      
      <main className="p-6">
        {/* Chart Section */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
          {/* Revenue Chart */}
          <div className="p-8 transition-all bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700">
            <h3 className="mb-8 text-2xl font-bold text-gray-800 dark:text-white">Pendapatan Bulanan (dalam juta)</h3>
            <div className="flex items-end justify-between px-4 h-80">
              {revenueData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full transition-all rounded-t-lg shadow-md max-w-16 bg-gradient-to-t from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
                    style={{ height: `${(data.revenue / maxRevenue) * 260}px` }}
                  ></div>
                  <div className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-300">{data.month}</div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{data.revenue}M</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bookings Chart */}
          <div className="p-8 transition-all bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700">
            <h3 className="mb-8 text-2xl font-bold text-gray-800 dark:text-white">Jumlah Pemesanan</h3>
            <div className="flex items-end justify-between px-4 h-80">
              {revenueData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full transition-all rounded-t-lg shadow-md max-w-16 bg-gradient-to-t from-green-600 to-green-400 hover:from-green-700 hover:to-green-500"
                    style={{ height: `${(data.bookings / maxBookings) * 260}px` }}
                  ></div>
                  <div className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-300">{data.month}</div>
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">{data.bookings}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-8 mb-10 md:grid-cols-3">
          <div className="p-8 transition-shadow bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700 hover:shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-gray-800 dark:text-white">Rata-rata Tiket</h4>
              <AiOutlineRise className="text-green-500" size={32} />
            </div>
            <p className="mb-2 text-4xl font-bold text-gray-800 dark:text-white">Rp 1.2M</p>
            <p className="text-lg font-medium text-green-600 dark:text-green-400">+12.5% dari bulan lalu</p>
          </div>

          <div className="p-8 transition-shadow bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700 hover:shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-gray-800 dark:text-white">Tingkat Pembatalan</h4>
              <AiOutlineFall className="text-red-500" size={32} />
            </div>
            <p className="mb-2 text-4xl font-bold text-gray-800 dark:text-white">3.2%</p>
            <p className="text-lg font-medium text-green-600 dark:text-green-400">-0.8% dari bulan lalu</p>
          </div>

          <div className="p-8 transition-shadow bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700 hover:shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-gray-800 dark:text-white">Kepuasan Pelanggan</h4>
              <AiOutlineRise className="text-green-500" size={32} />
            </div>
            <p className="mb-2 text-4xl font-bold text-gray-800 dark:text-white">94.7%</p>
            <p className="text-lg font-medium text-green-600 dark:text-green-400">+2.1% dari bulan lalu</p>
          </div>
        </div>

        {/* Flight Performance Table */}
        <div className="overflow-hidden bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700">
          <div className="p-8">
            <h3 className="mb-8 text-2xl font-bold text-gray-800 dark:text-white">Performa Rute Populer</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-8 py-5 text-sm font-semibold tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">Rute</th>
                  <th className="px-8 py-5 text-sm font-semibold tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">Tiket Terjual</th>
                  <th className="px-8 py-5 text-sm font-semibold tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">Pendapatan</th>
                  <th className="px-8 py-5 text-sm font-semibold tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">Okupansi</th>
                  <th className="px-8 py-5 text-sm font-semibold tracking-wider text-left text-gray-700 uppercase dark:text-gray-300">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { route: 'Jakarta - Denpasar', sold: 245, revenue: '367.5M', occupancy: '92%', rating: '4.8' },
                  { route: 'Jakarta - Surabaya', sold: 198, revenue: '158.4M', occupancy: '88%', rating: '4.6' },
                  { route: 'Jakarta - Singapore', sold: 156, revenue: '187.2M', occupancy: '85%', rating: '4.7' },
                  { route: 'Jakarta - Yogyakarta', sold: 132, revenue: '99M', occupancy: '82%', rating: '4.5' },
                  { route: 'Jakarta - Makassar', sold: 98, revenue: '176.4M', occupancy: '78%', rating: '4.4' },
                ].map((data, index) => (
                  <tr key={index} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-8 py-6 font-medium text-gray-800 dark:text-white">{data.route}</td>
                    <td className="px-8 py-6 text-gray-700 dark:text-gray-300">{data.sold}</td>
                    <td className="px-8 py-6 font-bold text-blue-600 dark:text-blue-400">{data.revenue}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className="w-32 h-3 mr-3 bg-gray-200 rounded-full dark:bg-gray-700">
                          <div 
                            className="h-3 transition-all rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                            style={{ width: data.occupancy }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{data.occupancy}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <span className="mr-3 font-bold text-gray-800 dark:text-white">{data.rating}</span>
                        <div className="flex text-yellow-500">
                          {'★'.repeat(Math.floor(parseFloat(data.rating)))}
                          {'☆'.repeat(5 - Math.floor(parseFloat(data.rating)))}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAnalytics;