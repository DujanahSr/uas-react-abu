// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import AdminLoginPage from './pages/AdminLoginPage';
// import Dashboard from './pages/Dashboard';
// import Flights from './pages/Flights';
// import Bookings from './pages/Bookings';
// import Analytics from './pages/Analytics';
// import Settings from './pages/Settings';
// import Sidebar from './components/Sidebar';
// import { ThemeProvider } from './context/ThemeContext';

// import './index.css';

// // Protected Route
// const ProtectedRoute = ({ isLoggedIn, children }) => {
//   if (!isLoggedIn) return <Navigate to="/login" replace />;
//   return children;
// };

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [adminData, setAdminData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const session = sessionStorage.getItem('adminSession');
//     if (session) {
//       try {
//         const data = JSON.parse(session);
//         if (data.token?.startsWith('admin_token_')) {
//           setAdminData(data);
//           setIsLoggedIn(true);
//         } else {
//           sessionStorage.removeItem('adminSession');
//         }
//       } catch {
//         sessionStorage.removeItem('adminSession');
//       }
//     }
//     setTimeout(() => setIsLoading(false), 400);
//   }, []);

//   const handleLoginSuccess = (data) => {
//     sessionStorage.setItem('adminSession', JSON.stringify(data));
//     setAdminData(data);
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     if (confirm('Apakah Anda yakin ingin logout?')) {
//       sessionStorage.removeItem('adminSession');
//       setIsLoggedIn(false);
//       setAdminData(null);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-900">
//         <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <ThemeProvider>
//       <Router>
//         {isLoggedIn ? (
//           <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
//             <Sidebar adminData={adminData} onLogout={handleLogout} />

//             {/* MAIN CONTENT - DIPERBAIKI */}
//             <div className="flex flex-col flex-1 min-w-0"> {/* Tambah min-w-0 & flex-col */}
//               <main className="flex-1 p-6 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
//                 <Routes>
//                   <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Dashboard /></ProtectedRoute>} />
//                   <Route path="/flights" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Flights /></ProtectedRoute>} />
//                   <Route path="/bookings" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Bookings /></ProtectedRoute>} />
//                   <Route path="/analytics" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Analytics /></ProtectedRoute>} />
//                   <Route path="/settings" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Settings /></ProtectedRoute>} />
//                   <Route path="/login" element={<Navigate to="/" replace />} />
//                 </Routes>
//               </main>
//             </div>
//           </div>
//         ) : (
//           <Routes>
//             <Route path="/login" element={<AdminLoginPage onLoginSuccess={handleLoginSuccess} />} />
//             <Route path="*" element={<Navigate to="/login" replace />} />
//           </Routes>
//         )}
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Login & Register
import Login from './pages/Login';
import Register from './pages/Register';

// User Pages
import Home from './pages/user/Home';
import SearchResults from './pages/user/SearchResults';
import FlightDetail from './pages/user/FlightDetail';
import BookingSuccess from './pages/user/BookingSuccess';
import MyBookings from './pages/user/MyBookings';
import Profile from './pages/user/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminFlights from './pages/admin/AdminFlights';
import AdminBookings from './pages/admin/AdminBookings';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import './index.css';

// Protected Route User
const ProtectedUser = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// Protected Route Admin
const ProtectedAdmin = ({ children }) => {
  const { admin } = useAuth();
  if (!admin) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected User Routes */}
              <Route element={<ProtectedUser><UserLayout /></ProtectedUser>}>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/flight/:id" element={<FlightDetail />} />
                <Route path="/booking-success" element={<BookingSuccess />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* ADMIN ROUTES - VERSI BENAR (NESTED) */}
              <Route path="/admin" element={<ProtectedAdmin><AdminLayout /></ProtectedAdmin>}>
                <Route index element={<AdminDashboard />} /> {/* /admin → Dashboard */}
                <Route path="flights" element={<AdminFlights />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;