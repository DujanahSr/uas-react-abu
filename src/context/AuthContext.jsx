import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {role: 'user', email, name, password} or null
  const [admin, setAdmin] = useState(null); // {role: 'admin', email} or null
  const [users, setUsers] = useState([]); // Daftar user terdaftar (untuk registrasi)

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    const storedUser = localStorage.getItem('user');
    const storedAdmin = sessionStorage.getItem('adminSession');
    if (storedUsers) setUsers(JSON.parse(storedUsers));
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
  }, []);

  const loginUser = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const loginAdmin = (data) => {
    sessionStorage.setItem('adminSession', JSON.stringify(data));
    setAdmin(data);
  };

  const registerUser = (data) => {
    const newUsers = [...users, data];
    localStorage.setItem('users', JSON.stringify(newUsers));
    setUsers(newUsers);
    loginUser(data);
  };

  const logout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('adminSession');
    setUser(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ user, admin, users, loginUser, loginAdmin, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);