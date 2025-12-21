import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import FlightCard from '../../components/FlightCard';
import BookingForm from '../../components/BookingForm';
import { flightsData, searchFlights, formatPrice } from '../../data/mockData';

const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState('price');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    setFlights(flightsData);
    setFilteredFlights(flightsData);
  }, []);

  const handleSearch = (filters) => {
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      let results = searchFlights(filters);
      
      // Apply status filter
      if (filterStatus !== 'all') {
        results = results.filter(flight => flight.status.toLowerCase() === filterStatus);
      }
      
      // Apply sorting
      results.sort((a, b) => {
        switch (sortBy) {
          case 'price':
            return a.price - b.price;
          case 'duration':
            return parseInt(a.duration) - parseInt(b.duration);
          case 'departure':
            return a.departureTime.localeCompare(b.departureTime);
          default:
            return 0;
        }
      });
      
      setFilteredFlights(results);
      setIsSearching(false);
    }, 500);
  };


  const handleSort = (newSortBy) => {
    setSortBy(newSortBy);
    const sortedFlights = [...filteredFlights].sort((a, b) => {
      switch (newSortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        case 'departure':
          return a.departureTime.localeCompare(b.departureTime);
        default:
          return 0;
      }
    });
    setFilteredFlights(sortedFlights);
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    let results = [...flights];
    
    if (status !== 'all') {
      results = results.filter(flight => flight.status.toLowerCase() === status);
    }
    
    setFilteredFlights(results);
  };

  const handleSelectFlight = (flight) => {
    alert(`Penerbangan ${flight.flightNumber} dipilih!\n\nDetail:\n- Rute: ${flight.from} → ${flight.to}\n- Waktu: ${flight.departureTime} - ${flight.arrivalTime}\n- Harga: ${formatPrice(flight.price)}`);
  };

  const clearFilters = () => {
    setFilteredFlights(flightsData);
    setFilterStatus('all');
    setSortBy('price');
  };


  return (
    <div className="min-h-screen transition-colors bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Kelola Penerbangan" 
        subtitle="Kelola dan pantau semua penerbangan yang tersedia" 
      />
      
      <main className="p-6">
        {/* Search Form */}
        <div className="mb-6">
          <BookingForm onSearch={handleSearch} />
        </div>


        {/* Controls */}
        <div className="p-6 mb-6 transition-colors bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-700 dark:text-gray-300">Filter Status:</span>
              <div className="flex space-x-2">
                {[
                  { key: 'all', label: 'Semua' },
                  { key: 'tersedia', label: 'Tersedia' },
                  { key: 'hampir penuh', label: 'Hampir Penuh' },
                ].map((status) => (
                  <button
                    key={status.key}
                    onClick={() => handleStatusFilter(status.key)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filterStatus === status.key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-700 dark:text-gray-300">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="px-3 py-1 text-gray-800 transition-colors bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="price">Harga Terendah</option>
                <option value="duration">Durasi Terpendek</option>
                <option value="departure">Waktu Berangkat</option>
              </select>

              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 transition-colors border border-gray-300 rounded-lg dark:text-gray-300 hover:text-gray-800 dark:hover:text-white dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>


        {/* Results Summary */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {isSearching ? 'Mencari...' : `${filteredFlights.length} Penerbangan Ditemukan`}
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {filteredFlights.length > 0 && (
                <span>
                  Harga mulai dari {formatPrice(Math.min(...filteredFlights.map(f => f.price)))}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Flight List */}
        {isSearching ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-t-2 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            <span className="ml-4 text-gray-600 dark:text-gray-300">Mencari penerbangan...</span>
          </div>
        ) : filteredFlights.length > 0 ? (
          <div className="grid gap-6">
            {filteredFlights.map((flight) => (
              <FlightCard 
                key={flight.id} 
                flight={flight} 
                onSelect={handleSelectFlight}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="mb-4 text-6xl text-gray-400 dark:text-gray-500">✈️</div>
            <h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">Tidak ada penerbangan ditemukan</h3>
            <p className="mb-6 text-gray-500 dark:text-gray-400">Coba ubah kriteria pencarian atau filter Anda</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Tampilkan Semua Penerbangan
            </button>
          </div>
        )}

        {/* Quick Stats */}
        {filteredFlights.length > 0 && (
          <div className="p-6 mt-8 transition-colors border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl dark:border-blue-800">
            <h3 className="mb-4 font-bold text-gray-800 dark:text-white">Statistik Penerbangan</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {filteredFlights.filter(f => f.status === 'Tersedia').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Tersedia</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {filteredFlights.filter(f => f.status === 'Hampir Penuh').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Hampir Penuh</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatPrice(Math.min(...filteredFlights.map(f => f.price)))}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Harga Terendah</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {Math.round(filteredFlights.reduce((sum, f) => sum + f.availableSeats, 0) / filteredFlights.length)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Rata-rata Kursi</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminFlights;
