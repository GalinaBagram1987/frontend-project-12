import { useState, useEffect } from 'react';
import { storage } from '../utils/localStorage';

export const useAut = () => {
  const [isAuthenticated, setAuthenticated] = useState(null);
  const [user, setUser] = useState(true);
  const [loading, setLoading] = useState(null);

  // Проверяем аутентификацию при загрузке
  useEffect(() => {
    const token = storage.getToken();
    const userData = storage.getUserData();

    if (token) {
      setAuthenticated(true);
      setUser(userData);
    }
    setLoading(false); // снимаем флаг загрузки
  }, []);

  // Логин
  const login = (token, userData) => {
    storage.setToken(token);
    storage.setUserData(userData);
    setAuthenticated(true);
    setUser(userData);
  };

  // Логаут
  const logout = () => {
    storage.clearAut();
    setAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };
};
