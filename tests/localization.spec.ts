import { test, expect } from '@playwright/test';
import { LanguageSelector } from '../pages/components/LanguageSelector';

test.use({ storageState: 'auth.json' });

test('Language switch EN → DE → EN with confirmation modal', async ({ page }) => {
  const languageSelector = new LanguageSelector(page);
  
  // Wait for dashboard to load
  await page.waitForURL('**/dashboard', { timeout: 15000 });

  // Switch to German
  await languageSelector.switchToGerman();
  await languageSelector.verifyGermanLanguage();

  // Switch back to English
  await languageSelector.switchToEnglish();
  await languageSelector.verifyEnglishLanguage();
});