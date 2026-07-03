import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('zulkifrent_token');
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get('/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem('zulkifrent_token');
      })
      .finally(() => setLoading(false));
  }, []);

  function loginWithToken(token, userData) {
    localStorage.setItem('zulkifrent_token', token);
    setUser(userData);
  }

  async function login(email, password) {
    const res = await api.post('/auth/login', { email, password });
    loginWithToken(res.data.token, res.data.user);
    return res.data;
  }

  async function register(full_name, phone, email, password) {
    const res = await api.post('/auth/register', { full_name, phone, email, password });
    loginWithToken(res.data.token, res.data.user);
    return res.data;
  }

  function logout() {
    localStorage.removeItem('zulkifrent_token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loginWithToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
