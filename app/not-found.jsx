import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen pt-16 flex items-center justify-center px-4">
            <div className="text-center animate-fade-in">
                <h1 className="text-7xl font-extrabold gradient-text mb-4">404</h1>
                <h2 className="text-xl font-semibold mb-2" style={{ color: "#1a1a2e" }}>
                    Profile Not Found
                </h2>
                <p className="text-sm mb-8 max-w-sm mx-auto" style={{ color: "#6b6b8a" }}>
                    This CapsLink profile doesn&apos;t exist yet. Want to claim it?
                </p>
                <div className="flex items-center justify-center gap-3">
                    <Link href="/" className="btn-outline text-sm py-2 px-4">
                        <Home className="w-4 h-4" />
                        Home
                    </Link>
                    <Link href="/sign-up" className="btn-primary text-sm py-2 px-4">
                        Claim Username
                    </Link>
                </div>
            </div>
        </div>
    );
}
