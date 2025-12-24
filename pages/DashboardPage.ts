import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { NavigationMenu } from './components/NavigationMenu';

/**
 * Dashboard page object
 */
export class DashboardPage extends BasePage {
  readonly navigationMenu: NavigationMenu;
  readonly dashboardHeading: Locator;
  readonly pageContent: Locator;

  constructor(page: Page) {
    super(page);
    this.navigationMenu = new NavigationMenu(page);
    this.dashboardHeading = page.getByRole('heading', { name: /dashboard/i });
    this.pageContent = page.locator('body');
  }

  /**
   * Navigate to dashboard
   */
  async goto(): Promise<void> {
    await super.goto('/dashboard');
    await this.waitForURL(/.*\/dashboard/);
  }

  /**
   * Verify dashboard is loaded
   */
  async verifyLoaded(): Promise<void> {
    await this.dashboardHeading.waitFor({ state: 'visible' });
    await this.pageContent.waitFor({ state: 'visible' });
  }
}