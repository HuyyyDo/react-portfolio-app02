import React, { useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.request('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      });
      localStorage.setItem('token', data.token);
      // you might save user info too
      nav('/'); // or projects page
    } catch (error) {
      setErr(error.message || 'Sign up failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {err && <div style={{color:'red'}}>{err}</div>}
      <div><input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} /></div>
      <div><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
      <div><input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
      <button type="submit">Sign Up</button>
    </form>
  );
}
