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
  title: "Pizza value calculator",
  description: "Small web app to compare value of different pizza sizes.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Pizza value calculator",
    description: "Calculate how much pizza you get for your money - compare different pizza sizes and find the best value.",
    type: "website",
    images: ["/android-chrome-512x512.png"],
  },
  twitter: {
    card: "summary",
    title: "Pizza value calculator",
    description: "Calculate how much pizza you get for your money",
    images: ["/android-chrome-512x512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative overflow-x-hidden`}>        
        <div className="fixed inset-0 -z-10">
          <div className="gradient-bg" />
          <div className="grid-overlay" />
          <div className="noise-overlay" />
        </div>
        {children}
      </body>
    </html>
  );
}
