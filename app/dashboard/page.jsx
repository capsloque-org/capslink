"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import {
    Loader2,
    ExternalLink,
    Copy,
    Check,
    Zap,
} from "lucide-react";
import UsernameForm from "@/components/dashboard/UsernameForm";
import ProfileEditor from "@/components/dashboard/ProfileEditor";
import LinkManager from "@/components/dashboard/LinkManager";
import MobilePreview from "@/components/dashboard/MobilePreview";

export default function DashboardPage() {
    const { user, isLoaded } = useUser();
    const [profile, setProfile] = useState(null);
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (isLoaded && user) {
            if (supabase) {
                fetchProfile();
            } else {
                setLoading(false);
            }
        }
    }, [isLoaded, user]);

    const fetchProfile = async () => {
        setLoading(true);
        const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (profileData) {
            setProfile(profileData);

            const { data: linksData } = await supabase
                .from("links")
                .select("*")
                .eq("user_id", user.id)
                .order("order_index", { ascending: true });

            setLinks(linksData || []);
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
                <Loader2 style={{ width: 32, height: 32, color: "#8b5cf6", animation: "spin 1s linear infinite" }} />
            </div>
        );
    }

    if (!supabase) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
                <div style={{
                    maxWidth: "400px", borderRadius: "20px",
                    border: "1px solid rgba(45,45,74,0.4)",
                    background: "linear-gradient(160deg, rgba(14,14,24,0.95) 0%, rgba(20,20,34,0.7) 100%)",
                    backdropFilter: "blur(24px)", padding: "32px", textAlign: "center",
                }}>
                    <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(234,88,12,0.1))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                        <Zap style={{ width: 28, height: 28, color: "#f59e0b" }} />
                    </div>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#eeeef5", marginBottom: "12px" }}>Setup Required</h2>
                    <p style={{ fontSize: "0.875rem", color: "#9090ad", marginBottom: "16px", lineHeight: 1.5 }}>
                        Supabase credentials are not configured yet.
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "#505068" }}>Then restart the dev server.</p>
                </div>
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
                            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#eeeef5" }}>
                                Your <span className="gradient-text">Dashboard</span>
                            </h1>
                            <p style={{ fontSize: "0.875rem", color: "#9090ad", marginTop: "4px" }}>
                                Manage your CapsLink profile and links
                            </p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <button
                                onClick={copyProfileUrl}
                                title="Copy profile URL"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: "6px",
                                    padding: "8px 14px", borderRadius: "10px",
                                    border: "1px solid rgba(45,45,74,0.5)",
                                    background: "rgba(20,20,34,0.6)",
                                    color: "#c0c0d0", fontSize: "13px", fontWeight: 600,
                                    cursor: "pointer", transition: "all 0.2s ease",
                                }}
                            >
                                {copied ? (
                                    <Check style={{ width: 14, height: 14, color: "#22c55e" }} />
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
                                    padding: "8px 14px", borderRadius: "10px",
                                    background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                                    color: "white", fontSize: "13px", fontWeight: 600,
                                    textDecoration: "none", transition: "all 0.2s ease",
                                    boxShadow: "0 2px 12px rgba(139,92,246,0.3)",
                                }}
                            >
                                <ExternalLink style={{ width: 14, height: 14 }} />
                                Preview
                            </a>
                        </div>
                    </div>
                </div>

                {/* Two-column layout */}
                <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
                    {/* Left — Editor */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ marginBottom: "24px" }}>
                            <ProfileEditor profile={profile} onUpdate={setProfile} />
                        </div>
                        <div style={{ marginBottom: "32px" }}>
                            <LinkManager links={links} userId={user.id} onLinksChange={setLinks} />
                        </div>
                        <div style={{ textAlign: "center", fontSize: "12px", color: "#505068", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                            <Zap style={{ width: 12, height: 12 }} />
                            Powered by CAPSLOQUE
                        </div>
                    </div>

                    {/* Right — Mobile Preview (hidden on small screens via CSS) */}
                    <div className="hide-mobile" style={{ flexShrink: 0, alignSelf: "flex-start", position: "sticky", top: "100px" }}>
                        <MobilePreview profile={profile} links={links} />
                    </div>
                </div>
            </div>
        </div>
    );
}
