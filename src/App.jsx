import { Outlet, useNavigation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

export default function App(){
  const nav = useNavigation()
  return (
    <div>
      <Navbar />
      {nav.state === 'loading' ? <div className="container">Loading...</div> : null}
      <main className="container">
        <Outlet />
      </main>
      <footer className="container footer">
        <Footer />
      </footer>
    </div>
  )
}
