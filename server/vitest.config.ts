import path             from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'view': path.resolve(__dirname, './src/view'),
      'utils': path.resolve(__dirname, './src/utils'),
      'model': path.resolve(__dirname, './src/model'),
      'entity': path.resolve(__dirname, './src/entity'),
      'routes': path.resolve(__dirname, './src/routes'),
      'service': path.resolve(__dirname, './src/service'),
      'controller': path.resolve(__dirname, './src/controller'),
      'middleware': path.resolve(__dirname, './src/middleware'),
    }
  },
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./spec/setup.ts'],
  }
});
