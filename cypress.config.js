const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',  // your dev server URL
    specPattern: 'cypress/e2e/**/*.cy.js',  // where your test files are
    setupNodeEvents(on, config) {
      // optional: add event listeners here if needed
    },
  },
});
