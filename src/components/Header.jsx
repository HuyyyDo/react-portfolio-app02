// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // if you store user
    // force navigation to homepage
    navigate('/');
  };

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.6rem 1rem',
      borderBottom: '1px solid #e6e6e6'
    }}>
      <Link to="/" style={{ fontWeight: '600' }}>My Portfolio</Link>

      <nav style={{ display: 'flex', gap: '0.75rem', marginLeft: '1rem' }}>
        <Link to="/projects">Projects</Link>
        <Link to="/services">Services</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div style={{ marginLeft: 'auto' }}>
        {!token ? (
          <>
            <Link to="/signin" style={{ marginRight: 10 }}>Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <button onClick={handleSignOut}>Sign Out</button>
        )}
      </div>
    </header>
  );
}
