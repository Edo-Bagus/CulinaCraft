import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/Users";
import Recipe from "@/models/Recipe";
import { verifyToken } from "@/lib/auth";

// GET - Ambil daftar resep favorit user
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload?.id) {
      return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 });
    }

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

// POST - Tambahkan resep ke favorit
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload?.id) {
      return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 });
    }

    const { recipeId } = await req.json();
    if (!recipeId) {
      return NextResponse.json({ error: "Recipe ID is required" }, { status: 400 });
    }

    const user = await User.findById(payload.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Cegah duplikasi
    if (!user.favoriteRecipes.includes(recipeId)) {
      user.favoriteRecipes.push(recipeId);
      await user.save();
    }

    return NextResponse.json({ message: "Recipe added to favorites" });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 });
  }
}

// DELETE - Hapus resep dari favorit
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized - No token" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload?.id) {
      return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 });
    }

    const { recipeId } = await req.json();
    if (!recipeId) {
      return NextResponse.json({ error: "Recipe ID is required" }, { status: 400 });
    }

    const user = await User.findById(payload.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.favoriteRecipes = user.favoriteRecipes.filter(
      (id: { toString: () => any; }) => id.toString() !== recipeId
    );
    await user.save();

    return NextResponse.json({ message: "Recipe removed from favorites" });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 });
  }
}
