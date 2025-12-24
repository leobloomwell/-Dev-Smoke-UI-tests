import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * Navigation menu component page object
 */
export class NavigationMenu extends BasePage {
  // Semantic locators
  readonly dashboardLink: Locator;
  readonly ordersLink: Locator;
  readonly productsLink: Locator;
  readonly pharmaciesLink: Locator;
  readonly settingsLink: Locator;

  constructor(page: Page) {
    super(page);
    // Use semantic locators - prefer getByRole with accessible names
    this.dashboardLink = page.getByRole('link', { name: /dashboard/i });
    this.ordersLink = page.getByRole('link', { name: /orders/i });
    this.productsLink = page.getByRole('link', { name: /products/i });
    this.pharmaciesLink = page.getByRole('link', { name: /pharmacies/i });
    this.settingsLink = page.getByRole('link', { name: /settings/i });
  }

  /**
   * Navigate to Dashboard
   */
  async goToDashboard(): Promise<void> {
    await this.dashboardLink.click();
    await this.waitForURL(/.*\/dashboard/);
  }

  /**
   * Navigate to Orders
   */
  async goToOrders(): Promise<void> {
    await this.ordersLink.click();
    await this.waitForURL(/.*\/orders/);
  }

  /**
   * Navigate to Products
   */
  async goToProducts(): Promise<void> {
    await this.productsLink.click();
    await this.waitForURL(/.*\/products/);
  }

  /**
   * Navigate to Pharmacies
   */
  async goToPharmacies(): Promise<void> {
    await this.pharmaciesLink.click();
    await this.waitForURL(/.*\/pharmacies/);
  }

  /**
   * Navigate to Settings
   */
  async goToSettings(): Promise<void> {
    await this.settingsLink.click();
    await this.waitForURL(/.*\/settings/);
  }

  /**
   * Get all navigation menu items
   */
  getMenuItems(): { name: string; locator: Locator; url: string }[] {
    return [
      { name: 'Dashboard', locator: this.dashboardLink, url: '/dashboard' },
      { name: 'Orders', locator: this.ordersLink, url: '/orders' },
      { name: 'Products', locator: this.productsLink, url: '/products' },
      { name: 'Pharmacies', locator: this.pharmaciesLink, url: '/pharmacies' },
      { name: 'Settings', locator: this.settingsLink, url: '/settings' },
    ];
  }
}