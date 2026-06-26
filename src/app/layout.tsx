import type { Metadata, Viewport } from "next";
import { Oswald, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const headingFont = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zero-Waste â€” Food Rescue & Affordable Groceries",
  description:
    "AI-powered food rescue and affordable grocery ecosystem. Connect surplus food with people who need it.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#F7F5F0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
