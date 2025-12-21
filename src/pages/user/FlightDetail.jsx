import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../data/mockData';

const FlightDetail = () => {
  const { id } = useParams();
  const { flights, addBooking } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const flight = flights.find(f => f.id === id);
  if (!flight) return <div className="py-20 text-3xl text-center">Penerbangan tidak ditemukan</div>;

  const [passengers, setPassengers] = useState(1);
  const [contact, setContact] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: ''
  });

  const totalPrice = flight.price * passengers;

  const handleBooking = () => {
    if (!contact.name || !contact.email || !contact.phone) {
      alert('Lengkapi data kontak!');
      return;
    }

    const newBooking = {
      id: 'BK' + Date.now(),
      bookingCode: 'FBK' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      passengerName: contact.name,
      email: contact.email,
      phone: contact.phone,
      passengers,
      flightNumber: flight.flightNumber,
      airline: flight.airline,
      route: `${flight.from} → ${flight.to}`,
      departureDate: flight.departureDate,
      departureTime: flight.departureTime,
      totalPrice,
      status: 'Pending',
      paymentStatus: 'Pending',
      bookingDate: new Date().toISOString().split('T')[0],
      class: flight.class
    };

    addBooking(newBooking);
    navigate('/booking-success', { state: { booking: newBooking, flight } });
  };

  return (
    <div>
      <main className="px-4 py-8 mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Detail Flight */}
          <div className="lg:col-span-2">
            <div className="p-10 bg-white shadow-2xl dark:bg-gray-800 rounded-3xl">
              <div className="flex items-start justify-between mb-10">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{flight.airline}</h2>
                  <p className="text-2xl text-gray-600 dark:text-gray-400">{flight.flightNumber}</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(flight.price)}</div>
                  <div className="text-gray-600 dark:text-gray-400">per penumpang</div>
                </div>
              </div>

              <div className="grid grid-cols-3 py-10 text-center border-gray-200 border-y-2 dark:border-gray-700">
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{flight.departureTime}</div>
                  <div className="text-xl text-gray-600 dark:text-gray-300">{flight.from}</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-full h-1 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="mx-6 text-lg text-gray-500 dark:text-gray-400">✈ {flight.duration}</div>
                  <div className="w-full h-1 bg-gray-300 dark:bg-gray-600"></div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{flight.arrivalTime}</div>
                  <div className="text-xl text-gray-600 dark:text-gray-300">{flight.to}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-10">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Tanggal Keberangkatan</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{flight.departureDate}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Kelas</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{flight.class}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Kursi Tersedia</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{flight.availableSeats}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Status</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{flight.status}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="p-10 bg-white shadow-2xl dark:bg-gray-800 rounded-3xl h-fit">
            <h3 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Pesan Tiket</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">Jumlah Penumpang</label>
                <select
                  value={passengers}
                  onChange={e => setPassengers(Number(e.target.value))}
                  className="w-full px-5 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
                >
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Penumpang</option>)}
                </select>
              </div>

              <div>
                <label className="block mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
                <input
                  type="text"
                  value={contact.name}
                  onChange={e => setContact({...contact, name: e.target.value})}
                  className="w-full px-5 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
                  placeholder="Sesuai KTP"
                />
              </div>

              <div>
                <label className="block mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={e => setContact({...contact, email: e.target.value})}
                  className="w-full px-5 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">No. Telepon</label>
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={e => setContact({...contact, phone: e.target.value})}
                  className="w-full px-5 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div className="pt-8 border-t-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">Total Harga</span>
                  <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(totalPrice)}</span>
                </div>
                <button
                  onClick={handleBooking}
                  className="w-full py-5 text-2xl font-bold text-white transition-all shadow-2xl bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 hover:shadow-3xl"
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FlightDetail;