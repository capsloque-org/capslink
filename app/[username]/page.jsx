import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { detectPlatform, PlatformIcon } from "@/lib/socialPlatforms";
import { getTemplate } from "@/lib/profileTemplates";
import { Zap } from "lucide-react";
import ClickableLink from "@/components/ClickableLink";

// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
    if (!supabase) return { title: "qloque — Setup Required" };

    const { username } = await params;
    const { data: profile } = await supabase
        .from("profiles")
        .select("username, display_name, bio")
        .eq("username", username)
        .single();

    if (!profile) {
        return { title: "Profile Not Found — qloque" };
    }

    const name = profile.display_name || profile.username;
    return {
        title: `${name} — qloque`,
        description:
            profile.bio || `Check out ${name}'s links on qloque by CAPSLOQUE.`,
        openGraph: {
            title: `${name} — qloque`,
            description:
                profile.bio || `Check out ${name}'s links on qloque by CAPSLOQUE.`,
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
    const template = getTemplate(profile.template);
    const s = template.styles;
    const fontFamily = template.font || "var(--font-sans)";
    const animName = template.animation || "tmpl-fadeIn";

    // Only show links the user explicitly toggled for the social icon row
    const socialLinks = (links || []).filter((l) => {
        if (!l.show_icon) return false;
        const p = detectPlatform(l.url, l.title);
        return p && p.id !== "website";
    });

    return (
        <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", fontFamily, ...s.page }}>
            {/* Background glow */}
            {s.glow && s.glow !== "none" && (
                <div
                    style={{
                        position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none",
                        background: s.glow,
                    }}
                />
            )}

            {/* Banner Image */}
            {profile.banner_url && (
                <div style={{
                    width: "100%", maxWidth: "480px", margin: "0 auto",
                    height: "180px", overflow: "hidden",
                    position: "relative", zIndex: 1,
                }}>
                    <img
                        src={profile.banner_url}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, height: "60px",
                        background: `linear-gradient(to top, ${s.page.background?.includes("gradient") ? "rgba(0,0,0,0.3)" : s.page.background || "#fff"}, transparent)`,
                    }} />
                </div>
            )}

            <div
                style={{
                    position: "relative", zIndex: 1,
                    maxWidth: "480px", margin: "0 auto",
                    padding: profile.banner_url ? "0 24px 60px" : "100px 24px 60px",
                    textAlign: "center",
                }}
            >
                {/* Profile Header */}
                <div className="animate-fade-in" style={{
                    marginBottom: "36px",
                    marginTop: profile.banner_url ? "-48px" : "0",
                }}>
                    {/* Avatar */}
                    {profile.avatar_url ? (
                        <img
                            src={profile.avatar_url}
                            alt={displayName}
                            style={{
                                width: "96px", height: "96px", borderRadius: "50%",
                                margin: "0 auto 16px", objectFit: "cover",
                                ...s.avatar,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: "96px", height: "96px", borderRadius: "50%",
                                margin: "0 auto 16px",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "2rem", fontWeight: 800,
                                ...s.avatar,
                                ...s.avatarFallback,
                            }}
                        >
                            {displayName.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em", ...s.name }}>
                        {displayName}
                    </h1>
                    <p style={{ fontSize: "0.85rem", marginTop: "4px", ...s.username }}>
                        @{profile.username}
                    </p>

                    {profile.bio && (
                        <p style={{
                            fontSize: "0.875rem", marginTop: "12px",
                            maxWidth: "360px", margin: "12px auto 0", lineHeight: 1.6,
                            ...s.bio,
                        }}>
                            {profile.bio}
                        </p>
                    )}
                </div>

                {/* Social Icons Row */}
                {socialLinks.length > 0 && (
                    <div style={{
                        display: "flex", justifyContent: "center", flexWrap: "wrap",
                        gap: "10px", marginBottom: "24px",
                    }}>
                        {socialLinks.map((link, i) => {
                            const platform = detectPlatform(link.url, link.title);
                            return (
                                <a
                                    key={`social-${link.id}`}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="animate-fade-in"
                                    style={{
                                        width: "40px", height: "40px", borderRadius: "50%",
                                        background: platform.gradient,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                        textDecoration: "none",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                        animationDelay: `${i * 0.05}s`,
                                    }}
                                    title={platform.name}
                                >
                                    <PlatformIcon platformId={platform.id} size={18} />
                                </a>
                            );
                        })}
                    </div>
                )}

                {/* Links */}
                {links && links.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "48px" }}>
                        {links.map((link, index) => (
                            <ClickableLink
                                key={link.id}
                                link={link}
                                index={index}
                                styles={s}
                                animationName={animName}
                            />
                        ))}
                    </div>
                ) : (
                    <div style={{ padding: "48px 0", ...s.bio }}>
                        <p style={{ fontSize: "0.875rem" }}>No links added yet.</p>
                    </div>
                )}

                {/* Powered by */}
                <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <a
                        href="/"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "6px",
                            fontSize: "0.75rem",
                            textDecoration: "none", transition: "color 0.2s ease",
                            ...s.footer,
                        }}
                    >
                        <Zap style={{ width: 12, height: 12 }} />
                        Powered by qloque
                    </a>
                </div>
            </div>
        </div>
    );
}
