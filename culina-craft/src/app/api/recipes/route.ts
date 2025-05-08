import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Recipe from "@/models/Recipe"; // pastikan path-nya sesuai struktur proyekmu
import { connectDB } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    // Get query parameters
    const sortBy = searchParams.get("sortBy") || "name"; // default sort field
    const order = searchParams.get("order") === "desc" ? -1 : 1; // asc by default
    const limit = parseInt(searchParams.get("limit") || "0"); // 0 = no limit

    // Validate sort field
    const validFields = ["name", "calories", "rating", "like"];
    const sortField = validFields.includes(sortBy) ? sortBy : "name";

    const recipes = await Recipe.find()
      .sort({ [sortField]: order })
      .limit(limit);

    return NextResponse.json(recipes);
  } catch (e) {
    console.error("Failed to fetch recipes:", e);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, ingredients, steps } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Recipe name is required and must be a string" }, { status: 400 });
    }

    if (!Array.isArray(ingredients) || ingredients.some(i => typeof i !== "string")) {
      return NextResponse.json({ error: "Ingredients must be an array of strings" }, { status: 400 });
    }

    if (!Array.isArray(steps) || steps.some(s => typeof s !== "string")) {
      return NextResponse.json({ error: "Steps must be an array of strings" }, { status: 400 });
    }

    const recipe = new Recipe({ name, ingredients, steps });
    console.log("Recipe to be saved:", recipe); // Debugging line
    await recipe.save();

    return NextResponse.json({ insertedId: recipe._id });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Failed to insert recipe", message: errorMessage}, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Valid Recipe ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { name, ingredients, steps } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Recipe name is required and must be a string" }, { status: 400 });
    }

    if (!Array.isArray(ingredients) || ingredients.some(i => typeof i !== "string")) {
      return NextResponse.json({ error: "Ingredients must be an array of strings" }, { status: 400 });
    }

    if (!Array.isArray(steps) || steps.some(s => typeof s !== "string")) {
      return NextResponse.json({ error: "Steps must be an array of strings" }, { status: 400 });
    }

    const result = await Recipe.findByIdAndUpdate(
      id,
      { name, ingredients, steps },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to update recipe" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Valid Recipe ID is required" }, { status: 400 });
    }

    const result = await Recipe.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete recipe" }, { status: 500 });
  }
}
