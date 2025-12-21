import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <main className="max-w-4xl px-4 py-12 mx-auto">
        <div className="p-12 bg-white shadow-2xl dark:bg-gray-800 rounded-3xl">
          <div className="flex flex-col items-center gap-12 mb-12 md:flex-row">
            <div className="flex items-center justify-center w-40 h-40 font-bold text-white rounded-full shadow-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-7xl">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{user?.name || 'User'}</h2>
              <p className="mt-2 text-2xl text-gray-600 dark:text-gray-400">{user?.email}</p>
              <p className="mt-2 text-lg text-gray-500 dark:text-gray-500">Member FlyBook sejak 2025</p>
            </div>
          </div>

          <div className="pt-12 border-t-2 border-gray-200 dark:border-gray-700">
            <h3 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Informasi Akun</h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <label className="block mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input type="email" value={user?.email} readOnly className="w-full px-6 py-4 text-lg bg-gray-100 dark:bg-gray-900 rounded-xl" />
              </div>
              <div>
                <label className="block mb-3 text-lg font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
                <input type="text" value={user?.name} readOnly className="w-full px-6 py-4 text-lg bg-gray-100 dark:bg-gray-900 rounded-xl" />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-12">
            <button
              onClick={logout}
              className="px-10 py-5 text-xl font-bold text-white transition-all bg-red-600 shadow-lg rounded-xl hover:bg-red-700 hover:shadow-xl"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;