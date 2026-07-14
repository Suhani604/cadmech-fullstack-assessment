const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(err.message || `Request failed (${res.status})`)
  }
  return res.json()
}

export const getStats = () => request('/stats')

export const getTypes = () => request('/types')

export const getEquipment = (params = {}) => {
  const cleaned = Object.fromEntries(Object.entries(params).filter(([, v]) => v))
  const query = new URLSearchParams(cleaned).toString()
  return request(`/equipment${query ? `?${query}` : ''}`)
}

export const getEquipmentById = (id) => request(`/equipment/${id}`)

export const createEquipment = (data) =>
  request('/equipment', { method: 'POST', body: JSON.stringify(data) })

export const updateEquipment = (id, data) =>
  request(`/equipment/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const deleteEquipment = (id) =>
  request(`/equipment/${id}`, { method: 'DELETE' })