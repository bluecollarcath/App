import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { findUserById, type UserRow } from './db.js';

const SECRET = process.env.JWT_SECRET || '';
if (!SECRET) {
  if (process.env.NODE_ENV === 'production') throw new Error('JWT_SECRET must be set in production');
  console.warn('[auth] JWT_SECRET not set — using an insecure development secret');
}
const secret = SECRET || 'dev-only-insecure-secret';

/**
 * Tokens carry the user's token_version. Changing or resetting a password bumps the
 * version, which signs the user out everywhere else.
 */
export function signToken(user: Pick<UserRow, 'id' | 'token_version'>) {
  return jwt.sign({ sub: String(user.id), v: user.token_version }, secret, { expiresIn: '30d' });
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserRow;
  }
}

/** Attaches req.user if a valid bearer token is present; never rejects. */
export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const h = req.headers.authorization;
  if (h?.startsWith('Bearer ')) {
    try {
      const payload = jwt.verify(h.slice(7), secret) as { sub: string; v?: number };
      const user = await findUserById(Number(payload.sub));
      if (user && (payload.v ?? 0) === user.token_version) req.user = user;
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

export const PASSWORD_RULE = 'Password must be at least 8 characters.';
export function validPassword(p: unknown): p is string {
  return typeof p === 'string' && p.length >= 8 && p.length <= 200;
}
