const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const { spawn } = require('child_process');

const app = express();
const server = http.createServer(app);

// ------ КОНСТАНТЫ ------
const HEXLET_PORT = 5000;
const HEXLET_URL = `http://localhost:${HEXLET_PORT}`;

console.log(`Configuration:`);
console.log(`Server port: ${PORT}`);
console.log(`Hexlet port: ${HEXLET_PORT}`);
console.log(`Hexlet URL: ${HEXLET_URL}`);

// ------ ЗАПУСК HEXLET СЕРВЕРА В PRODUCTION ------
let hexletProcess = null;

if (process.env.NODE_ENV === 'production') {
  console.log(`Starting Hexlet server on port ${HEXLET_PORT}...`);

  try {
    // Запускаем Hexlet сервер
    hexletProcess = spawn('npx', ['start-server', '--port', HEXLET_PORT.toString()], {
      stdio: 'inherit',
      detached: false, // чтобы видеть логи
    });

    hexletProcess.on('error', (err) => {
      console.error('Failed to start Hexlet server:', err.message);
    });

    hexletProcess.on('exit', (code, signal) => {
      console.log(`Hexlet server exited: code=${code}, signal=${signal}`);
    });

    console.log(`Hexlet server process started (PID: ${hexletProcess.pid})`);

    // Даем время на запуск
    setTimeout(() => {
      console.log('Hexlet server should be ready...');
    }, 3000);
  } catch (error) {
    console.error('Error starting Hexlet server:', error);
  }

  // Graceful shutdown
  const shutdown = () => {
    console.log('Shutting down...');
    if (hexletProcess) {
      console.log('Killing Hexlet server...');
      hexletProcess.kill('SIGTERM');
    }
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

// ------ CORS ------
const allowedOrigins = PORT;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log('CORS blocked:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.use(express.json());

// ------ HEALTH CHECK ------
app.get('/health', async (req, res) => {
  try {
    // Проверяем доступность Hexlet
    const hexletHealth = await axios
      .get(`${HEXLET_URL}/api/v1/health`, {
        timeout: 2000,
      })
      .catch(() => ({ status: 'unavailable' }));

    res.json({
      status: 'ok',
      service: 'hybrid-server',
      port: PORT,
      hexlet: {
        url: HEXLET_URL,
        status: hexletHealth.status || 'unreachable',
        port: HEXLET_PORT,
      },
      timestamp: new Date().toISOString(),
      node: process.version,
      env: process.env.NODE_ENV || 'development',
    });
  } catch (error) {
    res.json({
      status: 'degraded',
      service: 'hybrid-server',
      port: PORT,
      hexlet: {
        url: HEXLET_URL,
        status: 'check failed',
        error: error.message,
      },
      timestamp: new Date().toISOString(),
    });
  }
});

// ------ ПРОКСИ К HEXLET API ------
app.use(/^\/api\/v1\/(.*)/, async (req, res) => {
  try {
    const path = req.params[0] || '';
    const url = `${HEXLET_URL}/api/v1/${path}`;

    console.log(`Proxying ${req.method} ${req.originalUrl} → ${url}`);

    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
        Authorization: req.headers['authorization'],
        Accept: req.headers['accept'] || 'application/json',
      },
      timeout: 10000,
      validateStatus: () => true,
    });

    // Передаем заголовки
    if (response.headers['content-type']) {
      res.setHeader('Content-Type', response.headers['content-type']);
    }

    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('Hexlet proxy error:', error.message);

    // Fallback для важных endpoints
    if (req.method === 'POST' && req.url.includes('/login')) {
      const username = req.body?.username || 'anonymous';
      return res.json({
        token: `fallback-${Date.now()}`,
        username: username,
        message: 'Logged in (fallback - Hexlet API down)',
      });
    }

    res.status(502).json({
      error: 'Backend API unavailable',
      message: error.message,
      hexletUrl: HEXLET_URL,
      fallback: 'Using local socket.io server',
      timestamp: new Date().toISOString(),
    });
  }
});

// ------ SOCKET.IO СЕРВЕР ------
const io = new Server(server, {
  cors: {
    origin: PORT,
    methods: ['GET', 'POST'],
  },
  path: '/socket.io',
  transports: ['polling', 'websocket'],
  // УВЕЛИЧИВАЕМ эти значения для Render.com: ? проба
  pingTimeout: 60000, // 60 секунд (было 5000)
  pingInterval: 25000, // 25 секунд (было 25000)
  connectTimeout: 45000, // 45 секунд
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.emit('connected', {
    id: socket.id,
    message: 'Connected to chat server',
    timestamp: new Date().toISOString(),
    server: 'hybrid-server',
  });

  socket.on('message', (data) => {
    console.log('Message from', socket.id, ':', data);

    const message = {
      id: Date.now(),
      ...data,
      socketId: socket.id,
      timestamp: new Date().toISOString(),
    };

    // Отправляем всем
    io.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// ------ СТАТИЧЕСКИЕ ФАЙЛЫ ------
if (process.env.NODE_ENV === 'production') {
  const fs = require('fs');

  // Ищем фронтенд
  const possiblePaths = [path.join(__dirname, 'dist'), path.join(__dirname, 'build'), path.join(__dirname, 'frontend/dist'), path.join(__dirname, 'frontend/build')];

  let staticPath = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p) && fs.existsSync(path.join(p, 'index.html'))) {
      staticPath = p;
      break;
    }
  }

  if (staticPath) {
    app.use(express.static(staticPath));
    console.log(`Serving static files from: ${staticPath}`);

    app.get(/.*/, (req, res) => {
      if (req.url.startsWith('/api/') || req.url.startsWith('/socket.io') || req.url === '/health') {
        return res.status(404).json({ error: 'Not found' });
      }
      res.sendFile(path.join(staticPath, 'index.html'));
    });
  } else {
    console.error('No static files found');
    app.get('/', (req, res) => {
      res.json({
        error: 'Frontend not built',
        instruction: 'Run: npm run build',
        pathsChecked: possiblePaths,
      });
    });
  }
} else {
  // Development
  app.get('/', (req, res) => {
    res.json({
      message: 'Hybrid Server (Development)',
      endpoints: {
        health: '/health',
        api: '/api/v1/*',
        socket: '/socket.io',
      },
      hexlet: HEXLET_URL,
    });
  });
}

// ------ ЗАПУСК ------
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
====================================
HYBRID SERVER STARTED
Port: ${PORT}
Socket.io: ws://localhost:${PORT}/socket.io
API: http://localhost:${PORT}/api/v1/*
Health: http://localhost:${PORT}/health
Hexlet: ${HEXLET_URL}
Mode: ${process.env.NODE_ENV || 'development'}
====================================
  `);
});
