# React Portfolio App – API Setup

This app uses a unified API helper (`src/api/index.js`) for all data calls. Set `VITE_API_URL` to your backend base (including `/api`) or the app will default to `http://localhost:4000/api`.

## Expected Backend Routes

- Auth (no `/api` prefix):
	- `POST /signup` → returns user (optionally token)
	- `POST /signin` → returns `{ token }` (or `jwt`/`accessToken`)

- Projects (`/api` prefix):
	- `GET /api/projects`
	- `GET /api/projects/:id`
	- `POST /api/projects` (requires `Authorization: Bearer <token>`) body: `{ title, description, completion? }`
	- `PUT /api/projects/:id` (Bearer)
	- `DELETE /api/projects/:id` (Bearer)
	- `DELETE /api/projects` (delete all; Bearer)

- Services (`/api` prefix):
	- `GET /api/services`
	- `GET /api/services/:id`
	- `POST /api/services` (Bearer) body: `{ title, description }`
	- `PUT /api/services/:id` (Bearer)
	- `DELETE /api/services/:id` (Bearer)
	- `DELETE /api/services` (Bearer)

- Contacts (`/api` prefix):
	- `GET /api/contacts`
	- `GET /api/contacts/:id`
	- `POST /api/contacts` (Bearer) body: `{ firstname, lastname, email }`
	- `PUT /api/contacts/:id` (Bearer)
	- `DELETE /api/contacts/:id` (Bearer)
	- `DELETE /api/contacts` (Bearer)

## CORS Requirements (Dev)

Enable CORS for `http://localhost:5173` and allow headers: `Authorization, Content-Type`. Handle `OPTIONS` preflight for all `/api/*` routes with methods `GET, POST, PUT, DELETE`.

## Environment

Create a `.env` (or `.env.local`) in the project root:

```
VITE_API_URL=http://localhost:4000/api
```

## Running

1. Start backend on port `4000`.
2. Start frontend:

```
npm run dev
```

3. Optional: run Cypress spec to validate add-project flow:

```
npx cypress run --spec cypress/e2e/02-add-project.spec.cy.js
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
