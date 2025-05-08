// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const valid = token ? await verifyToken(token) : null;

  const protectedPaths = ['/profile', '/uploadrecipe'];
  const isProtected = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));


  if (isProtected && !valid) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}