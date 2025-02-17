import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], resolve: {
    alias: {
      '@app': fileURLToPath(new URL('./src', import.meta.url)), // Alias for src folder,
      // Fake swagger decorator that does nothing to use shared-types
      '@nestjs/swagger': fileURLToPath(new URL('./src/fake-swagger', import.meta.url))
    }
  },
  server: {
    port: 80
  }
})
