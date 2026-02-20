"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { SOCIAL_PLATFORMS, detectPlatform, PlatformIcon } from "@/lib/socialPlatforms";
import {
    Plus, Trash2, ChevronUp, ChevronDown, ExternalLink,
    Pencil, X, Check, Loader2, Link2, ChevronDown as SelectArrow, BarChart3, CircleDot,
    Search,
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
    const [clickCounts, setClickCounts] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [platformSearch, setPlatformSearch] = useState("");
    const dropdownRef = useRef(null);

    // Fetch click counts
    useEffect(() => {
        if (userId) {
            fetch(`/api/clicks?userId=${userId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.clicks) setClickCounts(data.clicks);
                })
                .catch(() => { });
        }
    }, [userId, links]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
                setPlatformSearch("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const updateLinks = (newLinks) => {
        setLinks(newLinks);
        onLinksChange?.(newLinks);
    };

    const handlePlatformSelect = (platformId) => {
        setSelectedPlatform(platformId);
        setDropdownOpen(false);
        setPlatformSearch("");
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

    const toggleShowIcon = async (link) => {
        const newVal = !link.show_icon;
        const { error } = await supabase
            .from("links")
            .update({ show_icon: newVal })
            .eq("id", link.id);
        if (!error) {
            updateLinks(links.map((l) => (l.id === link.id ? { ...l, show_icon: newVal } : l)));
        }
    };

    const filteredPlatforms = SOCIAL_PLATFORMS.filter((p) =>
        p.name.toLowerCase().includes(platformSearch.toLowerCase())
    );

    const selectedPlatformData = SOCIAL_PLATFORMS.find((p) => p.id === selectedPlatform);

    const cardStyle = {
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.5)",
        background: "rgba(255,255,255,0.22)",
        backdropFilter: "blur(24px)",
        padding: "28px",
        boxShadow: "0 8px 32px rgba(232,67,147,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
    };

    const inputStyle = {
        width: "100%", padding: "10px 14px", borderRadius: "10px",
        border: "1px solid rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.4)",
        color: "#1a1a2e", fontSize: "0.85rem", outline: "none",
        transition: "border-color 0.2s ease", boxSizing: "border-box",
        backdropFilter: "blur(8px)",
    };

    const smallBtnStyle = {
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "6px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.3)",
        background: "rgba(255,255,255,0.25)", color: "#6b6b8a",
        cursor: "pointer", transition: "all 0.2s ease",
    };

    return (
        <div className="animate-fade-in" style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1a1a2e", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Link2 style={{ width: 18, height: 18, color: "#e84393" }} />
                    Your Links
                    <span style={{ fontSize: "0.85rem", color: "#9a9ab5", fontWeight: 400 }}>({links.length})</span>
                </h3>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        padding: "8px 14px", borderRadius: "12px", border: "none",
                        background: showAddForm ? "rgba(255,255,255,0.3)" : "linear-gradient(135deg, #e84393, #fd79a8)",
                        color: showAddForm ? "#6b6b8a" : "white",
                        fontSize: "13px", fontWeight: 600, cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: showAddForm ? "none" : "0 2px 12px rgba(232,67,147,0.3)",
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
                        marginBottom: "24px", padding: "16px", borderRadius: "16px",
                        background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)",
                        backdropFilter: "blur(12px)",
                        display: "flex", flexDirection: "column", gap: "10px",
                        overflow: "visible", position: "relative", zIndex: 10,
                    }}
                >
                    {/* Custom Platform Dropdown */}
                    <div ref={dropdownRef} style={{ position: "relative" }}>
                        <label style={{ fontSize: "12px", color: "#6b6b8a", marginBottom: "6px", display: "block", fontWeight: 500 }}>
                            Platform
                        </label>
                        <button
                            type="button"
                            onClick={() => { setDropdownOpen(!dropdownOpen); setPlatformSearch(""); }}
                            style={{
                                width: "100%", padding: "10px 14px", borderRadius: "10px",
                                border: dropdownOpen ? "1px solid rgba(232,67,147,0.4)" : "1px solid rgba(255,255,255,0.5)",
                                background: dropdownOpen ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.4)",
                                color: "#1a1a2e", fontSize: "0.85rem", outline: "none",
                                transition: "all 0.2s ease", boxSizing: "border-box",
                                backdropFilter: "blur(8px)",
                                cursor: "pointer",
                                display: "flex", alignItems: "center", gap: "10px",
                                textAlign: "left",
                                boxShadow: dropdownOpen ? "0 0 0 3px rgba(232,67,147,0.08)" : "none",
                            }}
                        >
                            {selectedPlatformData ? (
                                <>
                                    <div style={{
                                        width: "24px", height: "24px", borderRadius: "6px",
                                        background: selectedPlatformData.gradient,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        flexShrink: 0,
                                    }}>
                                        <PlatformIcon platformId={selectedPlatformData.id} size={12} />
                                    </div>
                                    <span style={{ flex: 1, fontWeight: 500 }}>{selectedPlatformData.name}</span>
                                </>
                            ) : (
                                <>
                                    <div style={{
                                        width: "24px", height: "24px", borderRadius: "6px",
                                        background: "rgba(154,154,181,0.15)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        flexShrink: 0,
                                    }}>
                                        <Link2 style={{ width: 12, height: 12, color: "#9a9ab5" }} />
                                    </div>
                                    <span style={{ flex: 1, color: "#9a9ab5" }}>Select a platform...</span>
                                </>
                            )}
                            <ChevronDown style={{
                                width: 14, height: 14, color: "#9a9ab5", flexShrink: 0,
                                transition: "transform 0.2s ease",
                                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                            }} />
                        </button>

                        {/* Dropdown Panel */}
                        {dropdownOpen && (
                            <div style={{
                                position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
                                zIndex: 50,
                                background: "rgba(255,255,255,0.92)",
                                backdropFilter: "blur(24px)",
                                WebkitBackdropFilter: "blur(24px)",
                                borderRadius: "14px",
                                border: "1px solid rgba(255,255,255,0.6)",
                                boxShadow: "0 12px 48px rgba(26,26,46,0.12), 0 4px 16px rgba(232,67,147,0.06)",
                                overflow: "hidden",
                                animation: "fadeInDropdown 0.18s ease",
                            }}>
                                {/* Search */}
                                <div style={{
                                    padding: "10px 12px",
                                    borderBottom: "1px solid rgba(232,67,147,0.08)",
                                }}>
                                    <div style={{
                                        display: "flex", alignItems: "center", gap: "8px",
                                        padding: "8px 10px", borderRadius: "8px",
                                        background: "rgba(245,243,250,0.8)",
                                        border: "1px solid rgba(232,67,147,0.1)",
                                    }}>
                                        <Search style={{ width: 13, height: 13, color: "#9a9ab5", flexShrink: 0 }} />
                                        <input
                                            type="text"
                                            placeholder="Search platforms..."
                                            value={platformSearch}
                                            onChange={(e) => setPlatformSearch(e.target.value)}
                                            autoFocus
                                            style={{
                                                border: "none", outline: "none", background: "transparent",
                                                fontSize: "0.8rem", color: "#1a1a2e", width: "100%",
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Platform List */}
                                <div style={{
                                    maxHeight: "240px", overflowY: "auto",
                                    padding: "6px",
                                }}>
                                    {filteredPlatforms.length === 0 ? (
                                        <div style={{
                                            padding: "16px", textAlign: "center",
                                            color: "#9a9ab5", fontSize: "0.8rem",
                                        }}>
                                            No platforms found
                                        </div>
                                    ) : (
                                        filteredPlatforms.map((p) => (
                                            <button
                                                key={p.id}
                                                type="button"
                                                onClick={() => handlePlatformSelect(p.id)}
                                                style={{
                                                    width: "100%", display: "flex", alignItems: "center", gap: "10px",
                                                    padding: "8px 10px", borderRadius: "8px",
                                                    border: "none", cursor: "pointer",
                                                    background: selectedPlatform === p.id
                                                        ? "rgba(232,67,147,0.1)"
                                                        : "transparent",
                                                    transition: "background 0.15s ease",
                                                    textAlign: "left",
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (selectedPlatform !== p.id) e.currentTarget.style.background = "rgba(245,243,250,0.9)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = selectedPlatform === p.id
                                                        ? "rgba(232,67,147,0.1)" : "transparent";
                                                }}
                                            >
                                                <div style={{
                                                    width: "28px", height: "28px", borderRadius: "8px",
                                                    background: p.gradient,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    flexShrink: 0,
                                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                                }}>
                                                    <PlatformIcon platformId={p.id} size={13} />
                                                </div>
                                                <span style={{
                                                    flex: 1, fontSize: "0.82rem", fontWeight: 500,
                                                    color: selectedPlatform === p.id ? "#e84393" : "#1a1a2e",
                                                }}>
                                                    {p.name}
                                                </span>
                                                {selectedPlatform === p.id && (
                                                    <Check style={{ width: 14, height: 14, color: "#e84393" }} />
                                                )}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Link title" style={inputStyle} />
                    <input type="text" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="URL (e.g., https://instagram.com/you)" style={inputStyle} />
                    <button
                        type="submit"
                        disabled={adding || !newTitle.trim() || !newUrl.trim()}
                        style={{
                            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                            padding: "10px", borderRadius: "12px", border: "none",
                            background: (!newTitle.trim() || !newUrl.trim()) ? "rgba(255,255,255,0.3)" : "linear-gradient(135deg, #e84393, #fd79a8)",
                            color: (!newTitle.trim() || !newUrl.trim()) ? "#9a9ab5" : "white",
                            fontSize: "0.85rem", fontWeight: 700, cursor: (!newTitle.trim() || !newUrl.trim()) ? "not-allowed" : "pointer",
                            transition: "all 0.2s ease",
                            boxShadow: (!newTitle.trim() || !newUrl.trim()) ? "none" : "0 2px 12px rgba(232,67,147,0.25)",
                        }}
                    >
                        {adding ? <Loader2 style={{ width: 14, height: 14, animation: "spin 1s linear infinite" }} /> : <><Plus style={{ width: 14, height: 14 }} /> Add Link</>}
                    </button>
                </form>
            )}

            {/* Links List */}
            {links.length === 0 ? (
                <div style={{ textAlign: "center", padding: "48px 0", color: "#9a9ab5" }}>
                    <Link2 style={{ width: 36, height: 36, margin: "0 auto 12px", opacity: 0.4 }} />
                    <p style={{ fontSize: "0.875rem" }}>No links yet. Add your first one!</p>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {links.map((link, index) => {
                        const platform = detectPlatform(link.url, link.title);
                        return (
                            <div
                                key={link.id}
                                style={{
                                    display: "flex", alignItems: "center", gap: "10px",
                                    padding: "12px", borderRadius: "14px",
                                    background: "rgba(255,255,255,0.2)",
                                    border: "1px solid rgba(255,255,255,0.4)",
                                    backdropFilter: "blur(8px)",
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
                                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1a1a2e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                    {link.title}
                                                </p>
                                                {(clickCounts[link.id] || 0) > 0 && (
                                                    <span style={{
                                                        display: "inline-flex", alignItems: "center", gap: "3px",
                                                        padding: "2px 7px", borderRadius: "8px",
                                                        background: "rgba(232,67,147,0.1)",
                                                        color: "#e84393", fontSize: "0.65rem", fontWeight: 700,
                                                        flexShrink: 0,
                                                    }}>
                                                        <BarChart3 style={{ width: 10, height: 10 }} />
                                                        {clickCounts[link.id]}
                                                    </span>
                                                )}
                                            </div>
                                            <p style={{ fontSize: "0.75rem", color: "#9a9ab5", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: "2px" }}>
                                                {link.url}
                                            </p>
                                        </>
                                    )}
                                </div>

                                {/* Actions */}
                                <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                                    {editingId === link.id ? (
                                        <>
                                            <button onClick={saveEdit} style={{ ...smallBtnStyle, color: "#00b894" }}>
                                                <Check style={{ width: 14, height: 14 }} />
                                            </button>
                                            <button onClick={() => setEditingId(null)} style={smallBtnStyle}>
                                                <X style={{ width: 14, height: 14 }} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => toggleShowIcon(link)}
                                                title={link.show_icon ? "Hide from social row" : "Show in social row"}
                                                style={{
                                                    ...smallBtnStyle,
                                                    color: link.show_icon ? "#e84393" : "#6b6b8a",
                                                    background: link.show_icon ? "rgba(232,67,147,0.12)" : "rgba(255,255,255,0.25)",
                                                    border: link.show_icon ? "1px solid rgba(232,67,147,0.3)" : "1px solid rgba(255,255,255,0.3)",
                                                }}
                                            >
                                                <CircleDot style={{ width: 14, height: 14 }} />
                                            </button>
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" style={smallBtnStyle}>
                                                <ExternalLink style={{ width: 14, height: 14 }} />
                                            </a>
                                            <button onClick={() => startEdit(link)} style={smallBtnStyle}>
                                                <Pencil style={{ width: 14, height: 14 }} />
                                            </button>
                                            <button onClick={() => handleDelete(link.id)} style={{ ...smallBtnStyle, color: "#ff6b6b" }}>
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
