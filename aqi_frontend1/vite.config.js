import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite dev server on port 3000 and proxy /api -> http://localhost:8600
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8600',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
