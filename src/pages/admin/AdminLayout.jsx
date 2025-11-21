import { NavLink, Outlet } from 'react-router-dom'
export default function AdminLayout(){
  return (
    <div className="card">
      <div className="kv" style={{justifyContent:'space-between'}}>
        <h2 style={{margin:0}}>Admin</h2>
        <nav className="nav">
          <NavLink to="users">Users</NavLink>
          <NavLink to="projects">Projects</NavLink>
          <NavLink to="services">Services</NavLink>
          <NavLink to="contacts">Contacts</NavLink>
        </nav>
      </div>
      <Outlet/>
    </div>
  )
}
