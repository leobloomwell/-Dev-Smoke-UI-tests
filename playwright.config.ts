import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import { getTestCredentials, getBaseURL } from './utils/env';

// Load environment variables from .env file
dotenv.config();

// Validate credentials at config load time
const credentials = getTestCredentials();
const baseURL = getBaseURL();
const environment = credentials.environment;

console.log(`🌍 Running tests against: ${environment.toUpperCase()} environment`);
console.log(`🔗 Base URL: ${baseURL}`);

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
    baseURL: baseURL,
    headless: true,
    ignoreHTTPSErrors: true,

    // Basic Auth - using validated environment-specific credentials
    httpCredentials: {
      username: credentials.config.basicAuth.username,
      password: credentials.config.basicAuth.password,
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