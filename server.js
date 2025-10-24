const express = require('express');
const path = require('path');
const { createServer } = require('@hexlet/chat-server');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware для парсинга JSON
app.use(express.json());

// Подключаем chat-server как middleware к API routes
app.use('/api', createServer());

// Serve static files from frontend/dist
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Handle SPA - all routes go to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});