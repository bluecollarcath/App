// Database access for Ohmentum.
//
// - Production: PostgreSQL, selected by setting DATABASE_URL (e.g. a Render Postgres database).
// - Local development: an embedded SQLite file (DATABASE_PATH, default ./data.sqlite).
//
// Queries are written once with `?` placeholders in SQL that both engines accept;
// for Postgres the placeholders are rewritten to $1, $2, ...

import Database from 'better-sqlite3';
import pg from 'pg';

export interface Db {
  kind: 'postgres' | 'sqlite';
  all<T>(sql: string, params?: unknown[]): Promise<T[]>;
  get<T>(sql: string, params?: unknown[]): Promise<T | undefined>;
  run(sql: string, params?: unknown[]): Promise<{ changes: number }>;
}

// Shared schema. Only the auto-increment id column differs between engines.
function schema(idCol: string, bigint: string) {
  return [
    `CREATE TABLE IF NOT EXISTS users (
      id ${idCol},
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      token_version INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      stripe_customer_id TEXT,
      stripe_subscription_id TEXT,
      sub_status TEXT,
      sub_plan TEXT,
      sub_period_end ${bigint}
    )`,
    `CREATE TABLE IF NOT EXISTS progress (
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      course_slug TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      completed_at TEXT NOT NULL,
      PRIMARY KEY (user_id, course_slug, lesson_id)
    )`,
    `CREATE TABLE IF NOT EXISTS password_resets (
      token_hash TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at ${bigint} NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS error_reports (
      id ${idCol},
      course_slug TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      user_id INTEGER,
      email TEXT,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL,
      resolved INTEGER NOT NULL DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS assessment_attempts (
      id ${idCol},
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      course_slug TEXT NOT NULL,
      assessment_id TEXT NOT NULL,
      score INTEGER NOT NULL,
      total INTEGER NOT NULL,
      percent INTEGER NOT NULL,
      answers TEXT NOT NULL,
      created_at TEXT NOT NULL
    )`,
    `CREATE INDEX IF NOT EXISTS assessment_attempts_user ON assessment_attempts (user_id, course_slug)`,
    `CREATE TABLE IF NOT EXISTS contact_messages (
      id ${idCol},
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      topic TEXT NOT NULL,
      message TEXT NOT NULL,
      user_id INTEGER,
      created_at TEXT NOT NULL
    )`,
  ];
}

function createPostgres(url: string): Db {
  // BIGINT columns come back as strings by default; our values fit safely in a JS number.
  pg.types.setTypeParser(20, (v) => Number(v));
  const local = /localhost|127\.0\.0\.1|\.internal|^postgres(ql)?:\/\/[^@]+@[^./:]+[:/]/.test(url);
  const pool = new pg.Pool({
    connectionString: url,
    // Render's external URLs and most hosted Postgres require TLS; internal URLs do not.
    ssl: process.env.DATABASE_SSL === 'false' || local ? undefined : { rejectUnauthorized: false },
    max: 10,
  });
  const toPg = (sql: string) => {
    let i = 0;
    return sql.replace(/\?/g, () => `$${++i}`);
  };
  return {
    kind: 'postgres',
    async all(sql, params = []) {
      return (await pool.query(toPg(sql), params)).rows;
    },
    async get(sql, params = []) {
      return (await pool.query(toPg(sql), params)).rows[0];
    },
    async run(sql, params = []) {
      return { changes: (await pool.query(toPg(sql), params)).rowCount ?? 0 };
    },
  };
}

function createSqlite(file: string): Db {
  const sqlite = new Database(file);
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = ON');
  const returns = (sql: string) => /\breturning\b/i.test(sql) || /^\s*select/i.test(sql);
  return {
    kind: 'sqlite',
    async all(sql, params = []) {
      return sqlite.prepare(sql).all(...params) as never[];
    },
    async get(sql, params = []) {
      return sqlite.prepare(sql).get(...params) as never;
    },
    async run(sql, params = []) {
      const stmt = sqlite.prepare(sql);
      if (returns(sql)) return { changes: stmt.all(...params).length };
      return { changes: stmt.run(...params).changes };
    },
  };
}

const db: Db = process.env.DATABASE_URL
  ? createPostgres(process.env.DATABASE_URL)
  : createSqlite(process.env.DATABASE_PATH || './data.sqlite');

export async function migrate() {
  const statements = db.kind === 'postgres'
    ? schema('SERIAL PRIMARY KEY', 'BIGINT')
    : schema('INTEGER PRIMARY KEY AUTOINCREMENT', 'INTEGER');
  for (const s of statements) await db.run(s);

  // Upgrade databases created by the first version of Ohmentum.
  if (db.kind === 'postgres') {
    await db.run('ALTER TABLE users ADD COLUMN IF NOT EXISTS token_version INTEGER NOT NULL DEFAULT 0');
  } else {
    const cols = await db.all<{ name: string }>('PRAGMA table_info(users)');
    if (!cols.some((c) => c.name === 'token_version')) {
      await db.run('ALTER TABLE users ADD COLUMN token_version INTEGER NOT NULL DEFAULT 0');
    }
  }
  await db.run('UPDATE users SET email = lower(email) WHERE email <> lower(email)');
}

export const now = () => new Date().toISOString();

export interface UserRow {
  id: number;
  email: string;
  name: string;
  password_hash: string;
  token_version: number;
  created_at: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  sub_status: string | null;
  sub_plan: string | null;
  sub_period_end: number | null;
}

export function findUserById(id: number) {
  return db.get<UserRow>('SELECT * FROM users WHERE id = ?', [id]);
}

export function findUserByEmail(email: string) {
  return db.get<UserRow>('SELECT * FROM users WHERE email = ?', [email.trim().toLowerCase()]);
}

/**
 * Owner access: accounts whose email is listed in OWNER_EMAILS (comma-separated) get every
 * lesson without a subscription. Meant for the site owner and staff, not for customers.
 */
const BUILT_IN_OWNERS = ['masuccic@yahoo.com'];
const OWNER_EMAILS = new Set(
  [...BUILT_IN_OWNERS, ...(process.env.OWNER_EMAILS || '').split(',')].map((e) => e.trim().toLowerCase()).filter(Boolean),
);
export function isOwner(u: UserRow | undefined | null) {
  return !!u && OWNER_EMAILS.has(u.email.toLowerCase());
}

export function isSubscribed(u: UserRow | undefined | null) {
  return !!u && (isOwner(u) || u.sub_status === 'active' || u.sub_status === 'trialing');
}

export function publicUser(u: UserRow) {
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    subscribed: isSubscribed(u),
    owner: isOwner(u),
    plan: u.sub_plan,
    status: u.sub_status,
    periodEnd: u.sub_period_end,
    hasBillingAccount: !!u.stripe_customer_id,
  };
}

export default db;
