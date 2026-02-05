# ambassador-friday

[![CI](https://github.com/wlsf82/ambassador-friday/actions/workflows/ci.yml/badge.svg)](https://github.com/wlsf82/ambassador-friday/actions/workflows/ci.yml)

Sample Cypress project to demonstrate how to run tests against different environments logging in with users with different roles.

## Prerequisites

- Node.js installed
- git installed

## Installation

Run `npm install` (or `npm i` for short) to install the dependencies and dev dependencies.

## Starting the Local App

To start the local app server (default: `http://localhost:3000`):

```bash
npm start
```

## Configuration

This project uses a `cypress.env.json` file to store sensitive data (credentials).

1. Create a `cypress.env.json` file in the root directory.
2. Copy the content from `cypress.env.example.json` into `cypress.env.json`.
3. Update the values if necessary (or keep the defaults for the sample project).

The project handles 3 types of users: `FREE`, `PRO`, and `ADMIN`.

## Running Tests

The `package.json` file contains several scripts to run tests in different environments.

### Open Mode

To open the Cypress Test Runner against the **local** environment:

```bash
npm run cy:open
```

To open Cypress against the local app while also starting the server automatically:

```bash
npm run start:server:and:open:local
```

To open the Cypress Test Runner against specific environments:

```bash
# Test environment
npm run cy:open:test

# Staging environment
npm run cy:open:staging

# Production environment
npm run cy:open:prod
```

### Headless Mode

To run tests in headless mode against the **local** environment (default):

```bash
npm run cy:run:local
# or
npm test
```

To run headless tests against the local app while also starting the server automatically:

```bash
npm run start:server:and:test:local
```

To run tests against specific environments:

```bash
# Test environment
npm run cy:run:test

# Staging environment
npm run cy:run:staging

# Production environment
npm run cy:run:prod
```

## Project Structure

- `cypress/e2e/`: Contains the test specifications, including role-based specs (`admin.cy.js`, `free.cy.js`, `pro.cy.js`) and auth flows (`login.cy.js`).
- `cypress/support/`: Contains support files and custom commands.

## Custom Commands

This project adds the following custom commands in `cypress/support/commands.js`:

- `cy.login(environment, userType)`: Logs in via the GUI.
- `cy.sessionLogin(environment, userType)`: Uses `cy.session()` to cache the user session, speeding up tests.

Both commands take an `environment` ('local', 'test', 'staging', 'prod') and a `userType` ('FREE', 'PRO', 'ADMIN').

### Helper Function

The `cypress/support/commands.js` file also contains a helper command:

- `cy.setEnvironmentCredentials(environment)`: Retrieves credentials from `cypress.env.json` via `cy.env()` and returns the credentials object for the selected environment (`local`, `test`, `staging`, `prod`). The returned object is keyed by user roles (`FREE`, `PRO`, `ADMIN`). If an invalid environment is provided, the command logs an error to surface misconfiguration early.

Example:

```js
cy.setEnvironmentCredentials('local').then((credentials) => {
  const email = credentials.ADMIN.USER_EMAIL
  const password = credentials.ADMIN.USER_PASSWORD
})
```

In specs, environment selection is driven by `Cypress.expose('environment')`:

```js
cy.login(Cypress.expose('environment'), 'ADMIN')
```

This ensures the correct credentials are used for the currently selected environment.

## New Cypress Features

This project makes use of two new Cypress features to simplify environment handling:

- [**`cy.env()`**](https://docs.cypress.io/api/commands/env): Retrieves multiple values from `cypress.env.json` file or `CYPRESS_*` variables  in one call. We use it in `cy.setEnvironmentCredentials()` to load all environment credential sets and return the one matching the selected environment.
- [**`Cypress.expose()`**](https://docs.cypress.io/api/cypress-api/expose): Reads config values exposed by Cypress (from `cypress.config.js` or CLI). We expose an `environment` value in [`cypress.config.js`](cypress.config.js) and override it via CLI flags in scripts (e.g., `--expose environment=test`). Specs read it with `Cypress.expose('environment')` to decide which credentials to use.

Configured defaults:

- In [`cypress.config.js`](cypress.config.js), `e2e.expose.environment` is set to `local`.
- In [`package.json`](package.json), scripts pass `--expose environment=…` to target `test`, `staging`, or `prod` when needed.

___

This project was inspired by the following content: [**Logging into different environments with Cypress**](https://dev.to/cypress/logging-into-different-environments-with-cypress-l6i).
