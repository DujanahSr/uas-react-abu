// Data mock untuk aplikasi booking tiket pesawat
export const flightsData = [
  {
    id: 'FL001',
    flightNumber: 'GA-123',
    airline: 'Garuda Indonesia',
    from: 'Jakarta (CGK)',
    to: 'Denpasar (DPS)',
    departureTime: '08:00',
    arrivalTime: '11:30',
    departureDate: '2025-12-23',
    price: 1200000,
    duration: '3j 30m',
    class: 'Ekonomi',
    availableSeats: 24,
    status: 'Tersedia'
  },
  {
    id: 'FL002',
    flightNumber: 'ID-456',
    airline: 'Lion Air',
    from: 'Jakarta (CGK)',
    to: 'Surabaya (SUB)',
    departureTime: '09:15',
    arrivalTime: '10:45',
    departureDate: '2025-12-29',
    price: 650000,
    duration: '1j 30m',
    class: 'Ekonomi',
    availableSeats: 45,
    status: 'Tersedia'
  },
  {
    id: 'FL003',
    flightNumber: 'AK-789',
    airline: 'AirAsia',
    from: 'Jakarta (CGK)',
    to: 'Singapore (SIN)',
    departureTime: '14:20',
    arrivalTime: '16:10',
    departureDate: '2024-12-15',
    price: 850000,
    duration: '1j 50m',
    class: 'Ekonomi',
    availableSeats: 12,
    status: 'Hampir Penuh'
  },
  {
    id: 'FL004',
    flightNumber: 'GA-456',
    airline: 'Garuda Indonesia',
    from: 'Surabaya (SUB)',
    to: 'Jakarta (CGK)',
    departureTime: '12:30',
    arrivalTime: '14:00',
    departureDate: '2024-12-15',
    price: 700000,
    duration: '1j 30m',
    class: 'Ekonomi',
    availableSeats: 38,
    status: 'Tersedia'
  },
  {
    id: 'FL005',
    flightNumber: 'ID-789',
    airline: 'Lion Air',
    from: 'Denpasar (DPS)',
    to: 'Jakarta (CGK)',
    departureTime: '16:45',
    arrivalTime: '18:15',
    departureDate: '2025-12-27',
    price: 1100000,
    duration: '1j 30m',
    class: 'Ekonomi',
    availableSeats: 52,
    status: 'Tersedia'
  },
  {
    id: 'FL006',
    flightNumber: 'AK-123',
    airline: 'AirAsia',
    from: 'Medan (KNO)',
    to: 'Jakarta (CGK)',
    departureTime: '07:30',
    arrivalTime: '10:00',
    departureDate: '2024-12-15',
    price: 950000,
    duration: '2j 30m',
    class: 'Ekonomi',
    availableSeats: 28,
    status: 'Tersedia'
  }
];

export const bookingsData = [
  {
    id: 'BK001',
    bookingCode: 'FBK12345',
    passengerName: 'John Doe',
    email: 'john@example.com',
    phone: '081234567890',
    flightNumber: 'GA-123',
    airline: 'Garuda Indonesia',
    route: 'Jakarta → Denpasar',
    departureDate: '2024-12-15',
    departureTime: '08:00',
    passengers: 2,
    totalPrice: 2400000,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    bookingDate: '2024-11-20',
    class: 'Ekonomi'
  },
  {
    id: 'BK002',
    bookingCode: 'FBK67890',
    passengerName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '081234567891',
    flightNumber: 'ID-456',
    airline: 'Lion Air',
    route: 'Jakarta → Surabaya',
    departureDate: '2024-12-15',
    departureTime: '09:15',
    passengers: 1,
    totalPrice: 650000,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    bookingDate: '2024-11-21',
    class: 'Ekonomi'
  },
  {
    id: 'BK003',
    bookingCode: 'FBK13579',
    passengerName: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '081234567892',
    flightNumber: 'AK-789',
    airline: 'AirAsia',
    route: 'Jakarta → Singapore',
    departureDate: '2024-12-15',
    departureTime: '14:20',
    passengers: 3,
    totalPrice: 2550000,
    status: 'Pending',
    paymentStatus: 'Pending',
    bookingDate: '2024-11-22',
    class: 'Ekonomi'
  }
];

export const airlineStats = [
  { name: 'Garuda Indonesia', sales: 245, color: 'bg-blue-500', percentage: 100 },
  { name: 'Lion Air', sales: 198, color: 'bg-red-500', percentage: 80.8 },
  { name: 'AirAsia', sales: 156, color: 'bg-yellow-500', percentage: 63.7 },
  { name: 'Citilink', sales: 132, color: 'bg-green-500', percentage: 53.9 },
];

export const popularRoutes = [
  {
    route: 'Jakarta - Denpasar',
    bookings: 125,
    revenue: 150000000
  },
  {
    route: 'Jakarta - Surabaya',
    bookings: 98,
    revenue: 63700000
  },
  {
    route: 'Jakarta - Singapore',
    bookings: 87,
    revenue: 73950000
  },
  {
    route: 'Jakarta - Medan',
    bookings: 76,
    revenue: 72200000
  }
];

// Fungsi helper untuk filtering flights
export const searchFlights = (filters) => {
  let filtered = [...flightsData];
  
  if (filters.from) {
    filtered = filtered.filter(flight => flight.from.includes(filters.from));
  }
  
  if (filters.to) {
    filtered = filtered.filter(flight => flight.to.includes(filters.to));
  }
  
  if (filters.departureDate) {
    filtered = filtered.filter(flight => flight.departureDate === filters.departureDate);
  }
  
  if (filters.class) {
    filtered = filtered.filter(flight => flight.class.toLowerCase() === filters.class.toLowerCase());
  }
  
  if (filters.passengers) {
    filtered = filtered.filter(flight => flight.availableSeats >= parseInt(filters.passengers));
  }
  
  return filtered;
};

// Fungsi helper untuk format harga
export const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

// Fungsi helper untuk format tanggal
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Fungsi helper untuk mendapatkan status badge
export const getStatusBadge = (status) => {
  const statusClasses = {
    'Tersedia': 'bg-green-100 text-green-800',
    'Hampir Penuh': 'bg-yellow-100 text-yellow-800',
    'Penuh': 'bg-red-100 text-red-800',
    'Confirmed': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Cancelled': 'bg-red-100 text-red-800'
  };
  
  return statusClasses[status] || 'bg-gray-100 text-gray-800';
};
