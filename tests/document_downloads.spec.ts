import { test, expect } from '@playwright/test';
import fs from 'fs';

test.describe('Document downloads', () => {
  test('Invoice / PDF can be downloaded', async ({ page }) => {
    await page.goto('/orders');

    const row = page.locator('tbody tr').first();
    if (!(await row.isVisible())) test.skip(true, 'No orders available');

    await row.click();
    await page.waitForTimeout(1500);

    const downloadBtn = page.locator('button:has-text("Download")');

    if (!(await downloadBtn.isVisible())) test.skip(true, 'No download button available in this order');

    const downloadPromise = page.waitForEvent('download');
    await downloadBtn.click();
    const download = await downloadPromise;

    const path = await download.path();
    expect(fs.existsSync(path!)).toBeTruthy();
  });
});
