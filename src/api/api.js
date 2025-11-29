// simple fetch wrapper that adds token if present
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

function getToken() {
  // token stored as plain token or "Bearer <token>" — we stored raw token
  return localStorage.getItem('token');
}

async function request(path, options = {}) {
  const headers = options.headers || {};
  headers['Content-Type'] = 'application/json';
  const token = getToken();
  if (token) headers['Authorization'] = token; // or `Bearer ${token}` depending on backend
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const errBody = await res.json().catch(()=>({message: res.statusText}));
    const err = new Error(errBody.message || 'API Error');
    err.status = res.status;
    err.body = errBody;
    throw err;
  }
  return res.json();
}

export default { request };
