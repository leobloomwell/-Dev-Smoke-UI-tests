import { test, expect } from '@playwright/test';

const pages = [
  '/dashboard',
  '/orders',
  '/products',
  '/pharmacies',
  '/settings',
];

test.describe('Page availability', () => {
  for (const url of pages) {
    test(`Page loads correctly: ${url}`, async ({ page }) => {
      await page.goto(url);
      await expect(page.locator('body')).toBeVisible();
    });
  }
});
