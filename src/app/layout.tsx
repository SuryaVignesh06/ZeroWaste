import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zero-Waste — Food Rescue & Affordable Groceries",
  description:
    "AI-powered food rescue and affordable grocery ecosystem. Connect surplus food with people who need it.",
  keywords: ["zero-waste", "food rescue", "affordable groceries", "NGO", "volunteer"],
  authors: [{ name: "Zero-Waste Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${inter.variable} ${jetbrains.variable} antialiased bg-zw-bg-base text-zw-text-primary`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
