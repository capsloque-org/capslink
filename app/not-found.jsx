import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen pt-16 flex items-center justify-center px-4">
            <div className="text-center animate-fade-in">
                <h1 className="text-7xl font-extrabold gradient-text mb-4">404</h1>
                <h2 className="text-xl font-semibold text-text-primary mb-2">
                    Profile Not Found
                </h2>
                <p className="text-text-secondary text-sm mb-8 max-w-sm mx-auto">
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
