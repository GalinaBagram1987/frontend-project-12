const express = require('express');
const path = require('path');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();

const PORT = process.env.PORT || 5001;

// ------ЗАПУСК HEXLET СЕРВЕРА В ФОНЕ-------
let hexletServer;

if (process.env.NODE_ENV === 'production') {
  // Запускаем Hexlet сервер как дочерний процесс
  hexletServer = spawn('npx', ['start-server', '--port', '5000'], {
    stdio: 'inherit', // вывод hexletServer будет отображаться в консоли процесса-родителя
    detached: true, ///отделить дочерний процесс от родительского, чтобы он продолжал работать даже после того, как родительский процесс завершится.
  });

  console.log('Hexlet server started on port 5000');

  // При завершении основного процесса убиваем Hexlet сервер
  process.on('exit', () => {
    if (hexletServer) {
      hexletServer.kill();
    }
  });
}

// ------ CORS ТОЛЬКО ДЛЯ DEVELOPMENT ------
if (process.env.NODE_ENV !== 'production') {
  const cors = require('cors');
  app.use(cors({ origin: 'http://localhost:5002' }));
}

app.use(express.json());

// ------ ПРОКСИ К HEXLET API ------
const HEXLET_API =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:5000' // локально в том же контейнере
    : 'http://localhost:5001'; // в development

app.use('/api/v1/:pathn(.*)', async (req, res) => {
  try {
    const url = `${HEXLET_API}/api/v1/${req.params.path}`;

    console.log(`Proxying ${req.method} ${req.url} → ${url}`);

    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: {
        Authorization: req.headers.authorization,
        'Content-Type': req.headers['content-type'],
      },
      validateStatus: () => true, // принимаем все статусы
    });

    // Копируем заголовки ответа
    Object.entries(response.headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({
      error: 'Failed to proxy to Hexlet API',
      message: error.message,
    });
  }
});

// ------ РАЗДАЧА СТАТИКИ ФРОНТЕНДА -------
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, 'frontend/dist');
  app.use(express.static(staticPath));

  // SPA routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });

  console.log(`Serving static files from: ${staticPath}`);
} else {
  // В development просто информация
  app.get('/', (req, res) => {
    res.json({
      message: 'Development Proxy Server',
      endpoints: 'All /api/v1/* requests proxied to Hexlet API',
      hexletApi: HEXLET_API,
      frontend: 'Run separately on http://localhost:5002',
    });
  });
}

// ------ ЗАПУСК СЕРВЕРА -----
app.listen(PORT, () => {
  console.log(`
SERVER STARTED
URL: http://localhost:${PORT} 
Mode: ${process.env.NODE_ENV || 'development'}
Proxy:    /api/v1/* → ${HEXLET_API}/api/v1/*
Hexlet:   ${hexletServer ? 'Running on port 5000' : 'External'}
`);
});
