"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { TEMPLATES } from "@/lib/profileTemplates";
import { Palette, Check, Loader2 } from "lucide-react";

export default function TemplateSelector({ profile, onUpdate }) {
    const [saving, setSaving] = useState(false);
    const [activeId, setActiveId] = useState(profile?.template || "glass");

    const handleSelect = async (templateId) => {
        if (templateId === activeId) return;
        setActiveId(templateId);
        setSaving(true);

        const { error } = await supabase
            .from("profiles")
            .update({ template: templateId })
            .eq("id", profile.id);

        if (!error) {
            onUpdate({ ...profile, template: templateId });
        } else {
            setActiveId(profile?.template || "glass");
        }
        setSaving(false);
    };

    const cardStyle = {
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.5)",
        background: "rgba(255,255,255,0.22)",
        backdropFilter: "blur(24px)",
        padding: "28px",
        boxShadow: "0 8px 32px rgba(232,67,147,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
    };

    return (
        <div className="animate-fade-in" style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1a1a2e", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Palette style={{ width: 18, height: 18, color: "#e84393" }} />
                    Choose Template
                </h3>
                {saving && (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#9a9ab5" }}>
                        <Loader2 style={{ width: 12, height: 12, animation: "spin 1s linear infinite" }} />
                        Saving...
                    </div>
                )}
            </div>

            {/* Template Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
                    gap: "10px",
                }}
            >
                {TEMPLATES.map((template) => {
                    const isActive = activeId === template.id;
                    return (
                        <button
                            key={template.id}
                            onClick={() => handleSelect(template.id)}
                            style={{
                                position: "relative",
                                padding: "0",
                                border: isActive ? "2px solid #e84393" : "2px solid rgba(255,255,255,0.4)",
                                borderRadius: "16px",
                                background: "rgba(255,255,255,0.2)",
                                cursor: "pointer",
                                transition: "all 0.25s ease",
                                overflow: "hidden",
                                outline: "none",
                                transform: isActive ? "scale(1.02)" : "scale(1)",
                                boxShadow: isActive ? "0 4px 16px rgba(232,67,147,0.2)" : "none",
                            }}
                        >
                            {/* Mini preview */}
                            <div
                                style={{
                                    width: "100%",
                                    height: "80px",
                                    background: template.preview.bg,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "4px",
                                    padding: "8px",
                                    position: "relative",
                                }}
                            >
                                {/* Mini avatar circle */}
                                <div
                                    style={{
                                        width: "20px", height: "20px", borderRadius: "50%",
                                        background: template.preview.accent,
                                        opacity: 0.9,
                                    }}
                                />
                                {/* Mini link bars */}
                                <div
                                    style={{
                                        width: "60%", height: "6px", borderRadius: "3px",
                                        background: template.preview.cardBg,
                                    }}
                                />
                                <div
                                    style={{
                                        width: "50%", height: "6px", borderRadius: "3px",
                                        background: template.preview.cardBg,
                                    }}
                                />
                                <div
                                    style={{
                                        width: "40%", height: "6px", borderRadius: "3px",
                                        background: template.preview.cardBg,
                                    }}
                                />

                                {/* Active check */}
                                {isActive && (
                                    <div
                                        style={{
                                            position: "absolute", top: "6px", right: "6px",
                                            width: "18px", height: "18px", borderRadius: "50%",
                                            background: "#e84393",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        }}
                                    >
                                        <Check style={{ width: 10, height: 10, color: "white" }} />
                                    </div>
                                )}
                            </div>

                            {/* Template name */}
                            <div style={{ padding: "8px 6px 10px" }}>
                                <p style={{
                                    fontSize: "0.7rem", fontWeight: 700, color: "#1a1a2e",
                                    marginBottom: "2px", lineHeight: 1.2,
                                }}>
                                    {template.name}
                                </p>
                                <p style={{
                                    fontSize: "0.55rem", color: "#9a9ab5",
                                    lineHeight: 1.2,
                                }}>
                                    {template.category}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
