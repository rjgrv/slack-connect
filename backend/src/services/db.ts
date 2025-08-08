import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database;

export async function initDB() {
  db = await open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });

  // Create tables
  await db.run(`
    CREATE TABLE IF NOT EXISTS tokens (
      team_id TEXT PRIMARY KEY,
      access_token TEXT,
      refresh_token TEXT,
      expires_at INTEGER
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS scheduled_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      team_id TEXT,
      channel TEXT,
      message TEXT,
      post_at INTEGER,
      status TEXT DEFAULT 'pending'
    )
  `);

  return db;
}

export function getDB() {
  if (!db) throw new Error("DB not initialized!");
  return db;
}
