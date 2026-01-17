import { io } from 'socket.io-client';
import { SOCKET_URL } from '../api/routes.js';

// Конфигурация для Render.com (только polling)
const socketConfig = {
  transports: ['polling'],
  upgrade: false, // Запретить апгрейд до WebSocket
  withCredentials: false,
  autoConnect: true, // Автоподключение

  // Настройки реконнекта для Render.com
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  randomizationFactor: 0.5, // Добавить случайность к задержке

  // Таймауты для Render
  timeout: 5000,
  pingTimeout: 60000,
  pingInterval: 25000,
};

// Создаем единственный экземпляр socket
const socket = io(SOCKET_URL, socketConfig);

// Отладка
console.log('Socket configuration:');
console.log('URL:', SOCKET_URL);
console.log('Mode:', import.meta.env.MODE);
console.log('Transports:', socketConfig.transports);

socket.on('newMessage', (message) => {
  console.log('Получено сообщение:', message.body);
  console.log('Добавляю в currentMessages');
  setCurrentMessages(prev => [...prev, message]);
});

// // События для отладки
// socket.on('connect', () => {
//   console.log('Socket connected via', socket.io.engine.transport.name);
//   console.log('Socket ID:', socket.id);
// });

// socket.on('disconnect', (reason) => {
//   console.log('Socket disconnected:', reason);
//   if (reason === 'io server disconnect' || reason === 'io client disconnect' || reason === 'transport close' || reason === 'ping timeout') {
//     // Сервер явно отключил нас. Нужно переподключить вручную.
//     setTimeout(() => socket.connect(), 1000);
//   }
// });

// socket.on('reconnect_attempt', (attemptNumber) => {
//   console.log(`Попытка переподключения #${attemptNumber}`);
// });

// socket.on('reconnect', (attemptNumber) => {
//   console.log(`Успешно переподключились после ${attemptNumber} попыток`);
//   // Можно повторно подписаться на комнаты или отправить синхронизирующий запрос
// });

// socket.on('connect_error', (error) => {
//   console.error('Socket connection error:', error.message);
//   socket.connect();
// });

// Экспортируем ЕДИНСТВЕННЫЙ экземпляр
export default socket;
