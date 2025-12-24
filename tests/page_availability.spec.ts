import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base/BasePage';

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
      const basePage = new BasePage(page);
      
      await basePage.goto(url);
      await basePage.waitForLoadState();
      
      // Verify page body is visible
      await expect(page.locator('body')).toBeVisible();
    });
  }
});