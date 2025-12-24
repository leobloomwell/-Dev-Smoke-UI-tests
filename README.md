# 🌿 Bloomwell DEV – UI Smoke Tests (Playwright)

This repository contains automated **UI smoke tests** for  
`https://admin.marktplatz-dev.bloomwell.de/`  
implemented using **Playwright + TypeScript**.

The purpose of this suite is to validate that the most critical flows of the DEV Admin Portal work correctly after each deployment.

---

## ✅ What This Test Suite Covers

### 🔐 1. Login Flow (Browser + UI Authentication)
The test suite:
- performs **browser-level basic auth** (configured via environment variables)
- performs **UI login** using admin credentials (configured via environment variables)
- verifies successful redirect to dashboard

This ensures that authentication flow works both on backend & frontend.

---

### 🌐 2. Localization / Language Switching
We validate:
- EN → DE → EN switching  
- detection of **mixed-language issues** (example: English UI showing German translations)

This ensures the language selector works and translations load correctly.

---

### 📌 3. Left Sidebar Navigation
We test that each menu item:

| Menu       | Path          | Status |
|-----------|----------------|--------|
| Dashboard | `/dashboard`   | ✔ Loads correct page |
| Orders    | `/orders`      | ✔ |
| Products  | `/products`    | ✔ |
| Pharmacies| `/pharmacies`  | ✔ |
| Settings  | `/settings`    | ✔ |

Each test:
- finds menu item in the sidebar  
- clicks it  
- verifies correct URL  
- verifies correct page content loads  

---

### 🗺️ 4. Page Availability Checks
Deep-link smoke tests confirm that these pages load without errors:

- `/dashboard`
- `/orders`
- `/products`
- `/pharmacies`
- `/settings`

Useful for catching routing issues and missing imports early.

---

### 📑 5. Order Search (Basic Smoke Check)
We verify:
- searching existing sample order numbers  
- handling of "no results found"

Ensures the search bar logic works.

---

### 🧪 6. Product Filters
We validate:
- category filters  
- stock availability filtering  
- active/inactive product filters  

---

### 📝 7. Product Editor (Smoke Level)
Tests that the product editor:
- opens correctly  
- displays product data  
- fields are visible  

This test does **not** modify any product data (non-destructive).

---

### 📄 8. Document Downloads
We verify downloadable documents:
- trigger download event  
- save correctly  
- file is not corrupted  

---

## ⚙️ Environment Setup

### Prerequisites

Before running tests, you need to configure environment variables:

1. **Copy the example environment file:**
   cp .env.example .env
   
2. **Edit `.env` file and add your credentials:**
   BASIC_AUTH_USERNAME=your_basic_auth_username
   BASIC_AUTH_PASSWORD=your_basic_auth_password
   UI_LOGIN_EMAIL=your_ui_login_email@example.com
   UI_LOGIN_PASSWORD=your_ui_login_password

3. **Verify `.env` is in `.gitignore`** (already configured)

**Security Note:** Never commit `.env` file to version control. The `.env.example` file serves as a template and contains no sensitive data.

### Required Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BASIC_AUTH_USERNAME` | HTTP Basic Auth username | ✅ Yes |
| `BASIC_AUTH_PASSWORD` | HTTP Basic Auth password | ✅ Yes |
| `UI_LOGIN_EMAIL` | Admin portal UI login email | ✅ Yes |
| `UI_LOGIN_PASSWORD` | Admin portal UI login password | ✅ Yes |
| `SLACK_BOT_USER_OAUTH_TOKEN` | Slack OAuth token for reporting | ❌ Optional |
| `SLACK_CHANNELS` | Slack channel ID for reporting | ❌ Optional |

---

## 🌍 Multi-Environment & Multi-Role Selection

The test suite supports multiple environments and user roles for flexible testing scenarios.

### Environment Selection

Set `TEST_ENV` to choose the target environment:
- `dev` (default) - Development environment
- `staging` - Staging environment  
- `prod` - Production environment (use with caution!)

# Run tests against dev (default)
TEST_ENV=dev npm test

# Run tests against staging
TEST_ENV=staging npm test### User Role Selection

Set `TEST_ROLE` to choose the user role:
- `admin` (default) - Administrator role
- `pharmacy_user` - Pharmacy user role
- `pharmacy_employee` - Pharmacy employee role

# Run tests with admin role (default)
TEST_ROLE=admin npm test

# Run tests with pharmacy_user role
TEST_ROLE=pharmacy_user npm test### Combined Selection

You can combine environment and role selection:

# Run tests with admin role in dev environment
TEST_ENV=dev TEST_ROLE=admin npm test

# Run tests with pharmacy_user role in staging
TEST_ENV=staging TEST_ROLE=pharmacy_user npm test**Note:** Configure credentials for each environment and role in your `.env` file. See `.env.example` for the required variable structure.

---

## 🚀 How to Run Tests Locally

### 1. Install Dependencies


npm install


### 2. Install Browsers


npx playwright install


### 3. Run all tests


npx playwright test


### 4. Run in headed mode (visible browser)


npx playwright test --headed


### 5. Run a specific test file


npx playwright test tests/login.spec.ts


---

## 📊 Test Reports

Generate Playwright HTML report:


npx playwright show-report


---
