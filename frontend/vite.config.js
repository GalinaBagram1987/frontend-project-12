import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5002,
    host: '0.0.0.0', // Добавьте эту строку
    hmr: {
      overlay: false, // Отключить overlay при ошибках HMR
    },
    proxy: {
      // Проксируем запросы к API
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: 'http://localhost:5001',
        ws: true,
        rewriteWsOrigin: true,
        changeOrigin: true,
      },
    },
  },
  build: {
    minify: false,
    rollupOptions: {
      output: {
        // Добавляет хеш к именам файлов
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
      },
    },
  },
});
