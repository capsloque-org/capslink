"use client";

import { useState } from "react";
import { User, FileText, Image, Save, Loader2, Check, ImageIcon } from "lucide-react";

export default function ProfileEditor({ profile, onUpdate }) {
    const [displayName, setDisplayName] = useState(profile.display_name || "");
    const [bio, setBio] = useState(profile.bio || "");
    const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || "");
    const [bannerUrl, setBannerUrl] = useState(profile.banner_url || "");
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSaved(false);

        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: profile.id,
                    display_name: displayName,
                    bio: bio,
                    avatar_url: avatarUrl,
                    banner_url: bannerUrl,
                }),
            });

            setSaving(false);
            if (res.ok) {
                setSaved(true);
                onUpdate({ ...profile, display_name: displayName, bio, avatar_url: avatarUrl, banner_url: bannerUrl });
                setTimeout(() => setSaved(false), 2000);
            }
        } catch {
            setSaving(false);
        }
    };

    const cardStyle = {
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.5)",
        background: "rgba(255,255,255,0.22)",
        backdropFilter: "blur(24px)",
        padding: "28px",
        boxShadow: "0 8px 32px rgba(232,67,147,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
    };

    const labelStyle = {
        fontSize: "13px", color: "#6b6b8a", marginBottom: "8px",
        display: "flex", alignItems: "center", gap: "6px", fontWeight: 500,
    };

    const inputStyle = {
        width: "100%", padding: "12px 14px", borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.4)",
        color: "#1a1a2e", fontSize: "0.9rem", outline: "none",
        transition: "border-color 0.2s ease, background 0.2s ease", boxSizing: "border-box",
        backdropFilter: "blur(8px)",
    };

    return (
        <div className="animate-fade-in" style={cardStyle}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
                <User style={{ width: 18, height: 18, color: "#e84393" }} />
                Profile Settings
            </h3>

            <form onSubmit={handleSave}>
                {/* Avatar Preview + URL */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px" }}>
                    <div
                        style={{
                            width: "72px", height: "72px", borderRadius: "18px",
                            background: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.5)",
                            flexShrink: 0, overflow: "hidden", display: "flex",
                            alignItems: "center", justifyContent: "center",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
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
                            <Image style={{ width: 28, height: 28, color: "#9a9ab5" }} />
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

                {/* Banner Image URL */}
                <div style={{ marginBottom: "20px" }}>
                    <label style={labelStyle}>
                        <ImageIcon style={{ width: 13, height: 13 }} />
                        Banner Image URL
                    </label>
                    {bannerUrl && (
                        <div style={{
                            width: "100%", height: "80px", borderRadius: "12px",
                            overflow: "hidden", marginBottom: "8px",
                            border: "1px solid rgba(255,255,255,0.5)",
                        }}>
                            <img
                                src={bannerUrl}
                                alt="Banner preview"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                onError={(e) => (e.target.style.display = "none")}
                            />
                        </div>
                    )}
                    <input
                        type="url"
                        value={bannerUrl}
                        onChange={(e) => setBannerUrl(e.target.value)}
                        placeholder="https://example.com/banner.jpg"
                        style={inputStyle}
                    />
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
                    <p style={{ fontSize: "11px", color: "#9a9ab5", marginTop: "4px", textAlign: "right" }}>
                        {bio.length}/200
                    </p>
                </div>

                {/* Save */}
                <button
                    type="submit"
                    disabled={saving}
                    style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                        padding: "12px", borderRadius: "14px", border: "none",
                        background: "linear-gradient(135deg, #e84393, #fd79a8)",
                        color: "white", fontSize: "0.9rem", fontWeight: 700,
                        cursor: saving ? "not-allowed" : "pointer",
                        opacity: saving ? 0.6 : 1,
                        transition: "all 0.2s ease",
                        boxShadow: "0 4px 20px rgba(232,67,147,0.3)",
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
