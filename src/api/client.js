export const API = import.meta.env.VITE_API_URL?.replace(/\/?$/,'') || 'http://localhost:3000'

async function request(path, opts={}){
  const res = await fetch(API + path, {
    headers: { 'Content-Type':'application/json', ...(opts.headers||{}) },
    ...opts
  })
  if(!res.ok){
    let detail=''
    try{ detail = await res.text() }catch{}
    throw new Error(`API ${res.status}: ${detail || res.statusText}`)
  }
  if(res.status === 204) return null
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

export const api = {
  list: (base) => request(base),
  get: (base, id) => request(`${base}/${id}`),
  create: (base, body) => request(base, { method:'POST', body: JSON.stringify(body) }),
  update: (base, id, body) => request(`${base}/${id}`, { method:'PUT', body: JSON.stringify(body) }),
  remove: (base, id) => request(`${base}/${id}`, { method:'DELETE' }),
  removeAll: (base) => request(base, { method:'DELETE' })
}
