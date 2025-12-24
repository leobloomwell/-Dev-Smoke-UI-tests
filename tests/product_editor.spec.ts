import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test.use({ storageState: 'auth.json' });

test.describe('Product editor basic validation', () => {
  test('Open product and check editor exists', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    
    await productsPage.goto();
    
    // Check if products are available
    const firstRow = productsPage.getFirstProductRow();
    const isVisible = await firstRow.isVisible();
    
    if (!isVisible) {
      test.skip(true, 'No products available');
      return;
    }

    await productsPage.clickFirstProduct();
    await productsPage.verifyEditButtonVisible();
  });
});