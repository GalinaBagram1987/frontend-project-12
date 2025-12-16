import { io } from 'socket.io-client';
import { BASE_URL } from '../api/routes';

// Конфигурация для Render.com (только polling)
const socketConfig = {
  path: '/socket.io',
  transports: ['polling', 'websocket'],
  // upgrade: false, // Запретить апгрейд до WebSocket
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
const socket = io(BASE_URL, socketConfig);

// Отладка
console.log('Socket configuration:');
console.log('URL:', BASE_URL);
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
