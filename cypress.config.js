const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = {
  e2e: {
    baseUrl: "https://ce-qa-school.devstudi.com/teach/whiteboard",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 90000,
    requestTimeout: 20000,
    responseTimeout: 30000,
    video: false,
    screenshotOnRunFailure: true,
    env: {
      allure: true,
      allureReuseAfterSpec: true,
      allureResultsPath: "allure-results"
    },
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
};
