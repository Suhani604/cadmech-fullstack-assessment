import { useState, useEffect } from 'react'
import { getStats } from '../api'

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, active: 0, underMaintenance: 0, decommissioned: 0 })
  const [byType, setByType] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStats()
      .then((res) => {
        setStats(res.stats)
        setByType(res.byType || [])
      })
      .catch((err) => console.error('Failed to fetch stats:', err))
      .finally(() => setLoading(false))
  }, [])

  const cards = [
    { label: 'Total Equipment', value: stats.total, color: '#6366f1', icon: '📦' },
    { label: 'Active', value: stats.active, color: '#22c55e', icon: '✅' },
    { label: 'Under Maintenance', value: stats.underMaintenance, color: '#ef4444', icon: '🔧' },
    { label: 'Decommissioned', value: stats.decommissioned, color: '#6b7280', icon: '🗑️' },
  ]

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '20px',
    marginBottom: '28px',
  }

  const cardStyle = (color) => ({
    background: '#fff',
    borderRadius: '14px',
    padding: '24px 20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    borderTop: `4px solid ${color}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    minHeight: '110px',
    justifyContent: 'center',
  })

  const maxCount = Math.max(1, ...byType.map((t) => t.count))

  if (loading) return <p>Loading dashboard...</p>

  return (
    <>
      <div style={gridStyle}>
        {cards.map((c) => (
          <div key={c.label} style={cardStyle(c.color)}>
            <span style={{ fontSize: '22px' }}>{c.icon}</span>
            <span style={{ fontSize: '32px', fontWeight: 700, color: '#111827' }}>{c.value}</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              {c.label}
            </span>
          </div>
        ))}
      </div>

      {byType.length > 0 && (
        <div style={{ background: '#fff', borderRadius: '14px', padding: '20px', marginBottom: '28px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 16px' }}>Equipment by Type</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {byType.map((t) => (
              <div key={t.type} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '160px', fontSize: '13px', color: '#374151' }}>{t.type}</span>
                <div style={{ flex: 1, background: '#f3f4f6', borderRadius: '6px', height: '18px', overflow: 'hidden' }}>
                  <div style={{ width: `${(t.count / maxCount) * 100}%`, background: '#6366f1', height: '100%' }} />
                </div>
                <span style={{ width: '24px', fontSize: '13px', fontWeight: 600 }}>{t.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}