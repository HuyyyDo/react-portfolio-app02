// import React from "react";
// import { api } from "../../api/client";
// import { useNavigate } from "react-router-dom";
// import { toast } from "../../components/Toast";

// export default function AddProject() {
//   const navigate = useNavigate();
//   const [title, setTitle] = React.useState("");
//   const [description, setDescription] = React.useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await api.post("/projects", {
//         title,
//         description,
//       });

//       toast("Project created!");
//       navigate("/projects");
//     } catch (err) {
//       toast("Failed to create project");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Add New Project</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           name="title"
//           placeholder="Project Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <textarea
//           name="description"
//           placeholder="Project Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <button type="submit">Create Project</button>
//       </form>
//     </div>
//   );
// }

import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddProject() {
  const navigate = useNavigate()
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    const token = window.localStorage.getItem('token')
    if (!token) {
      // no token: redirect to signin so user can log in
      // keep a helpful message in query or use toast as you prefer
      window.alert('You must be signed in to create a project. Redirecting to Sign In.')
      navigate('/signin')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('http://localhost:4000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, description })
      })

      const body = await res.json()
      console.log('create project response', res.status, body)

      if (!res.ok) {
        throw new Error(body.message || `Create failed (${res.status})`)
      }

      // success — go to projects list where the new project should appear
      navigate('/projects')
    } catch (err) {
      console.error('Create project error', err)
      setError(err.message || 'Failed to create project')
      // you can show a toast here instead of alert
      window.alert('Failed to create project: ' + (err.message ?? err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h2>Create New Project</h2>

      {error ? <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div> : null}

      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: 8 }}>
          <span>Title</span>
          <input
            name="title"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ display: 'block', width: '100%', marginTop: 6, padding: 8 }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: 8 }}>
          <span>Description</span>
          <textarea
            name="description"
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            style={{ display: 'block', width: '100%', marginTop: 6, padding: 8 }}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating…' : 'Create Project'}
        </button>
      </form>
    </div>
  )
}
