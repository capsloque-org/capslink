import { getDb, ensureIndexes } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await ensureIndexes();
        const db = await getDb();
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username");

        if (!username) {
            return NextResponse.json({ error: "username is required" }, { status: 400 });
        }

        const existing = await db.collection("profiles").findOne(
            { username: username.toLowerCase() },
            { projection: { username: 1 } }
        );

        return NextResponse.json({ available: !existing });
    } catch (err) {
        console.error("GET /api/username error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
