import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/setupTests.ts',
      ],
      include: ['src/**/*.{ts,tsx}'],
      all: true,
      thresholds: {
        statements: 0, // TODO: Set threshold to 80%
        branches: 0, // TODO: Set threshold to 80%
        functions: 0, // TODO: Set threshold to 80%
        lines: 0, // TODO: Set threshold to 80%
      },
    },
  },
})
