import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "CapsLink — Your Link-in-Bio by CAPSLOQUE",
  description:
    "Create a stunning link-in-bio page with CapsLink. Share all your links in one beautiful, mobile-optimized page. Powered by CAPSLOQUE.",
  keywords: ["link in bio", "linktree alternative", "capslink", "capsloque"],
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#7c3aed",
          colorBackground: "#12121a",
          colorInputBackground: "#0a0a0f",
          colorInputText: "#f0f0f5",
          colorText: "#f0f0f5",
          colorTextSecondary: "#8888a0",
        },
        elements: {
          card: "bg-[#12121a] border border-[#1f1f2e]",
          formButtonPrimary:
            "bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] hover:from-[#6d28d9] hover:to-[#5b21b6]",
          footerActionLink: "text-[#a78bfa] hover:text-[#7c3aed]",
        },
      }}
    >
      <html lang="en" className={inter.variable}>
        <body className="antialiased">
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
