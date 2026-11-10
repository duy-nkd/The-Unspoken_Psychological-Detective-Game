import { defineConfig } from '@playwright/test'

const url = 'http://127.0.0.1:5196'

export default defineConfig({
  testDir: './e2e',
  outputDir: './node_modules/.cache/playwright-results',
  timeout: 240_000,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: url,
    channel: 'chrome',
    viewport: { width: 1280, height: 800 },
    launchOptions: { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] },
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 5196 --strictPort',
    env: { VITE_DEBUG: 'true' },
    url,
  },
})
