import { useState } from 'react'

const TYPES = ['CNC Machine', 'IoT Sensor', 'Automation Trainer', 'PLC Module', 'Hydraulic System', 'Pneumatic System', 'Electrical Panel']
const STATUSES = ['Active', 'Under Maintenance', 'Decommissioned']

const EMPTY_FORM = { name: '', type: '', status: 'Active', location: '', serial_number: '', description: '', installed_date: '' }

export default function EquipmentForm({ initialData, onSubmit, onClose }) {
  const [form, setForm] = useState(initialData ? { ...EMPTY_FORM, ...initialData } : EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.type) newErrors.type = 'Type is required'
    if (!form.status) newErrors.status = 'Status is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')
    if (!validate()) return
    setSubmitting(true)
    try {
      await onSubmit(form)
    } catch (err) {
      setApiError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const overlayStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }
  const modalStyle = { background: '#fff', borderRadius: '14px', padding: '28px', width: '90%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto' }
  const labelStyle = { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px', fontSize: '13px', fontWeight: 600, color: '#374151' }
  const inputStyle = { padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', fontWeight: 400 }
  const errorStyle = { color: '#ef4444', fontSize: '12px', fontWeight: 400 }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginTop: 0 }}>{initialData ? 'Edit Equipment' : 'Add Equipment'}</h2>
        {apiError && <p style={{ color: '#ef4444', fontSize: '13px' }}>{apiError}</p>}
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>
            Name *
            <input name="name" value={form.name} onChange={handleChange} style={inputStyle} />
            {errors.name && <span style={errorStyle}>{errors.name}</span>}
          </label>
          <label style={labelStyle}>
            Type *
            <select name="type" value={form.type} onChange={handleChange} style={inputStyle}>
              <option value="">Select type</option>
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.type && <span style={errorStyle}>{errors.type}</span>}
          </label>
          <label style={labelStyle}>
            Status *
            <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label style={labelStyle}>
            Location
            <input name="location" value={form.location} onChange={handleChange} style={inputStyle} placeholder="e.g. Lab 3 - Building A" />
          </label>
          <label style={labelStyle}>
            Serial Number
            <input name="serial_number" value={form.serial_number} onChange={handleChange} style={inputStyle} />
          </label>
          <label style={labelStyle}>
            Installed Date
            <input type="date" name="installed_date" value={form.installed_date || ''} onChange={handleChange} style={inputStyle} />
          </label>
          <label style={labelStyle}>
            Description
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} style={inputStyle} />
          </label>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} style={{ padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', background: '#fff', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" disabled={submitting} style={{ padding: '10px 16px', border: 'none', borderRadius: '8px', background: '#6366f1', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
              {submitting ? 'Saving...' : initialData ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}