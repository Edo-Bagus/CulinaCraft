// lib/auth.ts
import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateToken(payload: { [key: string]: any }) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' }) // HS256 = HMAC SHA-256
    .setIssuedAt()
    .setExpirationTime('7d') // Token akan expire dalam 7 hari
    .sign(secret);

  return token;
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Token verification failed:', errorMessage);
    return null;
  }
}
