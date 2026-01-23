import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/ 
export default defineConfig(
  { plugins: 
    [react()], 
      server: { 
        open: true,
          port: 5002,
       host: '0.0.0.0',
       allowedHosts: [
        'window.location.origin',
        'localhost',
        '127.0.0.1',
        '.onrender.com', // добавьте это для всех поддоменов Render
        ],
        hmr: {
          overlay: false,
        },
          proxy: 
            { '/api': 
              { target: 
            'http://localhost:5001', 
          },
           '/socket.io': 
            { target: 'ws://localhost:5001',
              ws: true, 
              rewriteWsOrigin: true, },
            }, 
          },
          preview: {
            port: 'window.location.origin', 
            host: true,
            allowedHosts: true, // разрешить все хосты для Render
          },
  })
