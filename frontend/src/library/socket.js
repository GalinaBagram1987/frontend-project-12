import { io } from 'socket.io-client';
import { BASE_URL } from '../api/routes';

// Конфигурация для Render.com (только polling)
const socketConfig = {
  path: '/socket.io',
  transports: ['websocket', 'polling'],
  // upgrade: false, // Запретить апгрейд до WebSocket
  forceNew: true, // Новое соединение
  withCredentials: false,
  autoConnect: true, // Автоподключение

  // Настройки реконнекта для Render.com
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  randomizationFactor: 0.5,
  timeout: 20000,
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
  if (reason === 'io server disconnect' || reason === 'io client disconnect') {
    // Сервер явно отключил нас. Нужно переподключить вручную.
    socket.connect();
  }
});

socket.on('reconnect_attempt', (attemptNumber) => {
  console.log(`Попытка переподключения #${attemptNumber}`);
});

socket.on('reconnect', (attemptNumber) => {
  console.log(`Успешно переподключились после ${attemptNumber} попыток`);
  // Можно повторно подписаться на комнаты или отправить синхронизирующий запрос
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error.message);
  socket.connect();
});

// Экспортируем ЕДИНСТВЕННЫЙ экземпляр
export default socket;
