"use client";

import { ExternalLink } from "lucide-react";
import { detectPlatform, PlatformIcon } from "@/lib/socialPlatforms";

export default function ClickableLink({ link, index, styles, animationName }) {
    const s = styles;
    const platform = detectPlatform(link.url, link.title);

    const handleClick = () => {
        // Fire-and-forget analytics call
        try {
            fetch("/api/clicks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ linkId: link.id }),
            });
        } catch (e) {
            // Silently fail — don't block navigation
        }
    };

    const animStyle = animationName
        ? { animation: `${animationName} 0.5s ease both`, animationDelay: `${index * 0.06}s`, opacity: 0 }
        : { animationDelay: `${index * 0.06}s` };

    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="animate-fade-in"
            style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "14px 16px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                ...animStyle,
                ...s.linkCard,
            }}
        >
            {/* Platform Icon */}
            <div style={{
                width: "36px", height: "36px", borderRadius: "12px",
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
                ...s.linkText,
            }}>
                {link.title}
            </span>

            <ExternalLink style={{ width: 14, height: 14, flexShrink: 0, ...(s.footer || {}) }} />
        </a>
    );
}
