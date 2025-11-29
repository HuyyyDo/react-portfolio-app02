// import { NavLink } from 'react-router-dom'

// export default function Navbar(){
//   return (
//     <header className="navbar">
//       <div className="container navbar-inner">
//         <a className="brand" href="/">
//           <img src="/logo.svg" alt="Logo" width="32" height="32" />
//           <span>
//             <strong>Trong Do Huy Hoang</strong>
//             <small className="mono">Software Developer</small>
//           </span>
//         </a>
//         <nav className="nav-links" aria-label="Main Navigation">
//           <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
//           <NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>About</NavLink>
//           <NavLink to="/projects" className={({isActive}) => isActive ? 'active' : ''}>Projects</NavLink>
//           <NavLink to="/services" className={({isActive}) => isActive ? 'active' : ''}>Services</NavLink>
//           <NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink>
//           <NavLink to="/admin/users" className={({isActive}) => isActive ? "active" : ""}>Admin</NavLink>
//         </nav>
//       </div>
//     </header>
//   )
// }

// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // if you store user object
    // redirect to home
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand">My Portfolio</Link>
      </div>

      <nav className="navbar-center">
        <Link to="/projects" className="nav-link">Projects</Link>
        <Link to="/services" className="nav-link">Services</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>

      <div className="navbar-right">
        {!token ? (
          <>
            <Link to="/signin" className="btn-link">Sign In</Link>
            <Link to="/signup" className="btn primary">Sign Up</Link>
          </>
        ) : (
          <>
            <button onClick={handleSignOut} className="btn">Sign Out</button>
          </>
        )}
      </div>
    </header>
  );
}

