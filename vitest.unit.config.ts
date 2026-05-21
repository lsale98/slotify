import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import env from 'vite-plugin-env-compatible';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [env()],
  resolve: {
    alias: [
      {
        find: '@/generated/prisma',
        replacement: path.resolve(dirname, './generated/prisma'),
      },
      {
        find: '@',
        replacement: path.resolve(dirname, './src'),
      },
    ],
  },
  test: {
    name: 'unit',
    environment: 'node',
    env: {
      NODE_ENV: 'test',
    },
    include: ['src/tests/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/*.stories.*'],
  },
});
