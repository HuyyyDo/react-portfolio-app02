describe('Sign Up flow', () => {
  it('should sign up a new user and then sign in', () => {
    cy.visit('/signup');

    cy.get('input[placeholder="First name"]').type(Cypress.env('TEST_FIRSTNAME'));
    cy.get('input[placeholder="Last name"]').type(Cypress.env('TEST_LASTNAME'));
    cy.get('input[placeholder="Email"]').type(Cypress.env('TEST_EMAIL'));
    cy.get('input[placeholder="Password"]').type(Cypress.env('TEST_PASSWORD'));

    cy.contains('Sign Up').click();

    // Sign in via helper (returns token or empty string)
    cy.appSignIn().then((token) => {
      cy.visit('/projects', {
        onBeforeLoad(win) {
          if (token) win.localStorage.setItem('token', token);
        }
      });
    });

    // Assert something that exists on the projects page.
    cy.get('body', { timeout: 10000 }).then(($body) => {
      if ($body.find('.project-item').length) {
        cy.get('.project-item', { timeout: 10000 }).should('exist');
      } else if ($body.find('.projects-list').length) {
        cy.get('.projects-list', { timeout: 10000 }).should('exist');
      } else {
        // fallback to text match (longer timeout)
        cy.contains('Projects', { timeout: 15000 }).should('exist');
      }
    });

    // Optional cleanup
    cy.window().its('localStorage').invoke('removeItem', 'token');
  });
});
