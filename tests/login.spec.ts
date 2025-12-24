import { test, expect } from '@playwright/test';
import { getTestCredentials } from '../utils/env';

test('Login test and navigate to dashboard', async ({ browser }) => {
  // Get validated credentials from environment variables
  const credentials = getTestCredentials();

  // Create context with browser-level Basic Auth
  const context = await browser.newContext({
    httpCredentials: {
      username: credentials.basicAuth.username,
      password: credentials.basicAuth.password,
    }
  });

  const page = await context.newPage();

  // Go to login page
  await page.goto('https://admin.marktplatz-dev.bloomwell.de/');

  // UI login
  await page.fill('input[name="email"]', credentials.uiLogin.email);
  await page.fill('input[name="password"]', credentials.uiLogin.password);

  // Click login
  await page.click('button[type="submit"]');

  await page.waitForURL('**/dashboard');

  await expect(page.locator('text=Dashboard')).toBeVisible();

  console.log('✅ Login successful');
});