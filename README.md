# ambassador-friday

[![CI](https://github.com/wlsf82/ambassador-friday/actions/workflows/ci.yml/badge.svg)](https://github.com/wlsf82/ambassador-friday/actions/workflows/ci.yml)

Sample Cypress project to demonstrate how to run tests against different environments logging in with users with different roles.

## Prerequisites

- Node.js installed
- git installed

## Installation

Run `npm install` (or `npm i` for short) to install the dependencies and dev dependencies.

## Unit tests

Run `npm run test:unit` to run the unit tests.

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

The `cypress/support/commands.js` file also contains a helper function:

- `setEnvironmentCredentials(environment)`: Sets the `credentials` Cypress environment variable based on the provided `environment`. This allows the custom commands to access the correct credentials (defined in `cypress.env.json`) for `local`, `test`, `staging`, or `prod` environments.

___

This project was inspired by the following content: [**Logging into different environments with Cypress**](https://dev.to/cypress/logging-into-different-environments-with-cypress-l6i).
