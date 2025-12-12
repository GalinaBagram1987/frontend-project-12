import express from 'express';
import cors from 'cors';

const express = express();

// CORS настройка
express.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5001',
    credentials: true,
  })
);

express.use(express.json());

// Тест вход
express.get('/', (req, res) => {
  res.json({
    message: 'API is running',
    port: process.env.PORT, // посмотрим, какой порт назначил Render
    nodeEnv: process.env.NODE_ENV,
    frontendUrl: process.env.FRONTEND_URL,
  });
});

// Запуск сервера
const PORT = process.env.PORT || 5001;
express.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5001'}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
});
