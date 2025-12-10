import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'https://admin.marktplatz-dev.bloomwell.de',
    headless: false,
    ignoreHTTPSErrors: true,

    // Basic Auth DEV (працює!)
    httpCredentials: {
      username: 'gb',
      password: 'gb-dev-2023'
    }
  },

  projects: [
    {
      name: 'setup',
      testMatch: /login\.spec\.ts/,
    },
    {
      name: 'tests',
      testMatch: /.*\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        storageState: 'auth.json'
      }
    }
  ]
});
