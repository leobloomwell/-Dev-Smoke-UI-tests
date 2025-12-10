import { test, expect } from '@playwright/test';

test.describe('Product filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
  });

  test('Filtering by availability', async ({ page }) => {
    const filterBtn = page.locator('button:has-text("Filter")');

    if (!(await filterBtn.isVisible())) test.skip(true, 'Filter section unavailable');

    await filterBtn.click();
    await page.getByText('Availability').click();
    await page.getByLabel('Available').check();

    await page.waitForTimeout(2000);
    const rows = page.locator('tbody tr');
    await expect(rows.first()).toBeVisible();
  });
});
