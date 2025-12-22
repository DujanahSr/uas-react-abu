import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const UserLayout = () => {
  const { logout, user } = useAuth();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar User */}
      <Sidebar role="user" onLogout={logout} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <Header title="FlyBook" subtitle={`Halo, ${user?.name || user?.email || 'Pengguna'}`} />

        {/* Page Content - Add key to force re-render on route change */}
        <main key={location.pathname} className="flex-1 p-4 overflow-y-auto md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
