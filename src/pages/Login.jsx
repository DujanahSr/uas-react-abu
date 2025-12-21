import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    role: 'user', // default user
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser, loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError('Email dan password wajib diisi');
      setLoading(false);
      return;
    }

    if (formData.role === 'admin') {
      if (formData.email === 'admin@example.com' && formData.password === 'admin123') {
        loginAdmin({ role: 'admin', email: formData.email });
        navigate('/admin');
      } else {
        setError('Credential admin salah');
      }
    } else {
      // User: cek apakah sudah terdaftar
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = storedUsers.find(u => u.email === formData.email);

      if (existingUser) {
        if (existingUser.password === formData.password) {
          loginUser(existingUser);
          navigate('/');
        } else {
          setError('Password salah');
        }
      } else {
        setError('Email tidak terdaftar. Silakan daftar terlebih dahulu.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-10 bg-white border border-gray-200 shadow-2xl dark:bg-gray-800 rounded-3xl dark:border-gray-700">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-blue-600 rounded-full">
            <span className="text-4xl">✈️</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Selamat Datang di FlyBook</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Masuk atau daftar untuk melanjutkan</p>
        </div>

        {error && (
          <div className="p-4 mb-6 text-red-600 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-xl dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Pilih Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User (Pelanggan)</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={formData.role === 'admin' ? 'admin@example.com' : 'email@contoh.com'}
              className="w-full px-4 py-3 bg-white border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={formData.role === 'admin' ? 'admin123' : 'Masukkan password'}
              className="w-full px-4 py-3 bg-white border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 font-bold text-white transition-all shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:opacity-70"
          >
            {loading ? 'Memproses...' : formData.role === 'admin' ? 'Login Admin' : 'Login'}
          </button>
        </form>

        {formData.role === 'user' && (
          <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
            Belum punya akun?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">
              Daftar di sini
            </Link>
          </p>
        )}
        {formData.role === 'admin' && (
          <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
            Gunakan admin@example.com / admin123
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;