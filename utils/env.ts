/**
 * Environment variable utilities for test configuration
 * Supports dev, staging, and production environments
 * Supports multiple user roles: admin, editor, viewer
 */

type Environment = 'dev' | 'staging' | 'prod';
type UserRole = 'admin' | 'pharmacy_user' | 'pharmacy_employee';

interface RoleCredentials {
  email: string;
  password: string;
}

interface EnvironmentConfig {
  baseURL: string;
  basicAuth: {
    username: string;
    password: string;
  };
  roles: {
    admin: RoleCredentials;
    pharmacy_user: RoleCredentials;
    pharmacy_employee: RoleCredentials;
  };
}

interface TestCredentials {
  environment: Environment;
  role: UserRole;
  config: EnvironmentConfig;
}

/**
 * Gets the current environment from environment variable
 * Defaults to 'dev' if not specified
 * @returns Environment name
 */
function getEnvironment(): Environment {
  const env = (process.env.TEST_ENV || 'dev').toLowerCase();
  
  if (env === 'dev' || env === 'staging' || env === 'prod') {
    return env;
  }
  
  throw new Error(
    `Invalid TEST_ENV value: ${env}. Must be one of: dev, staging, prod`
  );
}

/**
 * Gets the current user role from environment variable
 * Defaults to 'admin' if not specified
 * @returns User role name
 */
function getUserRole(): UserRole {
  const role = (process.env.TEST_ROLE || 'admin').toLowerCase();
  
  if (role === 'admin' || role === 'pharmacy_user' || role === 'pharmacy_employee') {
    return role;
  }
  
  throw new Error(
    `Invalid TEST_ROLE value: ${role}. Must be one of: admin, pharmacy_user, pharmacy_employee`
  );
}

/**
 * Gets role-specific credentials from environment variables
 * @param env - Environment name (dev, staging, prod)
 * @param role - User role (admin, pharmacy_user, pharmacy_employee)
 * @returns RoleCredentials for the specified role
 * @throws Error if required environment variables are missing
 */
function getRoleCredentials(env: Environment, role: UserRole): RoleCredentials {
  const envPrefix = env.toUpperCase();
  const rolePrefix = role.toUpperCase();
  
  const email = process.env[`${envPrefix}_${rolePrefix}_EMAIL`];
  const password = process.env[`${envPrefix}_${rolePrefix}_PASSWORD`];

  const missingVars: string[] = [];

  if (!email) missingVars.push(`${envPrefix}_${rolePrefix}_EMAIL`);
  if (!password) missingVars.push(`${envPrefix}_${rolePrefix}_PASSWORD`);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables for ${env} environment, ${role} role: ${missingVars.join(', ')}\n` +
      `Please ensure all required variables are set in your .env file.\n` +
      `See .env.example for reference.`
    );
  }

  return {
    email: email as string,
    password: password as string,
  };
}

/**
 * Gets environment-specific configuration from environment variables
 * @param env - Environment name (dev, staging, prod)
 * @returns EnvironmentConfig for the specified environment
 * @throws Error if any required environment variable is missing
 */
function getEnvironmentConfig(env: Environment): EnvironmentConfig {
  const prefix = env.toUpperCase();
  
  const baseURL = process.env[`${prefix}_BASE_URL`];
  const basicAuthUsername = process.env[`${prefix}_BASIC_AUTH_USERNAME`];
  const basicAuthPassword = process.env[`${prefix}_BASIC_AUTH_PASSWORD`];

  const missingVars: string[] = [];

  if (!baseURL) missingVars.push(`${prefix}_BASE_URL`);
  if (!basicAuthUsername) missingVars.push(`${prefix}_BASIC_AUTH_USERNAME`);
  if (!basicAuthPassword) missingVars.push(`${prefix}_BASIC_AUTH_PASSWORD`);

  // Validate all roles are configured
  const roles = ['admin', 'pharmacy_user', 'pharmacy_employee'] as const;
  for (const role of roles) {
    try {
      getRoleCredentials(env, role);
    } catch (error) {
      // Error already contains detailed missing variables info
      throw error;
    }
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables for ${env} environment: ${missingVars.join(', ')}\n` +
      `Please ensure all required variables are set in your .env file.\n` +
      `See .env.example for reference.`
    );
  }

  return {
    baseURL: baseURL as string,
    basicAuth: {
      username: basicAuthUsername as string,
      password: basicAuthPassword as string,
    },
    roles: {
      admin: getRoleCredentials(env, 'admin'),
      pharmacy_user: getRoleCredentials(env, 'pharmacy_user'),
      pharmacy_employee: getRoleCredentials(env, 'pharmacy_employee'),
    },
  };
}

/**
 * Validates and retrieves test configuration for the current environment and role
 * @returns TestCredentials object with environment, role, and validated configuration
 * @throws Error if environment/role is invalid or any required variable is missing
 */
export function getTestCredentials(): TestCredentials {
  const environment = getEnvironment();
  const role = getUserRole();
  const config = getEnvironmentConfig(environment);

  return {
    environment,
    role,
    config,
  };
}

/**
 * Gets the base URL for the current environment
 * @returns Base URL string
 */
export function getBaseURL(): string {
  const credentials = getTestCredentials();
  return credentials.config.baseURL;
}

/**
 * Gets the current environment name
 * @returns Environment name (dev, staging, prod)
 */
export function getCurrentEnvironment(): Environment {
  return getEnvironment();
}

/**
 * Gets the current user role
 * @returns User role name (admin, pharmacy_user, pharmacy_employee)
 */
export function getCurrentRole(): UserRole {
  return getUserRole();
}

/**
 * Gets credentials for the current role in the current environment
 * @returns RoleCredentials for the current role
 */
export function getCurrentRoleCredentials(): RoleCredentials {
  const credentials = getTestCredentials();
  return credentials.config.roles[credentials.role];
}

/**
 * Gets credentials for a specific role in the current environment
 * @param role - User role (admin, pharmacy_user, pharmacy_employee)
 * @returns RoleCredentials for the specified role
 */
export function getRoleCredentialsForRole(role: UserRole): RoleCredentials {
  const credentials = getTestCredentials();
  return credentials.config.roles[role];
}