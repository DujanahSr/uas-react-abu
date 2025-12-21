// import React, { useState } from 'react';
// import Header from '../components/Header';

// const Settings = () => {
//   const [settings, setSettings] = useState({
//     email: 'admin@flybook.com',
//     notifications: {
//       newBooking: true,
//       paymentConfirmed: true,
//       flightChanges: false,
//       promotions: true,
//     },
//     language: 'id',
//     currency: 'IDR',
//     timezone: 'Asia/Jakarta',
//   });

//   const handleToggle = (key) => {
//     setSettings(prev => ({
//       ...prev,
//       notifications: {
//         ...prev.notifications,
//         [key]: !prev.notifications[key]
//       }
//     }));
//   };

//   return (
//     <div>
//       <Header 
//         title="Pengaturan" 
//         subtitle="Kelola preferensi dan pengaturan sistem" 
//       />
      
//       <main className="p-6">
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//           {/* Profile Settings */}
//           <div className="space-y-6 lg:col-span-2">
//             {/* General Settings */}
//             <div className="p-6 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
//               <h3 className="mb-6 font-bold text-gray-800">Pengaturan Umum</h3>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block mb-2 text-sm font-medium text-gray-700">Email Admin</label>
//                   <input
//                     type="email"
//                     value={settings.email}
//                     onChange={(e) => setSettings({...settings, email: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 text-sm font-medium text-gray-700">Bahasa</label>
//                   <select
//                     value={settings.language}
//                     onChange={(e) => setSettings({...settings, language: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="id">Bahasa Indonesia</option>
//                     <option value="en">English</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block mb-2 text-sm font-medium text-gray-700">Mata Uang</label>
//                   <select
//                     value={settings.currency}
//                     onChange={(e) => setSettings({...settings, currency: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="IDR">IDR - Rupiah Indonesia</option>
//                     <option value="USD">USD - US Dollar</option>
//                     <option value="SGD">SGD - Singapore Dollar</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block mb-2 text-sm font-medium text-gray-700">Zona Waktu</label>
//                   <select
//                     value={settings.timezone}
//                     onChange={(e) => setSettings({...settings, timezone: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
//                     <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
//                     <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Notification Settings */}
//             <div className="p-6 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
//               <h3 className="mb-6 font-bold text-gray-800">Pengaturan Notifikasi</h3>
              
//               <div className="space-y-4">
//                 {Object.entries(settings.notifications).map(([key, value]) => (
//                   <div key={key} className="flex items-center justify-between">
//                     <div>
//                       <p className="font-medium text-gray-800">
//                         {key === 'newBooking' && 'Pemesanan Baru'}
//                         {key === 'paymentConfirmed' && 'Pembayaran Dikonfirmasi'}
//                         {key === 'flightChanges' && 'Perubahan Jadwal'}
//                         {key === 'promotions' && 'Promosi & Diskon'}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         {key === 'newBooking' && 'Notifikasi saat ada pemesanan baru'}
//                         {key === 'paymentConfirmed' && 'Notifikasi saat pembayaran dikonfirmasi'}
//                         {key === 'flightChanges' && 'Notifikasi perubahan jadwal penerbangan'}
//                         {key === 'promotions' && 'Notifikasi promosi dan diskon terbaru'}
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => handleToggle(key)}
//                       className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
//                         value ? 'bg-blue-600' : 'bg-gray-300'
//                       }`}
//                     >
//                       <div className={`bg-white w-4 h-4 rounded-full transform transition-transform ${
//                         value ? 'translate-x-6' : 'translate-x-0'
//                       }`}></div>
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Side Panel */}
//           <div className="space-y-6">
//             {/* System Info */}
//             <div className="p-6 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
//               <h3 className="mb-4 font-bold text-gray-800">Informasi Sistem</h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Versi Aplikasi</span>
//                   <span className="font-medium">v2.1.0</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Database</span>
//                   <span className="font-medium">PostgreSQL 14</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Server Status</span>
//                   <span className="font-medium text-green-600">Online</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Terakhir Update</span>
//                   <span className="font-medium">12 Nov 2024</span>
//                 </div>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="p-6 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
//               <h3 className="mb-4 font-bold text-gray-800">Aksi</h3>
//               <div className="space-y-3">
//                 <button className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
//                   Simpan Perubahan
//                 </button>
//                 <button className="w-full px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
//                   Reset ke Default
//                 </button>
//                 <button className="w-full px-4 py-2 text-red-600 transition-colors border border-red-300 rounded-lg hover:bg-red-50">
//                   Hapus Cache
//                 </button>
//               </div>
//             </div>

//             {/* Support */}
//             <div className="p-6 shadow-sm bg-blue-50 rounded-xl dark:bg-gray-800">
//               <h3 className="mb-2 font-bold text-gray-800">Butuh Bantuan?</h3>
//               <p className="mb-4 text-sm text-gray-600">
//                 Hubungi tim support kami untuk bantuan lebih lanjut
//               </p>
//               <button className="w-full px-4 py-2 text-blue-600 transition-colors bg-white border border-blue-300 rounded-lg hover:bg-blue-50">
//                 Hubungi Support
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Settings;

import React, { useState } from 'react';
import Header from '../../components/Header';
import { useTheme } from '../../context/ThemeContext';
import {
  AiOutlineSave,
  AiOutlineReload,
  AiOutlineClear,
  AiOutlineQuestionCircle,
  AiOutlineMail,
  AiOutlineGlobal,
  AiOutlineDollar,
  AiOutlineClockCircle,
  AiOutlineBell,
  AiOutlineDatabase,
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineWarning,
  AiOutlineSetting,
  AiOutlineUser
} from 'react-icons/ai';
import { FaServer, FaCog } from 'react-icons/fa';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    email: 'admin@flybook.com',
    notifications: {
      newBooking: true,
      paymentConfirmed: true,
      flightChanges: false,
      promotions: true,
      systemAlerts: true,
      emailNotifications: false,
    },
    language: 'id',
    currency: 'IDR',
    timezone: 'Asia/Jakarta',
    theme: 'system',
    autoSave: true,
    dataRetention: 30,
  });

  const { isDark } = useTheme();

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleSaveChanges = () => {
    console.log('Settings saved:', settings);
    alert('Pengaturan berhasil disimpan!');
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan semua pengaturan ke default?')) {
      setSettings({
        email: 'admin@flybook.com',
        notifications: {
          newBooking: true,
          paymentConfirmed: true,
          flightChanges: false,
          promotions: true,
          systemAlerts: true,
          emailNotifications: false,
        },
        language: 'id',
        currency: 'IDR',
        timezone: 'Asia/Jakarta',
        theme: 'system',
        autoSave: true,
        dataRetention: 30,
      });
      alert('Pengaturan telah direset ke default!');
    }
  };

  const handleClearCache = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus cache aplikasi?')) {
      alert('Cache berhasil dihapus!');
    }
  };

  const cardClass = isDark 
    ? "bg-gray-800 border-gray-700" 
    : "bg-white border-gray-200";
  
  const inputClass = isDark 
    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" 
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500";
  
  const labelClass = isDark 
    ? "text-gray-300" 
    : "text-gray-700";
  
  const textClass = isDark 
    ? "text-gray-400" 
    : "text-gray-600";

  const notificationItems = [
    { key: 'newBooking', label: 'Pemesanan Baru', description: 'Notifikasi saat ada pemesanan baru', icon: <AiOutlineBell size={16} /> },
    { key: 'paymentConfirmed', label: 'Pembayaran Dikonfirmasi', description: 'Notifikasi saat pembayaran dikonfirmasi', icon: <AiOutlineCheckCircle size={16} /> },
    { key: 'flightChanges', label: 'Perubahan Jadwal', description: 'Notifikasi perubahan jadwal penerbangan', icon: <AiOutlineExclamationCircle size={16} /> },
    { key: 'promotions', label: 'Promosi & Diskon', description: 'Notifikasi promosi dan diskon terbaru', icon: <AiOutlineDollar size={16} /> },
    { key: 'systemAlerts', label: 'Alert Sistem', description: 'Notifikasi untuk alert sistem penting', icon: <AiOutlineWarning size={16} /> },
    { key: 'emailNotifications', label: 'Notifikasi Email', description: 'Kirim notifikasi melalui email', icon: <AiOutlineMail size={16} /> },
  ];

  const systemInfo = [
    { label: 'Versi Aplikasi', value: 'v2.1.0', icon: <AiOutlineSetting size={16} /> },
    { label: 'Database', value: 'PostgreSQL 14', icon: <AiOutlineDatabase size={16} /> },
    { label: 'Server Status', value: 'Online', status: 'success', icon: <FaServer size={16} /> },
    { label: 'Uptime', value: '99.8%', icon: <AiOutlineClockCircle size={16} /> },
    { label: 'Terakhir Update', value: '12 Nov 2024', icon: <AiOutlineClockCircle size={16} /> },
    { label: 'Sesi Aktif', value: '1', icon: <AiOutlineUser size={16} /> },
  ];

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Pengaturan" 
        subtitle="Kelola preferensi dan pengaturan sistem" 
      />
      
      <main className="p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Main Settings */}
          <div className="space-y-6 lg:col-span-2">
            {/* General Settings Card */}
            <div className={`${cardClass} rounded-xl shadow-sm p-6 border transition-all duration-300`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white">
                  <FaCog size={20} className="text-blue-500" />
                  Pengaturan Umum
                </h3>
                <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                  Wajib diisi
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className={`block text-sm font-medium ${labelClass} mb-2 flex items-center gap-2`}>
                    <AiOutlineMail size={14} />
                    Email Admin
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({...settings, email: e.target.value})}
                      className={`w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all ${inputClass}`}
                    />
                    <AiOutlineMail className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Email untuk notifikasi sistem
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${labelClass} mb-2 flex items-center gap-2`}>
                    <AiOutlineGlobal size={14} />
                    Bahasa
                  </label>
                  <div className="relative">
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({...settings, language: e.target.value})}
                      className={`w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all ${inputClass}`}
                    >
                      <option value="id">Bahasa Indonesia</option>
                      <option value="en">English</option>
                    </select>
                    <AiOutlineGlobal className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${labelClass} mb-2 flex items-center gap-2`}>
                    <AiOutlineDollar size={14} />
                    Mata Uang
                  </label>
                  <div className="relative">
                    <select
                      value={settings.currency}
                      onChange={(e) => setSettings({...settings, currency: e.target.value})}
                      className={`w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all ${inputClass}`}
                    >
                      <option value="IDR">IDR - Rupiah Indonesia</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="SGD">SGD - Singapore Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                    </select>
                    <AiOutlineDollar className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${labelClass} mb-2 flex items-center gap-2`}>
                    <AiOutlineClockCircle size={14} />
                    Zona Waktu
                  </label>
                  <div className="relative">
                    <select
                      value={settings.timezone}
                      onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                      className={`w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all ${inputClass}`}
                    >
                      <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                      <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                      <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                      <option value="UTC">UTC</option>
                    </select>
                    <AiOutlineClockCircle className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${labelClass} mb-2`}>
                    Tema Aplikasi
                  </label>
                  <select
                    value={settings.theme}
                    onChange={(e) => setSettings({...settings, theme: e.target.value})}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all ${inputClass}`}
                  >
                    <option value="system">Mengikuti Sistem</option>
                    <option value="light">Terang</option>
                    <option value="dark">Gelap</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${labelClass} mb-2`}>
                    Retensi Data (hari)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={settings.dataRetention}
                    onChange={(e) => setSettings({...settings, dataRetention: parseInt(e.target.value)})}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all ${inputClass}`}
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Jumlah hari data disimpan
                  </p>
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className={`block text-sm font-medium ${labelClass} mb-1`}>
                        Auto Save
                      </label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Otomatis simpan perubahan pengaturan
                      </p>
                    </div>
                    <button
                      onClick={() => setSettings(prev => ({...prev, autoSave: !prev.autoSave}))}
                      className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${
                        settings.autoSave ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <div className={`bg-white w-6 h-6 rounded-full transform transition-transform shadow ${
                        settings.autoSave ? 'translate-x-7' : 'translate-x-0'
                      }`}></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className={`${cardClass} rounded-xl shadow-sm p-6 border transition-all duration-300`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white">
                  <AiOutlineBell size={20} className="text-blue-500" />
                  Pengaturan Notifikasi
                </h3>
                <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                  {Object.values(settings.notifications).filter(v => v).length} aktif
                </span>
              </div>
              
              <div className="space-y-4">
                {notificationItems.map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          {item.label}
                        </p>
                        <p className={`text-sm ${textClass} mt-1`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle(item.key)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                        settings.notifications[item.key] ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <div className={`bg-white w-4 h-4 rounded-full transform transition-transform shadow ${
                        settings.notifications[item.key] ? 'translate-x-6' : 'translate-x-0'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Side Panel */}
          <div className="space-y-6">
            {/* System Info */}
            <div className={`${cardClass} rounded-xl shadow-sm p-6 border transition-all duration-300`}>
              <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-gray-800 dark:text-white">
                <FaServer size={20} className="text-blue-500" />
                Informasi Sistem
              </h3>
              <div className="space-y-3">
                {systemInfo.map((info, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      {info.icon}
                      <span className="text-sm text-gray-600 dark:text-gray-400">{info.label}</span>
                    </div>
                    <span className={`text-sm font-medium ${
                      info.status === 'success' ? 'text-green-600 dark:text-green-400' : 
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      {info.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className={`${cardClass} rounded-xl shadow-sm p-6 border transition-all duration-300`}>
              <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Aksi</h3>
              <div className="space-y-3">
                <button
                  onClick={handleSaveChanges}
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 text-white transition-all duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-md"
                >
                  <AiOutlineSave size={18} />
                  Simpan Perubahan
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 text-gray-700 transition-all duration-300 border border-gray-300 rounded-lg dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <AiOutlineReload size={18} />
                  Reset ke Default
                </button>
                <button
                  onClick={handleClearCache}
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 text-red-600 transition-all duration-300 border border-red-300 rounded-lg dark:border-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <AiOutlineClear size={18} />
                  Hapus Cache
                </button>
              </div>
            </div>

            {/* Support */}
            <div className={`${isDark ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-xl shadow-sm p-6 border ${isDark ? 'border-blue-800/30' : 'border-blue-100'} transition-all duration-300`}>
              <div className="flex items-start gap-3 mb-4">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-800/30' : 'bg-blue-100'}`}>
                  <AiOutlineQuestionCircle size={20} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">Butuh Bantuan?</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Hubungi tim support kami untuk bantuan lebih lanjut
                  </p>
                </div>
              </div>
              <button className="flex items-center justify-center w-full gap-2 px-4 py-3 text-blue-600 transition-all duration-300 bg-white border border-blue-300 rounded-lg dark:bg-gray-800 dark:text-blue-400 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <AiOutlineMail size={18} />
                Hubungi Support
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;