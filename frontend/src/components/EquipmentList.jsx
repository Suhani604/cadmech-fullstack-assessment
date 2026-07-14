export default function EquipmentList({ items, onEdit, onDelete, loading }) {
  if (loading) return <p style={{ padding: '20px' }}>Loading equipment...</p>
  if (items.length === 0) return <p style={{ padding: '20px', color: '#6b7280' }}>No equipment found.</p>

  const statusColor = { Active: '#22c55e', 'Under Maintenance': '#ef4444', Decommissioned: '#6b7280' }

  return (
    <div className="equipment-list">
      <table className="equipment-table" style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: '#f9fafb', textAlign: 'left' }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Location</th>
            <th style={thStyle}>Serial #</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={tdStyle} data-label="Name">{item.name}</td>
              <td style={tdStyle} data-label="Type">{item.type}</td>
              <td style={tdStyle} data-label="Status">
                <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, color: '#fff', background: statusColor[item.status] || '#6b7280' }}>
                  {item.status}
                </span>
              </td>
              <td style={tdStyle} data-label="Location">{item.location || '—'}</td>
              <td style={tdStyle} data-label="Serial #">{item.serial_number || '—'}</td>
              <td style={tdStyle} data-label="Actions">
                <button onClick={() => onEdit(item)} style={actionBtnStyle}>Edit</button>
                <button onClick={() => onDelete(item.id)} style={{ ...actionBtnStyle, color: '#ef4444' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const thStyle = { padding: '12px 16px', fontSize: '13px', color: '#374151' }
const tdStyle = { padding: '12px 16px', fontSize: '14px' }
const actionBtnStyle = { background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', fontWeight: 600, fontSize: '13px', marginRight: '12px' }