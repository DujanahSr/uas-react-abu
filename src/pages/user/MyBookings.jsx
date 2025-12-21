import React from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice, formatDate, getStatusBadge } from '../../data/mockData';

const MyBookings = () => {
  const { bookings } = useData();
  const { user } = useAuth();

  const userBookings = bookings.filter(b => b.email === user?.email);

  return (
    <div>
      <main className="max-w-6xl px-4 py-8 mx-auto">
        {userBookings.length === 0 ? (
          <div className="py-32 text-center">
            <div className="mb-8 text-gray-300 text-9xl dark:text-gray-700">📋</div>
            <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">Belum ada booking</h2>
            <p className="mb-10 text-xl text-gray-600 dark:text-gray-400">Mulai cari tiket dan pesan sekarang!</p>
            <button onClick={() => window.location.href = '/'} className="px-10 py-5 text-xl font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700">
              Cari Tiket Pesawat
            </button>
          </div>
        ) : (
          <div className="grid gap-8">
            {userBookings.map(booking => (
              <div key={booking.id} className="p-10 bg-white shadow-2xl dark:bg-gray-800 rounded-3xl">
                <div className="flex flex-col items-start justify-between gap-8 lg:flex-row">
                  <div className="flex-1">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">{booking.bookingCode}</div>
                      <div className="flex gap-3">
                        <span className={`px-5 py-2 rounded-full text-sm font-bold ${getStatusBadge(booking.status)}`}>
                          {booking.status}
                        </span>
                        <span className={`px-5 py-2 rounded-full text-sm font-bold ${getStatusBadge(booking.paymentStatus)}`}>
                          {booking.paymentStatus}
                        </span>
                      </div>
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                      {booking.flightNumber} • {booking.airline}
                    </h3>
                    <p className="text-xl text-gray-700 dark:text-gray-300">{booking.route}</p>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                      {booking.departureDate} • {booking.departureTime} • {booking.passengers} penumpang • {booking.class}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(booking.totalPrice)}</div>
                    <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                      Dipesan pada {formatDate(booking.bookingDate)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyBookings;