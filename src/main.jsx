// // import React from 'react'
// // import ReactDOM from 'react-dom/client'
// // import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// // import './styles.css'

// // import App from './App.jsx'
// // import Home from './pages/Home.jsx'
// // import About from './pages/About.jsx'
// // import Projects from './pages/Projects.jsx'
// // import Services from './pages/Services.jsx'
// // import Contact from './pages/Contact.jsx'
// // import SignIn from './pages/SignIn.jsx'
// // import SignUp from './pages/SignUp.jsx'

// // import AdminLayout from './pages/admin/AdminLayout.jsx'
// // import UsersList from './pages/admin/UsersList.jsx'
// // import UsersForm from './pages/admin/UsersForm.jsx'
// // import ProjectsList from './pages/admin/ProjectsList.jsx'
// // import ProjectsForm from './pages/admin/ProjectsForm.jsx'
// // import ServicesList from './pages/admin/ServicesList.jsx'
// // import ServicesForm from './pages/admin/ServicesForm.jsx'
// // import ContactsList from './pages/admin/ContactsList.jsx'
// // import ContactsForm from './pages/admin/ContactsForm.jsx'

// // const router = createBrowserRouter([
// //   {
// //     path: '/',
// //     element: <App />,
// //     children: [
// //       { index: true, element: <Home /> },
// //       { path: 'about', element: <About /> },
// //       { path: 'projects', element: <Projects /> },
// //       { path: 'services', element: <Services /> },
// //       { path: 'contact', element: <Contact /> },

// //       // auth
// //       { path: 'signin', element: <SignIn /> },
// //       { path: 'signup', element: <SignUp /> },

// //       { path: 'admin', element: <AdminLayout />, children: [
// //         { path: 'users', element: <UsersList /> },
// //         { path: 'users/new', element: <UsersForm /> },
// //         { path: 'users/:id', element: <UsersForm /> },
// //         { path: 'projects', element: <ProjectsList /> },
// //         { path: 'projects/new', element: <ProjectsForm /> },
// //         { path: 'projects/:id', element: <ProjectsForm /> },
// //         { path: 'services', element: <ServicesList /> },
// //         { path: 'services/new', element: <ServicesForm /> },
// //         { path: 'services/:id', element: <ServicesForm /> },
// //         { path: 'contacts', element: <ContactsList /> },
// //         { path: 'contacts/new', element: <ContactsForm /> },
// //         { path: 'contacts/:id', element: <ContactsForm /> },
// //       ]},
// //     ]
// //   }
// // ])

// // ReactDOM.createRoot(document.getElementById('root')).render(
// //   <React.StrictMode>
// //     <RouterProvider router={router} />
// //   </React.StrictMode>,
// // )

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import './styles.css'

// import App from './App.jsx'
// import Home from './pages/Home.jsx'
// import About from './pages/About.jsx'
// import Projects from './pages/Projects.jsx'
// import Services from './pages/Services.jsx'
// import Contact from './pages/Contact.jsx'
// import SignIn from './pages/SignIn.jsx'
// import SignUp from './pages/SignUp.jsx'

// import AdminLayout from './pages/admin/AdminLayout.jsx'
// import UsersList from './pages/admin/UsersList.jsx'
// import UsersForm from './pages/admin/UsersForm.jsx'
// import ProjectsList from './pages/admin/ProjectsList.jsx'
// import ProjectsForm from './pages/admin/ProjectsForm.jsx'
// import ServicesList from './pages/admin/ServicesList.jsx'
// import ServicesForm from './pages/admin/ServicesForm.jsx'
// import ContactsList from './pages/admin/ContactsList.jsx'
// import ContactsForm from './pages/admin/ContactsForm.jsx'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: 'about', element: <About /> },

//       // public projects list and new-project route (same form as admin)
//       { path: 'projects', element: <Projects /> },
//       { path: 'projects/new', element: <ProjectsForm /> }, // <-- ADDED

//       { path: 'services', element: <Services /> },
//       { path: 'contact', element: <Contact /> },

//       // auth
//       { path: 'signin', element: <SignIn /> },
//       { path: 'signup', element: <SignUp /> },

//       { path: 'admin', element: <AdminLayout />, children: [
//         { path: 'users', element: <UsersList /> },
//         { path: 'users/new', element: <UsersForm /> },
//         { path: 'users/:id', element: <UsersForm /> },
//         { path: 'projects', element: <ProjectsList /> },
//         { path: 'projects/new', element: <ProjectsForm /> },
//         { path: 'projects/:id', element: <ProjectsForm /> },
//         { path: 'services', element: <ServicesList /> },
//         { path: 'services/new', element: <ServicesForm /> },
//         { path: 'services/:id', element: <ServicesForm /> },
//         { path: 'contacts', element: <ContactsList /> },
//         { path: 'contacts/new', element: <ContactsForm /> },
//         { path: 'contacts/:id', element: <ContactsForm /> },
//       ]},
//     ]
//   }
// ])

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// )

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
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'

// NEW PUBLIC ADD PROJECT PAGE
import AddProject from './pages/AddProject.jsx'

// admin pages
import AdminLayout from './pages/admin/AdminLayout.jsx'
import UsersList from './pages/admin/UsersList.jsx'
import UsersForm from './pages/admin/UsersForm.jsx'
import ProjectsList from './pages/admin/ProjectsList.jsx'
import ProjectsForm from './pages/admin/ProjectsForm.jsx'
import ServicesList from './pages/admin/ServicesList.jsx'
import ServicesForm from './pages/admin/ServicesForm.jsx'
import ContactsList from './pages/admin/ContactsList.jsx'
import ContactsForm from './pages/admin/ContactsForm.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },

      // public project list + create project
      { path: 'projects', element: <Projects /> },
      { path: 'projects/new', element: <AddProject /> },   // <-- THIS IS THE FIX

      { path: 'services', element: <Services /> },
      { path: 'contact', element: <Contact /> },

      // auth
      { path: 'signin', element: <SignIn /> },
      { path: 'signup', element: <SignUp /> },

      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          { path: 'users', element: <UsersList /> },
          { path: 'users/new', element: <UsersForm /> },
          { path: 'users/:id', element: <UsersForm /> },
          { path: 'projects', element: <ProjectsList /> },
          { path: 'projects/new', element: <ProjectsForm /> },
          { path: 'projects/:id', element: <ProjectsForm /> },
          { path: 'services', element: <ServicesList /> },
          { path: 'services/new', element: <ServicesForm /> },
          { path: 'services/:id', element: <ServicesForm /> },
          { path: 'contacts', element: <ContactsList /> },
          { path: 'contacts/new', element: <ContactsForm /> },
          { path: 'contacts/:id', element: <ContactsForm /> },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

