import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * Language selector component page object
 */
export class LanguageSelector extends BasePage {
  readonly englishFlag: Locator;
  readonly germanFlag: Locator;
  readonly confirmButton: Locator;

  constructor(page: Page) {
    super(page);
    // Use more semantic approach - look for language selector button/region
    this.englishFlag = page.locator('img[alt*="English" i], img[alt*="EN" i], img[src*="gb.svg"]').first();
    this.germanFlag = page.locator('img[alt*="German" i], img[alt*="DE" i], img[src*="de.svg"]').first();
    this.confirmButton = page.getByRole('button', { name: /continue to change|confirm|ok/i });
  }

  /**
   * Switch to English language
   */
  async switchToEnglish(): Promise<void> {
    await this.englishFlag.waitFor({ state: 'visible', timeout: 10000 });
    await this.englishFlag.click();
    await this.confirmLanguageChange();
  }

  /**
   * Switch to German language
   */
  async switchToGerman(): Promise<void> {
    await this.germanFlag.waitFor({ state: 'visible', timeout: 10000 });
    await this.germanFlag.click();
    await this.confirmLanguageChange();
  }

  /**
   * Confirm language change in modal
   */
  async confirmLanguageChange(): Promise<void> {
    await this.confirmButton.waitFor({ state: 'visible', timeout: 7000 });
    await this.confirmButton.click();
    // Wait for language change to apply
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify page is in German
   */
  async verifyGermanLanguage(): Promise<void> {
    const bodyText = await this.page.locator('body').innerText();
    expect(bodyText).toContain('Profil');
    expect(bodyText).not.toContain('Profile');
  }

  /**
   * Verify page is in English
   */
  async verifyEnglishLanguage(): Promise<void> {
    const bodyText = await this.page.locator('body').innerText();
    expect(bodyText).toContain('Profile');
    expect(bodyText).not.toContain('Profil');
  }
}