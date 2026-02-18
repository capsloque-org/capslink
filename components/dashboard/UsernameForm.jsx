"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { AtSign, Check, Loader2, AlertCircle, ArrowRight, Sparkles } from "lucide-react";

export default function UsernameForm({ userId, onClaimed }) {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [checking, setChecking] = useState(false);
    const [available, setAvailable] = useState(null);

    const checkAvailability = async (value) => {
        if (!value || value.length < 3) {
            setAvailable(null);
            return;
        }
        setChecking(true);
        const { data } = await supabase
            .from("profiles")
            .select("username")
            .eq("username", value.toLowerCase())
            .single();
        setAvailable(!data);
        setChecking(false);
    };

    const handleChange = (e) => {
        const val = e.target.value.replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase();
        setUsername(val);
        setError("");
        checkAvailability(val);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || username.length < 3) {
            setError("Username must be at least 3 characters");
            return;
        }
        if (!available) {
            setError("Username is not available");
            return;
        }

        setLoading(true);
        setError("");

        const { error: insertError } = await supabase.from("profiles").insert({
            id: userId,
            username: username.toLowerCase(),
            display_name: "",
            bio: "",
            avatar_url: "",
        });

        if (insertError) {
            setError(insertError.message);
            setLoading(false);
            return;
        }

        onClaimed(username.toLowerCase());
        setLoading(false);
    };

    return (
        <div style={{ width: "100%", maxWidth: "420px", margin: "0 auto" }}>
            <div
                className="animate-fade-in"
                style={{
                    borderRadius: "28px",
                    border: "1px solid rgba(255,255,255,0.5)",
                    background: "rgba(255,255,255,0.25)",
                    backdropFilter: "blur(24px)",
                    padding: "40px 32px",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(232,67,147,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
            >
                {/* Subtle glow */}
                <div
                    style={{
                        position: "absolute", top: "-40px", right: "-40px",
                        width: "180px", height: "180px",
                        background: "radial-gradient(circle, rgba(232,67,147,0.1) 0%, transparent 70%)",
                        filter: "blur(40px)", pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        position: "absolute", bottom: "-30px", left: "-30px",
                        width: "140px", height: "140px",
                        background: "radial-gradient(circle, rgba(162,155,254,0.08) 0%, transparent 70%)",
                        filter: "blur(30px)", pointerEvents: "none",
                    }}
                />

                <div style={{ position: "relative", zIndex: 1 }}>
                    {/* Icon */}
                    <div
                        style={{
                            width: "56px", height: "56px", borderRadius: "18px",
                            background: "linear-gradient(135deg, rgba(232,67,147,0.12), rgba(162,155,254,0.08))",
                            border: "1px solid rgba(255,255,255,0.4)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            margin: "0 auto 24px",
                        }}
                    >
                        <AtSign style={{ width: 26, height: 26, color: "#e84393" }} />
                    </div>

                    {/* Title */}
                    <h2
                        style={{
                            fontSize: "1.5rem", fontWeight: 800, color: "#1a1a2e",
                            marginBottom: "8px", letterSpacing: "-0.02em",
                        }}
                    >
                        Claim Your Username
                    </h2>
                    <p style={{ fontSize: "0.875rem", color: "#6b6b8a", marginBottom: "32px", lineHeight: 1.5 }}>
                        This will be your unique qloque URL
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {/* URL preview */}
                        <div
                            style={{
                                display: "flex", alignItems: "center", gap: "2px",
                                marginBottom: "12px", justifyContent: "center",
                            }}
                        >
                            <span style={{ fontSize: "13px", color: "#9a9ab5" }}>qloque.com/</span>
                            <span style={{ fontSize: "13px", color: "#e84393", fontWeight: 600 }}>
                                {username || "yourname"}
                            </span>
                            {available === true && (
                                <Check style={{ width: 14, height: 14, color: "#00b894", marginLeft: "4px" }} />
                            )}
                        </div>

                        {/* Input */}
                        <div style={{ position: "relative", marginBottom: "16px" }}>
                            <input
                                type="text"
                                value={username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                maxLength={30}
                                autoFocus
                                style={{
                                    width: "100%",
                                    padding: "14px 44px 14px 16px",
                                    borderRadius: "14px",
                                    border: `1px solid ${available === true ? "rgba(0,184,148,0.3)" : available === false ? "rgba(255,107,107,0.3)" : "rgba(255,255,255,0.5)"}`,
                                    background: "rgba(255,255,255,0.4)",
                                    color: "#1a1a2e",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                    outline: "none",
                                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                                    boxSizing: "border-box",
                                    backdropFilter: "blur(8px)",
                                }}
                            />
                            <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}>
                                {checking && (
                                    <Loader2 style={{ width: 16, height: 16, color: "#6b6b8a", animation: "spin 1s linear infinite" }} />
                                )}
                                {!checking && available === true && (
                                    <Check style={{ width: 16, height: 16, color: "#00b894" }} />
                                )}
                                {!checking && available === false && (
                                    <AlertCircle style={{ width: 16, height: 16, color: "#ff6b6b" }} />
                                )}
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div
                                style={{
                                    display: "flex", alignItems: "center", gap: "6px",
                                    fontSize: "13px", color: "#ff6b6b",
                                    marginBottom: "16px", justifyContent: "center",
                                }}
                            >
                                <AlertCircle style={{ width: 14, height: 14 }} />
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || !available}
                            style={{
                                width: "100%",
                                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                padding: "14px 24px",
                                borderRadius: "14px",
                                border: "none",
                                background: available
                                    ? "linear-gradient(135deg, #e84393, #fd79a8)"
                                    : "rgba(255,255,255,0.3)",
                                color: available ? "white" : "#9a9ab5",
                                fontSize: "0.9rem",
                                fontWeight: 700,
                                cursor: available ? "pointer" : "not-allowed",
                                transition: "all 0.2s ease",
                                boxShadow: available ? "0 4px 20px rgba(232,67,147,0.3)" : "none",
                            }}
                        >
                            {loading ? (
                                <Loader2 style={{ width: 18, height: 18, animation: "spin 1s linear infinite" }} />
                            ) : (
                                <>
                                    Claim Username
                                    <ArrowRight style={{ width: 16, height: 16 }} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Hint */}
                    <p style={{ fontSize: "12px", color: "#9a9ab5", marginTop: "16px" }}>
                        Only letters, numbers, hyphens, and underscores allowed
                    </p>
                </div>
            </div>
        </div>
    );
}
