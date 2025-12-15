import { io } from 'socket.io-client';

const getSocketUrl = () => {
  if (import.meta.env.PROD === 'development') {
    return 'http://localhost:5001'; // локальный сервер
  }
  return 'https://testslack2bagram.onrender.com'; // продакшен сервер
};
export const socket = io(getSocketUrl(), {
  transports: ['websocket'], // Используем только WebSocket (не long-polling)
  withCredentials: false, // Если не нужны куки/credentials
  autoConnect: true, // Автоматическое подключение
});

socket.on('connect', () => {
  console.log('WebSocket подключен, ID:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('WebSocket отключен:', reason);
});

socket.on('connect_error', (error) => {
  console.error('Ошибка подключения WebSocket:', error.message);
});
