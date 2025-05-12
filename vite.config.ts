import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: process.env.NODE_ENV === 'development' ? 'dev' : undefined,
  publicDir: 'public',
  build: {
    lib: {
      // Entry point for the library
      entry: resolve(__dirname, 'src/index.ts'),
      // Name of the library
      name: 'PasswordValidator',
      // File name format for different module formats
      fileName: (format) => `password-validator.${format}.js`,
      // Module formats to build
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // External dependencies that shouldn't be bundled
      external: ['react', 'react-dom'],
      output: {
        // Global variable names for UMD build
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        // Update asset handling for Sass
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'password-validator.css'
          return assetInfo.name
        },
      },
    },
    // Generate sourcemaps
    sourcemap: true,
    // Clean output directory before build
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
