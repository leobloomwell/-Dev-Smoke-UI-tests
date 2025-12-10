import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

const menu = [
  { name: 'Dashboard', iconIndex: 1, url: '/dashboard' },
  { name: 'Orders', iconIndex: 2, url: '/orders' },
  { name: 'Products', iconIndex: 3, url: '/products' },
  { name: 'Pharmacies', iconIndex: 4, url: '/pharmacies' },
];

test.describe('Sidebar navigation', () => {
  for (const item of menu) {
    test(`Menu: ${item.name} opens correct page`, async ({ page }) => {

      const iconSelector = `div.cursor-pointer:nth-of-type(${item.iconIndex})`;

      await page.locator(iconSelector).click();

      await expect(page).toHaveURL(`**${item.url}`);
    });
  }
});
