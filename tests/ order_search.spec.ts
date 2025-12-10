import { test, expect } from '@playwright/test';

test.describe('Order searching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/orders');
  });

  const existingOrder = '1874925574649368576';
  const nonexistentOrder = '99999999999999999999';

  test('Search existing order', async ({ page }) => {
    const search = page.locator('input[type="search"]');

    await search.fill(existingOrder);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1500);

    const rows = page.locator('tbody tr');
    await expect(rows.first()).toContainText(existingOrder);
  });

  test('Search non-existing order returns no results', async ({ page }) => {
    const search = page.locator('input[type="search"]');

    await search.fill(nonexistentOrder);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1500);

    const noResults = page.locator('text=No orders found');
    await expect(noResults.first()).toBeVisible();
  });
});
