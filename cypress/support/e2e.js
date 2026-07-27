import './commands';
import '@shelex/cypress-allure-plugin';

// Ignore uncaught exceptions from application under test to prevent spec failure
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});