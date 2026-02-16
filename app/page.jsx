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
} from "lucide-react";

export default function HomePage() {
    const features = [
        {
            icon: Link2,
            title: "Unlimited Links",
            desc: "Add as many links as you need — no limits, no restrictions, ever.",
            gradient: "from-violet-500 to-purple-600",
        },
        {
            icon: Palette,
            title: "Bento Grid Design",
            desc: "A stunning, modern layout that makes your brand truly stand out.",
            gradient: "from-cyan-500 to-blue-600",
        },
        {
            icon: BarChart3,
            title: "SEO Optimized",
            desc: "Server-rendered pages so your profile ranks higher on search engines.",
            gradient: "from-emerald-500 to-teal-600",
        },
        {
            icon: Shield,
            title: "Secure Auth",
            desc: "Enterprise-grade authentication powered by Clerk. Your data is safe.",
            gradient: "from-amber-500 to-orange-600",
        },
        {
            icon: Smartphone,
            title: "Mobile First",
            desc: "Perfectly optimized for every screen — from phones to ultrawide.",
            gradient: "from-pink-500 to-rose-600",
        },
        {
            icon: Zap,
            title: "Lightning Fast",
            desc: "Built on Next.js with edge delivery for blazing performance.",
            gradient: "from-yellow-500 to-amber-600",
        },
    ];

    const stats = [
        { value: "∞", label: "Unlimited Links" },
        { value: "< 1s", label: "Load Time" },
        { value: "100%", label: "Free Forever" },
    ];

    return (
        <div className="min-h-screen noise-bg grid-bg">

            {/* ===== HERO ===== */}
            <section className="relative overflow-hidden" style={{ paddingTop: "140px", paddingBottom: "100px" }}>
                {/* Background orbs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                        className="absolute rounded-full animate-pulse"
                        style={{
                            top: "-100px", left: "10%", width: "500px", height: "500px",
                            background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
                            filter: "blur(80px)",
                        }}
                    />
                    <div
                        className="absolute rounded-full animate-pulse"
                        style={{
                            top: "30%", right: "-5%", width: "400px", height: "400px",
                            background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
                            filter: "blur(60px)",
                            animationDelay: "2s",
                        }}
                    />
                    <div
                        className="absolute rounded-full animate-pulse"
                        style={{
                            bottom: "-80px", left: "40%", width: "350px", height: "350px",
                            background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
                            filter: "blur(60px)",
                            animationDelay: "4s",
                        }}
                    />
                </div>

                <div className="relative" style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
                    {/* Badge */}
                    <div
                        className="animate-fade-in-up"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: "10px",
                            padding: "10px 20px", borderRadius: "9999px",
                            border: "1px solid rgba(45,45,74,0.5)",
                            background: "rgba(14,14,24,0.6)",
                            backdropFilter: "blur(16px)",
                            marginBottom: "40px",
                        }}
                    >
                        <Sparkles style={{ width: 16, height: 16, color: "#a78bfa" }} />
                        <span style={{ fontSize: "14px", color: "#9090ad" }}>
                            Built by{" "}
                            <span style={{ color: "#eeeef5", fontWeight: 700, letterSpacing: "0.5px" }}>
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
                        }}
                    >
                        One Link.
                        <br />
                        <span className="gradient-text">Infinite Reach.</span>
                    </h1>

                    {/* Subheading */}
                    <p
                        className="animate-fade-in-up"
                        style={{
                            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                            color: "#9090ad",
                            maxWidth: "500px",
                            margin: "0 auto 48px",
                            lineHeight: 1.7,
                            animationDelay: "0.2s",
                        }}
                    >
                        Create a stunning link-in-bio page in seconds. Share everything
                        you create, curate, and sell — all from one beautiful page.
                    </p>

                    {/* CTAs */}
                    <div
                        className="animate-fade-in-up"
                        style={{
                            display: "flex", flexWrap: "wrap", justifyContent: "center",
                            gap: "14px", marginBottom: "56px", animationDelay: "0.3s",
                        }}
                    >
                        <Link href="/sign-up" className="btn-primary" style={{ padding: "14px 32px", fontSize: "0.95rem" }}>
                            Get Started Free
                            <ArrowRight style={{ width: 18, height: 18 }} />
                        </Link>
                        <Link href="/dashboard" className="btn-outline" style={{ padding: "14px 32px", fontSize: "0.95rem" }}>
                            <Layers style={{ width: 18, height: 18 }} />
                            Go to Dashboard
                        </Link>
                    </div>

                    {/* Stats strip */}
                    <div
                        className="animate-fade-in-up"
                        style={{
                            display: "flex", justifyContent: "center", gap: "48px",
                            animationDelay: "0.4s",
                        }}
                    >
                        {stats.map((s, i) => (
                            <div key={i} style={{ textAlign: "center" }}>
                                <div className="gradient-text-static" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900 }}>
                                    {s.value}
                                </div>
                                <div style={{ fontSize: "13px", color: "#505068", marginTop: "4px" }}>
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
                                padding: "8px 16px", borderRadius: "9999px",
                                border: "1px solid rgba(28,28,48,0.8)",
                                background: "rgba(14,14,24,0.5)",
                                marginBottom: "24px",
                            }}
                        >
                            <Globe style={{ width: 14, height: 14, color: "#22d3ee" }} />
                            <span style={{ fontSize: "11px", color: "#505068", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px" }}>
                                Features
                            </span>
                        </div>
                        <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "16px" }}>
                            Everything you need to
                            <br />
                            <span className="gradient-text-static">stand out</span>
                        </h2>
                        <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", color: "#9090ad", maxWidth: "440px", margin: "0 auto" }}>
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
                                        className={`bg-gradient-to-br ${feature.gradient}`}
                                        style={{
                                            width: "48px", height: "48px", borderRadius: "14px",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            marginBottom: "20px", opacity: 0.2,
                                            position: "relative",
                                        }}
                                    >
                                        <Icon
                                            style={{
                                                width: 22, height: 22, color: "#c4b5fd",
                                                position: "absolute", top: "50%", left: "50%",
                                                transform: "translate(-50%, -50%)",
                                            }}
                                        />
                                    </div>
                                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "8px", color: "#eeeef5" }}>
                                        {feature.title}
                                    </h3>
                                    <p style={{ fontSize: "0.875rem", color: "#9090ad", lineHeight: 1.6 }}>
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
                                background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
                                filter: "blur(60px)", pointerEvents: "none",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute", bottom: 0, left: 0, width: "150px", height: "150px",
                                background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
                                filter: "blur(50px)", pointerEvents: "none",
                            }}
                        />

                        <div style={{ position: "relative", zIndex: 1 }}>
                            <div
                                className="animate-float"
                                style={{
                                    width: "56px", height: "56px", borderRadius: "16px",
                                    background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(34,211,238,0.1))",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    margin: "0 auto 24px",
                                }}
                            >
                                <Zap style={{ width: 24, height: 24, color: "#c4b5fd" }} />
                            </div>
                            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, marginBottom: "14px", letterSpacing: "-0.02em" }}>
                                Ready to claim your{" "}
                                <span className="gradient-text-static">CapsLink</span>?
                            </h2>
                            <p style={{ fontSize: "0.95rem", color: "#9090ad", marginBottom: "36px", maxWidth: "400px", margin: "0 auto 36px", lineHeight: 1.6 }}>
                                Join creators, developers, and entrepreneurs who use CapsLink
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
            <footer style={{ borderTop: "1px solid rgba(28,28,48,0.6)", padding: "36px 24px" }}>
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
                                background: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                        >
                            <Zap style={{ width: 12, height: 12, color: "white" }} />
                        </div>
                        <span style={{ fontSize: "13px", color: "#505068" }}>
                            ⚡ Powered by <span style={{ color: "#9090ad" }}>CAPSLOQUE</span>
                        </span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#505068" }}>
                        © {new Date().getFullYear()} CapsLink. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
