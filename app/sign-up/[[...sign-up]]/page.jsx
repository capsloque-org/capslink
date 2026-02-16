import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="min-h-screen pt-16 flex items-center justify-center px-4">
            <div className="animate-fade-in">
                <SignUp
                    routing="path"
                    path="/sign-up"
                    signInUrl="/sign-in"
                    afterSignUpUrl="/dashboard"
                />
            </div>
        </div>
    );
}
