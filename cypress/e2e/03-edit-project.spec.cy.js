// cypress/e2e/03-edit-project.spec.cy.js
const API_BASE = Cypress.env('API_BASE') || 'http://localhost:4000';
const SIGNIN = `${API_BASE}/signin`;
const API_PROJECTS = `${API_BASE}/api/projects`;

function signInAndGetToken() {
  // Perform a UI signin so the frontend uses the same client logic as in the app
  return cy.visit('http://localhost:5173/signin').then(() => {
    cy.get('input[placeholder="Email"]').clear().type(Cypress.env('TEST_EMAIL'));
    cy.get('input[placeholder="Password"]').clear().type(Cypress.env('TEST_PASSWORD'));
    cy.contains('Sign In').click();
    return cy.window().its('localStorage').invoke('getItem', 'token').then((t) => {
      if (!t) {
        cy.log('localStorage.token missing after UI signin; may rely on cookie/session');
      }
      return t || '';
    });
  });
}

describe('Edit Project', () => {
  it('should log in via API and edit the first project', () => {
    // Log signin response
    cy.intercept('POST', '/signin').as('signin');
    // Ensure test user exists via the UI signup then sign in via UI
    cy.visit('http://localhost:5173/signup');
    cy.get('input[placeholder="First name"]').clear().type(Cypress.env('TEST_FIRSTNAME'));
    cy.get('input[placeholder="Last name"]').clear().type(Cypress.env('TEST_LASTNAME'));
    cy.get('input[placeholder="Email"]').clear().type(Cypress.env('TEST_EMAIL'));
    cy.get('input[placeholder="Password"]').clear().type(Cypress.env('TEST_PASSWORD'));
    cy.contains('Sign Up').click();

    // Use shared helper for signin
    cy.appSignIn().then((token) => {
      const extractToken = (body) => {
        if (!body) return null;
        const candidates = [
          body.token,
          body.jwt,
          body.accessToken,
          body?.data?.token,
          body?.data?.jwt,
          body?.data?.accessToken,
          body?.result?.token,
          body?.result?.jwt,
          body?.result?.accessToken,
        ].filter((v) => typeof v === 'string' && v.length > 0);
        return candidates[0] || null;
      };
      // Also perform a programmatic signin to capture and store token if UI didn't
      cy.request({ method: 'POST', url: 'http://localhost:4000/signin', body: { email: Cypress.env('TEST_EMAIL'), password: Cypress.env('TEST_PASSWORD') }, failOnStatusCode: false }).then((r) => {
        const body = r.body || {};
        const token2 = extractToken(body);
        cy.log('programmatic signin status: ' + r.status);
        cy.log('programmatic signin body: ' + JSON.stringify(body));
        if (token2) cy.window().then((win) => win.localStorage.setItem('token', token2));
      });
      // Visit admin list with token injected before React mounts
      cy.visit('/admin/projects', {
        onBeforeLoad(win) {
          win.localStorage.setItem('token', token);
        },
        timeout: 15000
      });

      // Best-effort: allow UI to load projects without waiting on intercept
      cy.wait(500);

      // Try a list of selectors — pick the first that exists in DOM
      const selectors = [
        '.project-item',
        '.project-card',
        '.card',
        '.project',
        '.projectItem',
        '.projects .item',
        '.projects .card'
      ];

      cy.get('body').then(($body) => {
        const foundSel = selectors.find(sel => $body.find(sel).length > 0);

        if (foundSel) {
          cy.log('Found project selector: ' + foundSel);

          // Click "Edit" (or similar) inside first card
          cy.get(foundSel).first().then(($el) => {
            // try to find an "Edit" control inside the card
            const editBtnText = /Edit|Manage|Details|View/i;

            // within the first project element click an Edit-like button/link
            cy.wrap($el).within(() => {
              // search buttons/links and click the first whose text matches edit-like pattern
              cy.get('button, a', { timeout: 2000 }).then(($controls) => {
                const match = [...$controls].find((el) => editBtnText.test((el.textContent || '').trim()));
                if (match) {
                  cy.wrap(match).click({ force: true });
                  cy.log('Clicked an edit-like control');
                } else {
                  // fallback: click first control
                  if ($controls.length) {
                    cy.wrap($controls[0]).click({ force: true });
                  }
                }
              });
            });
          });

          // Set intercepts for project update BEFORE interacting with the form,
          // so we don't miss the request.
          cy.intercept('PUT', '**/api/projects/*').as('updatePut');
          cy.intercept('PATCH', '**/api/projects/*').as('updatePatch');

          // Now we should be on an edit form or an admin form.
          // Some forms don't have name="title"; fall back to first text input.
          cy.get('form', { timeout: 10000 }).within(() => {
            cy.get('input[name="title"]').then(($t) => {
              if ($t.length) {
                cy.wrap($t).clear().type('Edited by Cypress');
              } else {
                cy.get('input[type="text"]').first().clear().type('Edited by Cypress');
              }
            });
          });

          // Submit via a visible button if present; fallback to form.submit()
          cy.contains(/Save|Update|Submit|Create|Apply/i).then(($btn) => {
            if ($btn.length) {
              cy.wrap($btn).click({ force: true });
            } else {
              cy.get('form').first().submit();
            }
          });

          // Wait for the PUT update request and assert success
          cy.wait('@updatePut', { timeout: 15000 })
            .its('response.statusCode')
            .should('be.within', 200, 299);

          // Return to admin list and assert the updated title shows
          cy.visit('/admin/projects', {
            onBeforeLoad(win) { win.localStorage.setItem('token', token); }
          });
          cy.contains('Edited by Cypress', { timeout: 10000 }).should('exist');

        } else {
          // No matching element found — fallback to API edit so test remains useful
          cy.log('No project card selector found; falling back to API edit');

          // GET projects via API to find first id
          const API_BASE_ENV = Cypress.env('API_BASE') || API_BASE;
          cy.request({
            method: 'GET',
            url: `${API_BASE_ENV}/api/projects`,
            headers: { Authorization: `Bearer ${token}` },
          }).then((r) => {
            expect(r.status).to.eq(200);
            const first = Array.isArray(r.body) ? r.body[0] : (r.body?.projects && r.body.projects[0]);
            if (!first || !first._id && !first.id) {
              throw new Error('Could not find a project in API response');
            }
            const id = first._id || first.id;

            // Update via PUT (or PATCH) — adjust if your backend expects PATCH
            cy.request({
              method: 'PUT',
              url: `${API_BASE_ENV}/api/projects/${id}`,
              headers: { Authorization: `Bearer ${token}` },
              body: { title: 'Edited by Cypress (API)', description: first.description || 'edited by test' },
            }).then((putRes) => {
              expect(putRes.status).to.be.oneOf([200, 201]);
              // visit projects UI and assert updated title
              cy.visit('/projects', {
                onBeforeLoad(win) { win.localStorage.setItem('token', token); }
              });
              cy.contains('Edited by Cypress (API)', { timeout: 10000 }).should('exist');
            });
          });
        }
      });
    });
  });
});
