import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Recipe from "@/models/Recipe"; // pastikan path-nya sesuai struktur proyekmu
import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    // Ambil parameter query
    const sortBy = searchParams.get("sortBy") || "name"; // default sort
    const order = searchParams.get("order") === "desc" ? -1 : 1;
    const limit = parseInt(searchParams.get("limit") || "0");
    const authorId = searchParams.get("authorId"); // id user penulis resep

    // Validasi field sort
    const validFields = ["name", "calories", "rating", "like"];
    const sortField = validFields.includes(sortBy) ? sortBy : "name";

    // Buat filter
    const filter: any = {};
    if (authorId) {
      filter.authorId = authorId;
    }

    // Query resep
    const recipes = await Recipe.find(filter)
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

    // Ambil token dari cookies
    const token = req.cookies.get('token')?.value;
    const user = token ? await verifyToken(token) : null;
    
    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" , message: user}, { status: 401 });
    }

    // Validasi data
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Recipe name is required and must be a string" }, { status: 400 });
    }

    if (!Array.isArray(ingredients) || ingredients.some(i => typeof i !== "string")) {
      return NextResponse.json({ error: "Ingredients must be an array of strings" }, { status: 400 });
    }

    if (!Array.isArray(steps) || steps.some(s => typeof s !== "string")) {
      return NextResponse.json({ error: "Steps must be an array of strings" }, { status: 400 });
    }

    // Buat resep dan set author dari user.id
    const recipe = new Recipe({ name, ingredients, steps, authorId: user.id });
    await recipe.save();

    return NextResponse.json({ insertedId: recipe._id });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Failed to insert recipe:", errorMessage);
    return NextResponse.json({ error: "Failed to insert recipe", message: errorMessage }, { status: 500 });
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
