import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api/client'
import { RES } from '../../api/resources'
import Spinner from '../../components/Spinner'
import { toast } from '../../components/Toast'

export default function UserList(){
  const [items,setItems] = React.useState([])
  const [loading,setLoading] = React.useState(true)
  const [error,setError] = React.useState('')
  React.useEffect(()=>{
    let alive = true
    api.list(RES.users).then(d=>{ if(alive) setItems(d) }).catch(e=>setError(e.message)).finally(()=>setLoading(false))
    return ()=>{ alive=false }
  },[])
  async function onDelete(id){
    if(!confirm('Delete this item?')) return
    await api.remove(RES.users, id)
    setItems(prev => prev.filter(x=> String(x._id)!==String(id)))
    toast('Deleted')
  }
  return (
    <div style={{marginTop:12}}>
      <div className="kv" style={{justifyContent:'space-between'}}>
        <h3 style={{margin:0}}>'Users'</h3>
        <Link to="/admin/users/new" className="btn primary">Add New</Link>
      </div>
      {loading? <div className="empty"><Spinner/></div> :
       error? <div className="empty">{error}</div> :
       items.length===0? <div className="empty">No data yet</div> :
       <table><thead><tr><th>First</th><th>Last</th><th>Email</th><th></th></tr></thead><tbody>
         {items.map(x=> <tr key={x._id}><td>{x.firstname}</td><td>{x.lastname}</td><td>{x.email}</td><td style={{textAlign:'right'}}>
            <Link to={"/admin/users/" + x._id} className="btn">Edit</Link>
            <button className="btn danger" onClick={()=>onDelete(x._id)} style={{marginLeft:8}}>Delete</button>
         </td></tr>)}
       </tbody></table>}
      <div style={{marginTop:8}}><button className="btn" onClick={async()=>{{await api.removeAll(RES.users); setItems([]); toast('All deleted')}}}>Delete All</button></div>
    </div>
  )
}
