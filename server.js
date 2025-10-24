const path = require('path');
const express = require('express');
const http = require('http');
const { createServer } = require('@hexlet/chat-server/src/plugin.js');
const app = express();
const PORT = process.env.PORT || 5001;
// Создаем httpServer, к которому будут подключаться и express, и socket.io
const httpServer = http.createServer(app);
const chatApp = createServer({ server: httpServer });
app.use(chatApp); // Монтируем на корень, чтобы сокеты были на /socket.io
// Статика
app.use(express.static(path.join(__dirname, 'frontend/dist')));
// SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('WebSocket available at /socket.io');
});
