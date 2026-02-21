"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { detectPlatform, PlatformIcon } from "@/lib/socialPlatforms";
import {
    BarChart3, TrendingUp, MousePointerClick, Eye,
    Trophy, Loader2, Calendar,
} from "lucide-react";
import ThemedDatePicker from "./ThemedDatePicker";

const DATE_PRESETS = [
    { key: "all", label: "All Time" },
    { key: "today", label: "Today" },
    { key: "7d", label: "7 Days" },
    { key: "30d", label: "30 Days" },
    { key: "custom", label: "Custom" },
];

function getDateRange(presetKey) {
    if (presetKey === "all") return {};
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);

    if (presetKey === "today") {
        return { from: todayStr, to: todayStr };
    }
    if (presetKey === "7d") {
        const d = new Date(now);
        d.setDate(d.getDate() - 6);
        return { from: d.toISOString().slice(0, 10), to: todayStr };
    }
    if (presetKey === "30d") {
        const d = new Date(now);
        d.setDate(d.getDate() - 29);
        return { from: d.toISOString().slice(0, 10), to: todayStr };
    }
    return {};
}

export default function AnalyticsDashboard({ links = [], userId }) {
    const [clickCounts, setClickCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const [activePreset, setActivePreset] = useState("all");
    const [customFrom, setCustomFrom] = useState("");
    const [customTo, setCustomTo] = useState("");

    const fetchClicks = useCallback((dateParams = {}) => {
        if (!userId) return;
        setLoading(true);

        let url = `/api/clicks?userId=${userId}`;
        if (dateParams.from) url += `&from=${dateParams.from}`;
        if (dateParams.to) url += `&to=${dateParams.to}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data.clicks) setClickCounts(data.clicks);
                else setClickCounts({});
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [userId]);

    // Initial fetch and refetch when links change
    useEffect(() => {
        if (activePreset === "custom") {
            if (customFrom && customTo) {
                fetchClicks({ from: customFrom, to: customTo });
            } else {
                fetchClicks();
            }
        } else {
            fetchClicks(getDateRange(activePreset));
        }
    }, [userId, links, activePreset, customFrom, customTo, fetchClicks]);

    const handlePresetClick = (key) => {
        setActivePreset(key);
        if (key !== "custom") {
            setCustomFrom("");
            setCustomTo("");
        }
    };

    const analytics = useMemo(() => {
        const totalClicks = Object.values(clickCounts).reduce((sum, c) => sum + c, 0);
        const totalLinks = links.length;

        const linkStats = links
            .map((link) => ({
                ...link,
                clicks: clickCounts[link.id] || 0,
                platform: detectPlatform(link.url, link.title),
            }))
            .sort((a, b) => b.clicks - a.clicks);

        const topLink = linkStats[0] || null;
        const avgClicks = totalLinks > 0 ? Math.round(totalClicks / totalLinks) : 0;
        const maxClicks = linkStats.length > 0 ? Math.max(...linkStats.map((l) => l.clicks), 1) : 1;

        return { totalClicks, totalLinks, linkStats, topLink, avgClicks, maxClicks };
    }, [links, clickCounts]);

    const cardStyle = {
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.5)",
        background: "rgba(255,255,255,0.22)",
        backdropFilter: "blur(24px)",
        padding: "28px",
        boxShadow: "0 8px 32px rgba(232,67,147,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
    };

    const statCardStyle = {
        padding: "16px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.25)",
        border: "1px solid rgba(255,255,255,0.4)",
        backdropFilter: "blur(8px)",
        flex: 1,
        minWidth: "0",
    };

    const presetBtnBase = {
        padding: "6px 14px",
        borderRadius: "20px",
        fontSize: "0.72rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
        border: "1px solid rgba(232,67,147,0.15)",
        outline: "none",
        whiteSpace: "nowrap",
    };

    const presetBtnActive = {
        ...presetBtnBase,
        background: "linear-gradient(135deg, #e84393, #fd79a8)",
        color: "#fff",
        border: "1px solid transparent",
        boxShadow: "0 2px 8px rgba(232,67,147,0.25)",
    };

    const presetBtnInactive = {
        ...presetBtnBase,
        background: "rgba(255,255,255,0.35)",
        color: "#6b6b8d",
    };



    if (loading && Object.keys(clickCounts).length === 0) {
        return (
            <div className="animate-fade-in" style={cardStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
                    <BarChart3 style={{ width: 18, height: 18, color: "#e84393" }} />
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1a1a2e" }}>Analytics</h3>
                </div>
                <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
                    <Loader2 style={{ width: 24, height: 24, color: "#e84393", animation: "spin 1s linear infinite" }} />
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in" style={cardStyle}>
            {/* Header + Date Filters (single row) */}
            <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <BarChart3 style={{ width: 18, height: 18, color: "#e84393" }} />
                        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>
                            Analytics
                        </h3>
                        {loading && (
                            <Loader2 style={{ width: 14, height: 14, color: "#e84393", animation: "spin 1s linear infinite" }} />
                        )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", flexWrap: "wrap" }}>
                        {DATE_PRESETS.map((preset) => (
                            <button
                                key={preset.key}
                                onClick={() => handlePresetClick(preset.key)}
                                style={activePreset === preset.key ? presetBtnActive : presetBtnInactive}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Custom date inputs */}
                {activePreset === "custom" && (
                    <div style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        marginTop: "12px",
                        padding: "10px 14px",
                        borderRadius: "14px",
                        background: "rgba(255,255,255,0.2)",
                        border: "1px solid rgba(232,67,147,0.1)",
                        backdropFilter: "blur(8px)",
                        flexWrap: "nowrap",
                    }}>
                        <span style={{ fontSize: "0.72rem", color: "#9a9ab5", fontWeight: 600, flexShrink: 0 }}>From</span>
                        <ThemedDatePicker
                            value={customFrom}
                            onChange={setCustomFrom}
                            max={customTo || new Date().toISOString().slice(0, 10)}
                            placeholder="Start"
                        />
                        <span style={{ fontSize: "0.72rem", color: "#9a9ab5", fontWeight: 600, flexShrink: 0 }}>To</span>
                        <ThemedDatePicker
                            value={customTo}
                            onChange={setCustomTo}
                            min={customFrom}
                            max={new Date().toISOString().slice(0, 10)}
                            placeholder="End"
                        />
                    </div>
                )}
            </div>

            {/* Stat Cards Row */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
                {/* Total Clicks */}
                <div style={statCardStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                        <div style={{
                            width: "28px", height: "28px", borderRadius: "8px",
                            background: "linear-gradient(135deg, rgba(232,67,147,0.15), rgba(232,67,147,0.05))",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <MousePointerClick style={{ width: 14, height: 14, color: "#e84393" }} />
                        </div>
                        <span style={{ fontSize: "0.65rem", color: "#9a9ab5", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            Total Clicks
                        </span>
                    </div>
                    <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.02em" }}>
                        {analytics.totalClicks.toLocaleString()}
                    </p>
                </div>

                {/* Total Links */}
                <div style={statCardStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                        <div style={{
                            width: "28px", height: "28px", borderRadius: "8px",
                            background: "linear-gradient(135deg, rgba(162,155,254,0.15), rgba(162,155,254,0.05))",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <Eye style={{ width: 14, height: 14, color: "#a29bfe" }} />
                        </div>
                        <span style={{ fontSize: "0.65rem", color: "#9a9ab5", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            Active Links
                        </span>
                    </div>
                    <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.02em" }}>
                        {analytics.totalLinks}
                    </p>
                </div>

                {/* Avg Clicks */}
                <div style={statCardStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                        <div style={{
                            width: "28px", height: "28px", borderRadius: "8px",
                            background: "linear-gradient(135deg, rgba(0,184,148,0.15), rgba(0,184,148,0.05))",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <TrendingUp style={{ width: 14, height: 14, color: "#00b894" }} />
                        </div>
                        <span style={{ fontSize: "0.65rem", color: "#9a9ab5", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            Avg / Link
                        </span>
                    </div>
                    <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.02em" }}>
                        {analytics.avgClicks}
                    </p>
                </div>
            </div>

            {/* Top Performer */}
            {analytics.topLink && analytics.topLink.clicks > 0 && (
                <div style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "12px 16px", borderRadius: "14px",
                    background: "linear-gradient(135deg, rgba(232,67,147,0.06), rgba(162,155,254,0.06))",
                    border: "1px solid rgba(232,67,147,0.12)",
                    marginBottom: "20px",
                }}>
                    <Trophy style={{ width: 16, height: 16, color: "#f0c040", flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "0.7rem", color: "#9a9ab5", fontWeight: 500, marginBottom: "2px" }}>Top Performer</p>
                        <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1a1a2e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {analytics.topLink.title}
                        </p>
                    </div>
                    <span style={{
                        padding: "4px 10px", borderRadius: "10px",
                        background: "linear-gradient(135deg, #e84393, #fd79a8)",
                        color: "white", fontSize: "0.75rem", fontWeight: 700,
                        flexShrink: 0,
                    }}>
                        {analytics.topLink.clicks} clicks
                    </span>
                </div>
            )}

            {/* Link-by-link breakdown */}
            <div>
                <p style={{ fontSize: "0.75rem", color: "#9a9ab5", fontWeight: 600, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Click Breakdown
                </p>

                {analytics.linkStats.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "32px 0", color: "#9a9ab5" }}>
                        <MousePointerClick style={{ width: 32, height: 32, margin: "0 auto 8px", opacity: 0.3 }} />
                        <p style={{ fontSize: "0.8rem" }}>No links yet — add some to start tracking!</p>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {analytics.linkStats.map((link, i) => {
                            const barWidth = analytics.maxClicks > 0
                                ? Math.max((link.clicks / analytics.maxClicks) * 100, 2)
                                : 2;
                            const isTop = i === 0 && link.clicks > 0;

                            return (
                                <div
                                    key={link.id}
                                    style={{
                                        display: "flex", alignItems: "center", gap: "10px",
                                        padding: "10px 12px", borderRadius: "12px",
                                        background: isTop ? "rgba(232,67,147,0.04)" : "rgba(255,255,255,0.15)",
                                        border: isTop ? "1px solid rgba(232,67,147,0.12)" : "1px solid rgba(255,255,255,0.3)",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    {/* Rank */}
                                    <span style={{
                                        width: "20px", fontSize: "0.7rem", fontWeight: 700,
                                        color: isTop ? "#e84393" : "#9a9ab5",
                                        textAlign: "center", flexShrink: 0,
                                    }}>
                                        {i + 1}
                                    </span>

                                    {/* Platform icon */}
                                    <div style={{
                                        width: "30px", height: "30px", borderRadius: "8px",
                                        background: link.platform.gradient,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        flexShrink: 0,
                                    }}>
                                        <PlatformIcon platformId={link.platform.id} size={14} />
                                    </div>

                                    {/* Name + bar */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{
                                            fontSize: "0.8rem", fontWeight: 600, color: "#1a1a2e",
                                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                            marginBottom: "6px",
                                        }}>
                                            {link.title}
                                        </p>
                                        {/* Visual bar */}
                                        <div style={{
                                            width: "100%", height: "6px", borderRadius: "3px",
                                            background: "rgba(0,0,0,0.04)",
                                            overflow: "hidden",
                                        }}>
                                            <div style={{
                                                width: `${barWidth}%`,
                                                height: "100%", borderRadius: "3px",
                                                background: isTop
                                                    ? "linear-gradient(90deg, #e84393, #fd79a8)"
                                                    : "linear-gradient(90deg, #a29bfe, #6c5ce7)",
                                                transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                                            }} />
                                        </div>
                                    </div>

                                    {/* Click count */}
                                    <div style={{
                                        display: "flex", alignItems: "center", gap: "4px",
                                        flexShrink: 0,
                                    }}>
                                        <span style={{
                                            fontSize: "0.85rem", fontWeight: 700,
                                            color: link.clicks > 0 ? "#1a1a2e" : "#9a9ab5",
                                        }}>
                                            {link.clicks}
                                        </span>
                                        <span style={{ fontSize: "0.6rem", color: "#9a9ab5" }}>
                                            clicks
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
