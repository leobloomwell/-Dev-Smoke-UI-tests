import { test, expect } from '@playwright/test';
import { getTestCredentials, getBaseURL, getCurrentRoleCredentials } from '../utils/env';

test('Login test and navigate to dashboard', async ({ browser }) => {
  // Get validated credentials from environment variables
  const credentials = getTestCredentials();
  const baseURL = getBaseURL();
  const roleCredentials = getCurrentRoleCredentials();

  console.log(`🔐 Testing login for ${credentials.environment.toUpperCase()} environment with ${credentials.role.toUpperCase()} role`);

  // Create context with browser-level Basic Auth
  const context = await browser.newContext({
    httpCredentials: {
      username: credentials.config.basicAuth.username,
      password: credentials.config.basicAuth.password,
    }
  });

  const page = await context.newPage();

  // Go to login page using environment-specific baseURL
  await page.goto(baseURL);

  // UI login using role-specific credentials
  await page.fill('input[name="email"]', roleCredentials.email);
  await page.fill('input[name="password"]', roleCredentials.password);

  // Click login
  await page.click('button[type="submit"]');

  await page.waitForURL('**/dashboard');

  await expect(page.locator('text=Dashboard')).toBeVisible();

  console.log('✅ Login successful');
});