/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
  },
  optimizeDeps: {
    include: [
      'aws-sdk',
      'mock-aws-s3',
      'nock',
      'typescript'
    ]
  }
})
