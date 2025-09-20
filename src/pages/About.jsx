// src/pages/About.jsx
export default function About(){ 
  return (
    <section>
      <p className="kicker">About Me</p>
      <h2>Trong Do Huy Hoang</h2>
      <p className="small" style={{marginTop:'.5rem'}}>Software Engineering student · Toronto, Canada</p>

      <div className="grid" style={{marginTop:'1rem'}}>
        <div className="card">
          <p>
            I&apos;m a software developer focused on building reliable, user-friendly applications.
            My toolkit includes JavaScript, React, Node, C#, Python, SQL, Hyperopt and Linux.
          </p>
          <p>Outside of coursework, I build portfolio projects.</p>

          {/* If your resume is in /public, link from the root */}
          <a className="btn" href="/resume.pdf" target="_blank" rel="noreferrer" style={{marginTop:'.5rem'}}>
            Download Resume (PDF)
          </a>
        </div>

        <div className="card" style={{display:'flex', alignItems:'center', gap:'1rem'}}>
          <img
            src="/assets/hvi.jpg"
            alt="Portrait of Trong Do Huy Hoang"
            width="160"
            height="160"
            style={{
              width: 160,
              height: 160,
              objectFit: 'cover',
              borderRadius: '1rem',
              border: '1px solid #1f2a44'
            }}
          />
          <div className="small">
            <p>Hi! That’s me.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
