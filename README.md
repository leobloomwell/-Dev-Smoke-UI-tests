# Dev-Smoke-UI-tests

Automated UI smoke testing suite for the Bloomwell Admin Platform:
https://admin.marktplatz-dev.bloomwell.de

This project contains automation tests that verify the most critical interface functions and workflows in the DEV environment.
The purpose of this test suite is to detect major UI regressions early and confirm that primary system functionality is not blocked.

Objectives of Smoke Testing

Verify that the application loads successfully

Validate navigation and core UI flows

Confirm that essential features are functional

Detect regressions early

Verify localization behavior (DE / EN)

Ensure that no UI / JavaScript runtime errors occur

Tech Stack

Dart / Flutter

Patrol (UI automation for Flutter Web)

Patrol App Service / NativeAutomator

Chrome WebDriver (optional)

Requirements

Install the following before running the tests:

Flutter
https://docs.flutter.dev/get-started/install

Dart SDK
Bundled with Flutter.

Patrol CLI

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


Each test file validates a separate set of core functionality in the Bloomwell Admin.

Running Tests
Example (recommended):
patrol test --web

Or locally in Flutter:
flutter test

Test Coverage Overview

The current smoke suite validates:

Login and authentication flow

Page rendering and navigation

Product table and filtering behavior

Localization switch (EN ⇆ DE)

Availability of key UI elements

No blocking runtime errors

Test Execution Status

All smoke tests have been executed successfully on the DEV environment:
https://admin.marktplatz-dev.bloomwell.de
