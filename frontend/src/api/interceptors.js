import { storage } from '../utils/localStorage';

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
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};
