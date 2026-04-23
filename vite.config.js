import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Базовый путь должен совпадать с названием вашего репозитория на GitHub
  base: '/res/', 
})