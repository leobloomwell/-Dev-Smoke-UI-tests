import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';

/**
 * Orders page object
 */
export class OrdersPage extends BasePage {
  // Semantic locators
  readonly searchInput: Locator;
  readonly ordersTable: Locator;
  readonly orderRows: Locator;
  readonly statusBadges: Locator;
  readonly noResultsMessage: Locator;
  readonly downloadButton: Locator;
  readonly editButton: Locator;

  constructor(page: Page) {
    super(page);
    // Use getByRole for search input
    this.searchInput = page.getByRole('searchbox', { name: /search/i }).or(
      page.getByPlaceholder(/search/i)
    );
    // Use getByRole for table
    this.ordersTable = page.getByRole('table');
    // Use locator with role for table rows
    this.orderRows = page.getByRole('row');
    // Use getByText for status badges (more semantic than :below selector)
    this.statusBadges = page.getByRole('status').or(
      page.locator('[role="status"]')
    );
    this.noResultsMessage = page.getByText(/no orders found/i);
    this.downloadButton = page.getByRole('button', { name: /download/i });
    this.editButton = page.getByRole('button', { name: /edit/i });
  }

  /**
   * Navigate to orders page
   */
  async goto(): Promise<void> {
    await super.goto('/orders');
    await this.waitForURL(/.*\/orders/);
  }

  /**
   * Search for an order
   * @param orderNumber - Order number to search for
   */
  async searchOrder(orderNumber: string): Promise<void> {
    await this.searchInput.fill(orderNumber);
    await this.page.keyboard.press('Enter');
    // Wait for search results instead of hardcoded timeout
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get first order row
   */
  getFirstOrderRow(): Locator {
    // Use more specific selector - skip header row
    return this.orderRows.filter({ hasNot: this.page.getByRole('columnheader') }).first();
  }

  /**
   * Click on first order row
   */
  async clickFirstOrder(): Promise<void> {
    const firstRow = this.getFirstOrderRow();
    await firstRow.waitFor({ state: 'visible' });
    await firstRow.click();
    // Wait for order details to load
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify order is found in results
   * @param orderNumber - Order number to verify
   */
  async verifyOrderFound(orderNumber: string): Promise<void> {
    const row = this.orderRows.filter({ hasText: orderNumber }).first();
    await row.waitFor({ state: 'visible' });
  }

  /**
   * Verify no results message is displayed
   */
  async verifyNoResults(): Promise<void> {
    await this.noResultsMessage.waitFor({ state: 'visible' });
  }

  /**
   * Download order document
   */
  async downloadOrder(): Promise<import('@playwright/test').Download> {
    await this.downloadButton.waitFor({ state: 'visible' });
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadButton.click();
    return await downloadPromise;
  }

  /**
   * Get status badges
   */
  getStatusBadges(): Locator {
    return this.statusBadges;
  }

  /**
   * Verify status badges are visible
   */
  async verifyStatusBadgesVisible(): Promise<void> {
    const badges = this.getStatusBadges();
    await badges.first().waitFor({ state: 'visible' });
  }
}