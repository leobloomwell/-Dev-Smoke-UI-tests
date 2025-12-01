# -Dev-Smoke-UI-tests

Automated UI Smoke tests for https://admin.marktplatz-dev.bloomwell.de

Overview

This project contains UI smoke tests for the Bloomwell Admin Platform (Flutter Web application).
The tests validate the core functionality and key user flows to ensure that critical features are working in the DEV environment.

The goal of smoke testing:

Check core UI availability

Validate basic navigation and essential workflows

Identify regressions early

Confirm localization behavior

Confirm that the UI loads and runs without blocking errors

Tech Stack

Dart / Flutter

Patrol (UI automation for Flutter Web)

Chrome WebDriver (optional)

Patrol App Service / NativeAutomator

Requirements

Before running tests, install:

1. Flutter

https://docs.flutter.dev/get-started/install

2. Dart SDK

Comes bundled with Flutter.

3. Patrol CLI
dart pub global activate patrol_cli

Project Structure
/tests
  ├─ login_web_test.dart
  ├─ product_filters_test.dart
  ├─ localization_test.dart
  └─ smoke_suite_test.dart
/lib
/config
README.md

Test Execution Status

All included smoke tests were executed successfully against:
https://admin.marktplatz-dev.bloomwell.de

Validated functionality includes:

Login and navigation

Products page and filters

UI rendering and loading state

Localization change EN ↔ DE

Visibility of core UI components

No blocking UI or JavaScript errors observed

The initial smoke-run passed without critical issues, and the framework is ready to be expanded with additional UI workflows.
