import { test, expect } from '@playwright/test';
import fs from 'fs';
import { OrdersPage } from '../pages/OrdersPage';

test.use({ storageState: 'auth.json' });

test.describe('Document downloads', () => {
  test('Invoice / PDF can be downloaded', async ({ page }) => {
    const ordersPage = new OrdersPage(page);
    
    await ordersPage.goto();
    
    // Check if orders are available
    const firstRow = ordersPage.getFirstOrderRow();
    const isVisible = await firstRow.isVisible();
    
    if (!isVisible) {
      test.skip(true, 'No orders available');
      return;
    }

    await ordersPage.clickFirstOrder();
    
    // Check if download button is available
    const isDownloadVisible = await ordersPage.downloadButton.isVisible();
    
    if (!isDownloadVisible) {
      test.skip(true, 'No download button available in this order');
      return;
    }

    const download = await ordersPage.downloadOrder();
    const path = await download.path();
    expect(fs.existsSync(path!)).toBeTruthy();
  });
});