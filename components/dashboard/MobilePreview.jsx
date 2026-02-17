"use client";

import { detectPlatform, PlatformIcon } from "@/lib/socialPlatforms";
import { getTemplate } from "@/lib/profileTemplates";
import { ExternalLink, Zap } from "lucide-react";

export default function MobilePreview({ profile, links = [] }) {
    const template = getTemplate(profile?.template);
    const s = template.styles;
    const fontFamily = template.font || "var(--font-sans)";
    const animName = template.animation || "tmpl-fadeIn";

    // Only show links the user explicitly toggled for the social icon row
    const socialLinks = links.filter((l) => {
        if (!l.show_icon) return false;
        const p = detectPlatform(l.url, l.title);
        return p && p.id !== "website";
    });

    return (
        <div>
            {/* Phone Frame */}
            <div
                style={{
                    width: "280px",
                    height: "560px",
                    margin: "0 auto",
                    borderRadius: "36px",
                    border: "3px solid rgba(255,255,255,0.5)",
                    background: "linear-gradient(180deg, rgba(245,243,250,0.95) 0%, rgba(240,238,246,0.98) 100%)",
                    boxShadow: "0 8px 40px rgba(232,67,147,0.08), 0 0 60px rgba(162,155,254,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                {/* Notch */}
                <div
                    style={{
                        width: "100px",
                        height: "24px",
                        background: "rgba(240,238,246,0.95)",
                        borderRadius: "0 0 16px 16px",
                        margin: "0 auto",
                        position: "relative",
                        zIndex: 2,
                    }}
                />

                {/* Scrollable content — this is where the template applies */}
                <div
                    style={{
                        height: "calc(100% - 24px)",
                        overflowY: "auto",
                        overflowX: "hidden",
                        padding: "0",
                        fontFamily,
                        ...s.page,
                    }}
                >
                    <div style={{ position: "relative" }}>
                        {/* Banner Image */}
                        {profile?.banner_url && (
                            <div style={{
                                width: "100%", height: "90px", overflow: "hidden",
                            }}>
                                <img
                                    src={profile.banner_url}
                                    alt=""
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    onError={(e) => (e.target.style.display = "none")}
                                />
                            </div>
                        )}

                        <div style={{ padding: "16px 16px 24px", position: "relative" }}>
                            {/* Background glow */}
                            {s.glow && s.glow !== "none" && (
                                <div
                                    style={{
                                        position: "absolute", top: 0, left: 0, right: 0, height: "200px",
                                        background: s.glow,
                                        pointerEvents: "none",
                                    }}
                                />
                            )}

                            {/* Avatar */}
                            <div style={{
                                textAlign: "center",
                                marginBottom: "16px",
                                marginTop: profile?.banner_url ? "-32px" : "0",
                                position: "relative",
                            }}>
                                <div
                                    style={{
                                        width: "64px", height: "64px", borderRadius: "50%",
                                        margin: "0 auto 10px",
                                        overflow: "hidden",
                                        ...(profile?.avatar_url ? s.avatar : { ...s.avatar, ...s.avatarFallback }),
                                    }}
                                >
                                    {profile?.avatar_url ? (
                                        <img
                                            src={profile.avatar_url}
                                            alt=""
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            onError={(e) => (e.target.style.display = "none")}
                                        />
                                    ) : (
                                        <div style={{
                                            width: "100%", height: "100%",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: "24px", fontWeight: 800,
                                            color: s.avatarFallback?.color || "white",
                                        }}>
                                            {(profile?.display_name || profile?.username || "?")[0]?.toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                <h3 style={{
                                    fontSize: "0.95rem", fontWeight: 700,
                                    marginBottom: "2px",
                                    ...s.name,
                                }}>
                                    {profile?.display_name || profile?.username || "Your Name"}
                                </h3>
                                <p style={{ fontSize: "0.7rem", marginBottom: "4px", ...s.username }}>
                                    @{profile?.username || "username"}
                                </p>
                                {profile?.bio && (
                                    <p style={{ fontSize: "0.7rem", lineHeight: 1.4, padding: "0 8px", ...s.bio }}>
                                        {profile.bio}
                                    </p>
                                )}
                            </div>

                            {/* Social Icons Row */}
                            {socialLinks.length > 0 && (
                                <div style={{
                                    display: "flex", justifyContent: "center", flexWrap: "wrap",
                                    gap: "6px", marginBottom: "12px",
                                }}>
                                    {socialLinks.map((link, i) => {
                                        const platform = detectPlatform(link.url, link.title);
                                        return (
                                            <a
                                                key={`social-${link.id || i}`}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    width: "28px", height: "28px", borderRadius: "50%",
                                                    background: platform.gradient,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    transition: "transform 0.2s ease",
                                                    textDecoration: "none",
                                                }}
                                                title={platform.name}
                                            >
                                                <PlatformIcon platformId={platform.id} size={13} />
                                            </a>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Links */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                {links.length === 0 ? (
                                    <div style={{ textAlign: "center", padding: "24px 0", ...s.bio }}>
                                        <p style={{ fontSize: "0.7rem" }}>Links will appear here</p>
                                    </div>
                                ) : (
                                    links.map((link, i) => {
                                        const platform = detectPlatform(link.url, link.title);
                                        return (
                                            <div
                                                key={link.id || i}
                                                style={{
                                                    display: "flex", alignItems: "center", gap: "10px",
                                                    padding: "10px 12px",
                                                    transition: "all 0.2s ease",
                                                    animation: `${animName} 0.4s ease both`,
                                                    animationDelay: `${i * 0.05}s`,
                                                    ...s.linkCard,
                                                }}
                                            >
                                                <div style={{
                                                    width: "28px", height: "28px", borderRadius: "8px",
                                                    background: platform.gradient,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    flexShrink: 0,
                                                }}>
                                                    <PlatformIcon platformId={platform.id} size={13} />
                                                </div>
                                                <span style={{
                                                    flex: 1, fontSize: "0.75rem", fontWeight: 600,
                                                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                                    ...s.linkText,
                                                }}>
                                                    {link.title}
                                                </span>
                                                <ExternalLink style={{ width: 11, height: 11, flexShrink: 0, ...(s.footer || {}) }} />
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Footer */}
                            <div style={{
                                textAlign: "center", marginTop: "20px", fontSize: "0.6rem",
                                display: "flex", alignItems: "center",
                                justifyContent: "center", gap: "4px",
                                ...s.footer,
                            }}>
                                <Zap style={{ width: 8, height: 8 }} />
                                Powered by CapsLink
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Label */}
            <p style={{ textAlign: "center", fontSize: "12px", color: "#9a9ab5", marginTop: "16px" }}>
                Live Preview
            </p>
        </div>
    );
}
