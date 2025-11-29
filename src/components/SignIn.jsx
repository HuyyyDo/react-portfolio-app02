import React, { useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.request('/auth/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      localStorage.setItem('token', data.token);
      // optionally store user: localStorage.setItem('user', JSON.stringify(data.user));
      nav('/');
    } catch (error) {
      setErr(error.message || 'Sign in failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      {err && <div style={{color:'red'}}>{err}</div>}
      <div><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
      <div><input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
      <button type="submit">Sign In</button>
    </form>
  );
}
