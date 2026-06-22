import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Zero-Waste — Food Rescue & Affordable Groceries",
  description:
    "AI-powered food rescue and affordable grocery ecosystem. Connect surplus food with people who need it.",
  keywords: ["zero-waste", "food rescue", "affordable groceries", "NGO", "volunteer"],
  authors: [{ name: "Zero-Waste Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f5f3f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-zw-bg-base text-zw-text-primary">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
