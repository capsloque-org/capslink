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
                    borderRadius: "20px",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    background: "rgba(255, 255, 255, 0.3)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    boxShadow:
                        "0 4px 30px rgba(0, 0, 0, 0.06), 0 0 40px rgba(232, 67, 147, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
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
                            background: "linear-gradient(135deg, #e84393, #fd79a8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "transform 0.2s ease",
                            boxShadow: "0 2px 10px rgba(232, 67, 147, 0.3)",
                        }}
                    >
                        <Zap style={{ width: 15, height: 15, color: "white" }} />
                    </div>
                    <span
                        style={{
                            fontSize: "1.05rem",
                            fontWeight: 800,
                            color: "#1a1a2e",
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
                                borderRadius: "12px",
                                border: "1px solid rgba(255, 255, 255, 0.5)",
                                background: "rgba(255, 255, 255, 0.35)",
                                color: "#4a4a6a",
                                fontSize: "13px",
                                fontWeight: 600,
                                textDecoration: "none",
                                transition: "all 0.2s ease",
                                backdropFilter: "blur(8px)",
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
                                borderRadius: "12px",
                                border: "1px solid rgba(255, 255, 255, 0.4)",
                                background: "rgba(255, 255, 255, 0.2)",
                                color: "#4a4a6a",
                                fontSize: "13px",
                                fontWeight: 600,
                                textDecoration: "none",
                                transition: "all 0.2s ease",
                                backdropFilter: "blur(8px)",
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
                                borderRadius: "12px",
                                background: "linear-gradient(135deg, #e84393, #fd79a8)",
                                color: "white",
                                fontSize: "13px",
                                fontWeight: 600,
                                textDecoration: "none",
                                transition: "all 0.2s ease",
                                boxShadow: "0 2px 12px rgba(232, 67, 147, 0.3)",
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
