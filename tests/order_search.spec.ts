import { test, expect } from '@playwright/test';
import { OrdersPage } from '../pages/OrdersPage';

test.use({ storageState: 'auth.json' });

test.describe('Order searching', () => {
  test.beforeEach(async ({ page }) => {
    const ordersPage = new OrdersPage(page);
    await ordersPage.goto();
  });

  const existingOrder = '1874925574649368576';
  const nonexistentOrder = '99999999999999999999';

  test('Search existing order', async ({ page }) => {
    const ordersPage = new OrdersPage(page);
    
    await ordersPage.searchOrder(existingOrder);
    await ordersPage.verifyOrderFound(existingOrder);
  });

  test('Search non-existing order returns no results', async ({ page }) => {
    const ordersPage = new OrdersPage(page);
    
    await ordersPage.searchOrder(nonexistentOrder);
    await ordersPage.verifyNoResults();
  });
});