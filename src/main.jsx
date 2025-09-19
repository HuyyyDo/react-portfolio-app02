import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'

import App from './App.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'projects', element: <Projects /> },
      { path: 'services', element: <Services /> },
      { path: 'contact', element: <Contact /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
