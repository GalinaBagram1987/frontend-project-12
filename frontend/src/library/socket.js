import { io } from 'socket.io-client';

// Определяем URL в зависимости от среды
const getSocketUrl = () => {
  // Vite использует import.meta.env.MODE, а не .PROD
  if (import.meta.env.MODE === 'development') {
    // Development URL
    return 'http://localhost:5001';
  }
  return 'https://testslack2bagram.onrender.com'; // Production URL
};

// Конфигурация для Render.com (только polling)
const socketConfig = {
  path: '/socket.io/',
  transports: ['polling'], // ТОЛЬКО polling для Render.com
  upgrade: false, // Запретить апгрейд до WebSocket
  forceNew: true, // Новое соединение
  withCredentials: false,
  autoConnect: true, // Автоподключение

  // Настройки реконнекта для Render.com
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 30000,
};

// Создаем единственный экземпляр socket
const socket = io(getSocketUrl(), socketConfig);

// Отладка
console.log('Socket configuration:');
console.log('URL:', getSocketUrl());
console.log('Mode:', import.meta.env.MODE);
console.log('Transports:', socketConfig.transports);

// События для отладки
socket.on('connect', () => {
  console.log('Socket connected via', socket.io.engine.transport.name);
  console.log('Socket ID:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('Socket disconnected:', reason);
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error.message);
});

// Экспортируем ЕДИНСТВЕННЫЙ экземпляр
export default socket;
