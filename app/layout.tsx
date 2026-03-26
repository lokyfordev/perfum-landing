import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lokyforperfum.eu.cc"),
  title: {
    default: "lokyforPerfum | Launch and Grow Your Perfume Store",
    template: "%s | Perfum",
  },
  description:
    "lokyforPerfum helps fragrance stores launch with paid onboarding, AI consultation, stock intelligence, and sales growth tools.",
  keywords: [
    "Perfum",
    "perfume store",
    "AI consultation",
    "inventory",
    "sales analytics",
    "paid onboarding",
  ],
  icons: {
    icon: "/perfum-logo.svg",
    shortcut: "/perfum-logo.svg",
    apple: "/perfum-logo.svg",
  },
  openGraph: {
    title: "Perfum | Launch and Grow Your Perfume Store",
    description:
      "From onboarding to AI recommendations, Perfum gives perfume stores everything needed to scale.",
    type: "website",
    images: ["/perfum-logo.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perfum | Launch and Grow Your Perfume Store",
    description:
      "AI-powered commerce for perfume stores: onboarding, analytics, and smart recommendations.",
    images: ["/perfum-logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
