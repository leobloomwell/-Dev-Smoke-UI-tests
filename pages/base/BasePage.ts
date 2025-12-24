
import { Page, Locator } from '@playwright/test';
import { getBaseURL } from '../../utils/env';

/**
 * Base page class that provides common functionality for all page objects
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific path relative to base URL
   * @param path - Path to navigate to (e.g., '/dashboard', '/orders')
   */
  async goto(path: string = ''): Promise<void> {
    const baseURL = getBaseURL();
    const url = path.startsWith('http') ? path : `${baseURL}${path}`;
    await this.page.goto(url);
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForLoadState(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for URL to match pattern
   * @param pattern - URL pattern to wait for
   */
  async waitForURL(pattern: string | RegExp): Promise<void> {
    await this.page.waitForURL(pattern);
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Check if element is visible
   * @param locator - Locator to check
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Wait for element to be visible
   * @param locator - Locator to wait for
   * @param timeout - Timeout in milliseconds
   */
  async waitForVisible(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }
}