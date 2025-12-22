const isProduction = import.meta.env.PROD;
// const isDevelopment = import.meta.env.DEV;

export const BASE_URL = isProduction
  ? 'https://testslack2bagram.onrender.com' // Production URL
  : 'http://localhost:5002'; // Development URL

  export const SOCKET_URL = isProduction
  ? window.location.origin  // В продакшене тот же хост
  : 'http://localhost:5001';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/login',
    REGISTR: '/api/v1/signup',
  },
  CHAT: {
    GET_CHANNELS: '/api/v1/channels',
    ADD_CHANNEL: '/api/v1/channels',
    EDIT_CHANNEL: '/api/v1/channels/:id',
    REMOVE_CHANNEL: '/api/v1/channels/:id',
    GET_MESSAGE: '/api/v1/messages',
    ADD_MESSAGE: '/api/v1/messages',
    EDIT_MESSAGE: '/api/v1/messages/:id',
    REMOVE_MESSAGE: '/api/v1/messages/:id',
  },
};
