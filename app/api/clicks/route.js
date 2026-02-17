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

        // Increment click count using Supabase RPC or raw update
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

        if (!userId) {
            return NextResponse.json({ error: "userId is required" }, { status: 400 });
        }

        const { data: links, error } = await supabase
            .from("links")
            .select("id, clicks")
            .eq("user_id", userId);

        if (error) {
            return NextResponse.json({ error: "Failed to fetch clicks" }, { status: 500 });
        }

        // Return a map of linkId → clicks
        const clickMap = {};
        (links || []).forEach((l) => {
            clickMap[l.id] = l.clicks || 0;
        });

        return NextResponse.json({ clicks: clickMap });
    } catch (err) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
