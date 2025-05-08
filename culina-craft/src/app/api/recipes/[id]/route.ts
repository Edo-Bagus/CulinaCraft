import { NextRequest, NextResponse } from "next/server";
import Recipe from "@/models/Recipe";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid recipe ID" }, { status: 400 });
    }

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json({ error: "Failed to fetch recipe" }, { status: 500 });
  }
}
