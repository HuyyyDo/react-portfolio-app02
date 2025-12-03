// src/api/index.js

// Base URL for the backend API
const API_BASE =
  (import.meta.env.VITE_API_URL &&
    import.meta.env.VITE_API_URL.replace(/\/?$/, '')) ||
  'http://localhost:4000';

// Core helper – always attaches JSON headers and JWT if present
async function request(path, options = {}) {
  const token = window.localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // Attach Authorization header if we have a token
  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  // Try to parse response
  const ct = res.headers.get('content-type') || '';
  let data = null;
  if (ct.includes('application/json')) {
    try {
      data = await res.json();
    } catch {
      data = null;
    }
  } else {
    try {
      data = await res.text();
    } catch {
      data = null;
    }
  }

  // Throw nice errors if not OK
  if (!res.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `API ${res.status} ${res.statusText}`;
    throw new Error(message);
  }

  return data;
}

// Convenience helpers
const api = {
  request,
  get: (path) => request(path),
  post: (path, body) =>
    request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) =>
    request(path, { method: 'PUT', body: JSON.stringify(body) }),
  del: (path) => request(path, { method: 'DELETE' }),
};

export default api;
