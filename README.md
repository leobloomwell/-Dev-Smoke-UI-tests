# 🌿 Bloomwell DEV – UI Smoke Tests (Playwright)

This repository contains automated **UI smoke tests** for  
`https://admin.marktplatz-dev.bloomwell.de/`  
implemented using **Playwright + TypeScript**.

The purpose of this suite is to validate that the most critical flows of the DEV Admin Portal work correctly after each deployment.

---

##  What This Test Suite Covers

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

| Menu | Path | Status |
|------|------|--------|
| Dashboard | `/dashboard` | ✔ Loads correct page |
| Orders | `/orders` | ✔ |
| Products | `/products` | ✔ |
| Pharmacies | `/pharmacies` | ✔ |
| Settings | `/settings` | ✔ |

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

Useful for catching routing problems and missing imports early.

---

### 📑 5. Order Search (Basic Search Check)
Smoke-level validation:
- searching existing sample order numbers  
- verifying “not found” handling

Ensures the search bar logic works.

---

### 🧪 6. Product Filters
We verify:
- category filters
- stock availability
- active/inactive filtering

This confirms filtering logic and API responses work correctly.

---

### 📝 7. Product Editor (Smoke)
Tests that the product editor:
- opens
- renders fields
- loads product data

(No destructive editing — only read-only smoke checks.)

---

### 📄 8. Document Downloads
We validate that the application can successfully download documents (PDF, invoices, etc.), ensuring:

- file appears in downloads folder  
- download event is triggered  
- file is not corrupted  

---

## 📂 Project Structure

