import { io } from 'socket.io-client';

const getSocketUrl = () => {
  if (import.meta.env.PROD === 'development') {
    return 'http://localhost:5001'; // локальный сервер
  }
  return 'https://testslackbagram.onrender.com/'; // продакшен сервер
};
const socket = io(getSocketUrl(), {
  transports: ['websocket'], // Используем только WebSocket (не long-polling)
  withCredentials: false, // Если не нужны куки/credentials
});
