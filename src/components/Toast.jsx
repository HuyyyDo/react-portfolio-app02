import React from 'react'
let subs = []
export const toast = (msg) => subs.forEach(f=>f(msg))
export default function Toast(){
  const [msg,setMsg] = React.useState(null)
  React.useEffect(()=>{
    const f = (m)=>{ setMsg(m); setTimeout(()=>setMsg(null), 1800) }
    subs.push(f); return ()=>{ subs = subs.filter(x=>x!==f) }
  },[])
  if(!msg) return null
  return <div className="toast">{msg}</div>
}
