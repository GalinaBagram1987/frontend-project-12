import { io } from 'socket.io-client';

const getSocketUrl = () => {
  if (import.meta.env.PROD === 'development') {
    return 'http://localhost:5001'; // локальный сервер
  }
  return 'https://testslack2bagram.onrender.com'; // продакшен сервер
};
export const socket = io(getSocketUrl(), {
  transports: ['polling', 'websocket'],
  withCredentials: false, // Если не нужны куки/credentials
  autoConnect: true, // Автоматическое подключение

  // реконнект настройки:
  reconnection: true,
  reconnectionAttempts: Infinity, // Бесконечные попытки
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,

  timeout: 20000,
});

socket.on('connect', () => {
  console.log('WebSocket подключен, ID:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('WebSocket отключен:', reason);
  if (reason === 'io server disconnect') {
    // Сервер намеренно разорвал соединение
    socket.connect();
  }
});

socket.on('connect_error', (error) => {
  console.error('Ошибка подключения WebSocket:', error.message);
});
