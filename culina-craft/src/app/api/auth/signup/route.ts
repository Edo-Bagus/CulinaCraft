// signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from "@/lib/mongodb";
import User from '@/models/Users';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    // Validasi input
    if (!username || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Simpan user baru
    await connectDB();
    const newUser = await User.create({ username, email, password });

    return NextResponse.json({ success: true, message: 'User created successfully', userId: newUser._id }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
