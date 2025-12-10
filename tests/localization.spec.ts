import { test, expect } from '@playwright/test';

test('Language switch EN → DE → EN with confirmation modal', async ({ page }) => {


  await page.waitForURL('**/dashboard', { timeout: 15000 });


  const enFlag = page.locator('img[src*="gb.svg"]');


  await enFlag.first().waitFor({ state: 'visible', timeout: 10000 });


  await enFlag.first().evaluate((el: HTMLElement) => el.click());


  const modalBtn = page.getByRole('button', { name: /continue to change/i });
  await modalBtn.waitFor({ state: 'visible', timeout: 7000 });

  
  await modalBtn.click();


  await page.waitForTimeout(2000);

  const bodyDE = await page.locator('body').innerText();
  expect(bodyDE).toContain('Profil');
  expect(bodyDE).not.toContain('Profile');


  const deFlag = page.locator('img[src*="de.svg"]');
  await deFlag.first().waitFor({ state: 'visible', timeout: 7000 });
  await deFlag.first().evaluate((el: HTMLElement) => el.click());

  const modalBtn2 = page.getByRole('button', { name: /continue to change/i });
  await modalBtn2.waitFor({ state: 'visible', timeout: 7000 });
  await modalBtn2.click();

  await page.waitForTimeout(2000);

  const bodyEN = await page.locator('body').innerText();
  expect(bodyEN).toContain('Profile');
  expect(bodyEN).not.toContain('Profil');
});
