import Database from 'better-sqlite3';

const db = new Database(process.env.DATABASE_PATH || './data.sqlite');
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  sub_status TEXT,
  sub_plan TEXT,
  sub_period_end INTEGER
);
CREATE TABLE IF NOT EXISTS progress (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_slug TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  completed_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, course_slug, lesson_id)
);
`);

export interface UserRow {
  id: number;
  email: string;
  name: string;
  password_hash: string;
  created_at: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  sub_status: string | null;
  sub_plan: string | null;
  sub_period_end: number | null;
}

export function isSubscribed(u: UserRow | undefined | null) {
  return !!u && (u.sub_status === 'active' || u.sub_status === 'trialing');
}

export function publicUser(u: UserRow) {
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    subscribed: isSubscribed(u),
    plan: u.sub_plan,
    status: u.sub_status,
    periodEnd: u.sub_period_end,
    hasBillingAccount: !!u.stripe_customer_id,
  };
}

export default db;
