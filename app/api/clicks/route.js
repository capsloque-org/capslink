import { getDb, ensureIndexes } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await ensureIndexes();
        const db = await getDb();
        const { linkId } = await request.json();

        if (!linkId) {
            return NextResponse.json({ error: "linkId is required" }, { status: 400 });
        }

        // Increment click count on the links collection (legacy counter)
        const result = await db.collection("links").findOneAndUpdate(
            { _id: linkId },
            { $inc: { clicks: 1 } },
            { returnDocument: "after" }
        );

        if (!result) {
            return NextResponse.json({ error: "Link not found" }, { status: 404 });
        }

        // Also insert into click_events for date-filtered analytics
        await db.collection("click_events").insertOne({
            link_id: linkId,
            clicked_at: new Date(),
        });

        return NextResponse.json({ success: true, clicks: result.clicks });
    } catch (err) {
        console.error("POST /api/clicks error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await ensureIndexes();
        const db = await getDb();
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const from = searchParams.get("from");
        const to = searchParams.get("to");

        if (!userId) {
            return NextResponse.json({ error: "userId is required" }, { status: 400 });
        }

        // If date range is provided, query click_events collection
        if (from || to) {
            // First get all link IDs for this user
            const userLinks = await db
                .collection("links")
                .find({ user_id: userId }, { projection: { _id: 1 } })
                .toArray();

            const linkIds = userLinks.map((l) => l._id);

            if (linkIds.length === 0) {
                return NextResponse.json({ clicks: {} });
            }

            // Build date filter
            const dateFilter = { link_id: { $in: linkIds } };
            if (from) {
                dateFilter.clicked_at = { ...dateFilter.clicked_at, $gte: new Date(from) };
            }
            if (to) {
                const toDate = new Date(to);
                toDate.setDate(toDate.getDate() + 1);
                dateFilter.clicked_at = { ...dateFilter.clicked_at, $lt: toDate };
            }

            const events = await db
                .collection("click_events")
                .find(dateFilter)
                .toArray();

            // Count clicks per link
            const clickMap = {};
            linkIds.forEach((id) => { clickMap[id] = 0; });
            events.forEach((e) => {
                clickMap[e.link_id] = (clickMap[e.link_id] || 0) + 1;
            });

            return NextResponse.json({ clicks: clickMap });
        }

        // No date filter — use the fast legacy counter
        const links = await db
            .collection("links")
            .find({ user_id: userId }, { projection: { _id: 1, clicks: 1 } })
            .toArray();

        const clickMap = {};
        links.forEach((l) => {
            clickMap[l._id] = l.clicks || 0;
        });

        return NextResponse.json({ clicks: clickMap });
    } catch (err) {
        console.error("GET /api/clicks error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
