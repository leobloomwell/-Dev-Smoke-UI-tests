/**
 * Environment variable utilities for test configuration
 */

interface TestCredentials {
    basicAuth: {
      username: string;
      password: string;
    };
    uiLogin: {
      email: string;
      password: string;
    };
  }
  
  /**
   * Validates and retrieves required environment variables for authentication
   * @returns TestCredentials object with validated credentials
   * @throws Error if any required environment variable is missing
   */
  export function getTestCredentials(): TestCredentials {
    const basicAuthUsername = process.env.BASIC_AUTH_USERNAME;
    const basicAuthPassword = process.env.BASIC_AUTH_PASSWORD;
    const uiLoginEmail = process.env.UI_LOGIN_EMAIL;
    const uiLoginPassword = process.env.UI_LOGIN_PASSWORD;
  
    const missingVars: string[] = [];
  
    if (!basicAuthUsername) missingVars.push('BASIC_AUTH_USERNAME');
    if (!basicAuthPassword) missingVars.push('BASIC_AUTH_PASSWORD');
    if (!uiLoginEmail) missingVars.push('UI_LOGIN_EMAIL');
    if (!uiLoginPassword) missingVars.push('UI_LOGIN_PASSWORD');
  
    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}\n` +
        'Please ensure all required variables are set in your .env file.\n' +
        'See .env.example for reference.'
      );
    }
  
    return {
      basicAuth: {
        username: basicAuthUsername as string,
        password: basicAuthPassword as string,
      },
      uiLogin: {
        email: uiLoginEmail as string,
        password: uiLoginPassword as string,
      },
    };
  }