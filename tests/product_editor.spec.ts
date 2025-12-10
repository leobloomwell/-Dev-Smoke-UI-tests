import { test, expect } from '@playwright/test';

test.describe('Product editor basic validation', () => {
  test('Open product and check editor exists', async ({ page }) => {
    await page.goto('/products');

    const row = page.locator('tbody tr').first();

    if (!(await row.isVisible())) test.skip(true, 'No products available on DEV');

    await row.click();
    await page.waitForTimeout(1500);

    const editButton = page.locator('button:has-text("Edit")');

    await expect(editButton).toBeVisible();
  });
});
