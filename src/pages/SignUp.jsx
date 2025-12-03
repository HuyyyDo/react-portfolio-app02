// src/pages/SignUp.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';   // ⬅ adjust path if your client file is elsewhere

export default function SignUp() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName,  setLastName]  = React.useState('');
  const [email,     setEmail]     = React.useState('');
  const [password,  setPassword]  = React.useState('');
  const [err,       setErr]       = React.useState(null);
  const [loading,   setLoading]   = React.useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      // This calls:  {API}/auth/signup
      // With client.js: API = http://localhost:4000/api
      const data = await api.create('/auth/signup', {
        firstName,
        lastName,
        email,
        password,
      });

      // If backend returns token + user, save them
      if (data?.token) {
        window.localStorage.setItem('token', data.token);
      }
      if (data?.user) {
        window.localStorage.setItem('user', JSON.stringify(data.user));
      }

      // After signup, you can either go straight to projects:
      // navigate('/projects');
      // or go to signin; your Cypress test already signs in separately,
      // so going to /signin is also fine:
      navigate('/signin');
    } catch (error) {
      console.error('Sign up error:', error);
      setErr(error.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <h2>Sign Up</h2>
      {err && <div style={{ color: 'red', marginBottom: 12 }}>{err}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            placeholder="Last name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Signing up…' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
}
