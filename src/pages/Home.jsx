import { Link, useLocation } from 'react-router-dom'

export default function Home(){
  const location = useLocation()
  const submitted = location.state?.submitted
  const firstName = location.state?.firstName

  return (
    <section>
      {submitted ? (
        <div className="notice" role="status" aria-live="polite">
          Thanks{firstName ? `, ${firstName}` : ''}! Your message was captured. I&apos;ll get back to you soon.
        </div>
      ) : null}

      <div className="hero">
        <div>
          <p className="kicker">Welcome</p>
          <h1>Hi, I&apos;m <span style={{color:'var(--accent)'}}>Trong Do Huy Hoang</span> — building clean, modern web apps.</h1>
          <p className="lead">
            I create responsive, accessible websites and applications with React, Node, and SQL. I also able to train AI models to find the best suitable model for you to use.
          </p>
          <div style={{display:'flex', gap:'.75rem', marginTop:'1rem'}}>
            <Link to="/about" className="btn" aria-label="Learn more about me">About Me</Link>
            <Link to="/projects" className="btn" style={{background:'#111a32', color:'#e5e7eb', border:'1px solid #1f2a44'}}>
              View Projects
            </Link>
          </div>
        </div>
        <div className="card">
          <p className="kicker">Mission</p>
          <h3>Ship useful software, keep it simple, keep it fast.</h3>
          <p className="small">Clean code, accessible UI, and measurable impact.</p>
        </div>
      </div>
    </section>
  )
}
