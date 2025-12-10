import { test, expect } from '@playwright/test';

test('Login test and navigate to dashboard', async ({ browser }) => {

  // Create context with browser-level Basic Auth
  const context = await browser.newContext({
    httpCredentials: {
      username: 'gb',
      password: 'gb-dev-2023',
    }
  });

  const page = await context.newPage();

  // Go to login page
  await page.goto('https://admin.marktplatz-dev.bloomwell.de/');

  // UI login
  await page.fill('input[name="email"]', 'oleh.semenchuk.ext+stgadmin@bloomwell.de');
  await page.fill('input[name="password"]', 'Test123!');

  // Click login
  await page.click('button[type="submit"]');

  // Wait for dashboard
  await page.waitForURL('**/dashboard');

  // Validate
  await expect(page.locator('text=Dashboard')).toBeVisible();

  console.log('✅ Login successful');
});
