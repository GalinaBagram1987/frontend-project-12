import { io } from 'socket.io-client';

export const SOCKET_URL = import.meta.env.PROD
  ? 'https://testslack2bagram.onrender.com' // Production URL
  : 'http://localhost:5001'; // Development URL

const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling'],
  autoConnect: false, // не подключаться автоматически
  withCredentials: true,
});

socket.on('connect', () => {
  console.log('Socket connected to:', SOCKET_URL);
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error.message);
  console.error('Подробности ошибки:', error);
});

socket.on('disconnect', (reason) => {
  console.log('Socket disconnected. Reason:', reason);
});

export default socket;
