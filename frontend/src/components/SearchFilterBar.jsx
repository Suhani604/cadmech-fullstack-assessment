const STATUSES = ['Active', 'Under Maintenance', 'Decommissioned']

export default function SearchFilterBar({ search, setSearch, status, setStatus, type, setType, types, onAddClick }) {
  const barStyle = { display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px', alignItems: 'center' }
  const inputStyle = { padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }

  return (
    <div style={barStyle}>
      <input
        type="text"
        placeholder="Search by name or serial number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ ...inputStyle, flex: '1 1 220px' }}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle}>
        <option value="">All status</option>
        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <select value={type} onChange={(e) => setType(e.target.value)} style={inputStyle}>
        <option value="">All types</option>
        {types.map((t) => <option key={t} value={t}>{t}</option>)}
      </select>
      <button
        onClick={onAddClick}
        style={{ padding: '10px 18px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
      >
        + Add Equipment
      </button>
    </div>
  )
}