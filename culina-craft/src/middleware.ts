// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const valid = token ? await verifyToken(token) : null;

  const isProtected = req.nextUrl.pathname.startsWith('/profile');

  if (isProtected && !valid) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}