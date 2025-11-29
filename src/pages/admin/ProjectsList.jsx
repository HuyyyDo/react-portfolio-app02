// import React from 'react'
// import { Link } from 'react-router-dom'
// import { api } from '../../api/client'
// import { RES } from '../../api/resources'
// import Spinner from '../../components/Spinner'
// import { toast } from '../../components/Toast'

// export default function ProjectList(){
//   const [items,setItems] = React.useState([])
//   const [loading,setLoading] = React.useState(true)
//   const [error,setError] = React.useState('')
//   React.useEffect(()=>{
//     let alive = true
//     api.list(RES.projects).then(d=>{ if(alive) setItems(d) }).catch(e=>setError(e.message)).finally(()=>setLoading(false))
//     return ()=>{ alive=false }
//   },[])
//   async function onDelete(id){
//     if(!confirm('Delete this item?')) return
//     await api.remove(RES.projects, id)
//     setItems(prev => prev.filter(x=> String(x._id)!==String(id)))
//     toast('Deleted')
//   }
//   return (
//     <div style={{marginTop:12}}>
//       <div className="kv" style={{justifyContent:'space-between'}}>
//         <h3 style={{margin:0}}>'Projects'</h3>
//         <Link to="/admin/projects/new" className="btn primary">Add New</Link>
//       </div>
//       {loading? <div className="empty"><Spinner/></div> :
//        error? <div className="empty">{error}</div> :
//        items.length===0? <div className="empty">No data yet</div> :
//        <table><thead><tr><th>Title</th><th>Completion</th><th>Description</th><th></th></tr></thead><tbody>
//          {items.map(x=> <tr key={x._id}><td>{x.title}</td><td>{new Date(x.completion).toLocaleDateString?.()||x.completion}</td><td>{x.description}</td><td style={{textAlign:'right'}}>
//             <Link to={"/admin/projects/" + x._id} className="btn">Edit</Link>
//             <button className="btn danger" onClick={()=>onDelete(x._id)} style={{marginLeft:8}}>Delete</button>
//          </td></tr>)}
//        </tbody></table>}
//       <div style={{marginTop:8}}><button className="btn" onClick={async()=>{{await api.removeAll(RES.projects); setItems([]); toast('All deleted')}}}>Delete All</button></div>
//     </div>
//   )
// }

// src/pages/admin/ProjectsList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

import { api } from '../../api/client';
import { RES } from '../../api/resources';
import Spinner from '../../components/Spinner';
import { toast } from '../../components/Toast';

import { deleteProject, deleteAllProjects } from '../../api/projects';

export default function ProjectList(){
  const [items,setItems] = React.useState([]);
  const [loading,setLoading] = React.useState(true);
  const [error,setError] = React.useState('');

  React.useEffect(()=>{
    let alive = true;
    api.list(RES.projects)
      .then(d => { if (alive) setItems(d); })
      .catch(e => { if (alive) setError(e.message || 'Failed to load'); })
      .finally(()=> { if (alive) setLoading(false); });
    return ()=>{ alive = false };
  },[]);

  async function onDelete(id){
    if(!confirm('Delete this item?')) return;
    try {
      await deleteProject(id);
      setItems(prev => prev.filter(x => String(x._id) !== String(id)));
      toast('Deleted');
    } catch (e) {
      console.error(e);
      alert(e.message || 'Delete failed');
    }
  }

  async function onDeleteAll(){
    if(!confirm('Delete ALL projects? This cannot be undone.')) return;
    try {
      await deleteAllProjects();
      setItems([]);
      toast('All deleted');
    } catch (e) {
      console.error(e);
      alert(e.message || 'Delete all failed');
    }
  }

  return (
    <div style={{marginTop:12}}>
      <div className="kv" style={{justifyContent:'space-between'}}>
        <h3 style={{margin:0}}>Projects</h3>
        <Link to="/admin/projects/new" className="btn primary">Add New</Link>
      </div>

      {loading ? (
        <div className="empty"><Spinner/></div>
      ) : error ? (
        <div className="empty">{error}</div>
      ) : items.length === 0 ? (
        <div className="empty">No data yet</div>
      ) : (
        <table style={{width:'100%', borderCollapse:'collapse'}}>
          <thead>
            <tr style={{textAlign:'left'}}>
              <th>Title</th>
              <th>Completion</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(x => (
              <tr key={x._id}>
                <td style={{padding:'8px 6px'}}>{x.title}</td>
                <td style={{padding:'8px 6px'}}>{x.completion ? (new Date(x.completion).toLocaleDateString?.() || x.completion) : ''}</td>
                <td style={{padding:'8px 6px'}}>{x.description}</td>
                <td style={{textAlign:'right', padding:'8px 6px'}}>
                  <Link to={"/admin/projects/" + x._id} className="btn">Edit</Link>
                  <button className="btn danger" onClick={()=>onDelete(x._id)} style={{marginLeft:8}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{marginTop:8}}>
        <button className="btn" onClick={onDeleteAll}>Delete All</button>
      </div>
    </div>
  );
}
