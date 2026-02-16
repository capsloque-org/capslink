"use client";

import { detectPlatform, PlatformIcon } from "@/lib/socialPlatforms";
import { ExternalLink, Zap } from "lucide-react";

export default function MobilePreview({ profile, links = [] }) {
    return (
        <div>
            {/* Phone Frame */}
            <div
                style={{
                    width: "280px",
                    height: "560px",
                    margin: "0 auto",
                    borderRadius: "36px",
                    border: "3px solid rgba(45,45,74,0.5)",
                    background: "linear-gradient(180deg, #0a0a12 0%, #0e0e1a 100%)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 60px rgba(139,92,246,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                {/* Notch */}
                <div
                    style={{
                        width: "100px",
                        height: "24px",
                        background: "#0a0a12",
                        borderRadius: "0 0 16px 16px",
                        margin: "0 auto",
                        position: "relative",
                        zIndex: 2,
                    }}
                />

                {/* Scrollable content */}
                <div
                    style={{
                        height: "calc(100% - 24px)",
                        overflowY: "auto",
                        overflowX: "hidden",
                        padding: "16px 16px 24px",
                    }}
                >
                    {/* Background glow */}
                    <div
                        style={{
                            position: "absolute", top: 0, left: 0, right: 0, height: "200px",
                            background: "radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 60%)",
                            pointerEvents: "none",
                        }}
                    />

                    {/* Avatar */}
                    <div style={{ textAlign: "center", marginBottom: "16px", position: "relative" }}>
                        <div
                            style={{
                                width: "64px", height: "64px", borderRadius: "50%",
                                background: profile?.avatar_url ? "none" : "linear-gradient(135deg, #8b5cf6, #22d3ee)",
                                margin: "0 auto 10px",
                                overflow: "hidden",
                                border: "2px solid rgba(139,92,246,0.3)",
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
                                    color: "white", fontSize: "24px", fontWeight: 800,
                                }}>
                                    {(profile?.display_name || profile?.username || "?")[0]?.toUpperCase()}
                                </div>
                            )}
                        </div>

                        <h3 style={{
                            fontSize: "0.95rem", fontWeight: 700, color: "#eeeef5",
                            marginBottom: "2px",
                        }}>
                            {profile?.display_name || profile?.username || "Your Name"}
                        </h3>
                        <p style={{ fontSize: "0.7rem", color: "#9090ad", marginBottom: "4px" }}>
                            @{profile?.username || "username"}
                        </p>
                        {profile?.bio && (
                            <p style={{ fontSize: "0.7rem", color: "#7070a0", lineHeight: 1.4, padding: "0 8px" }}>
                                {profile.bio}
                            </p>
                        )}
                    </div>

                    {/* Links */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {links.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "24px 0", color: "#505068" }}>
                                <p style={{ fontSize: "0.7rem" }}>Links will appear here</p>
                            </div>
                        ) : (
                            links.map((link, i) => {
                                const platform = detectPlatform(link.url);
                                return (
                                    <div
                                        key={link.id || i}
                                        style={{
                                            display: "flex", alignItems: "center", gap: "10px",
                                            padding: "10px 12px", borderRadius: "12px",
                                            background: "rgba(20,20,34,0.8)",
                                            border: "1px solid rgba(45,45,74,0.4)",
                                            transition: "all 0.2s ease",
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
                                            flex: 1, fontSize: "0.75rem", fontWeight: 600, color: "#dddde5",
                                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                        }}>
                                            {link.title}
                                        </span>
                                        <ExternalLink style={{ width: 11, height: 11, color: "#505068", flexShrink: 0 }} />
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Footer */}
                    <div style={{
                        textAlign: "center", marginTop: "20px", fontSize: "0.6rem",
                        color: "#505068", display: "flex", alignItems: "center",
                        justifyContent: "center", gap: "4px",
                    }}>
                        <Zap style={{ width: 8, height: 8 }} />
                        Powered by CapsLink
                    </div>
                </div>
            </div>

            {/* Label */}
            <p style={{ textAlign: "center", fontSize: "12px", color: "#505068", marginTop: "16px" }}>
                Live Preview
            </p>
        </div>
    );
}
