import React from 'react';
import BookingForm from '../../components/BookingForm';
import { useNavigate } from 'react-router-dom';
import { FaPlane, FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (filters) => {
    navigate('/search', { state: { filters } });
  };

  return (
    <div className="min-h-screen">

      <main className="px-4 py-8 mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-7xl dark:text-white">
            Terbang Lebih Murah,<br />Lebih Nyaman
          </h1>
          <p className="max-w-4xl mx-auto text-xl text-gray-700 md:text-2xl dark:text-gray-300">
            Bandingkan harga dari ratusan maskapai, dapatkan promo eksklusif, dan pesan tiket dalam hitungan detik.
          </p>
        </div>

        {/* Booking Form */}
        <div className="max-w-6xl mx-auto">
          <div className="p-8 bg-white border border-gray-200 shadow-2xl dark:bg-gray-800 rounded-3xl md:p-12 dark:border-gray-700">
            <h2 className="mb-8 text-2xl font-bold text-center text-gray-900 dark:text-white">
              Cari Penerbangan Terbaik Anda
            </h2>
            <BookingForm onSearch={handleSearch} />
          </div>
        </div>

        {/* Popular Routes */}
        <div className="mt-20">
          <h2 className="mb-12 text-4xl font-bold text-center text-gray-900 dark:text-white">
            Rute Populer Hari Ini
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { from: 'Jakarta (CGK)', to: 'Bali (DPS)', price: 'Rp 850.000' },
              { from: 'Jakarta (CGK)', to: 'Singapore (SIN)', price: 'Rp 1.200.000' },
              { from: 'Surabaya (SUB)', to: 'Bali (DPS)', price: 'Rp 650.000' },
            ].map((route, i) => (
              <div key={i} className="overflow-hidden transition-all bg-white shadow-lg dark:bg-gray-800 rounded-2xl hover:shadow-2xl">
                <div className="flex items-center justify-center h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
                  <FaPlane size={48} className="text-white" />
                </div>
                <div className="p-8 text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
                    <FaMapMarkerAlt size={20} />
                    {route.from}
                  </p>
                  <p className="my-2 text-lg text-gray-600 dark:text-gray-400">
                    <AiOutlineArrowRight className="inline" />
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
                    <FaMapMarkerAlt size={20} />
                    {route.to}
                  </p>
                  <p className="mt-6 text-3xl font-bold text-blue-600 dark:text-blue-400">{route.price}</p>
                  <button 
                    onClick={() => navigate('/search')}
                    className="px-8 py-4 mt-6 font-medium text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700 flex items-center gap-2 mx-auto"
                  >
                    Cari Sekarang
                    <AiOutlineArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;