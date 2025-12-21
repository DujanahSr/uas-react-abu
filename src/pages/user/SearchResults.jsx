import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlightCard from '../../components/FlightCard';
import { useData } from '../../context/DataContext';

const SearchResults = () => {
  const location = useLocation();
  const { flights } = useData();
  const navigate = useNavigate();
  const filters = location.state?.filters || {};

  const filteredFlights = flights.filter(flight => {
    if (filters.from && !flight.from.includes(filters.from)) return false;
    if (filters.to && !flight.to.includes(filters.to)) return false;
    if (filters.departureDate && flight.departureDate !== filters.departureDate) return false;
    if (filters.class && flight.class.toLowerCase() !== filters.class.toLowerCase()) return false;
    if (filters.passengers && flight.availableSeats < parseInt(filters.passengers)) return false;
    return true;
  });

  const handleSelectFlight = (flight) => {
    navigate(`/flight/${flight.id}`);
  };

  return (
    <div>
      <main className="px-4 py-8 mx-auto max-w-7xl">
        {filteredFlights.length === 0 ? (
          <div className="py-32 text-center">
            <div className="mb-8 text-gray-300 text-9xl dark:text-gray-700">✈️</div>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Tidak ada penerbangan</h2>
            <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">Coba ubah tanggal atau rute pencarian</p>
            <button onClick={() => navigate('/')} className="px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700">
              Cari Lagi
            </button>
          </div>
        ) : (
          <div className="grid max-w-6xl gap-8 mx-auto">
            {filteredFlights.map(flight => (
              <FlightCard key={flight.id} flight={flight} onSelect={handleSelectFlight} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;