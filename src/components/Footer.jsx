export default function Footer(){
  const year = new Date().getFullYear()
  return (
    <div style={{display:'flex', justifyContent:'space-between', padding:'1rem 0'}}>
      <span>© {year} Trong Do Huy Hoang</span>
      <span className="small">
        <a href="https://github.com/HuyyyDo2/react-portfolio-app02" target="_blank" rel="noreferrer">GitHub</a> ·{' '}
      </span>
    </div>
  )
}
