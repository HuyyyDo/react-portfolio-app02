// Base API URL
// - If VITE_API_URL is set (for Render/Vercel), we use that.
// - Otherwise default to local backend: http://localhost:4000
//   (Backend exposes auth at root: /signup, /signin)
export const API =
  (import.meta.env.VITE_API_URL?.replace(/\/??$/, '')) || 'http://localhost:4000';

async function request(path, opts = {}) {
  // ensure path starts with a single leading slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  const res = await fetch(API + normalizedPath, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  });

  if (!res.ok) {
    let detail = '';
    try {
      detail = await res.text();
    } catch {
      // ignore
    }
    throw new Error(`API ${res.status}: ${detail || res.statusText}`);
  }

  if (res.status === 204) return null;

  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : res.text();
}

export const api = {
  list: (base) => request(base),
  get: (base, id) => request(`${base}/${id}`),
  create: (base, body) =>
    request(base, { method: 'POST', body: JSON.stringify(body) }),
  update: (base, id, body) =>
    request(`${base}/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  remove: (base, id) => request(`${base}/${id}`, { method: 'DELETE' }),
  removeAll: (base) => request(base, { method: 'DELETE' }),
};
