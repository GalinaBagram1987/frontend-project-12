import { storage } from '../utils/localStorage.js';
import { store } from '../store/store.js';
import { logout } from '../store/authSlice.js';

export const setupInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = storage.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // Обрабатываем ошибки авторизации

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        storage.clearAuth();
        console.log('Cleared localStorage');
        try {
          store.dispatch(logout());
          console.log('Dispatched logout action');
        } catch (storeError) {
          console.warn('Could not dispatch logout:', storeError);
        }
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};
