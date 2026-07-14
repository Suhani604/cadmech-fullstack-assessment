/**
 * SQLite connection helper.
 * Opens (or creates) db/equipment.sqlite, and runs schema.sql
 * once on first startup.
 */
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let dbInstance = null;

async function getDb() {
  if (dbInstance) return dbInstance;

  const dbPath = path.join(__dirname, 'equipment.sqlite');

  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await dbInstance.exec('PRAGMA foreign_keys = ON;');

  const existing = await dbInstance.get(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='equipment'"
  );

  if (!existing) {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await dbInstance.exec(schemaSql);
    console.log('✅ Database initialized with schema + seed data');
  }

  return dbInstance;
}

module.exports = { getDb };