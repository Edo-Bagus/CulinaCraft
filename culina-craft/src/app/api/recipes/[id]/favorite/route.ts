// app/api/recipes/[id]/favorite/route.ts
import { Types } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/Users';
import { verifyToken } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } } // pastikan typing params lengkap
) {
  await connectDB();

  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userPayload = await verifyToken(token);
  if (!userPayload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const recipeId: string = params.id; // eksplisit tipe string

  try {
    const user = await User.findById(userPayload.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isFavorited = user.favoriteRecipes.some(
    (id: Types.ObjectId) => id.toString() === recipeId
    );

    if (isFavorited) {
    user.favoriteRecipes = user.favoriteRecipes.filter(
        (id: Types.ObjectId) => id.toString() !== recipeId
    );
    } else {
    user.favoriteRecipes.push(new Types.ObjectId(recipeId));
    }

    await user.save();

    return NextResponse.json({
      message: isFavorited ? 'Recipe removed from favorites' : 'Recipe added to favorites',
      favoriteRecipes: user.favoriteRecipes,
    });
  } catch (error) {
    console.error('Error in favorite recipe:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
