import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatPrice } from '../../data/mockData';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, flight } = location.state || {};

  if (!booking || !flight) {
    return <div className="py-20 text-3xl text-center">Data booking tidak ditemukan</div>;
  }

  return (
    <div>
      <main className="max-w-5xl px-4 py-12 mx-auto">
        <div className="p-12 text-center bg-white shadow-2xl dark:bg-gray-800 rounded-3xl">
          <div className="mb-8 text-green-500 text-9xl">✓</div>
          <h1 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white">Selamat! Booking Sukses</h1>
          <p className="mb-10 text-2xl text-gray-600 dark:text-gray-400">
            Kode Booking: <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{booking.bookingCode}</span>
          </p>

          <div className="p-10 mb-12 bg-gray-50 dark:bg-gray-900 rounded-3xl">
            <h3 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Ringkasan Pemesanan</h3>
            <div className="grid grid-cols-1 gap-8 text-lg text-left md:grid-cols-2">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Maskapai & Nomor Flight</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{flight.airline} ({flight.flightNumber})</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Rute</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{flight.from} → {flight.to}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Tanggal & Waktu</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{flight.departureDate} • {flight.departureTime}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Penumpang</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{booking.passengers} orang • {booking.class}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Total Harga</p>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(booking.totalPrice)}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Status</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">Menunggu Pembayaran</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6 md:flex-row">
            <button onClick={() => navigate('/')} className="px-10 py-5 text-xl font-bold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700">
              Kembali ke Home
            </button>
            <button onClick={() => navigate('/my-bookings')} className="px-10 py-5 text-xl font-bold text-blue-600 transition-all border-2 border-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30">
              Lihat Riwayat Booking
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingSuccess;