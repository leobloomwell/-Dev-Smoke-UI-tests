import { test, expect } from '@playwright/test';
import { OrdersPage } from '../pages/OrdersPage';

test.use({ storageState: 'auth.json' });

test.describe('Order statuses validation', () => {
  test('Active / inactive statuses should appear correctly', async ({ page }) => {
    const ordersPage = new OrdersPage(page);
    
    await ordersPage.goto();
    await ordersPage.verifyStatusBadgesVisible();
  });
});