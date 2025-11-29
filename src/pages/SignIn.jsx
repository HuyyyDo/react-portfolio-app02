// // src/pages/SignIn.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api'; // make sure src/api/index.js exists (we discussed this)

// export default function SignIn() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [err, setErr] = useState(null);
//   const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const data = await api.request('/auth/signin', {
//         method: 'POST',
//         body: JSON.stringify({ email, password })
//       });
//       if (data.token) {
//         localStorage.setItem('token', data.token);
//         if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
//       }
//       navigate('/projects');
//     } catch (error) {
//       setErr(error.message || 'Sign in failed');
//     }
//   }

//   return (
//     <div className="auth-page">
//       <h2>Sign In</h2>
//       {err && <div style={{color: 'red'}}>{err}</div>}
//       <form onSubmit={handleSubmit}>
//         <div><input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
//         <div><input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
//         <div><button type="submit">Sign In</button></div>
//       </form>
//     </div>
//   );
// }

import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('http://localhost:4000/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const body = await res.json()
      if (!res.ok) {
        // backend returns { status, message } for errors in your app
        throw new Error(body.message || `Sign in failed (${res.status})`)
      }

      // store token in localStorage so other pages can read it
      if (body.token) {
        window.localStorage.setItem('token', body.token)
      } else {
        console.warn('signin: no token in response', body)
      }

      // optional: you may also save some user info
      if (body.user) {
        window.localStorage.setItem('user', JSON.stringify(body.user))
      }

      // redirect to projects (or whatever page fits your flow)
      navigate('/projects')
    } catch (err) {
      console.error('Sign in error', err)
      setError(err.message || 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h2>Sign In</h2>

      {error ? <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div> : null}

      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: 8 }}>
          <input
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: 8, width: '100%' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: 12 }}>
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: 8, width: '100%' }}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
