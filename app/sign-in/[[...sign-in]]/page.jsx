import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="min-h-screen pt-16 flex items-center justify-center px-4">
            <div className="animate-fade-in">
                <SignIn
                    routing="path"
                    path="/sign-in"
                    signUpUrl="/sign-up"
                    afterSignInUrl="/dashboard"
                />
            </div>
        </div>
    );
}
