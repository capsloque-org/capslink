"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
    Loader2,
    ExternalLink,
    Copy,
    Check,
    Zap,
    BarChart3,
    Pencil,
} from "lucide-react";
import UsernameForm from "@/components/dashboard/UsernameForm";
import ProfileEditor from "@/components/dashboard/ProfileEditor";
import LinkManager from "@/components/dashboard/LinkManager";
import MobilePreview from "@/components/dashboard/MobilePreview";
import TemplateSelector from "@/components/dashboard/TemplateSelector";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";

export default function DashboardPage() {
    const { user, isLoaded } = useUser();
    const [profile, setProfile] = useState(null);
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState("editor");

    useEffect(() => {
        if (isLoaded && user) {
            fetchProfile();
        }
    }, [isLoaded, user]);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const profileRes = await fetch(`/api/profile?userId=${user.id}`);
            const profileData = await profileRes.json();

            if (profileData.profile) {
                const p = profileData.profile;
                // Normalize _id to id for frontend consistency
                setProfile({ id: p._id || p.id, ...p });

                const linksRes = await fetch(`/api/links?userId=${user.id}`);
                const linksData = await linksRes.json();

                // Normalize _id to id for each link
                const normalizedLinks = (linksData.links || []).map((l) => ({
                    id: l._id || l.id,
                    ...l,
                }));
                setLinks(normalizedLinks);
            }
        } catch (err) {
            console.error("Failed to fetch profile:", err);
        }
        setLoading(false);
    };

    const handleUsernameClaimed = (username) => {
        setProfile({
            id: user.id,
            username,
            display_name: "",
            bio: "",
            avatar_url: "",
            template: "glass",
        });
    };

    const copyProfileUrl = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/${profile.username}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isLoaded || loading) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Loader2 style={{ width: 32, height: 32, color: "#e84393", animation: "spin 1s linear infinite" }} />
            </div>
        );
    }

    if (!profile) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
                <UsernameForm userId={user.id} onClaimed={handleUsernameClaimed} />
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "60px", paddingLeft: "24px", paddingRight: "24px" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

                {/* Header */}
                <div className="animate-fade-in" style={{ marginBottom: "32px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                        <div>
                            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#1a1a2e" }}>
                                Your <span className="gradient-text">Dashboard</span>
                            </h1>
                            <p style={{ fontSize: "0.875rem", color: "#6b6b8a", marginTop: "4px" }}>
                                Manage your qloque profile and links
                            </p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <button
                                onClick={copyProfileUrl}
                                title="Copy profile URL"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: "6px",
                                    padding: "8px 14px", borderRadius: "12px",
                                    border: "1px solid rgba(255,255,255,0.5)",
                                    background: "rgba(255,255,255,0.3)",
                                    backdropFilter: "blur(8px)",
                                    color: "#4a4a6a", fontSize: "13px", fontWeight: 600,
                                    cursor: "pointer", transition: "all 0.2s ease",
                                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
                                }}
                            >
                                {copied ? (
                                    <Check style={{ width: 14, height: 14, color: "#00b894" }} />
                                ) : (
                                    <Copy style={{ width: 14, height: 14 }} />
                                )}
                                {copied ? "Copied!" : `/${profile.username}`}
                            </button>
                            <a
                                href={`/${profile.username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: "6px",
                                    padding: "8px 14px", borderRadius: "12px",
                                    background: "linear-gradient(135deg, #e84393, #fd79a8)",
                                    color: "white", fontSize: "13px", fontWeight: 600,
                                    textDecoration: "none", transition: "all 0.2s ease",
                                    boxShadow: "0 2px 12px rgba(232,67,147,0.3)",
                                }}
                            >
                                <ExternalLink style={{ width: 14, height: 14 }} />
                                Preview
                            </a>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div style={{
                        display: "flex", gap: "4px", marginTop: "24px",
                        padding: "4px", borderRadius: "14px",
                        background: "rgba(255,255,255,0.2)",
                        border: "1px solid rgba(255,255,255,0.4)",
                        backdropFilter: "blur(8px)",
                        width: "fit-content",
                    }}>
                        {[
                            { id: "editor", label: "Editor", icon: Pencil },
                            { id: "analytics", label: "Analytics", icon: BarChart3 },
                        ].map((tab) => {
                            const isActive = activeTab === tab.id;
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: "6px",
                                        padding: "8px 18px", borderRadius: "10px",
                                        border: "none",
                                        background: isActive
                                            ? "linear-gradient(135deg, #e84393, #fd79a8)"
                                            : "transparent",
                                        color: isActive ? "white" : "#6b6b8a",
                                        fontSize: "13px", fontWeight: 600,
                                        cursor: "pointer", transition: "all 0.25s ease",
                                        boxShadow: isActive ? "0 2px 12px rgba(232,67,147,0.3)" : "none",
                                    }}
                                >
                                    <Icon style={{ width: 14, height: 14 }} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === "editor" ? (
                    /* Two-column layout — Editor */
                    <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
                        {/* Left — Editor */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ marginBottom: "24px" }}>
                                <ProfileEditor profile={profile} onUpdate={setProfile} />
                            </div>
                            <div style={{ marginBottom: "24px" }}>
                                <TemplateSelector profile={profile} onUpdate={setProfile} />
                            </div>
                            <div style={{ marginBottom: "32px" }}>
                                <LinkManager links={links} userId={user.id} onLinksChange={setLinks} />
                            </div>
                            <div style={{ textAlign: "center", fontSize: "12px", color: "#9a9ab5", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                                <Zap style={{ width: 12, height: 12 }} />
                                Powered by CAPSLOQUE
                            </div>
                        </div>

                        {/* Right — Mobile Preview (hidden on small screens via CSS) */}
                        <div className="hide-mobile" style={{ flexShrink: 0, alignSelf: "flex-start", position: "sticky", top: "100px" }}>
                            <MobilePreview profile={profile} links={links} />
                        </div>
                    </div>
                ) : (
                    /* Full-width Analytics */
                    <div className="animate-fade-in">
                        <AnalyticsDashboard links={links} userId={user.id} />
                    </div>
                )}
            </div>
        </div>
    );
}
