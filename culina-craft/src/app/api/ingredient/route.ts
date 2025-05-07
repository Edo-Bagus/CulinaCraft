import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Ingredient from "@/models/Ingredients";
import { isValidObjectId } from "mongoose";

// GET: Get all ingredients
export async function GET() {
  try {
    await connectDB();
    const ingredients = await Ingredient.find();
    return NextResponse.json(ingredients);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch ingredients" }, { status: 500 });
  }
}

// POST: Create new ingredient
export async function POST(req: NextRequest) {
  try {
    const { name, unit, quantity } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required and must be a string" }, { status: 400 });
    }

    if (!unit || typeof unit !== "string") {
      return NextResponse.json({ error: "Unit is required and must be a string" }, { status: 400 });
    }

    if (quantity === undefined || typeof quantity !== "number") {
      return NextResponse.json({ error: "Quantity is required and must be a number" }, { status: 400 });
    }

    await connectDB();
    const newIngredient = await Ingredient.create({ name, unit, quantity });

    return NextResponse.json({ success: true, insertedId: newIngredient._id });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create ingredient" }, { status: 500 });
  }
}

// PUT: Update ingredient
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json({ error: "Valid Ingredient ID is required" }, { status: 400 });
    }

    const { name, unit, quantity } = await req.json();

    if (!name || typeof name !== "string" ||
        !unit || typeof unit !== "string" ||
        quantity === undefined || typeof quantity !== "number") {
      return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
    }

    await connectDB();
    const updated = await Ingredient.findByIdAndUpdate(id, { name, unit, quantity }, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "Ingredient not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to update ingredient" }, { status: 500 });
  }
}

// DELETE: Delete ingredient
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json({ error: "Valid Ingredient ID is required" }, { status: 400 });
    }

    await connectDB();
    const deleted = await Ingredient.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Ingredient not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete ingredient" }, { status: 500 });
  }
}
