import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        if (!supabase) {
            return NextResponse.json({ error: "Database not configured" }, { status: 503 });
        }

        const { linkId } = await request.json();

        if (!linkId) {
            return NextResponse.json({ error: "linkId is required" }, { status: 400 });
        }

        // Increment click count on the links table (legacy counter)
        const { data: link, error: fetchError } = await supabase
            .from("links")
            .select("clicks")
            .eq("id", linkId)
            .single();

        if (fetchError || !link) {
            return NextResponse.json({ error: "Link not found" }, { status: 404 });
        }

        const { error: updateError } = await supabase
            .from("links")
            .update({ clicks: (link.clicks || 0) + 1 })
            .eq("id", linkId);

        if (updateError) {
            return NextResponse.json({ error: "Failed to record click" }, { status: 500 });
        }

        // Also insert into click_events for date-filtered analytics
        await supabase
            .from("click_events")
            .insert({ link_id: linkId });

        return NextResponse.json({ success: true, clicks: (link.clicks || 0) + 1 });
    } catch (err) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        if (!supabase) {
            return NextResponse.json({ error: "Database not configured" }, { status: 503 });
        }

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const from = searchParams.get("from");
        const to = searchParams.get("to");

        if (!userId) {
            return NextResponse.json({ error: "userId is required" }, { status: 400 });
        }

        // If date range is provided, query click_events table
        if (from || to) {
            // First get all link IDs for this user
            const { data: userLinks, error: linksError } = await supabase
                .from("links")
                .select("id")
                .eq("user_id", userId);

            if (linksError) {
                return NextResponse.json({ error: "Failed to fetch links" }, { status: 500 });
            }

            const linkIds = (userLinks || []).map((l) => l.id);

            if (linkIds.length === 0) {
                return NextResponse.json({ clicks: {} });
            }

            // Query click_events filtered by date range
            let query = supabase
                .from("click_events")
                .select("link_id")
                .in("link_id", linkIds);

            if (from) {
                query = query.gte("clicked_at", from);
            }
            if (to) {
                // Add a day to 'to' so it includes the entire end date
                const toDate = new Date(to);
                toDate.setDate(toDate.getDate() + 1);
                query = query.lt("clicked_at", toDate.toISOString());
            }

            const { data: events, error: eventsError } = await query;

            if (eventsError) {
                return NextResponse.json({ error: "Failed to fetch click events" }, { status: 500 });
            }

            // Count clicks per link
            const clickMap = {};
            linkIds.forEach((id) => { clickMap[id] = 0; });
            (events || []).forEach((e) => {
                clickMap[e.link_id] = (clickMap[e.link_id] || 0) + 1;
            });

            return NextResponse.json({ clicks: clickMap });
        }

        // No date filter — use the fast legacy counter
        const { data: links, error } = await supabase
            .from("links")
            .select("id, clicks")
            .eq("user_id", userId);

        if (error) {
            return NextResponse.json({ error: "Failed to fetch clicks" }, { status: 500 });
        }

        const clickMap = {};
        (links || []).forEach((l) => {
            clickMap[l.id] = l.clicks || 0;
        });

        return NextResponse.json({ clicks: clickMap });
    } catch (err) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
