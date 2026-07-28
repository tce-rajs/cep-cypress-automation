# CEP Automation Framework (Cypress)

Automation framework for CEP using Cypress.

This project automates the Login module and generates Allure reports after execution.

---

# Prerequisites

Install the following software before running the project:

- Node.js (Recommended: v18 LTS)
- npm (comes with Node.js)
- Google Chrome
- Git

Verify installation:

```bash
node -v
npm -v
git --version
```

---

# Project Setup

Clone the repository.

```bash
git clone <repository-url>
```

Go to the project folder.

```bash
cd <project-folder>
```

Install dependencies.

```bash
npm install
```

---

# Running Cypress

## Open Cypress (Interactive Mode)

```bash
npx cypress open
```

> If the Cypress launcher opens as a blank screen, use the headed execution instead.

---

## Run All Tests

```bash
npx cypress run --browser chrome --headed
```

---

## Run a Specific Test

### PIN Login

```bash
npx cypress run --spec "cypress/e2e/login/pinLogin.cy.js" --browser chrome --headed
```

### Password Login

```bash
npx cypress run --spec "cypress/e2e/login/passwordLogin.cy.js" --browser chrome --headed
```

### Login Validation

```bash
npx cypress run --spec "cypress/e2e/login/loginValidation.cy.js" --browser chrome --headed
```

---

# Allure Report

## Execute Tests

```bash
npm run test:allure
```

This command:

- Executes Cypress tests
- Generates Allure results

---

## Generate HTML Report

```bash
npm run allure:generate
```

---

## Open Report

```bash
npm run allure:open
```

The report will open automatically in your browser.

---

# Project Structure

```
cypress
 ├── e2e
 │   └── login
 │        ├── loginValidation.cy.js
 │        ├── passwordLogin.cy.js
 │        ├── pinLogin.cy.js
 │        └── testScenariosAndCases.md
 │
 ├── fixtures
 ├── support
 │    ├── commands.js
 │    └── e2e.js
 │
 └── downloads

allure-results
allure-report

cypress.config.js
package.json
README.md
```

---

# Common Commands

Install dependencies

```bash
npm install
```

Open Cypress

```bash
npx cypress open
```

Run all tests

```bash
npx cypress run --browser chrome --headed
```

Run a single test

```bash
npx cypress run --spec "<spec-file>" --browser chrome --headed
```

Generate Allure report

```bash
npm run allure:generate
```

Open Allure report

```bash
npm run allure:open
```

---

# Troubleshooting

## Cypress opens a blank screen

Run:

```bash
npx cypress run --browser chrome --headed
```

instead of

```bash
npx cypress open
```

---

## Allure report not generated

Check that:

- Tests executed successfully
- `allure-results` folder exists
- `npm run allure:generate` completed successfully

---

## Fresh Installation

```bash
npm install
npx cypress verify
```

---

# Current Automated Module

- Login
  - PIN Login
  - Password Login
  - Login Validation

Future modules will be added incrementally.