import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("CulinaCraft");
    const recipes = await db.collection("Recipes").find().toArray();

    // Tidak perlu transformasi ingredients
    return NextResponse.json(recipes);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, ingredients } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Recipe name is required and must be a string" }, { status: 400 });
    }

    if (!Array.isArray(ingredients) || ingredients.some(i => typeof i !== "string")) {
      return NextResponse.json({ error: "Ingredients must be an array of strings" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("CulinaCraft");
    const result = await db.collection("Recipes").insertOne({ name, ingredients });

    return NextResponse.json({ insertedId: result.insertedId });
  } catch (e) {
    return NextResponse.json({ error: "Failed to insert recipe" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Recipe ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { name, ingredients } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Recipe name is required and must be a string" }, { status: 400 });
    }

    if (!Array.isArray(ingredients) || ingredients.some(i => typeof i !== "string")) {
      return NextResponse.json({ error: "Ingredients must be an array of strings" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("CulinaCraft");

    const result = await db.collection("Recipes").updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, ingredients } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (e) {
    return NextResponse.json({ error: "Failed to update recipe" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Recipe ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("CulinaCraft");
    const result = await db.collection("Recipes").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedCount: result.deletedCount });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete recipe" }, { status: 500 });
  }
}