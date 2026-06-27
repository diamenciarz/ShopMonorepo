import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleTranscribe } from './server/handler.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          handleTranscribe(req, res, next);
        });
      },
    },
  ],
  base: './',
});
