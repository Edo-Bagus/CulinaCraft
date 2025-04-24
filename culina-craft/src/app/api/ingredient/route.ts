import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("CulinaCraft");
    const ingredients = await db.collection("Ingredient").find().toArray();

    return NextResponse.json(ingredients);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch ingredients" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, unit, quantity } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required and must be a string" }, { status: 400 });
    }

    if (!unit || typeof unit !== "string") {
      return NextResponse.json({ error: "Unit is required and must be a string" }, { status: 400 });
    }

    if (quantity === undefined || typeof quantity !== "number") {
      return NextResponse.json({ error: "Quantity is required and must be a number" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("CulinaCraft");
    const result = await db.collection("Ingredient").insertOne({
      name,
      unit,
      quantity
    });

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create ingredient" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Ingredient ID is required" }, { status: 400 });
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Ingredient ID format" }, { status: 400 });
    }

    const body = await req.json();
    const { name, unit, quantity } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required and must be a string" }, { status: 400 });
    }

    if (!unit || typeof unit !== "string") {
      return NextResponse.json({ error: "Unit is required and must be a string" }, { status: 400 });
    }

    if (quantity === undefined || typeof quantity !== "number") {
      return NextResponse.json({ error: "Quantity is required and must be a number" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("CulinaCraft");

    const result = await db.collection("Ingredient").updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, unit, quantity } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Ingredient not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      modifiedCount: result.modifiedCount
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to update ingredient" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Ingredient ID is required" }, { status: 400 });
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Ingredient ID format" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("CulinaCraft");
    const result = await db.collection("Ingredient").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Ingredient not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete ingredient" }, { status: 500 });
  }
}