"use client";

import Link from "next/link";
import {
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { Zap, LayoutDashboard, LogIn } from "lucide-react";

export default function Navbar() {
    return (
        <nav
            style={{
                position: "fixed",
                top: "16px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 50,
                width: "calc(100% - 32px)",
                maxWidth: "680px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 20px",
                    borderRadius: "16px",
                    border: "1px solid rgba(45, 45, 74, 0.4)",
                    background: "rgba(10, 10, 18, 0.65)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    boxShadow:
                        "0 4px 30px rgba(0, 0, 0, 0.3), 0 0 40px rgba(139, 92, 246, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.03)",
                }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        textDecoration: "none",
                    }}
                >
                    <div
                        style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "transform 0.2s ease",
                        }}
                    >
                        <Zap style={{ width: 15, height: 15, color: "white" }} />
                    </div>
                    <span
                        style={{
                            fontSize: "1.05rem",
                            fontWeight: 800,
                            color: "#eeeef5",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Caps
                        <span className="gradient-text" style={{ fontWeight: 800 }}>
                            Link
                        </span>
                    </span>
                </Link>

                {/* Right side */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <SignedIn>
                        <Link
                            href="/dashboard"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "7px 14px",
                                borderRadius: "10px",
                                border: "1px solid rgba(45, 45, 74, 0.5)",
                                background: "rgba(20, 20, 34, 0.6)",
                                color: "#c0c0d0",
                                fontSize: "13px",
                                fontWeight: 600,
                                textDecoration: "none",
                                transition: "all 0.2s ease",
                            }}
                        >
                            <LayoutDashboard style={{ width: 14, height: 14 }} />
                            Dashboard
                        </Link>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8 rounded-lg border border-border",
                                },
                            }}
                        />
                    </SignedIn>
                    <SignedOut>
                        <Link
                            href="/sign-in"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "7px 14px",
                                borderRadius: "10px",
                                border: "1px solid rgba(45, 45, 74, 0.5)",
                                background: "transparent",
                                color: "#c0c0d0",
                                fontSize: "13px",
                                fontWeight: 600,
                                textDecoration: "none",
                                transition: "all 0.2s ease",
                            }}
                        >
                            <LogIn style={{ width: 14, height: 14 }} />
                            Sign In
                        </Link>
                        <Link
                            href="/sign-up"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "7px 16px",
                                borderRadius: "10px",
                                background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                                color: "white",
                                fontSize: "13px",
                                fontWeight: 600,
                                textDecoration: "none",
                                transition: "all 0.2s ease",
                                boxShadow: "0 2px 12px rgba(139, 92, 246, 0.3)",
                            }}
                        >
                            Get Started
                        </Link>
                    </SignedOut>
                </div>
            </div>
        </nav>
    );
}
