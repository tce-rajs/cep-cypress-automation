# Navigation Module Documentation (MOD-002)

## Overview
This module automates the Navigation business flow of CEP V2, verifying that teachers can select Grade, Division, Subject, Chapter, and Topic seamlessly to load their playlist.

## File Structure
- `navigation.cy.js`: Cypress test specification covering TS001 - TS014.
- `navigation.page.js`: Page Object getters for navigation elements.
- `navigation.actions.js`: High-level business actions (`loginByPin`, `openClassPopup`, `selectGrade`, `selectChapter`, etc.).
- `navigation.assertions.js`: Dedicated assertion validations.
- `navigation.locators.js`: Centralized repository of `data-qa-id` selectors.
- `navigation.data.js`: Test data fixtures.

## Execution
To run the Navigation specs:
```bash
npx cypress run --spec "cypress/e2e/navigation/navigation.cy.js"
```
