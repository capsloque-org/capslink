import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Playfair_Display, Quicksand, Space_Grotesk, Cormorant_Garamond, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "qloque — Your Link-in-Bio by CAPSLOQUE",
  description:
    "Create a stunning link-in-bio page with qloque. Share all your links in one beautiful, mobile-optimized page. Powered by CAPSLOQUE.",
  keywords: ["link in bio", "linktree alternative", "qloque", "capsloque"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#e84393",
          colorBackground: "#f5f3fa",
          colorInputBackground: "#ffffff",
          colorInputText: "#1a1a2e",
          colorText: "#1a1a2e",
          colorTextSecondary: "#6b6b8a",
        },
        elements: {
          card: "bg-white/40 backdrop-blur-lg border border-white/50",
          formButtonPrimary:
            "bg-gradient-to-r from-[#e84393] to-[#fd79a8] hover:from-[#d63384] hover:to-[#e84393]",
          footerActionLink: "text-[#e84393] hover:text-[#d63384]",
        },
      }}
    >
      <html lang="en" className={`${inter.variable} ${playfair.variable} ${quicksand.variable} ${spaceGrotesk.variable} ${cormorant.variable} ${nunito.variable}`}>
        <body className="antialiased">
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
