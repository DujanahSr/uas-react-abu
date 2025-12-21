import React, { createContext, useContext, useState, useEffect } from 'react';
import { flightsData, bookingsData } from '../data/mockData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [flights, setFlights] = useState(flightsData);
  const [bookings, setBookings] = useState(bookingsData);

  useEffect(() => {
    const storedFlights = localStorage.getItem('flights');
    const storedBookings = localStorage.getItem('bookings');
    if (storedFlights) setFlights(JSON.parse(storedFlights));
    if (storedBookings) setBookings(JSON.parse(storedBookings));
  }, []);

  useEffect(() => {
    localStorage.setItem('flights', JSON.stringify(flights));
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [flights, bookings]);

  const addBooking = (newBooking) => {
    setBookings(prev => [...prev, { ...newBooking, id: 'BK' + (prev.length + 1).toString().padStart(3, '0') }]);
  };

  const updateBooking = (id, updatedBooking) => {
    setBookings(prev => prev.map(b => b.id === id ? updatedBooking : b));
  };

  const deleteBooking = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const addFlight = (newFlight) => {
    setFlights(prev => [...prev, { ...newFlight, id: 'FL' + (prev.length + 1).toString().padStart(3, '0') }]);
  };

  const updateFlight = (id, updatedFlight) => {
    setFlights(prev => prev.map(f => f.id === id ? updatedFlight : f));
  };

  const deleteFlight = (id) => {
    setFlights(prev => prev.filter(f => f.id !== id));
  };

  return (
    <DataContext.Provider value={{ flights, bookings, addBooking, updateBooking, deleteBooking, addFlight, updateFlight, deleteFlight }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);