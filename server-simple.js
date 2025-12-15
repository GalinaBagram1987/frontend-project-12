// server-simple.js - БЕЗ http-proxy-middleware
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5001;

// Запуск Hexlet сервера если в production
if (process.env.NODE_ENV === 'production') {
  const { spawn } = require('child_process');

  console.log('🚀 Starting Hexlet server...');
  const hexletProcess = spawn('npx', ['start-server', '--port', HEXLET_PORT.toString()], {
    stdio: 'inherit',
    detached: true,
  });

  hexletProcess.on('error', (err) => {
    console.error('Failed to start Hexlet:', err);
  });

  // Убить при завершении
  process.on('exit', () => {
    if (hexletProcess) {
      hexletProcess.kill();
    }
  });
}

// ------ CORS ------
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://testslack2bagram.onrender.com' : ['http://localhost:5002', 'http://localhost:5173'],
    credentials: true,
  })
);

app.use(express.json());

// ------ HEALTH CHECK ------
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'simple-server',
    port: PORT,
    timestamp: new Date().toISOString(),
  });
});

// ------ SOCKET.IO ------
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  path: '/socket.io/',
  transports: ['websocket', 'polling'],
});

// Хранилище сообщений
const messages = [];

io.on('connection', (socket) => {
  console.log('✅ Client connected:', socket.id);

  // Отправляем историю сообщений новому клиенту
  socket.emit('messageHistory', { messages: messages.slice(-50) });

  socket.emit('connected', {
    id: socket.id,
    message: 'Connected to chat server',
    timestamp: new Date().toISOString(),
  });

  // Новое сообщение
  socket.on('newMessage', (data) => {
    console.log('New message from', socket.id, ':', data);

    const message = {
      id: Date.now(),
      ...data,
      socketId: socket.id,
      timestamp: new Date().toISOString(),
    };

    // Сохраняем
    messages.push(message);
    if (messages.length > 1000) messages.shift(); // ограничиваем историю

    // Рассылаем всем
    io.emit('message', message);
  });

  // Пинг-понг для проверки соединения
  socket.on('ping', () => {
    socket.emit('pong', { timestamp: new Date().toISOString() });
  });

  socket.on('disconnect', (reason) => {
    console.log('❌ Client disconnected:', socket.id, reason);
  });
});

// ------ СТАТИЧЕСКИЕ ФАЙЛЫ ------
if (process.env.NODE_ENV === 'production') {
  const fs = require('fs');

  // Ищем собранный фронтенд
  const possiblePaths = [path.join(__dirname, 'dist'), path.join(__dirname, 'build'), path.join(__dirname, 'frontend/dist'), path.join(__dirname, 'frontend/build')];

  let staticPath = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p) && fs.existsSync(path.join(p, 'index.html'))) {
      staticPath = p;
      console.log(`📁 Serving static files from: ${staticPath}`);
      break;
    }
  }

  if (staticPath) {
    app.use(express.static(staticPath));

    // SPA маршрутизация
    app.get('*', (req, res) => {
      // Пропускаем API и WebSocket
      if (req.url.startsWith('/api/') || req.url.startsWith('/socket.io')) {
        return res.status(404).json({ error: 'Not found' });
      }
      res.sendFile(path.join(staticPath, 'index.html'));
    });
  } else {
    console.error('❌ Static files not found!');
    app.get('/', (req, res) => {
      res.json({
        error: 'Frontend not built',
        instruction: 'Run: npm run build',
        checkedPaths: possiblePaths,
      });
    });
  }
} else {
  // Development информация
  app.get('/', (req, res) => {
    res.json({
      message: 'Simple Chat Server',
      endpoints: {
        login: 'POST /api/v1/login',
        users: 'GET /api/v1/users',
        channels: 'GET /api/v1/channels',
        health: 'GET /health',
        socket: '/socket.io',
      },
      socketEvents: {
        connect: 'auto',
        newMessage: 'Send message',
        ping: 'Test connection',
      },
    });
  });
}

// ------ ЗАПУСК ------
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
🚀 =====================================
✅ SIMPLE SERVER STARTED
📡 Port: ${PORT}
🌍 Host: 0.0.0.0
🔌 Socket.io: ws://localhost:${PORT}/socket.io
🔗 API: http://localhost:${PORT}/api/v1/*
🏥 Health: http://localhost:${PORT}/health
🌐 Mode: ${process.env.NODE_ENV || 'development'}
======================================
  `);
});
