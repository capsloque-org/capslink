"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { SOCIAL_PLATFORMS, detectPlatform, PlatformIcon } from "@/lib/socialPlatforms";
import {
    Plus, Trash2, ChevronUp, ChevronDown, ExternalLink,
    Pencil, X, Check, Loader2, Link2, ChevronDown as SelectArrow,
} from "lucide-react";

export default function LinkManager({ links: initialLinks, userId, onLinksChange }) {
    const [links, setLinks] = useState(initialLinks || []);
    const [newTitle, setNewTitle] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState("");
    const [adding, setAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editUrl, setEditUrl] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);

    const updateLinks = (newLinks) => {
        setLinks(newLinks);
        onLinksChange?.(newLinks);
    };

    const handlePlatformSelect = (e) => {
        const platformId = e.target.value;
        setSelectedPlatform(platformId);
        if (platformId && platformId !== "website") {
            const platform = SOCIAL_PLATFORMS.find((p) => p.id === platformId);
            if (platform) {
                setNewTitle(platform.name);
            }
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newUrl.trim()) return;
        setAdding(true);
        const order_index = links.length;
        let url = newUrl.trim();
        if (!/^https?:\/\//i.test(url)) url = "https://" + url;

        const { data, error } = await supabase
            .from("links")
            .insert({ user_id: userId, title: newTitle.trim(), url, order_index })
            .select()
            .single();

        if (!error && data) {
            updateLinks([...links, data]);
            setNewTitle("");
            setNewUrl("");
            setSelectedPlatform("");
            setShowAddForm(false);
        }
        setAdding(false);
    };

    const handleDelete = async (id) => {
        const { error } = await supabase.from("links").delete().eq("id", id);
        if (!error) updateLinks(links.filter((l) => l.id !== id));
    };

    const startEdit = (link) => {
        setEditingId(link.id);
        setEditTitle(link.title);
        setEditUrl(link.url);
    };

    const saveEdit = async () => {
        if (!editTitle.trim() || !editUrl.trim()) return;
        let url = editUrl.trim();
        if (!/^https?:\/\//i.test(url)) url = "https://" + url;
        const { error } = await supabase
            .from("links")
            .update({ title: editTitle.trim(), url })
            .eq("id", editingId);
        if (!error) {
            updateLinks(links.map((l) => (l.id === editingId ? { ...l, title: editTitle.trim(), url } : l)));
        }
        setEditingId(null);
    };

    const moveLink = async (index, direction) => {
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= links.length) return;
        const updated = [...links];
        [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
        const updatedWithIndex = updated.map((link, i) => ({ ...link, order_index: i }));
        updateLinks(updatedWithIndex);
        await Promise.all([
            supabase.from("links").update({ order_index: updatedWithIndex[index].order_index }).eq("id", updatedWithIndex[index].id),
            supabase.from("links").update({ order_index: updatedWithIndex[newIndex].order_index }).eq("id", updatedWithIndex[newIndex].id),
        ]);
    };

    const cardStyle = {
        borderRadius: "20px",
        border: "1px solid rgba(45,45,74,0.4)",
        background: "linear-gradient(160deg, rgba(14,14,24,0.95) 0%, rgba(20,20,34,0.7) 100%)",
        backdropFilter: "blur(24px)",
        padding: "28px",
    };

    const inputStyle = {
        width: "100%", padding: "10px 14px", borderRadius: "10px",
        border: "1px solid rgba(45,45,74,0.5)", background: "rgba(6,6,11,0.8)",
        color: "#eeeef5", fontSize: "0.85rem", outline: "none",
        transition: "border-color 0.2s ease", boxSizing: "border-box",
    };

    const selectStyle = {
        ...inputStyle,
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239090ad' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        paddingRight: "36px",
        cursor: "pointer",
    };

    const smallBtnStyle = {
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "6px", borderRadius: "8px", border: "none",
        background: "rgba(45,45,74,0.3)", color: "#9090ad",
        cursor: "pointer", transition: "all 0.2s ease",
    };

    return (
        <div className="animate-fade-in" style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#eeeef5", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Link2 style={{ width: 18, height: 18, color: "#a78bfa" }} />
                    Your Links
                    <span style={{ fontSize: "0.85rem", color: "#505068", fontWeight: 400 }}>({links.length})</span>
                </h3>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        padding: "8px 14px", borderRadius: "10px", border: "none",
                        background: showAddForm ? "rgba(45,45,74,0.4)" : "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                        color: showAddForm ? "#9090ad" : "white",
                        fontSize: "13px", fontWeight: 600, cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: showAddForm ? "none" : "0 2px 12px rgba(139,92,246,0.3)",
                    }}
                >
                    {showAddForm ? <X style={{ width: 14, height: 14 }} /> : <Plus style={{ width: 14, height: 14 }} />}
                    {showAddForm ? "Cancel" : "Add Link"}
                </button>
            </div>

            {/* Add Form */}
            {showAddForm && (
                <form
                    onSubmit={handleAdd}
                    className="animate-fade-in"
                    style={{
                        marginBottom: "24px", padding: "16px", borderRadius: "14px",
                        background: "rgba(6,6,11,0.6)", border: "1px solid rgba(45,45,74,0.4)",
                        display: "flex", flexDirection: "column", gap: "10px",
                    }}
                >
                    {/* Platform Dropdown */}
                    <div>
                        <label style={{ fontSize: "12px", color: "#9090ad", marginBottom: "6px", display: "block", fontWeight: 500 }}>
                            Platform
                        </label>
                        <select
                            value={selectedPlatform}
                            onChange={handlePlatformSelect}
                            style={selectStyle}
                        >
                            <option value="">Select a platform...</option>
                            {SOCIAL_PLATFORMS.map((p) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Selected platform preview */}
                    {selectedPlatform && selectedPlatform !== "website" && (
                        <div style={{
                            display: "flex", alignItems: "center", gap: "8px",
                            padding: "8px 12px", borderRadius: "8px",
                            background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)",
                        }}>
                            <PlatformIcon platformId={selectedPlatform} size={16} />
                            <span style={{ fontSize: "12px", color: "#c4b5fd", fontWeight: 500 }}>
                                {SOCIAL_PLATFORMS.find(p => p.id === selectedPlatform)?.name}
                            </span>
                        </div>
                    )}

                    <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Link title" style={inputStyle} />
                    <input type="text" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="URL (e.g., https://instagram.com/you)" style={inputStyle} autoFocus />
                    <button
                        type="submit"
                        disabled={adding || !newTitle.trim() || !newUrl.trim()}
                        style={{
                            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                            padding: "10px", borderRadius: "10px", border: "none",
                            background: (!newTitle.trim() || !newUrl.trim()) ? "rgba(45,45,74,0.4)" : "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                            color: (!newTitle.trim() || !newUrl.trim()) ? "#505068" : "white",
                            fontSize: "0.85rem", fontWeight: 700, cursor: (!newTitle.trim() || !newUrl.trim()) ? "not-allowed" : "pointer",
                            transition: "all 0.2s ease",
                        }}
                    >
                        {adding ? <Loader2 style={{ width: 14, height: 14, animation: "spin 1s linear infinite" }} /> : <><Plus style={{ width: 14, height: 14 }} /> Add Link</>}
                    </button>
                </form>
            )}

            {/* Links List */}
            {links.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 0", color: "#505068" }}>
                    <Link2 style={{ width: 36, height: 36, margin: "0 auto 12px", opacity: 0.4 }} />
                    <p style={{ fontSize: "0.875rem" }}>No links yet. Add your first one!</p>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {links.map((link, index) => {
                        const platform = detectPlatform(link.url);
                        return (
                            <div
                                key={link.id}
                                style={{
                                    display: "flex", alignItems: "center", gap: "10px",
                                    padding: "12px", borderRadius: "12px",
                                    background: "rgba(14,14,24,0.6)",
                                    border: "1px solid rgba(45,45,74,0.3)",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                {/* Platform icon */}
                                <div style={{
                                    width: "36px", height: "36px", borderRadius: "10px",
                                    background: platform.gradient,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    flexShrink: 0,
                                }}>
                                    <PlatformIcon platformId={platform.id} size={16} style={{ filter: "brightness(1.2)" }} />
                                </div>

                                {/* Reorder buttons */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                                    <button onClick={() => moveLink(index, -1)} disabled={index === 0} style={{ ...smallBtnStyle, opacity: index === 0 ? 0.2 : 1 }}>
                                        <ChevronUp style={{ width: 12, height: 12 }} />
                                    </button>
                                    <button onClick={() => moveLink(index, 1)} disabled={index === links.length - 1} style={{ ...smallBtnStyle, opacity: index === links.length - 1 ? 0.2 : 1 }}>
                                        <ChevronDown style={{ width: 12, height: 12 }} />
                                    </button>
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    {editingId === link.id ? (
                                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                            <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={{ ...inputStyle, padding: "8px 12px" }} autoFocus />
                                            <input type="text" value={editUrl} onChange={(e) => setEditUrl(e.target.value)} style={{ ...inputStyle, padding: "8px 12px" }} />
                                        </div>
                                    ) : (
                                        <>
                                            <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#eeeef5", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                {link.title}
                                            </p>
                                            <p style={{ fontSize: "0.75rem", color: "#505068", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: "2px" }}>
                                                {link.url}
                                            </p>
                                        </>
                                    )}
                                </div>

                                {/* Actions */}
                                <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                                    {editingId === link.id ? (
                                        <>
                                            <button onClick={saveEdit} style={{ ...smallBtnStyle, color: "#22c55e" }}>
                                                <Check style={{ width: 14, height: 14 }} />
                                            </button>
                                            <button onClick={() => setEditingId(null)} style={smallBtnStyle}>
                                                <X style={{ width: 14, height: 14 }} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" style={smallBtnStyle}>
                                                <ExternalLink style={{ width: 14, height: 14 }} />
                                            </a>
                                            <button onClick={() => startEdit(link)} style={smallBtnStyle}>
                                                <Pencil style={{ width: 14, height: 14 }} />
                                            </button>
                                            <button onClick={() => handleDelete(link.id)} style={{ ...smallBtnStyle, color: "#ef4444" }}>
                                                <Trash2 style={{ width: 14, height: 14 }} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
