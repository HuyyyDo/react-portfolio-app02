import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Contact(){
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '', message: ''
  })
  const navigate = useNavigate()

  function update(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function submit(e){
    e.preventDefault()
    // Capture data (for demo, store in localStorage)
    try {
      const entries = JSON.parse(localStorage.getItem('contactEntries') || '[]')
      entries.push({ ...form, at: new Date().toISOString() })
      localStorage.setItem('contactEntries', JSON.stringify(entries))
    } catch {}
    // Redirect to Home with state
    navigate('/', { state: { submitted: true, firstName: form.firstName } })
  }

  return (
    <section>
      <p className="kicker">Contact</p>
      <h2>Let&apos;s work together</h2>
      <div className="grid" style={{marginTop:'1rem'}}>
        <div className="card">
          <p><strong>Email:</strong> huyhoang.ais@gmail.com</p>
          <p><strong>GitHub:</strong> <a href="https://github.com/HuyyyDo2" target="_blank" rel="noreferrer">https://github.com/HuyyyDo2</a></p>
        </div>
        <form className="card" onSubmit={submit} aria-label="Contact form">
          <div className="row">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" value={form.firstName} onChange={update} required />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" value={form.lastName} onChange={update} required />
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="phone">Contact Number</label>
              <input id="phone" name="phone" value={form.phone} onChange={update} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" value={form.email} onChange={update} required />
            </div>
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" value={form.message} onChange={update} required />
          </div>
          <div className="actions">
            <button className="btn" type="submit">Send</button>
          </div>
        </form>
      </div>
    </section>
  )
}
