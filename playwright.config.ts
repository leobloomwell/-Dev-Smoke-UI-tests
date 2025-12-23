import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  testDir: './tests',

  reporter: [
    [
      "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
      {
        slackOAuthToken: process.env.SLACK_BOT_USER_OAUTH_TOKEN,
        channels: [process.env.SLACK_CHANNELS], // provide one or more Slack channels
        sendResults: "always", // "always" , "on-failure", "off",
      },
    ],
    ['html'],
    ['allure-playwright', { 
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: true 
    }],
  ],

  use: {
    baseURL: 'https://admin.marktplatz-dev.bloomwell.de',
    headless: true,
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
