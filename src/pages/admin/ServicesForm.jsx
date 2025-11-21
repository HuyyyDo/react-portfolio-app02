import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../api/client'
import { RES } from '../../api/resources'
import Spinner from '../../components/Spinner'
import { toast } from '../../components/Toast'

export default function ServiceForm(){
  const nav = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  const [loading,setLoading] = React.useState(!!isEdit)
  const [saving,setSaving] = React.useState(false)
  const [error,setError] = React.useState('')
  const [form,setForm] = React.useState({ title:'', description:'' })

  React.useEffect(()=>{
    if(!isEdit) return
    let alive = true
    api.get(RES.services, id).then(d=>{{ if(alive) setForm(d) }}).catch(e=>setError(e.message)).finally(()=>setLoading(false))
    return ()=>{{ alive=false }}
  },[id])

  async function onSubmit(e){
    e.preventDefault()
    setSaving(true)
    try{
      if(isEdit) await api.update(RES.services, id, form)
      else await api.create(RES.services, form)
      toast(isEdit? 'Updated' : 'Created')
      nav('/admin/services')
    }catch(e){ setError(e.message) } finally{ setSaving(false) }
  }

  function field(name, type='text', placeholder=''){
    return (
      <div className="col-6">
        <div className="label">{name}</div>
        <input className="input" type={type} placeholder={placeholder}
          value={form[name]||''} onChange={e=>setForm({ ...form, [name]: e.target.value })} />
      </div>
    )
  }

  if(loading) return <div className="card"><Spinner/></div>
  return (
    <form className="card" onSubmit={onSubmit}>
      <h3 style={{marginTop:0}}>'Service' – {isEdit? 'Edit':'Add'}</h3>
      {error && <div className="empty">{error}</div>}
      <div className="row">
  { field('title') }
  { field('description') }
</div>

      <div className="kv" style={{justifyContent:'flex-end', gap:8, marginTop:12}}>
        <button className="btn" type="button" onClick={()=>nav(-1)}>Cancel</button>
        <button className="btn primary" disabled={saving}>{saving? 'Saving…':'Save'}</button>
      </div>
    </form>
  )
}
