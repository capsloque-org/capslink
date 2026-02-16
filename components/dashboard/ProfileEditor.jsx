"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { User, FileText, Image, Save, Loader2, Check } from "lucide-react";

export default function ProfileEditor({ profile, onUpdate }) {
    const [displayName, setDisplayName] = useState(profile.display_name || "");
    const [bio, setBio] = useState(profile.bio || "");
    const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || "");
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSaved(false);

        const { error } = await supabase
            .from("profiles")
            .update({
                display_name: displayName,
                bio: bio,
                avatar_url: avatarUrl,
            })
            .eq("id", profile.id);

        setSaving(false);
        if (!error) {
            setSaved(true);
            onUpdate({ ...profile, display_name: displayName, bio, avatar_url: avatarUrl });
            setTimeout(() => setSaved(false), 2000);
        }
    };

    const cardStyle = {
        borderRadius: "20px",
        border: "1px solid rgba(45,45,74,0.4)",
        background: "linear-gradient(160deg, rgba(14,14,24,0.95) 0%, rgba(20,20,34,0.7) 100%)",
        backdropFilter: "blur(24px)",
        padding: "28px",
    };

    const labelStyle = {
        fontSize: "13px", color: "#9090ad", marginBottom: "8px",
        display: "flex", alignItems: "center", gap: "6px", fontWeight: 500,
    };

    const inputStyle = {
        width: "100%", padding: "12px 14px", borderRadius: "10px",
        border: "1px solid rgba(45,45,74,0.5)", background: "rgba(6,6,11,0.8)",
        color: "#eeeef5", fontSize: "0.9rem", outline: "none",
        transition: "border-color 0.2s ease", boxSizing: "border-box",
    };

    return (
        <div className="animate-fade-in" style={cardStyle}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#eeeef5", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
                <User style={{ width: 18, height: 18, color: "#a78bfa" }} />
                Profile Settings
            </h3>

            <form onSubmit={handleSave}>
                {/* Avatar Preview + URL */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px" }}>
                    <div
                        style={{
                            width: "72px", height: "72px", borderRadius: "16px",
                            background: "rgba(14,14,24,0.8)", border: "1px solid rgba(45,45,74,0.5)",
                            flexShrink: 0, overflow: "hidden", display: "flex",
                            alignItems: "center", justifyContent: "center",
                        }}
                    >
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt="Avatar"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                onError={(e) => (e.target.style.display = "none")}
                            />
                        ) : (
                            <Image style={{ width: 28, height: 28, color: "#505068" }} />
                        )}
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Avatar URL</label>
                        <input
                            type="url"
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            placeholder="https://example.com/avatar.jpg"
                            style={inputStyle}
                        />
                    </div>
                </div>

                {/* Display Name */}
                <div style={{ marginBottom: "20px" }}>
                    <label style={labelStyle}>
                        <User style={{ width: 13, height: 13 }} />
                        Display Name
                    </label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your display name"
                        style={inputStyle}
                        maxLength={50}
                    />
                </div>

                {/* Bio */}
                <div style={{ marginBottom: "24px" }}>
                    <label style={labelStyle}>
                        <FileText style={{ width: 13, height: 13 }} />
                        Bio
                    </label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell the world about yourself..."
                        rows={3}
                        maxLength={200}
                        style={{ ...inputStyle, resize: "none" }}
                    />
                    <p style={{ fontSize: "11px", color: "#505068", marginTop: "4px", textAlign: "right" }}>
                        {bio.length}/200
                    </p>
                </div>

                {/* Save */}
                <button
                    type="submit"
                    disabled={saving}
                    style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                        padding: "12px", borderRadius: "12px", border: "none",
                        background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                        color: "white", fontSize: "0.9rem", fontWeight: 700,
                        cursor: saving ? "not-allowed" : "pointer",
                        opacity: saving ? 0.6 : 1,
                        transition: "all 0.2s ease",
                        boxShadow: "0 4px 20px rgba(139,92,246,0.3)",
                    }}
                >
                    {saving ? (
                        <Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} />
                    ) : saved ? (
                        <>
                            <Check style={{ width: 16, height: 16 }} />
                            Saved!
                        </>
                    ) : (
                        <>
                            <Save style={{ width: 16, height: 16 }} />
                            Save Profile
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
