import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { FaPlane, FaUser, FaShieldAlt } from "react-icons/fa";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";

const Login = () => {
  const [formData, setFormData] = useState({
    role: "user", // default user
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Memuat...");
  const { loginUser, loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Email dan password wajib diisi");
      setLoading(false);
      return;
    }

    if (formData.role === "admin") {
      if (
        formData.email === "admin@example.com" &&
        formData.password === "admin123"
      ) {
        loginAdmin({ role: "admin", email: formData.email });
        setLoadingMessage("Masuk ke Dashboard Admin...");
        setShowLoadingScreen(true);
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      } else {
        setError("Credential admin salah");
        setLoading(false);
      }
    } else {
      // User: cek apakah sudah terdaftar
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = storedUsers.find((u) => u.email === formData.email);

      if (existingUser) {
        if (existingUser.password === formData.password) {
          loginUser(existingUser);
          setLoadingMessage("Memuat halaman utama...");
          setShowLoadingScreen(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setError("Password salah");
          setLoading(false);
        }
      } else {
        setError("Email tidak terdaftar. Silakan daftar terlebih dahulu.");
        setLoading(false);
      }
    }
  };

  if (showLoadingScreen) {
    return <LoadingScreen message={loadingMessage} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-200 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md p-10 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-2xl dark:bg-gray-800/90 dark:border-gray-700 rounded-3xl relative z-10 transform transition-all duration-500 hover:scale-[1.02]">
        <div className="mb-8 text-center">
          <div className="relative flex items-center justify-center w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-ping opacity-20"></div>
            <div className="relative flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg">
              <FaPlane size={40} className="text-white animate-bounce" style={{ animationDuration: '2s' }} />
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
            Selamat Datang di FlyBook
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg">
            Masuk atau daftar untuk melanjutkan
          </p>
        </div>

        {error && (
          <div className="p-4 mb-6 text-red-600 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-xl dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <FaShieldAlt size={16} className="text-blue-600 dark:text-blue-400" />
              Pilih Role
            </label>
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="user">User (Pelanggan)</option>
                <option value="admin">Admin</option>
              </select>
              <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <AiOutlineMail size={16} className="text-blue-600 dark:text-blue-400" />
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={
                  formData.role === "admin"
                    ? "admin@example.com"
                    : "email@contoh.com"
                }
                className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
              <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <AiOutlineLock size={16} className="text-blue-600 dark:text-blue-400" />
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={
                  formData.role === "admin" ? "admin123" : "Masukkan password"
                }
                className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
              <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 font-bold text-white transition-all shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:opacity-70 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Memproses...
              </>
            ) : (
              <>
                <FaPlane size={18} />
                {formData.role === "admin" ? "Login Admin" : "Login"}
              </>
            )}
          </button>
        </form>

        {formData.role === "user" && (
          <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Daftar di sini
            </Link>
          </p>
        )}
        {formData.role === "admin" && (
          <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
            Gunakan admin@example.com / admin123
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
