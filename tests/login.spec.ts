import { test, expect } from '@playwright/test';
import { getTestCredentials, getBaseURL, getCurrentRoleCredentials } from '../utils/env';
import { LoginPage } from '../pages/LoginPage';

test('Login test and navigate to dashboard', async ({ browser }) => {
  // Get validated credentials from environment variables
  const credentials = getTestCredentials();
  const roleCredentials = getCurrentRoleCredentials();

  console.log(`🔐 Testing login for ${credentials.environment.toUpperCase()} environment with ${credentials.role.toUpperCase()} role`);

  // Create context with browser-level Basic Auth
  const context = await browser.newContext({
    httpCredentials: {
      username: credentials.config.basicAuth.username,
      password: credentials.config.basicAuth.password,
    }
  });

  const page = await context.newPage();
  const loginPage = new LoginPage(page);

  // Navigate to login page
  await loginPage.goto();

  // Perform login using Page Object Model
  await loginPage.login(roleCredentials);

  // Verify successful login
  await loginPage.verifyLoginSuccess();

  console.log('✅ Login successful');
});