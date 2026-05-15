// PBKDF2 password hashing using Node.js crypto (runs server-side only)
import { pbkdf2Sync, randomBytes } from 'crypto';

export function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  return `${salt.toString('base64')}:${hash.toString('base64')}`;
}

export function verifyPassword(password, stored) {
  const [saltB64, hashB64] = stored.split(':');
  const salt = Buffer.from(saltB64, 'base64');
  const hash = pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  return hash.toString('base64') === hashB64;
}
