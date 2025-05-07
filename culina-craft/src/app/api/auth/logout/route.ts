// app/api/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();

  // Hapus token dari cookie
  (await
        // Hapus token dari cookie
        cookieStore).set('token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    expires: new Date(0), // expired di masa lalu
    path: '/',
  });

  return NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });
}
