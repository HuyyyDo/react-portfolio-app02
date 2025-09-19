export default function Footer(){
  const year = new Date().getFullYear()
  return (
    <div style={{display:'flex', justifyContent:'space-between', padding:'1rem 0'}}>
      <span>© {year} Trong Do Huy Hoang</span>
      <span className="small">
        <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a> ·{' '}
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
      </span>
    </div>
  )
}
