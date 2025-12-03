// src/pages/SignIn.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import apiIndex from '../api/index'

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
      // Use unified API helper: backend auth at root (/signin)
      const res = await apiIndex.request('/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      const data = res || {}

      const token = data.token || data.jwt || data.accessToken
      if (!token) throw new Error('Sign in failed: no token returned')

      // save auth to localStorage so Cypress / other pages can use it
      window.localStorage.setItem('token', token)
      if (data.user) {
        window.localStorage.setItem('user', JSON.stringify(data.user))
      }

      // go to projects page after successful sign-in
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

      {error && (
        <div style={{ color: 'crimson', marginBottom: 12 }}>
          {error}
        </div>
      )}

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
