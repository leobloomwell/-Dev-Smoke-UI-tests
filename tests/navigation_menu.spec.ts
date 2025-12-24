import { test, expect } from '@playwright/test';
import { NavigationMenu } from '../pages/components/NavigationMenu';

test.use({ storageState: 'auth.json' });

test.describe('Sidebar navigation', () => {
  test('Menu items navigate to correct pages', async ({ page }) => {
    const navigationMenu = new NavigationMenu(page);
    const menuItems = navigationMenu.getMenuItems();

    for (const item of menuItems) {
      // Navigate to dashboard first to ensure we're on a page with navigation
      await navigationMenu.goToDashboard();
      
      // Click menu item using semantic locator
      await item.locator.click();
      
      // Verify correct URL
      await expect(page).toHaveURL(new RegExp(`.*${item.url}`));
    }
  });
});