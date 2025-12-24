import { Page, Locator } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { getRoleCredentials } from '../utils/env';

/**
 * Login page object
 */
export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly dashboardHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.dashboardHeading = page.locator('span[text=Dashboard]');
  }

  /**
   * Navigate to login page
   */
  async goto(): Promise<void> {
    await super.goto('/');
  }

  /**
   * Fill email input
   * @param email - Email address
   */
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /**
   * Fill password input
   * @param password - Password
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Click login/submit button
   */
  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  /**
   * Perform complete login flow
   * @param credentials - User credentials
   */
  async login(credentials: getRoleCredentials): Promise<void> {
    await this.fillEmail(credentials.email);
    await this.fillPassword(credentials.password);
    await this.clickSubmit();
    await this.waitForURL(/.*\/dashboard/);
  }

  /**
   * Verify successful login by checking dashboard is visible
   */
  async verifyLoginSuccess(): Promise<void> {
    await this.dashboardHeading.isVisible();
  }
}