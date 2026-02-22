import Link from "next/link";
import {
    Zap,
    Link2,
    Palette,
    BarChart3,
    Shield,
    Smartphone,
    ArrowRight,
    Sparkles,
    Globe,
    Layers,
    Instagram,
    Crown,
    TrendingUp,
    Star,
} from "lucide-react";

export default function HomePage() {
    const features = [
        {
            icon: Link2,
            title: "Unlimited Links",
            desc: "Add as many links as you need — your content, collabs, merch, and more.",
            color: "#e84393",
        },
        {
            icon: Palette,
            title: "Stunning Bento Grid",
            desc: "A gorgeous layout that makes your brand pop and keeps followers engaged.",
            color: "#a29bfe",
        },
        {
            icon: BarChart3,
            title: "SEO Optimized",
            desc: "Server-rendered pages so your profile ranks higher on search engines.",
            color: "#fd79a8",
        },
        {
            icon: Shield,
            title: "Secure Auth",
            desc: "Enterprise-grade authentication. Your data stays safe, always.",
            color: "#6c5ce7",
        },
        {
            icon: Smartphone,
            title: "Mobile Perfect",
            desc: "Flawless on every screen — from stories to ultrawide displays.",
            color: "#e84393",
        },
        {
            icon: Zap,
            title: "Lightning Fast",
            desc: "Built on Next.js with edge delivery for blazing-fast performance.",
            color: "#fd79a8",
        },
    ];

    const stats = [
        { value: "∞", label: "Unlimited Links" },
        { value: "< 1s", label: "Load Time" },
        { value: "100%", label: "Free Forever" },
    ];

    return (
        <div className="min-h-screen noise-bg">

            {/* ===== HERO ===== */}
            <section className="relative overflow-hidden" style={{ paddingTop: "140px", paddingBottom: "100px" }}>
                {/* Dot grid pattern */}
                <div className="hero-dot-grid" />

                {/* Animated gradient blobs — larger and more vivid */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                        className="animate-blob"
                        style={{
                            position: "absolute",
                            top: "-100px", left: "0%", width: "600px", height: "600px",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(232,67,147,0.22) 0%, transparent 70%)",
                            filter: "blur(80px)",
                        }}
                    />
                    <div
                        className="animate-blob"
                        style={{
                            position: "absolute",
                            top: "10%", right: "-5%", width: "550px", height: "550px",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(162,155,254,0.2) 0%, transparent 70%)",
                            filter: "blur(70px)",
                            animationDelay: "4s",
                        }}
                    />
                    <div
                        className="animate-blob"
                        style={{
                            position: "absolute",
                            bottom: "-80px", left: "25%", width: "500px", height: "500px",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(253,121,168,0.16) 0%, transparent 70%)",
                            filter: "blur(60px)",
                            animationDelay: "8s",
                        }}
                    />

                    {/* Orbiting particles */}
                    {[
                        { size: 8, color: "#e84393", top: "50%", left: "50%", radius: "220px", duration: "18s", delay: "0s", opacity: 0.5 },
                        { size: 6, color: "#a29bfe", top: "50%", left: "50%", radius: "180px", duration: "14s", delay: "3s", opacity: 0.4, reverse: true },
                        { size: 10, color: "#fd79a8", top: "50%", left: "50%", radius: "260px", duration: "22s", delay: "6s", opacity: 0.35 },
                        { size: 5, color: "#6c5ce7", top: "50%", left: "50%", radius: "150px", duration: "12s", delay: "2s", opacity: 0.45, reverse: true },
                    ].map((p, i) => (
                        <div
                            key={`orbit-${i}`}
                            className="hero-orbit-particle"
                            style={{
                                width: p.size, height: p.size,
                                background: p.color,
                                top: p.top, left: p.left,
                                opacity: p.opacity,
                                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                                "--orbit-radius": p.radius,
                                animation: `${p.reverse ? "hero-orbit-reverse" : "hero-orbit"} ${p.duration} linear infinite`,
                                animationDelay: p.delay,
                            }}
                        />
                    ))}

                    {/* Floating glass decorations */}
                    <div
                        className="animate-float"
                        style={{
                            position: "absolute", top: "12%", left: "6%",
                            width: "64px", height: "64px", borderRadius: "20px",
                            background: "rgba(255,255,255,0.18)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(255,255,255,0.35)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: "0 8px 24px rgba(232,67,147,0.06)",
                        }}
                    >
                        <Instagram style={{ width: 26, height: 26, color: "#e84393", opacity: 0.8 }} />
                    </div>

                    <div
                        className="animate-float"
                        style={{
                            position: "absolute", top: "20%", right: "8%",
                            width: "54px", height: "54px", borderRadius: "16px",
                            background: "rgba(255,255,255,0.14)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            animationDelay: "2s",
                            boxShadow: "0 8px 24px rgba(162,155,254,0.06)",
                        }}
                    >
                        <Crown style={{ width: 22, height: 22, color: "#a29bfe", opacity: 0.8 }} />
                    </div>

                    <div
                        className="animate-float"
                        style={{
                            position: "absolute", bottom: "18%", left: "12%",
                            width: "48px", height: "48px", borderRadius: "14px",
                            background: "rgba(255,255,255,0.12)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            animationDelay: "3s",
                            boxShadow: "0 6px 20px rgba(253,121,168,0.06)",
                        }}
                    >
                        <TrendingUp style={{ width: 20, height: 20, color: "#fd79a8", opacity: 0.8 }} />
                    </div>

                    <div
                        className="animate-float"
                        style={{
                            position: "absolute", bottom: "28%", right: "6%",
                            width: "52px", height: "52px", borderRadius: "16px",
                            background: "rgba(255,255,255,0.12)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            animationDelay: "5s",
                            boxShadow: "0 6px 20px rgba(232,67,147,0.06)",
                        }}
                    >
                        <Star style={{ width: 22, height: 22, color: "#e84393", opacity: 0.8 }} />
                    </div>
                </div>

                {/* Badge with shimmer — centered above columns */}
                <div className="animate-fade-in-up" style={{ textAlign: "center", marginBottom: "40px", maxWidth: "1100px", margin: "0 auto 40px", padding: "0 24px" }}>
                    <div className="hero-badge" style={{
                        border: "1px solid rgba(232,67,147,0.25)",
                        background: "rgba(255,255,255,0.45)",
                        boxShadow: "0 4px 20px rgba(232,67,147,0.1), inset 0 1px 0 rgba(255,255,255,0.7)",
                        padding: "12px 28px",
                    }}>
                        <Sparkles style={{ width: 16, height: 16, color: "#e84393", position: "relative", zIndex: 1 }} />
                        <span style={{ fontSize: "14px", color: "#6b6b8a", position: "relative", zIndex: 1 }}>
                            Built by{" "}
                            <span style={{ color: "#e84393", fontWeight: 800, letterSpacing: "1px", fontSize: "15px" }}>
                                CAPSLOQUE
                            </span>
                        </span>
                    </div>
                </div>

                {/* Hero content — side-by-side on desktop */}
                <div className="relative" style={{
                    maxWidth: "1100px", margin: "0 auto", padding: "0 24px",
                    display: "flex", alignItems: "center", gap: "60px",
                }}>
                    {/* Left — text content */}
                    <div className="hero-content-wrapper" style={{ flex: 1, textAlign: "left", minWidth: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        {/* Headline with animated underline */}
                        <h1
                            className="animate-fade-in-up"
                            style={{
                                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                                fontWeight: 900,
                                lineHeight: 1.05,
                                letterSpacing: "-0.03em",
                                marginBottom: "28px",
                                animationDelay: "0.1s",
                                color: "#1a1a2e",
                            }}
                        >
                            Your Brand.
                            <br />
                            <span className="gradient-text hero-gradient-underline">One Link.</span>
                            <br />
                            <span style={{ fontSize: "0.65em", color: "#4a4a6a", fontWeight: 800 }}>
                                Unlimited Influence.
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p
                            className="animate-fade-in-up"
                            style={{
                                fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
                                color: "#6b6b8a",
                                maxWidth: "480px",
                                lineHeight: 1.75,
                                animationDelay: "0.2s",
                                marginBottom: "40px",
                            }}
                        >
                            Create a stunning link-in-bio page in seconds. Share everything
                            you create, promote, and sell — all from one beautiful page designed for influencers.
                        </p>

                        {/* CTAs with pulsating glow */}
                        <div
                            className="animate-fade-in-up hero-cta-row"
                            style={{
                                display: "flex", flexWrap: "wrap",
                                gap: "14px", marginBottom: "52px", animationDelay: "0.3s",
                            }}
                        >
                            <div style={{ position: "relative" }}>
                                <div className="cta-glow-ring" />
                                <Link href="/sign-up" className="btn-primary" style={{ padding: "16px 36px", fontSize: "1rem", position: "relative", zIndex: 1 }}>
                                    Get Started Free
                                    <ArrowRight style={{ width: 18, height: 18 }} />
                                </Link>
                            </div>
                            <Link href="/dashboard" className="btn-outline" style={{ padding: "16px 36px", fontSize: "1rem" }}>
                                <Layers style={{ width: 18, height: 18 }} />
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Right — glassmorphic mockup card (desktop only) */}
                    <div className="hero-mockup-wrapper" style={{ flex: "0 0 340px", position: "relative" }}>
                        {/* Glow behind mockup */}
                        <div style={{
                            position: "absolute", inset: "-40px",
                            background: "radial-gradient(circle, rgba(232,67,147,0.12) 0%, rgba(162,155,254,0.08) 40%, transparent 70%)",
                            filter: "blur(40px)", pointerEvents: "none",
                        }} />

                        <div className="hero-mockup-card" style={{ opacity: 1 }}>
                            {/* Mini profile header */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "18px" }}>
                                <div style={{
                                    width: "56px", height: "56px", borderRadius: "50%",
                                    background: "linear-gradient(135deg, #e84393, #a29bfe)",
                                    marginBottom: "10px",
                                    boxShadow: "0 4px 16px rgba(232,67,147,0.25)",
                                }} />
                                <div style={{
                                    width: "90px", height: "10px", borderRadius: "5px",
                                    background: "rgba(26,26,46,0.12)", marginBottom: "6px",
                                }} />
                                <div style={{
                                    width: "130px", height: "8px", borderRadius: "4px",
                                    background: "rgba(26,26,46,0.06)",
                                }} />
                            </div>

                            {/* Mini link items */}
                            {[
                                { gradient: "linear-gradient(135deg, #e84393, #fd79a8)", icon: "🔗" },
                                { gradient: "linear-gradient(135deg, #a29bfe, #6c5ce7)", icon: "🎵" },
                                { gradient: "linear-gradient(135deg, #fd79a8, #fab1c4)", icon: "🛍️" },
                                { gradient: "linear-gradient(135deg, #6c5ce7, #a29bfe)", icon: "📸" },
                            ].map((link, i) => (
                                <div key={i} style={{
                                    display: "flex", alignItems: "center", gap: "10px",
                                    padding: "10px 14px", borderRadius: "12px",
                                    background: "rgba(255,255,255,0.35)",
                                    border: "1px solid rgba(255,255,255,0.45)",
                                    marginBottom: "8px",
                                    transition: "transform 0.2s ease",
                                }}>
                                    <div style={{
                                        width: "30px", height: "30px", borderRadius: "8px",
                                        background: link.gradient, display: "flex",
                                        alignItems: "center", justifyContent: "center",
                                        fontSize: "14px",
                                        boxShadow: `0 2px 8px rgba(0,0,0,0.08)`,
                                    }}>
                                        {link.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            width: `${60 + i * 10}%`, height: "8px", borderRadius: "4px",
                                            background: "rgba(26,26,46,0.1)", marginBottom: "4px",
                                        }} />
                                        <div style={{
                                            width: `${40 + i * 5}%`, height: "6px", borderRadius: "3px",
                                            background: "rgba(26,26,46,0.05)",
                                        }} />
                                    </div>
                                </div>
                            ))}

                            {/* Mini social row */}
                            <div style={{
                                display: "flex", justifyContent: "center", gap: "8px",
                                marginTop: "14px", paddingTop: "14px",
                                borderTop: "1px solid rgba(255,255,255,0.35)",
                            }}>
                                {["#e84393", "#a29bfe", "#fd79a8", "#6c5ce7"].map((color, i) => (
                                    <div key={i} style={{
                                        width: "28px", height: "28px", borderRadius: "8px",
                                        background: `${color}18`,
                                        border: `1px solid ${color}25`,
                                    }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats strip — prominent centered block */}
                <div
                    className="animate-fade-in-up hero-stats-outer"
                    style={{
                        maxWidth: "680px", margin: "6px auto 0", padding: "0 24px",
                        animationDelay: "0.5s",
                    }}
                >
                    <div
                        className="hero-stats-strip"
                        style={{
                            display: "flex", alignItems: "center", justifyContent: "center",
                            gap: "0",
                            padding: "28px 48px",
                            borderRadius: "24px",
                            position: "relative", overflow: "hidden",
                            background: "rgba(255,255,255,0.35)",
                            backdropFilter: "blur(24px)",
                            border: "1px solid rgba(232,67,147,0.15)",
                            boxShadow:
                                "0 8px 40px rgba(232,67,147,0.1), 0 2px 10px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.7)",
                        }}
                    >
                        {/* Inner accent glows */}
                        <div style={{
                            position: "absolute", top: "-30px", left: "10%",
                            width: "200px", height: "100px",
                            background: "radial-gradient(circle, rgba(232,67,147,0.1) 0%, transparent 70%)",
                            filter: "blur(30px)", pointerEvents: "none",
                        }} />
                        <div style={{
                            position: "absolute", bottom: "-30px", right: "10%",
                            width: "200px", height: "100px",
                            background: "radial-gradient(circle, rgba(162,155,254,0.1) 0%, transparent 70%)",
                            filter: "blur(30px)", pointerEvents: "none",
                        }} />

                        {stats.map((s, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", position: "relative", zIndex: 1 }}>
                                {i > 0 && (
                                    <div className="hero-stat-sep" style={{
                                        width: "2px", height: "48px", margin: "0 36px",
                                        background: "linear-gradient(180deg, transparent, rgba(232,67,147,0.3), rgba(162,155,254,0.2), transparent)",
                                        borderRadius: "1px",
                                    }} />
                                )}
                                <div className="hero-stat-item">
                                    <div className="gradient-text hero-stat-value" style={{
                                        fontSize: "clamp(2rem, 4vw, 2.75rem)",
                                        fontWeight: 900,
                                        letterSpacing: "-0.02em",
                                        lineHeight: 1,
                                    }}>
                                        {s.value}
                                    </div>
                                    <div className="hero-stat-label" style={{
                                        fontSize: "13px", color: "#6b6b8a", marginTop: "8px",
                                        fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase",
                                    }}>
                                        {s.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FEATURES ===== */}
            <section style={{ padding: "80px 24px 100px" }}>
                <div style={{ maxWidth: "960px", margin: "0 auto" }}>
                    {/* Section header */}
                    <div style={{ textAlign: "center", marginBottom: "64px" }}>
                        <div
                            style={{
                                display: "inline-flex", alignItems: "center", gap: "8px",
                                padding: "8px 18px", borderRadius: "9999px",
                                border: "1px solid rgba(255,255,255,0.45)",
                                background: "rgba(255,255,255,0.25)",
                                backdropFilter: "blur(10px)",
                                marginBottom: "24px",
                            }}
                        >
                            <Globe style={{ width: 14, height: 14, color: "#e84393" }} />
                            <span style={{ fontSize: "11px", color: "#9a9ab5", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px" }}>
                                Features
                            </span>
                        </div>
                        <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "16px", color: "#1a1a2e" }}>
                            Everything you need to
                            <br />
                            <span className="gradient-text-static">stand out</span>
                        </h2>
                        <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "#6b6b8a", maxWidth: "440px", margin: "0 auto" }}>
                            Powerful tools to build, customize, and share your unique link-in-bio page.
                        </p>
                    </div>

                    {/* Feature grid */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "20px",
                        }}
                    >
                        {features.map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={i}
                                    className="glass-card group animate-fade-in-up"
                                    style={{ padding: "32px", animationDelay: `${0.08 * i}s` }}
                                >
                                    <div
                                        style={{
                                            width: "48px", height: "48px", borderRadius: "16px",
                                            background: `linear-gradient(135deg, ${feature.color}22, ${feature.color}11)`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            marginBottom: "20px",
                                            border: `1px solid ${feature.color}20`,
                                        }}
                                    >
                                        <Icon
                                            style={{
                                                width: 22, height: 22, color: feature.color,
                                            }}
                                        />
                                    </div>
                                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "8px", color: "#1a1a2e" }}>
                                        {feature.title}
                                    </h3>
                                    <p style={{ fontSize: "0.875rem", color: "#6b6b8a", lineHeight: 1.6 }}>
                                        {feature.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section style={{ padding: "60px 24px 100px" }}>
                <div style={{ maxWidth: "640px", margin: "0 auto" }}>
                    <div
                        className="glass-card"
                        style={{ padding: "48px 32px", position: "relative", overflow: "hidden", textAlign: "center" }}
                    >
                        {/* Inner glow */}
                        <div
                            style={{
                                position: "absolute", top: 0, right: 0, width: "200px", height: "200px",
                                background: "radial-gradient(circle, rgba(232,67,147,0.1) 0%, transparent 70%)",
                                filter: "blur(60px)", pointerEvents: "none",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute", bottom: 0, left: 0, width: "150px", height: "150px",
                                background: "radial-gradient(circle, rgba(162,155,254,0.1) 0%, transparent 70%)",
                                filter: "blur(50px)", pointerEvents: "none",
                            }}
                        />

                        <div style={{ position: "relative", zIndex: 1 }}>
                            <div
                                className="animate-float"
                                style={{
                                    width: "56px", height: "56px", borderRadius: "18px",
                                    background: "linear-gradient(135deg, rgba(232,67,147,0.15), rgba(162,155,254,0.1))",
                                    border: "1px solid rgba(255,255,255,0.3)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    margin: "0 auto 24px",
                                }}
                            >
                                <Zap style={{ width: 24, height: 24, color: "#e84393" }} />
                            </div>
                            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, marginBottom: "14px", letterSpacing: "-0.02em", color: "#1a1a2e" }}>
                                Ready to claim your{" "}
                                <span className="gradient-text-static">qloque</span>?
                            </h2>
                            <p style={{ fontSize: "0.95rem", color: "#6b6b8a", marginBottom: "36px", maxWidth: "400px", margin: "0 auto 36px", lineHeight: 1.6 }}>
                                Join influencers, creators, and entrepreneurs who use qloque
                                to share their world.
                            </p>
                            <Link href="/sign-up" className="btn-primary" style={{ padding: "16px 40px", fontSize: "1rem" }}>
                                Create Your Page
                                <ArrowRight style={{ width: 18, height: 18 }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer style={{ borderTop: "1px solid rgba(255,255,255,0.4)", padding: "36px 24px" }}>
                <div
                    style={{
                        maxWidth: "960px", margin: "0 auto",
                        display: "flex", flexWrap: "wrap", alignItems: "center",
                        justifyContent: "space-between", gap: "16px",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                            style={{
                                width: "24px", height: "24px", borderRadius: "6px",
                                background: "linear-gradient(135deg, #e84393, #fd79a8)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                boxShadow: "0 2px 8px rgba(232,67,147,0.25)",
                            }}
                        >
                            <Zap style={{ width: 12, height: 12, color: "white" }} />
                        </div>
                        <span style={{ fontSize: "13px", color: "#9a9ab5" }}>
                            ⚡ Powered by <span style={{ color: "#6b6b8a", fontWeight: 600 }}>CAPSLOQUE</span>
                        </span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#9a9ab5" }}>
                        © {new Date().getFullYear()} qloque. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
