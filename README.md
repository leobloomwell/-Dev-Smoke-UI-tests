# Dev-Smoke-UI-tests

Automated UI smoke testing suite for the Bloomwell Admin Platform:
https://admin.marktplatz-dev.bloomwell.de

This project contains automation tests intended to quickly validate the availability and core functionality of essential features in the DEV environment. The suite is designed to catch critical UI and navigation issues early before deeper QA begins.

Objectives of Smoke Testing

Verify that the application loads successfully

Validate navigation and core UI flows

Confirm that primary features are functional

Detect regressions early

Verify localization behavior (DE / EN)

Ensure that no blocking UI / JavaScript runtime errors occur

Tech Stack

Dart / Flutter

Patrol (UI automation for Flutter Web)

Patrol App Service / NativeAutomator

Chrome WebDriver (optional)

Requirements

Install the following before running tests:

1. Flutter

https://docs.flutter.dev/get-started/install

2. Dart SDK

Bundled with Flutter.

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


Each test file validates a separate set of critical functionality in the Bloomwell Admin.

Running Tests

Example run:

patrol test --web


or locally in Flutter:

flutter test

Test Coverage Overview

The current smoke suite validates:

Login and authentication flow

Page rendering and navigation

Product table and filtering behavior

Localization switch (EN ↔ DE)

Availability of key UI elements

No blocking runtime errors

Test Execution Status

All smoke tests have been executed successfully on the DEV environment:

https://admin.marktplatz-dev.bloomwell.de

Results:

Application loads correctly

Core UI components are rendered

Localization switch works

Product filters are visible and functional

No critical UI blocks found

The smoke suite is confirmed stable and ready for extension.
