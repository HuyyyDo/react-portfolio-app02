// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// App sign-in helper: tries UI first, then programmatic fallback
Cypress.Commands.add('appSignIn', (email, password) => {
	const API_BASE = Cypress.env('API_BASE') || 'http://localhost:4000';
	const creds = {
		email: email || Cypress.env('TEST_EMAIL'),
		password: password || Cypress.env('TEST_PASSWORD')
	};

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

	// Attempt UI sign-in
	return cy.visit('http://localhost:5173/signin').then(() => {
		cy.get('input[placeholder="Email"]').clear().type(creds.email);
		cy.get('input[placeholder="Password"]').clear().type(creds.password);
		cy.contains('Sign In').click();

		return cy.window().its('localStorage').invoke('getItem', 'token').then((t) => {
			if (t && t.length) {
				return t;
			}
			// Programmatic signin fallback
			return cy.request({
				method: 'POST',
				url: `${API_BASE}/signin`,
				body: creds,
				failOnStatusCode: false,
			}).then((r) => {
				const tok = extractToken(r.body || {});
				if (tok) {
					return cy.window().then((win) => {
						win.localStorage.setItem('token', tok);
						return tok;
					});
				}
				// Try alternate route
				return cy.request({
					method: 'POST',
					url: `${API_BASE}/auth/signin`,
					body: creds,
					failOnStatusCode: false,
				}).then((r2) => {
					const tok2 = extractToken(r2.body || {});
					if (tok2) {
						return cy.window().then((win) => {
							win.localStorage.setItem('token', tok2);
							return tok2;
						});
					}
					// No token; return empty string (cookie/session may still work)
					return '';
				});
			});
		});
	});
});

// Seed a token into localStorage before app loads
Cypress.Commands.add('seedToken', (token) => {
	const tok = token || Cypress.env('TEST_TOKEN');
	return cy.visit('http://localhost:5173', {
		onBeforeLoad(win) {
			if (tok) win.localStorage.setItem('token', tok);
		}
	}).then(() => tok || '');
});