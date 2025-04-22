// app/api/recipes/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("CulinaCraft"); // replace with your database name
    const recipes = await db.collection("Account").find().toArray();

    return NextResponse.json(recipes);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("mydb");
    const result = await db.collection("recipes").insertOne(body);

    return NextResponse.json({ insertedId: result.insertedId });
  } catch (e) {
    return NextResponse.json({ error: "Failed to insert post" }, { status: 500 });
  }
}
