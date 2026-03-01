import { getDb, ensureIndexes } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await ensureIndexes();
        const db = await getDb();
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "userId is required" }, { status: 400 });
        }

        const profile = await db.collection("profiles").findOne({ _id: userId });

        return NextResponse.json({ profile: profile || null });
    } catch (err) {
        console.error("GET /api/profile error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await ensureIndexes();
        const db = await getDb();
        const body = await request.json();
        const { id, username, display_name, bio, avatar_url } = body;

        if (!id || !username) {
            return NextResponse.json({ error: "id and username are required" }, { status: 400 });
        }

        const doc = {
            _id: id,
            username: username.toLowerCase(),
            display_name: display_name || "",
            bio: bio || "",
            avatar_url: avatar_url || "",
            banner_url: "",
            template: "glass",
            created_at: new Date(),
        };

        await db.collection("profiles").insertOne(doc);

        return NextResponse.json({ profile: doc });
    } catch (err) {
        if (err.code === 11000) {
            return NextResponse.json({ error: "Username already taken" }, { status: 409 });
        }
        console.error("POST /api/profile error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await ensureIndexes();
        const db = await getDb();
        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) {
            return NextResponse.json({ error: "id is required" }, { status: 400 });
        }

        // Only allow specific fields to be updated
        const allowedFields = ["display_name", "bio", "avatar_url", "banner_url", "template"];
        const sanitized = {};
        for (const key of allowedFields) {
            if (key in updates) {
                sanitized[key] = updates[key];
            }
        }

        const result = await db.collection("profiles").updateOne(
            { _id: id },
            { $set: sanitized }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("PUT /api/profile error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
