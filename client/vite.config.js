import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Bind every local address. On Windows, Vite otherwise listens only on
    // IPv6 (::1), so browsers that open 127.0.0.1 get connection refused.
    host: '::',
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': 'http://127.0.0.1:5000',
    },
  },
});
