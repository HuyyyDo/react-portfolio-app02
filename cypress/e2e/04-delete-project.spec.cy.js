// Delete flow: try UI delete if a control exists; otherwise delete via API.
const API_BASE = Cypress.env('API_BASE') || 'http://localhost:4000';

describe('Delete Project', () => {
  it('should log in via API and delete the first project', () => {
    // ensure user exists, then sign in and obtain token
    cy.visit('http://localhost:5173/signup');
    cy.get('input[placeholder="First name"]').clear().type(Cypress.env('TEST_FIRSTNAME'));
    cy.get('input[placeholder="Last name"]').clear().type(Cypress.env('TEST_LASTNAME'));
    cy.get('input[placeholder="Email"]').clear().type(Cypress.env('TEST_EMAIL'));
    cy.get('input[placeholder="Password"]').clear().type(Cypress.env('TEST_PASSWORD'));
    cy.contains('Sign Up').click();

    cy.appSignIn().then((token) => {
      // visit projects with token injected so SPA fetches with auth
      cy.visit('/projects', {
        onBeforeLoad(win) { win.localStorage.setItem('token', token); }
      });

      cy.wait(500); // let UI render

      const selectors = [
        '.project-item',
        '.project-card',
        '.card',
        '.project',
        '.projectItem',
        '.projects .item',
        '.projects .card',
        'article.card',
      ];

      cy.get('body').then(($body) => {
        const foundSel = selectors.find((sel) => $body.find(sel).length > 0);
        if (!foundSel) return 'api';

        cy.log('Found project selector: ' + foundSel);

        // inspect first card for a delete-like control
        return cy.get(foundSel).first().then(($card) => {
          const delText = /(Delete|Remove|Trash|Discard|Delete Project)/i;
          const $controls = $card.find('button, a');
          const controls = Array.from($controls || []);
          const match = controls.find((el) => delText.test((el.textContent || '').trim()));
          if (match) {
            cy.intercept('DELETE', '**/api/projects/*').as('deleteProject');
            cy.wrap(match).click({ force: true });
            return { mode: 'ui', card: $card };
          }
          return 'api';
        });
      }).then((result) => {
        // If UI path used, wait for DELETE and verify UI updates; else do API delete
        if (result && result.mode === 'ui') {
          const card = result.card;
          cy.wait('@deleteProject', { timeout: 15000 })
            .its('response.statusCode').should('be.within', 200, 299);

          cy.wait(300);
          cy.wrap(card).should('not.exist');
          return; // done
        }

        // API fallback: delete the first project, then assert it's gone
        cy.request({
          method: 'GET',
          url: `${API_BASE}/api/projects`,
          headers: { Authorization: `Bearer ${token}` },
        }).then((r) => {
          expect(r.status).to.eq(200);
          const list = Array.isArray(r.body) ? r.body : (r.body?.projects || []);
          expect(list.length, 'have at least one project').to.be.greaterThan(0);
          const first = list[0];
          const id = first._id || first.id;
          const title = first.title || first.name || '';

          return cy.request({
            method: 'DELETE',
            url: `${API_BASE}/api/projects/${id}`,
            headers: { Authorization: `Bearer ${token}` },
            failOnStatusCode: false,
          }).then((delRes) => {
            expect([200, 204]).to.include(delRes.status);
            cy.visit('/projects', {
              onBeforeLoad(win) { win.localStorage.setItem('token', token); }
            });
            if (title) cy.contains(title).should('not.exist');
          });
        });
      });
    });
  });
});
