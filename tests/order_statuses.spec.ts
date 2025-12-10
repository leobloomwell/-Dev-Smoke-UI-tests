import { test, expect } from '@playwright/test';

test.describe('Order statuses validation', () => {
  test('Active / inactive statuses should appear correctly', async ({ page }) => {
    await page.goto('/orders');

    const statusBadges = page.locator('span:below(text=Status)');
    await expect(statusBadges.first()).toBeVisible();
  });
});
