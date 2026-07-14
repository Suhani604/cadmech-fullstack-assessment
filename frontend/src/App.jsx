import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import SearchFilterBar from './components/SearchFilterBar'
import EquipmentList from './components/EquipmentList'
import EquipmentForm from './components/EquipmentForm'
import { getEquipment, getTypes, createEquipment, updateEquipment, deleteEquipment } from './api'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [types, setTypes] = useState([])

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const fetchEquipment = useCallback(() => {
    setLoading(true)
    getEquipment({ search, status, type })
      .then((res) => setItems(res.data))
      .catch((err) => {
        console.error('Failed to fetch equipment:', err)
        setErrorMsg('Could not load equipment. Is the backend running?')
      })
      .finally(() => setLoading(false))
  }, [search, status, type])

  useEffect(() => {
    getTypes().then((res) => setTypes(res.types)).catch(console.error)
  }, [])

  useEffect(() => {
    const timer = setTimeout(fetchEquipment, 400)
    return () => clearTimeout(timer)
  }, [fetchEquipment])

  const handleAddClick = () => { setEditingItem(null); setShowForm(true) }
  const handleEditClick = (item) => { setEditingItem(item); setShowForm(true) }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this equipment item?')) return
    try {
      await deleteEquipment(id)
      fetchEquipment()
    } catch (err) {
      console.error('Failed to delete:', err)
      setErrorMsg(err.message)
    }
  }

  const handleFormSubmit = async (formData) => {
    if (editingItem) await updateEquipment(editingItem.id, formData)
    else await createEquipment(formData)
    setShowForm(false)
    fetchEquipment()
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🔬 SmartLab Equipment Manager</h1>
          <p className="subtitle">Cadmech Engineering Pvt. Ltd.</p>
        </div>
      </header>

      <main className="app-main" style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
        {errorMsg && (
          <p style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px' }}>
            {errorMsg}
          </p>
        )}

        <Dashboard />

        <SearchFilterBar
          search={search} setSearch={setSearch}
          status={status} setStatus={setStatus}
          type={type} setType={setType}
          types={types}
          onAddClick={handleAddClick}
        />

        <EquipmentList items={items} loading={loading} onEdit={handleEditClick} onDelete={handleDelete} />

        {showForm && (
          <EquipmentForm
            initialData={editingItem}
            onSubmit={handleFormSubmit}
            onClose={() => setShowForm(false)}
          />
        )}
      </main>
    </div>
  )
}

export default App