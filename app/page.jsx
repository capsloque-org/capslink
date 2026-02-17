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
                {/* Animated gradient blobs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                        className="animate-blob"
                        style={{
                            position: "absolute",
                            top: "-80px", left: "5%", width: "500px", height: "500px",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(232,67,147,0.18) 0%, transparent 70%)",
                            filter: "blur(80px)",
                        }}
                    />
                    <div
                        className="animate-blob"
                        style={{
                            position: "absolute",
                            top: "20%", right: "0%", width: "450px", height: "450px",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(162,155,254,0.15) 0%, transparent 70%)",
                            filter: "blur(70px)",
                            animationDelay: "4s",
                        }}
                    />
                    <div
                        className="animate-blob"
                        style={{
                            position: "absolute",
                            bottom: "-60px", left: "35%", width: "400px", height: "400px",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(253,121,168,0.12) 0%, transparent 70%)",
                            filter: "blur(60px)",
                            animationDelay: "8s",
                        }}
                    />

                    {/* Floating glass decorations */}
                    <div
                        className="animate-float"
                        style={{
                            position: "absolute", top: "15%", left: "8%",
                            width: "60px", height: "60px", borderRadius: "18px",
                            background: "rgba(255,255,255,0.15)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                    >
                        <Instagram style={{ width: 24, height: 24, color: "#e84393", opacity: 0.7 }} />
                    </div>

                    <div
                        className="animate-float"
                        style={{
                            position: "absolute", top: "25%", right: "10%",
                            width: "50px", height: "50px", borderRadius: "14px",
                            background: "rgba(255,255,255,0.12)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            animationDelay: "2s",
                        }}
                    >
                        <Crown style={{ width: 20, height: 20, color: "#a29bfe", opacity: 0.7 }} />
                    </div>

                    <div
                        className="animate-float"
                        style={{
                            position: "absolute", bottom: "20%", left: "15%",
                            width: "44px", height: "44px", borderRadius: "12px",
                            background: "rgba(255,255,255,0.1)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            animationDelay: "3s",
                        }}
                    >
                        <TrendingUp style={{ width: 18, height: 18, color: "#fd79a8", opacity: 0.7 }} />
                    </div>

                    <div
                        className="animate-float"
                        style={{
                            position: "absolute", bottom: "30%", right: "8%",
                            width: "48px", height: "48px", borderRadius: "14px",
                            background: "rgba(255,255,255,0.1)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            animationDelay: "5s",
                        }}
                    >
                        <Star style={{ width: 20, height: 20, color: "#e84393", opacity: 0.7 }} />
                    </div>
                </div>

                <div className="relative" style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
                    {/* Badge */}
                    <div
                        className="animate-fade-in-up"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "10px",
                            padding: "10px 22px", borderRadius: "9999px",
                            border: "1px solid rgba(255,255,255,0.5)",
                            background: "rgba(255,255,255,0.3)",
                            backdropFilter: "blur(16px)",
                            marginBottom: "40px",
                            boxShadow: "0 2px 12px rgba(232,67,147,0.06), inset 0 1px 0 rgba(255,255,255,0.5)",
                        }}
                    >
                        <Sparkles style={{ width: 16, height: 16, color: "#e84393" }} />
                        <span style={{ fontSize: "14px", color: "#6b6b8a" }}>
                            Built by{" "}
                            <span style={{ color: "#1a1a2e", fontWeight: 700, letterSpacing: "0.5px" }}>
                                CAPSLOQUE
                            </span>
                        </span>
                    </div>

                    {/* Headline */}
                    <h1
                        className="animate-fade-in-up"
                        style={{
                            fontSize: "clamp(2.5rem, 7vw, 5rem)",
                            fontWeight: 900,
                            lineHeight: 1,
                            letterSpacing: "-0.03em",
                            marginBottom: "24px",
                            animationDelay: "0.1s",
                            color: "#1a1a2e",
                        }}
                    >
                        Your Brand.
                        <br />
                        <span className="gradient-text">One Link.</span>
                        <br />
                        <span style={{ fontSize: "0.7em", color: "#4a4a6a" }}>Unlimited Influence.</span>
                    </h1>

                    {/* Subheading */}
                    <p
                        className="animate-fade-in-up"
                        style={{
                            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                            color: "#6b6b8a",
                            maxWidth: "520px",
                            margin: "0 auto 48px",
                            lineHeight: 1.7,
                            animationDelay: "0.2s",
                        }}
                    >
                        Create a stunning link-in-bio page in seconds. Share everything
                        you create, promote, and sell — all from one beautiful page designed for influencers.
                    </p>

                    {/* CTAs */}
                    <div
                        className="animate-fade-in-up"
                        style={{
                            display: "flex", flexWrap: "wrap", justifyContent: "center",
                            gap: "14px", marginBottom: "56px", animationDelay: "0.3s",
                        }}
                    >
                        <Link href="/sign-up" className="btn-primary" style={{ padding: "16px 36px", fontSize: "1rem" }}>
                            Get Started Free
                            <ArrowRight style={{ width: 18, height: 18 }} />
                        </Link>
                        <Link href="/dashboard" className="btn-outline" style={{ padding: "16px 36px", fontSize: "1rem" }}>
                            <Layers style={{ width: 18, height: 18 }} />
                            Go to Dashboard
                        </Link>
                    </div>

                    {/* Stats strip — glass card */}
                    <div
                        className="animate-fade-in-up"
                        style={{
                            display: "inline-flex", justifyContent: "center", gap: "48px",
                            padding: "20px 40px",
                            borderRadius: "20px",
                            background: "rgba(255,255,255,0.25)",
                            backdropFilter: "blur(16px)",
                            border: "1px solid rgba(255,255,255,0.45)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)",
                            animationDelay: "0.4s",
                        }}
                    >
                        {stats.map((s, i) => (
                            <div key={i} style={{ textAlign: "center" }}>
                                <div className="gradient-text-static" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900 }}>
                                    {s.value}
                                </div>
                                <div style={{ fontSize: "13px", color: "#9a9ab5", marginTop: "4px" }}>
                                    {s.label}
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
                                <span className="gradient-text-static">CapsLink</span>?
                            </h2>
                            <p style={{ fontSize: "0.95rem", color: "#6b6b8a", marginBottom: "36px", maxWidth: "400px", margin: "0 auto 36px", lineHeight: 1.6 }}>
                                Join influencers, creators, and entrepreneurs who use CapsLink
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
                        © {new Date().getFullYear()} CapsLink. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
