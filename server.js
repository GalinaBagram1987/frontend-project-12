const express = require('express');
const path = require('path');
const { createServer } = require('@hexlet/chat-server');

const app = express();
const PORT = process.env.PORT || 5001;

// Serve static files from frontend/dist
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Use the chat server API
const chatServer = createServer();
app.use('/api', chatServer);

// For SPA: all other routes go to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});