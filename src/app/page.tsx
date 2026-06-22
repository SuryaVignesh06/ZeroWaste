"use client";

import { AppShell } from "@/components/zero-waste/AppShell";

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] w-full items-center justify-center bg-zw-bg-base sm:p-4 md:p-6">
      {/* Decorative background blobs (desktop wrapper) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="blob bg-zw-primary-300/40 zw-float-slow" style={{ width: 400, height: 400, top: "-10%", left: "-10%" }} />
        <div className="blob bg-zw-pink-300/30 zw-float" style={{ width: 350, height: 350, bottom: "-10%", right: "-5%" }} />
      </div>

      {/* Phone frame on desktop, full-screen on mobile */}
      <div className="relative flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-zw-aurora shadow-2xl sm:h-[860px] sm:max-h-[92vh] sm:rounded-[2.5rem] sm:ring-1 sm:ring-black/5">
        <AppShell />
      </div>
    </main>
  );
}
