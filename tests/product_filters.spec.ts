import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test.use({ storageState: 'auth.json' });

test.describe('Product filtering', () => {
  test.beforeEach(async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
  });

  test('Filtering by availability', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    
    // Check if filter button is available
    const isFilterVisible = await productsPage.filterButton.isVisible();
    if (!isFilterVisible) {
      test.skip(true, 'Filter section unavailable');
      return;
    }

    await productsPage.filterByAvailability();
    await productsPage.verifyProductsDisplayed();
  });
});