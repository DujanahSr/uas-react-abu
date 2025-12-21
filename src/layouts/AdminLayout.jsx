import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { logout, admin } = useAuth();

  // Jika admin null (bug), fallback
  if (!admin) {
    return <div className="p-8 text-center text-red-600">Error: Admin session invalid</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar role="admin" onLogout={logout} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header title="FlyBook Admin" subtitle={`Selamat datang, ${admin.email}`} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
