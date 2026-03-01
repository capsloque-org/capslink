import { getDb, ensureIndexes } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
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

        const links = await db
            .collection("links")
            .find({ user_id: userId })
            .sort({ order_index: 1 })
            .toArray();

        return NextResponse.json({ links });
    } catch (err) {
        console.error("GET /api/links error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await ensureIndexes();
        const db = await getDb();
        const body = await request.json();
        const { user_id, title, url, order_index } = body;

        if (!user_id || !title || !url) {
            return NextResponse.json({ error: "user_id, title, and url are required" }, { status: 400 });
        }

        const doc = {
            _id: new ObjectId().toString(),
            user_id,
            title,
            url,
            order_index: order_index ?? 0,
            clicks: 0,
            show_icon: false,
            created_at: new Date(),
        };

        await db.collection("links").insertOne(doc);

        // Return with `id` field for frontend compatibility
        return NextResponse.json({ link: { id: doc._id, ...doc } });
    } catch (err) {
        console.error("POST /api/links error:", err);
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

        const allowedFields = ["title", "url", "order_index", "show_icon"];
        const sanitized = {};
        for (const key of allowedFields) {
            if (key in updates) {
                sanitized[key] = updates[key];
            }
        }

        await db.collection("links").updateOne(
            { _id: id },
            { $set: sanitized }
        );

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("PUT /api/links error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await ensureIndexes();
        const db = await getDb();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "id is required" }, { status: 400 });
        }

        // Delete associated click events first
        await db.collection("click_events").deleteMany({ link_id: id });
        await db.collection("links").deleteOne({ _id: id });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("DELETE /api/links error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
