import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getStoredToken, removeStoredToken, storeToken } from '../services/tokenStorage.js';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(() => (token ? { email: localStorage.getItem('chicdz-email') } : null));

  useEffect(() => {
    if (!token) {
      removeStoredToken();
    }
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        storeToken(response.data.token);
        localStorage.setItem('chicdz-email', response.data.email);
        setToken(response.data.token);
        setUser({ email: response.data.email });
      },
      logout: () => {
        removeStoredToken();
        localStorage.removeItem('chicdz-email');
        setToken(null);
        setUser(null);
      }
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
