import { NavLink } from 'react-router-dom'

export default function Navbar(){
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a className="brand" href="/">
          <img src="/logo.svg" alt="Logo" width="32" height="32" />
          <span>
            <strong>Trong Do Huy Hoang</strong>
            <small className="mono">Software Developer</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="Main Navigation">
          <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>About</NavLink>
          <NavLink to="/projects" className={({isActive}) => isActive ? 'active' : ''}>Projects</NavLink>
          <NavLink to="/services" className={({isActive}) => isActive ? 'active' : ''}>Services</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}
