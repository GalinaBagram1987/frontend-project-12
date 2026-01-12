import axios from 'axios';
import { BASE_URL } from './routes';
import { setupInterceptors } from './interceptors';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const apiWithIterceptors = setupInterceptors(axiosInstance);

export default apiWithIterceptors;
