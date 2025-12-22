import React from 'react';
import { AiOutlineClockCircle, AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';
import { FaPlane } from 'react-icons/fa';
import { formatPrice, getStatusBadge } from '../data/mockData';

const FlightCard = ({ flight, onSelect }) => {
  return (
    <div className="p-6 transition-shadow duration-300 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700 hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
            <span className="text-sm font-bold text-blue-600">
              {flight.flightNumber.split('-')[0]}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white">{flight.airline}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{flight.flightNumber}</p>
          </div>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(flight.status)}`}>
          {flight.status}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
        {/* Departure */}
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{flight.departureTime}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">{flight.from}</div>
          <div className="flex items-center justify-center mt-1 text-xs text-gray-500 dark:text-gray-400">
            <AiOutlineCalendar size={12} className="mr-1" />
            {flight.departureDate}
          </div>
        </div>

        {/* Flight Info */}
        <div className="text-center">
          <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">{flight.duration}</div>
          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
            <div className="relative z-10 flex items-center justify-center w-8 h-8 mx-auto bg-blue-600 rounded-full">
              <FaPlane size={14} className="text-white" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{flight.class}</div>
        </div>

        {/* Arrival */}
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{flight.arrivalTime}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">{flight.to}</div>
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            <AiOutlineClockCircle size={12} className="inline mr-1" />
            Estimasi
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <AiOutlineUser size={16} className="mr-1" />
            {flight.availableSeats} kursi tersedia
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{formatPrice(flight.price)}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">per orang</div>
          </div>
          
          <button
            onClick={() => onSelect && onSelect(flight)}
            className="px-6 py-2 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Pilih
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
