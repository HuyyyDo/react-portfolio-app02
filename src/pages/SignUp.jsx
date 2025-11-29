// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // ensure src/api/index.js exists

export default function SignUp() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await api.request('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ firstname, lastname, email, password })
      });
      if (data.token) {
        localStorage.setItem('token', data.token);
        if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
      }
      navigate('/projects');
    } catch (error) {
      setErr(error.message || 'Sign up failed');
    }
  }

  return (
    <div className="auth-page">
      <h2>Sign Up</h2>
      {err && <div style={{color: 'red'}}>{err}</div>}
      <form onSubmit={handleSubmit}>
        <div><input placeholder="First name" value={firstname} onChange={e => setFirstname(e.target.value)} required /></div>
        <div><input placeholder="Last name" value={lastname} onChange={e => setLastname(e.target.value)} required /></div>
        <div><input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
        <div><input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
        <div><button type="submit">Sign Up</button></div>
      </form>
    </div>
  );
}
