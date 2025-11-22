export const BASE_URL = import.meta.env.PROD
  ? 'https://testslackbagram.onrender.com' // Production URL
  : 'http://localhost:5001'; // Development URL

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/login',
    REGISTR: 'POST /api/v1/signup',
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
