# 🌿 Bloomwell DEV – UI Smoke Tests (Playwright)

This repository contains automated **UI smoke tests** for  
`https://admin.marktplatz-dev.bloomwell.de/`  
implemented using **Playwright + TypeScript**.

The purpose of this suite is to validate that the most critical flows of the DEV Admin Portal work correctly after each deployment.

---

## ✅ What This Test Suite Covers

### 🔐 1. Login Flow (Browser + UI Authentication)
The test suite:
- performs **browser-level basic auth** (`gb / gb-dev-2023`)
- performs **UI login** using admin credentials
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

## 📂 Project Structure

/tests
├── login.spec.ts
├── localization.spec.ts
├── navigation_menu.spec.ts
├── page_availability.spec.ts
├── order_search.spec.ts
├── order_statuses.spec.ts
├── product_filters.spec.ts
├── product_editor.spec.ts
├── document_downloads.spec.ts

/playwright.config.ts
/package.json
/README.md


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
