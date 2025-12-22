import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import AlertModal from "../../components/AlertModal";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineClose,
} from "react-icons/ai";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [alert, setAlert] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  // Update formData ketika user berubah
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleSave = () => {
    // Validasi
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      setAlert({
        isOpen: true,
        type: "warning",
        title: "Form Belum Lengkap",
        message: "Semua field wajib diisi!",
      });
      return;
    }

    // Update user data menggunakan updateUser dari context
    updateUser(formData);
    setIsEditing(false);
    setAlert({
      isOpen: true,
      type: "success",
      title: "Berhasil!",
      message: "Profile berhasil diperbarui!",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-4xl px-4 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Profil Saya
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Kelola informasi profil Anda
          </p>
        </div>

        <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Informasi Profil
            </h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <AiOutlineEdit size={18} />
                Edit Profil
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <AiOutlineClose size={18} />
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                >
                  <AiOutlineSave size={18} />
                  Simpan
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <AiOutlineUser size={16} />
                Nama Lengkap
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg dark:bg-gray-700/50 text-gray-900 dark:text-white">
                  {user?.name || "-"}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <AiOutlineMail size={16} />
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg dark:bg-gray-700/50 text-gray-900 dark:text-white">
                  {user?.email || "-"}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <AiOutlinePhone size={16} />
                Nomor Telepon
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="08xxxxxxxxxx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg dark:bg-gray-700/50 text-gray-900 dark:text-white">
                  {user?.phone || "-"}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Alamat
              </label>
              {isEditing ? (
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg dark:bg-gray-700/50 text-gray-900 dark:text-white">
                  {user?.address || "-"}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

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

export default Profile;
