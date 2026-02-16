import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { detectPlatform, PlatformIcon } from "@/lib/socialPlatforms";
import { Zap, ExternalLink } from "lucide-react";

// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
    if (!supabase) return { title: "CapsLink — Setup Required" };

    const { username } = await params;
    const { data: profile } = await supabase
        .from("profiles")
        .select("username, display_name, bio")
        .eq("username", username)
        .single();

    if (!profile) {
        return { title: "Profile Not Found — CapsLink" };
    }

    const name = profile.display_name || profile.username;
    return {
        title: `${name} — CapsLink`,
        description:
            profile.bio || `Check out ${name}'s links on CapsLink by CAPSLOQUE.`,
        openGraph: {
            title: `${name} — CapsLink`,
            description:
                profile.bio || `Check out ${name}'s links on CapsLink by CAPSLOQUE.`,
        },
    };
}

export default async function ProfilePage({ params }) {
    if (!supabase) {
        notFound();
    }

    const { username } = await params;

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

    if (!profile) {
        notFound();
    }

    const { data: links } = await supabase
        .from("links")
        .select("*")
        .eq("user_id", profile.id)
        .order("order_index", { ascending: true });

    const displayName = profile.display_name || profile.username;

    // Subtle background gradient based on username
    const hashCode = username
        .split("")
        .reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
    const hue1 = Math.abs(hashCode) % 360;
    const hue2 = (hue1 + 40) % 360;

    return (
        <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
            {/* Background gradient */}
            <div
                style={{
                    position: "absolute", inset: 0, opacity: 0.15, pointerEvents: "none",
                    background: `radial-gradient(ellipse at 30% 20%, hsl(${hue1}, 70%, 30%) 0%, transparent 60%),
                                 radial-gradient(ellipse at 70% 80%, hsl(${hue2}, 60%, 25%) 0%, transparent 60%)`,
                }}
            />

            <div
                style={{
                    position: "relative", zIndex: 1,
                    maxWidth: "480px", margin: "0 auto",
                    padding: "100px 24px 60px",
                    textAlign: "center",
                }}
            >
                {/* Profile Header */}
                <div className="animate-fade-in" style={{ marginBottom: "36px" }}>
                    {/* Avatar */}
                    {profile.avatar_url ? (
                        <img
                            src={profile.avatar_url}
                            alt={displayName}
                            style={{
                                width: "96px", height: "96px", borderRadius: "50%",
                                margin: "0 auto 16px", objectFit: "cover",
                                border: "3px solid rgba(139,92,246,0.3)",
                                boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: "96px", height: "96px", borderRadius: "50%",
                                margin: "0 auto 16px",
                                background: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "white", fontSize: "2rem", fontWeight: 800,
                                boxShadow: "0 8px 30px rgba(139,92,246,0.3)",
                            }}
                        >
                            {displayName.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#eeeef5", letterSpacing: "-0.02em" }}>
                        {displayName}
                    </h1>
                    <p style={{ fontSize: "0.85rem", color: "#505068", marginTop: "4px" }}>
                        @{profile.username}
                    </p>

                    {profile.bio && (
                        <p style={{
                            fontSize: "0.875rem", color: "#9090ad", marginTop: "12px",
                            maxWidth: "360px", margin: "12px auto 0", lineHeight: 1.6,
                        }}>
                            {profile.bio}
                        </p>
                    )}
                </div>

                {/* Links */}
                {links && links.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "48px" }}>
                        {links.map((link, index) => {
                            const platform = detectPlatform(link.url);
                            return (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="animate-fade-in"
                                    style={{
                                        display: "flex", alignItems: "center", gap: "12px",
                                        padding: "14px 16px", borderRadius: "14px",
                                        background: "linear-gradient(160deg, rgba(14,14,24,0.9) 0%, rgba(20,20,34,0.6) 100%)",
                                        border: "1px solid rgba(45,45,74,0.4)",
                                        backdropFilter: "blur(10px)",
                                        textDecoration: "none", color: "#eeeef5",
                                        transition: "all 0.2s ease",
                                        animationDelay: `${index * 0.06}s`,
                                    }}
                                >
                                    {/* Platform Icon */}
                                    <div style={{
                                        width: "36px", height: "36px", borderRadius: "10px",
                                        background: platform.gradient,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        flexShrink: 0,
                                    }}>
                                        <PlatformIcon platformId={platform.id} size={16} />
                                    </div>

                                    <span style={{
                                        flex: 1, fontSize: "0.9rem", fontWeight: 600,
                                        textAlign: "left",
                                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                    }}>
                                        {link.title}
                                    </span>

                                    <ExternalLink style={{ width: 14, height: 14, color: "#505068", flexShrink: 0 }} />
                                </a>
                            );
                        })}
                    </div>
                ) : (
                    <div style={{ padding: "48px 0", color: "#505068" }}>
                        <p style={{ fontSize: "0.875rem" }}>No links added yet.</p>
                    </div>
                )}

                {/* Powered by */}
                <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <a
                        href="/"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "6px",
                            fontSize: "0.75rem", color: "#505068",
                            textDecoration: "none", transition: "color 0.2s ease",
                        }}
                    >
                        <Zap style={{ width: 12, height: 12 }} />
                        Powered by CapsLink
                    </a>
                </div>
            </div>
        </div>
    );
}
