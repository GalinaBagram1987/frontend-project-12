import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';


// const __dirname = dirname(fileURLToPath(import.meta.url));

//export default defineConfig(({ mode }) => {
//   // Загружаем env переменные
//   const env = loadEnv(mode, __dirname, '');

//   return {
//     plugins: [react()],
//     base: '/',

//     server: {
//       port: 5002,
//       host: '0.0.0.0',
//       allowedHosts: [
//         'testslack2bagram.onrender.com',
//         'localhost',
//         '127.0.0.1',
//         '.onrender.com', // добавьте это для всех поддоменов Render
//       ],
//       hmr: {
//         overlay: false,
//       },
//       proxy: {
//         '/api': {
//           target: 'http://localhost:5001',
//           changeOrigin: true,
//           secure: false,
//         },
//         '/socket.io': {
//           target: 'http://localhost:5001',
//           ws: true,
//           rewriteWsOrigin: true,
//           changeOrigin: true,
//         },
//       },
//     },
//     preview: {
//       port: env.PORT ? Number(env.PORT) : 5002, // рендер передает порт как строку, делем число
//       host: true,
//       allowedHosts: true, // разрешить все хосты для Render
//       proxy: {
//         '/api': {
//           target: 'http://localhost:5001', // Ваш бэкенд
//           changeOrigin: true,
//           secure: false,
//         },
//         '/socket.io': {
//           target: 'http://localhost:5001',
//           changeOrigin: true,
//           ws: true,
//         }
//       }
//     },

//     build: {
//       outDir: 'dist', // добавьте это
//       minify: false,
//       rollupOptions: {
//         output: {
//           entryFileNames: `assets/[name]-[hash].js`,
//           chunkFileNames: `assets/[name]-[hash].js`,
//           assetFileNames: `assets/[name]-[hash].[ext]`,
//         },
//       },
//     },
//   };
// });
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
