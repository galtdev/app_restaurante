import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige las peticiones de datos (GET, POST a la DB)
      '/api': {
        target: 'http://localhost:3000', // Asegúrate de que este sea el puerto de tu Backend
        changeOrigin: true,
      },
      // Redirige las peticiones de imágenes
      '/public': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})