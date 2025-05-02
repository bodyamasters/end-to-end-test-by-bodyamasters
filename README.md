# End-to-End Test

This repository contains automated tests for a CRM system using the [Playwright](https://playwright.dev/) framework.

## Project Structure

```
.
├── config/
│   └── playwright.config.js    # Playwright configuration
├── fixtures/
│   ├── login-data.js       # Test data for authorization
│   └── test-data.js        # General test data
├── page-objects/
│   ├── ChatPage.js         # Chat page object
│   ├── LoginPage.js        # Login page object
│   └── SettingsPage.js     # Settings page object
├── tests/
│   └── verify-script-group-functionality.spec.js  # Test specification
├── README.md               # Project documentation
├── package.json            # Project dependencies and scripts
└── package-lock.json       # Dependency version lock
```

## Setup

The project uses Playwright for web application test automation. Configuration is located in the `config/playwright.config.js` file and is set up to run tests on three major browsers:
- Chromium
- Firefox
- Safari (WebKit)

### Configuration Parameters:

- **Base URL**: `https://stage-astrocrm.obrio.net`
- **Timeouts**:
  - Action timeout: 15 seconds
  - Navigation timeout: 30 seconds
  - Overall test timeout: 60 seconds
- **Screenshots**: Saved only when test fails
- **Video**: Recorded on first failed attempt
- **Tracing**: Collected on first failed attempt

## Page Objects

The project uses the Page Object pattern for organizing code that interacts with pages:

### LoginPage

Class for interacting with the login page, contains methods:
- `goto()` - navigate to login page
- `login(username, password)` - user authorization

### ChatPage

Class for interacting with the chat, contains methods:
- `openFirstChat()` - opening the first chat from the list

### SettingsPage

Class for interacting with settings, contains methods:
- `navigateToSettings()` - navigate to settings page
- `createNewGroup()` - create a new script group
- `deleteGroup()` - delete a script group
- `confirmDelete()` - confirm deletion

## Test Cases

### verify-script-group-functionality.spec.js

This test verifies script group functionality:

1. Login with a valid user
2. Navigate to settings
3. Create a new script group
4. Verify that a success notification is displayed
5. Navigate to chat
6. Open the first chat
7. Verify that the new script group appears in the chat interface

After the test completes, test data is cleaned up (created script group is deleted).

## Test Data

### login-data.js

Contains authorization data:
- Valid user: `test@gmail.com`

### test-data.js

Contains general test data:
- Test group name: `Test Group`
- Script text: `test script`

## Running Tests

```bash
# Run tests in all browsers
npx playwright test

# Run tests in a specific browser
npx playwright test --project=chromium

# Run in debug mode
npx playwright test --debug
```

## Reports

Reports are generated in HTML format. After running the tests, you can view the report:

```bash
npx playwright show-report
```