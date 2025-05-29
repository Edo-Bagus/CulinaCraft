import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/Users";
import { verifyToken } from "@/lib/auth";
import Recipe from "@/models/Recipe";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Ambil token dari cookie
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 });
    }

    // Verifikasi token
    const payload = await verifyToken(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 });
    }

    // Ambil user dan populate favoriteRecipes
    const user = await User.findById(payload.id).populate("favoriteRecipes");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ favorites: user.favoriteRecipes });
  } catch (error) {
    console.error("Error fetching favorite recipes:", error);
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
}