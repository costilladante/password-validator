import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@rules': path.resolve(__dirname, './src/rules'),
      '@types': path.resolve(__dirname, './src/types'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@sass': path.resolve(__dirname, './src/sass'),
    },
  },
})
