/**
 * Supabase → MongoDB Data Migration Script
 *
 * Usage:
 *   node scripts/migrate-supabase-to-mongo.mjs
 *
 * Requirements:
 *   - MONGODB_URI env var (or set inline below)
 *   - Supabase project URL and anon key (set inline below)
 */

import { MongoClient } from "mongodb";

// ── Configuration ──────────────────────────────────────────────────────
const SUPABASE_URL = "https://nekirzcznougozynsgcc.supabase.co";
const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5la2lyemN6bm91Z296eW5zZ2NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTA3NzAsImV4cCI6MjA4NjgyNjc3MH0.MbPVRP1tC4NvVaNuIaAruNX1un3Isj7xQR3ncJ-1nvA";
const MONGODB_URI =
    process.env.MONGODB_URI ||
    "mongodb+srv://capsloquedb:0JTky4wWRbR1sWDG@capsloque.4b1sbrh.mongodb.net/qloque?appName=capsloque";

// ── Helpers ────────────────────────────────────────────────────────────
async function supaFetch(table, query = "") {
    const url = `${SUPABASE_URL}/rest/v1/${table}?${query}`;
    const res = await fetch(url, {
        headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
    });
    if (!res.ok) {
        throw new Error(`Supabase fetch ${table} failed: ${res.status} ${await res.text()}`);
    }
    return res.json();
}

// ── Main ───────────────────────────────────────────────────────────────
async function main() {
    console.log("🚀 Starting Supabase → MongoDB migration...\n");

    // Connect to MongoDB
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db();
    console.log("✅ Connected to MongoDB\n");

    // 1. Migrate profiles
    console.log("📦 Fetching profiles from Supabase...");
    const profiles = await supaFetch("profiles", "select=*");
    console.log(`   Found ${profiles.length} profiles`);

    if (profiles.length > 0) {
        const profileDocs = profiles.map((p) => ({
            _id: p.id,
            username: p.username,
            display_name: p.display_name || "",
            bio: p.bio || "",
            avatar_url: p.avatar_url || "",
            banner_url: p.banner_url || "",
            template: p.template || "glass",
            created_at: new Date(p.created_at),
        }));

        // Use ordered:false to skip duplicates
        try {
            const result = await db.collection("profiles").insertMany(profileDocs, { ordered: false });
            console.log(`   ✅ Inserted ${result.insertedCount} profiles`);
        } catch (err) {
            if (err.code === 11000) {
                console.log(`   ⚠️  Some profiles already existed (duplicates skipped)`);
                console.log(`   ✅ Inserted ${err.result?.insertedCount || 0} new profiles`);
            } else {
                throw err;
            }
        }
    }

    // 2. Migrate links
    console.log("\n📦 Fetching links from Supabase...");
    const links = await supaFetch("links", "select=*");
    console.log(`   Found ${links.length} links`);

    // Build a map from old UUID IDs to the IDs used in MongoDB
    const linkIdMap = {};

    if (links.length > 0) {
        const linkDocs = links.map((l) => {
            // Use the original UUID as the _id string
            const mongoId = l.id;
            linkIdMap[l.id] = mongoId;
            return {
                _id: mongoId,
                user_id: l.user_id,
                title: l.title,
                url: l.url,
                order_index: l.order_index ?? 0,
                clicks: l.clicks ?? 0,
                show_icon: l.show_icon ?? false,
                created_at: new Date(l.created_at),
            };
        });

        try {
            const result = await db.collection("links").insertMany(linkDocs, { ordered: false });
            console.log(`   ✅ Inserted ${result.insertedCount} links`);
        } catch (err) {
            if (err.code === 11000) {
                console.log(`   ⚠️  Some links already existed (duplicates skipped)`);
                console.log(`   ✅ Inserted ${err.result?.insertedCount || 0} new links`);
            } else {
                throw err;
            }
        }
    }

    // 3. Migrate click_events
    console.log("\n📦 Fetching click_events from Supabase...");
    const clickEvents = await supaFetch("click_events", "select=*");
    console.log(`   Found ${clickEvents.length} click_events`);

    if (clickEvents.length > 0) {
        const eventDocs = clickEvents.map((e) => ({
            link_id: linkIdMap[e.link_id] || e.link_id,
            clicked_at: new Date(e.clicked_at),
        }));

        const result = await db.collection("click_events").insertMany(eventDocs);
        console.log(`   ✅ Inserted ${result.insertedCount} click_events`);
    }

    // 4. Create indexes
    console.log("\n🔧 Creating indexes...");
    await db.collection("profiles").createIndex({ username: 1 }, { unique: true });
    await db.collection("links").createIndex({ user_id: 1 });
    await db.collection("links").createIndex({ user_id: 1, order_index: 1 });
    await db.collection("click_events").createIndex({ link_id: 1 });
    await db.collection("click_events").createIndex({ clicked_at: 1 });
    console.log("   ✅ Indexes created");

    // Summary
    console.log("\n" + "═".repeat(50));
    console.log("✅ Migration complete!");
    console.log(`   Profiles:     ${profiles.length}`);
    console.log(`   Links:        ${links.length}`);
    console.log(`   Click Events: ${clickEvents.length}`);
    console.log("═".repeat(50));

    await client.close();
}

main().catch((err) => {
    console.error("❌ Migration failed:", err);
    process.exit(1);
});
