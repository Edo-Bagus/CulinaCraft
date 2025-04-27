import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("CulinaCraft");
    const accounts = await db.collection("Account").find().toArray();

    return NextResponse.json(accounts);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || typeof username !== "string" || !password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Username and password are required and must be strings" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("CulinaCraft");
    const result = await db.collection("Account").insertOne({ username, password });

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Valid account ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { username, password } = body;

    if (!username || typeof username !== "string" || !password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Username and password are required and must be strings" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("CulinaCraft");
    const result = await db.collection("Account").updateOne(
      { _id: new ObjectId(id) },
      { $set: { username, password } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (e) {
    return NextResponse.json({ error: "Failed to update account" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Valid account ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("CulinaCraft");
    const result = await db.collection("Account").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedCount: result.deletedCount });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}