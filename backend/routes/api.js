const express = require('express');
const router = express.Router();
const { getDb } = require('../db/db');

const VALID_TYPES = [
  'CNC Machine',
  'IoT Sensor',
  'Automation Trainer',
  'PLC Module',
  'Hydraulic System',
  'Pneumatic System',
  'Electrical Panel',
];

const VALID_STATUSES = ['Active', 'Under Maintenance', 'Decommissioned'];

router.get('/equipment', async (req, res) => {
  try {
    const db = await getDb();
    const { search, type, status } = req.query;
    let query = 'SELECT * FROM equipment WHERE 1=1';
    const params = [];
    if (search) {
      query += ' AND (name LIKE ? OR serial_number LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    if (type) { query += ' AND type = ?'; params.push(type); }
    if (status) { query += ' AND status = ?'; params.push(status); }
    query += ' ORDER BY created_at DESC';
    const data = await db.all(query, params);
    res.json({ data });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
});

router.get('/equipment/:id', async (req, res) => {
  try {
    const db = await getDb();
    const item = await db.get('SELECT * FROM equipment WHERE id = ?', [req.params.id]);
    if (!item) return res.status(404).json({ error: 'Not Found', message: 'Equipment not found' });
    res.json(item);
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
});

router.post('/equipment', async (req, res) => {
  try {
    const { name, type, status, location, serial_number, description, installed_date } = req.body;
    if (!name || !type || !status) {
      return res.status(400).json({ error: 'Validation Error', message: 'name, type, and status are required fields' });
    }
    if (!VALID_TYPES.includes(type)) {
      return res.status(400).json({ error: 'Validation Error', message: `type must be one of: ${VALID_TYPES.join(', ')}` });
    }
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: 'Validation Error', message: `status must be one of: ${VALID_STATUSES.join(', ')}` });
    }
    const db = await getDb();
    const result = await db.run(
      `INSERT INTO equipment (name, type, status, location, serial_number, description, installed_date)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, type, status, location || null, serial_number || null, description || null, installed_date || null]
    );
    const created = await db.get('SELECT * FROM equipment WHERE id = ?', [result.lastID]);
    res.status(201).json(created);
  } catch (error) {
    console.error('Error creating equipment:', error);
    if (error.message && error.message.includes('UNIQUE')) {
      return res.status(409).json({ error: 'Conflict', message: 'Serial number already exists' });
    }
    res.status(500).json({ error: 'Failed to create equipment' });
  }
});

router.put('/equipment/:id', async (req, res) => {
  try {
    const db = await getDb();
    const existing = await db.get('SELECT * FROM equipment WHERE id = ?', [req.params.id]);
    if (!existing) return res.status(404).json({ error: 'Not Found', message: 'Equipment not found' });
    const { name, type, status, location, serial_number, description, installed_date } = req.body;
    if (type && !VALID_TYPES.includes(type)) {
      return res.status(400).json({ error: 'Validation Error', message: `type must be one of: ${VALID_TYPES.join(', ')}` });
    }
    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: 'Validation Error', message: `status must be one of: ${VALID_STATUSES.join(', ')}` });
    }
    await db.run(
      `UPDATE equipment SET name = ?, type = ?, status = ?, location = ?, serial_number = ?, description = ?, installed_date = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [name ?? existing.name, type ?? existing.type, status ?? existing.status, location ?? existing.location, serial_number ?? existing.serial_number, description ?? existing.description, installed_date ?? existing.installed_date, req.params.id]
    );
    const updated = await db.get('SELECT * FROM equipment WHERE id = ?', [req.params.id]);
    res.json(updated);
  } catch (error) {
    console.error('Error updating equipment:', error);
    if (error.message && error.message.includes('UNIQUE')) {
      return res.status(409).json({ error: 'Conflict', message: 'Serial number already exists' });
    }
    res.status(500).json({ error: 'Failed to update equipment' });
  }
});

router.delete('/equipment/:id', async (req, res) => {
  try {
    const db = await getDb();
    const existing = await db.get('SELECT * FROM equipment WHERE id = ?', [req.params.id]);
    if (!existing) return res.status(404).json({ error: 'Not Found', message: 'Equipment not found' });
    await db.run('DELETE FROM equipment WHERE id = ?', [req.params.id]);
    res.json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    console.error('Error deleting equipment:', error);
    res.status(500).json({ error: 'Failed to delete equipment' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const db = await getDb();
    const { total } = await db.get('SELECT COUNT(*) AS total FROM equipment');
    const { active } = await db.get("SELECT COUNT(*) AS active FROM equipment WHERE status = 'Active'");
    const { underMaintenance } = await db.get("SELECT COUNT(*) AS underMaintenance FROM equipment WHERE status = 'Under Maintenance'");
    const { decommissioned } = await db.get("SELECT COUNT(*) AS decommissioned FROM equipment WHERE status = 'Decommissioned'");
    const byType = await db.all('SELECT type, COUNT(*) AS count FROM equipment GROUP BY type ORDER BY count DESC');
    res.json({ stats: { total, active, underMaintenance, decommissioned }, byType });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

router.get('/types', (req, res) => {
  res.json({ types: VALID_TYPES });
});

module.exports = router;