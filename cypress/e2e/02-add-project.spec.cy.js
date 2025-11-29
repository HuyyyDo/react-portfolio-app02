// cypress/e2e/02-add-project.spec.cy.js
const SIGNIN = 'http://localhost:4000/signin';

describe('Add project (API-authenticated)', () => {
  it('creates a project via the UI (with injected token)', () => {
    // 1) Sign in and store token as an alias (no synchronous return)
    cy.request({
      method: 'POST',
      url: SIGNIN,
      body: {
        email: Cypress.env('TEST_EMAIL'),
        password: Cypress.env('TEST_PASSWORD'),
      },
      failOnStatusCode: false
    }).then((res) => {
      cy.log('signin status: ' + res.status);
      cy.log('signin body: ' + JSON.stringify(res.body));
      if (res.status !== 200 || !res.body?.token) {
        throw new Error('Sign in failed. Inspect logs for details.');
      }
      // store token for later steps
      cy.wrap(res.body.token).as('gotToken');
    });

    // 2) Use the token alias and continue the Cypress command chain
    cy.get('@gotToken').then((token) => {
      // inject token before app loads so SPA reads it on init
      cy.visit('http://localhost:5173/projects/new', {
        onBeforeLoad(win) {
          win.localStorage.setItem('token', token);
        },
      });

      // ensure form exists, fill it
      cy.get('form', { timeout: 10000 }).should('exist');
      cy.get('input[name="title"]', { timeout: 10000 }).clear().type('Cypress Project');
      cy.get('textarea[name="description"]', { timeout: 10000 }).clear().type('Automated test project');

      // intercept the API create path
      cy.intercept('POST', '/api/projects').as('createProject');

      // submit the form
      cy.get('form').submit();

      // wait for API call and assert success
      cy.wait('@createProject', { timeout: 10000 }).then((inter) => {
        const status = inter?.response?.statusCode;
        cy.log('createProject status: ' + status);
        cy.log('createProject body: ' + JSON.stringify(inter?.response?.body));
        expect(status).to.be.oneOf([200, 201]);
      });

      // verify the created project appears in UI
      cy.contains('Cypress Project', { timeout: 10000 }).should('exist');
    });
  });
});
