const express = require('express');
const cors = require('cors');

const app = express();

// CORS настройка
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());

// Тест вход
app.get('/', (req, res) => {
  res.json({
    message: 'API is running',
    port: process.env.PORT, // посмотрим, какой порт назначил Render
    nodeEnv: process.env.NODE_ENV,
    frontendUrl: process.env.FRONTEND_URL,
  });
});

// Запуск сервера
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5001'}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
});
