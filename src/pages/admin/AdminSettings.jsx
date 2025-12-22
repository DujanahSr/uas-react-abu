import React, { useState } from "react";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import AlertModal from "../../components/AlertModal";
import {
  AiOutlineSetting,
  AiOutlineMail,
  AiOutlineBell,
  AiOutlineSave,
  AiOutlineGlobal,
  AiOutlineDollarCircle,
} from "react-icons/ai";

const AdminSettings = () => {
  const { admin } = useAuth();
  const [settings, setSettings] = useState({
    email: admin?.email || "admin@flybook.com",
    language: "id",
    currency: "IDR",
    timezone: "Asia/Jakarta",
    notifications: {
      newBooking: true,
      paymentConfirmed: true,
      flightChanges: false,
    },
  });
  const [alert, setAlert] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handleSave = () => {
    // Save settings - bisa ke localStorage atau API
    localStorage.setItem("adminSettings", JSON.stringify(settings));
    setAlert({
      isOpen: true,
      type: "success",
      title: "Berhasil!",
      message: "Pengaturan berhasil disimpan!",
    });
  };

  return (
    <div className="min-h-screen transition-colors bg-gray-50 dark:bg-gray-900">
      <Header
        title="Pengaturan"
        subtitle="Kelola preferensi dan pengaturan sistem"
        onSearch={null}
      />

      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* General Settings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <AiOutlineSetting size={20} />
                Pengaturan Umum
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <AiOutlineMail size={16} />
                    Email Admin
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) =>
                      setSettings({ ...settings, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <AiOutlineGlobal size={16} />
                    Bahasa
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      setSettings({ ...settings, language: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <AiOutlineDollarCircle size={16} />
                    Mata Uang
                  </label>
                  <select
                    value={settings.currency}
                    onChange={(e) =>
                      setSettings({ ...settings, currency: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="IDR">IDR - Rupiah Indonesia</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="SGD">SGD - Singapore Dollar</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Zona Waktu
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) =>
                      setSettings({ ...settings, timezone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                    <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                    <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <AiOutlineBell size={20} />
                Pengaturan Notifikasi
              </h3>

              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700"
                  >
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {key === "newBooking" && "Notifikasi Pemesanan Baru"}
                        {key === "paymentConfirmed" &&
                          "Notifikasi Pembayaran Dikonfirmasi"}
                        {key === "flightChanges" &&
                          "Notifikasi Perubahan Penerbangan"}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {key === "newBooking" &&
                          "Dapatkan notifikasi saat ada pemesanan baru"}
                        {key === "paymentConfirmed" &&
                          "Dapatkan notifikasi saat pembayaran dikonfirmasi"}
                        {key === "flightChanges" &&
                          "Dapatkan notifikasi saat ada perubahan jadwal"}
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle(key)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        value ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          value ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700 sticky top-4">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Simpan Pengaturan
              </h3>
              <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                Pastikan semua pengaturan sudah sesuai sebelum menyimpan.
              </p>
              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <AiOutlineSave size={18} />
                Simpan Pengaturan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Modal */}
      <AlertModal
        isOpen={alert.isOpen}
        onClose={() => setAlert({ ...alert, isOpen: false })}
        type={alert.type}
        title={alert.title}
        message={alert.message}
      />
    </div>
  );
};

export default AdminSettings;
