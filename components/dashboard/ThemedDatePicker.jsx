"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Monday = 0
}

function formatDate(date) {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function formatDisplay(date) {
    if (!date) return "";
    const d = date.getDate();
    const m = MONTHS[date.getMonth()].slice(0, 3);
    const y = date.getFullYear();
    return `${d} ${m} ${y}`;
}

export default function ThemedDatePicker({ value, onChange, min, max, placeholder = "Pick date" }) {
    const [open, setOpen] = useState(false);
    const selected = value ? new Date(value + "T00:00:00") : null;
    const [viewYear, setViewYear] = useState(selected?.getFullYear() || new Date().getFullYear());
    const [viewMonth, setViewMonth] = useState(selected?.getMonth() ?? new Date().getMonth());
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

    // Position the dropdown relative to the trigger button
    const calendarWidth = 280;

    const updatePosition = useCallback(() => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const vw = window.innerWidth;
            // Clamp left so the calendar stays within the viewport
            let left = rect.left + window.scrollX;
            if (left + calendarWidth > vw - 8) {
                left = Math.max(8, vw - calendarWidth - 8);
            }
            setDropdownPos({
                top: rect.bottom + 6 + window.scrollY,
                left,
            });
        }
    }, []);

    // close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (
                triggerRef.current && !triggerRef.current.contains(e.target) &&
                dropdownRef.current && !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // update position when opened or on scroll/resize
    useEffect(() => {
        if (!open) return;
        updatePosition();
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);
        return () => {
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
        };
    }, [open, updatePosition]);

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
        else setViewMonth(viewMonth - 1);
    };

    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
        else setViewMonth(viewMonth + 1);
    };

    const handleDayClick = (day) => {
        const d = new Date(viewYear, viewMonth, day);
        const iso = formatDate(d);
        if (min && iso < min) return;
        if (max && iso > max) return;
        onChange(iso);
        setOpen(false);
    };

    const today = new Date();
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

    const isDisabled = (day) => {
        const iso = formatDate(new Date(viewYear, viewMonth, day));
        if (min && iso < min) return true;
        if (max && iso > max) return true;
        return false;
    };

    const isSelected = (day) => {
        if (!selected) return false;
        return selected.getFullYear() === viewYear &&
            selected.getMonth() === viewMonth &&
            selected.getDate() === day;
    };

    const isToday = (day) => {
        return today.getFullYear() === viewYear &&
            today.getMonth() === viewMonth &&
            today.getDate() === day;
    };

    const calendarDropdown = open ? createPortal(
        <div
            ref={dropdownRef}
            style={{
                position: "absolute",
                top: dropdownPos.top,
                left: dropdownPos.left,
                zIndex: 99999,
                width: `min(${calendarWidth}px, calc(100vw - 16px))`,
                padding: "16px",
                borderRadius: "18px",
                background: "linear-gradient(135deg, #ffffff, #fff8fa)",
                border: "1px solid rgba(232,67,147,0.18)",
                boxShadow: "0 16px 56px rgba(232,67,147,0.15), 0 6px 20px rgba(0,0,0,0.08)",
                animation: "fadeInDropdown 0.2s ease",
                fontFamily: "inherit",
            }}
        >
            {/* Month/Year header */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: "14px",
            }}>
                <button type="button" onClick={prevMonth} style={navBtnStyle}>
                    <ChevronLeft style={{ width: 14, height: 14 }} />
                </button>
                <span style={{
                    fontSize: "0.85rem", fontWeight: 700, color: "#1a1a2e",
                    letterSpacing: "-0.01em",
                }}>
                    {MONTHS[viewMonth]} {viewYear}
                </span>
                <button type="button" onClick={nextMonth} style={navBtnStyle}>
                    <ChevronRight style={{ width: 14, height: 14 }} />
                </button>
            </div>

            {/* Day-of-week labels */}
            <div style={{
                display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
                marginBottom: "6px",
            }}>
                {DAYS.map((d) => (
                    <span key={d} style={{
                        textAlign: "center", fontSize: "0.65rem",
                        fontWeight: 600, color: "#9a9ab5",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        padding: "4px 0",
                    }}>
                        {d}
                    </span>
                ))}
            </div>

            {/* Day grid */}
            <div style={{
                display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
                gap: "2px",
            }}>
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`e-${i}`} />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const disabled = isDisabled(day);
                    const sel = isSelected(day);
                    const td = isToday(day);

                    return (
                        <button
                            key={day}
                            type="button"
                            disabled={disabled}
                            onClick={() => handleDayClick(day)}
                            style={{
                                width: "34px", height: "34px",
                                margin: "1px auto",
                                borderRadius: "10px",
                                border: td && !sel ? "1px solid rgba(232,67,147,0.3)" : "1px solid transparent",
                                background: sel
                                    ? "linear-gradient(135deg, #e84393, #fd79a8)"
                                    : "transparent",
                                color: sel ? "#fff" : disabled ? "#d0d0dd" : "#1a1a2e",
                                fontSize: "0.78rem",
                                fontWeight: sel ? 700 : td ? 700 : 500,
                                cursor: disabled ? "default" : "pointer",
                                outline: "none",
                                transition: "all 0.15s ease",
                                fontFamily: "inherit",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                boxShadow: sel ? "0 2px 8px rgba(232,67,147,0.3)" : "none",
                            }}
                            onMouseEnter={(e) => {
                                if (!disabled && !sel) {
                                    e.target.style.background = "rgba(232,67,147,0.08)";
                                    e.target.style.borderColor = "rgba(232,67,147,0.2)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!disabled && !sel) {
                                    e.target.style.background = "transparent";
                                    e.target.style.borderColor = td ? "rgba(232,67,147,0.3)" : "transparent";
                                }
                            }}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>

            {/* Footer */}
            <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginTop: "12px", paddingTop: "10px",
                borderTop: "1px solid rgba(232,67,147,0.08)",
            }}>
                <button
                    type="button"
                    onClick={() => { onChange(""); setOpen(false); }}
                    style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontSize: "0.72rem", fontWeight: 600, color: "#e84393",
                        padding: "4px 8px", borderRadius: "8px",
                        transition: "background 0.2s ease",
                        fontFamily: "inherit",
                    }}
                    onMouseEnter={(e) => e.target.style.background = "rgba(232,67,147,0.06)"}
                    onMouseLeave={(e) => e.target.style.background = "none"}
                >
                    Clear
                </button>
                <button
                    type="button"
                    onClick={() => {
                        const t = formatDate(today);
                        if (!(min && t < min) && !(max && t > max)) {
                            onChange(t);
                            setOpen(false);
                        }
                    }}
                    style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontSize: "0.72rem", fontWeight: 600, color: "#6c5ce7",
                        padding: "4px 8px", borderRadius: "8px",
                        transition: "background 0.2s ease",
                        fontFamily: "inherit",
                    }}
                    onMouseEnter={(e) => e.target.style.background = "rgba(108,92,231,0.06)"}
                    onMouseLeave={(e) => e.target.style.background = "none"}
                >
                    Today
                </button>
            </div>
        </div>,
        document.body
    ) : null;

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            {/* Trigger button */}
            <button
                ref={triggerRef}
                type="button"
                onClick={() => {
                    if (!open && selected) {
                        setViewYear(selected.getFullYear());
                        setViewMonth(selected.getMonth());
                    }
                    setOpen(!open);
                }}
                style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "8px 14px",
                    borderRadius: "12px",
                    border: open ? "1px solid rgba(232,67,147,0.4)" : "1px solid rgba(232,67,147,0.18)",
                    background: open ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.45)",
                    backdropFilter: "blur(8px)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: selected ? "#1a1a2e" : "#9a9ab5",
                    cursor: "pointer",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "all 0.25s ease",
                    boxShadow: open
                        ? "0 0 0 3px rgba(232,67,147,0.1), 0 4px 16px rgba(232,67,147,0.08)"
                        : "0 2px 8px rgba(232,67,147,0.06), inset 0 1px 0 rgba(255,255,255,0.5)",
                    minWidth: "90px",
                }}
            >
                <Calendar style={{ width: 13, height: 13, color: "#e84393", flexShrink: 0 }} />
                {selected ? formatDisplay(selected) : placeholder}
            </button>

            {calendarDropdown}
        </div>
    );
}

const navBtnStyle = {
    display: "flex", alignItems: "center", justifyContent: "center",
    width: "28px", height: "28px", borderRadius: "8px",
    border: "1px solid rgba(232,67,147,0.12)",
    background: "rgba(255,255,255,0.4)",
    color: "#1a1a2e",
    cursor: "pointer",
    transition: "all 0.2s ease",
    outline: "none",
};
