import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';

/**
 * Products page object
 */
export class ProductsPage extends BasePage {
  // Semantic locators
  readonly filterButton: Locator;
  readonly availabilityFilter: Locator;
  readonly availableCheckbox: Locator;
  readonly productsTable: Locator;
  readonly productRows: Locator;
  readonly editButton: Locator;

  constructor(page: Page) {
    super(page);
    this.filterButton = page.getByRole('button', { name: /filter/i });
    this.availabilityFilter = page.getByText(/availability/i);
    this.availableCheckbox = page.getByLabel(/available/i);
    this.productsTable = page.getByRole('table');
    this.productRows = page.getByRole('row');
    this.editButton = page.getByRole('button', { name: /edit/i });
  }

  /**
   * Navigate to products page
   */
  async goto(): Promise<void> {
    await super.goto('/products');
    await this.waitForURL(/.*\/products/);
  }

  /**
   * Open filter panel
   */
  async openFilters(): Promise<void> {
    await this.filterButton.waitFor({ state: 'visible' });
    await this.filterButton.click();
  }

  /**
   * Filter by availability
   */
  async filterByAvailability(): Promise<void> {
    await this.openFilters();
    await this.availabilityFilter.click();
    await this.availableCheckbox.check();
    // Wait for filtered results instead of hardcoded timeout
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get first product row
   */
  getFirstProductRow(): Locator {
    // Skip header row
    return this.productRows.filter({ hasNot: this.page.getByRole('columnheader') }).first();
  }

  /**
   * Click on first product
   */
  async clickFirstProduct(): Promise<void> {
    const firstRow = this.getFirstProductRow();
    await firstRow.waitFor({ state: 'visible' });
    await firstRow.click();
    // Wait for product details to load
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify edit button is visible
   */
  async verifyEditButtonVisible(): Promise<void> {
    await this.editButton.waitFor({ state: 'visible' });
  }

  /**
   * Verify products are displayed
   */
  async verifyProductsDisplayed(): Promise<void> {
    const firstRow = this.getFirstProductRow();
    await firstRow.waitFor({ state: 'visible' });
  }
}