import React from 'react';
import StatCard from '../../components/StatCard';
import BookingForm from '../../components/BookingForm';
import FlightList from '../../components/FlightList';
import { 
  AiOutlineDollarCircle, 
  AiOutlineUser, 
  AiOutlineCalendar,
  AiOutlineRise
} from 'react-icons/ai';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Pemesanan',
      value: '1,245',
      change: 12.5,
      icon: <AiOutlineCalendar />,
      color: 'blue'
    },
    {
      title: 'Pendapatan',
      value: 'Rp 245M',
      change: 8.3,
      icon: <AiOutlineDollarCircle />,
      color: 'green'
    },
    {
      title: 'Pengguna Aktif',
      value: '4,321',
      change: 5.7,
      icon: <AiOutlineUser />,
      color: 'purple'
    },
    {
      title: 'Tiket Terjual',
      value: '8,567',
      change: 15.2,
      icon: <AiOutlineRise />,
      color: 'orange'
    },
  ];

  return (
    <div className="max-w-full overflow-hidden">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
      </div>

      {/* Booking Form */}
      <BookingForm onSearch={(filters) => {
          // Trigger search in FlightList
          const event = new CustomEvent('flightSearch', { detail: filters });
          window.dispatchEvent(event);
      }} />

      {/* Recent Flights */}
      <div className="p-6 mb-6 transition-colors bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
          <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white">Penerbangan Tersedia</h2>
        <FlightList />
      </div>

      {/* Recent Bookings */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="p-6 transition-colors bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
            <h3 className="mb-4 font-bold text-gray-800 dark:text-white">Pemesanan Terbaru</h3>
            <div className="space-y-4">
              {[1,2,3].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 transition-colors border border-gray-100 rounded-lg dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">GA-123 • Jakarta - Denpasar</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">John Doe • 2 Penumpang</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600 dark:text-blue-400">Rp 1,500,000</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">12 Nov 2024</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 transition-colors bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
            <h3 className="mb-4 font-bold text-gray-800 dark:text-white">Maskapai Terlaris</h3>
            <div className="space-y-4">
              {[
                { name: 'Garuda Indonesia', sales: 245, color: 'bg-blue-500' },
                { name: 'Lion Air', sales: 198, color: 'bg-red-500' },
                { name: 'AirAsia', sales: 156, color: 'bg-yellow-500' },
                { name: 'Citilink', sales: 132, color: 'bg-green-500' },
              ].map((airline, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800 dark:text-white">{airline.name}</span>
                    <span className="text-gray-600 dark:text-gray-300">{airline.sales} tiket</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-600">
                    <div 
                      className={`${airline.color} h-2 rounded-full`}
                      style={{ width: `${(airline.sales / 245) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
