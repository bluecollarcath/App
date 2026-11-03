import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db, { type UserRow } from './db.js';

const SECRET = process.env.JWT_SECRET || '';
if (!SECRET) {
  if (process.env.NODE_ENV === 'production') throw new Error('JWT_SECRET must be set in production');
  console.warn('[auth] JWT_SECRET not set — using an insecure development secret');
}
const secret = SECRET || 'dev-only-insecure-secret';

export function signToken(userId: number) {
  return jwt.sign({ sub: String(userId) }, secret, { expiresIn: '30d' });
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserRow;
  }
}

/** Attaches req.user if a valid bearer token is present; never rejects. */
export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const h = req.headers.authorization;
  if (h?.startsWith('Bearer ')) {
    try {
      const payload = jwt.verify(h.slice(7), secret) as { sub: string };
      req.user = db.prepare('SELECT * FROM users WHERE id = ?').get(Number(payload.sub)) as UserRow | undefined;
    } catch {
      /* invalid/expired token → anonymous */
    }
  }
  next();
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) return res.status(401).json({ error: 'Please sign in.' });
  next();
}
