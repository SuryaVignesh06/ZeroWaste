"use client";

import { AppShell } from "@/components/zero-waste/AppShell";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-zw-bg-base sm:bg-zw-bg-muted sm:p-4 md:p-6">
      {/* Phone frame on desktop, full-screen on mobile */}
      <div className="relative flex h-screen w-full max-w-md flex-col overflow-hidden bg-zw-bg-base shadow-2xl sm:h-[860px] sm:max-h-[90vh] sm:rounded-[2.5rem] sm:ring-1 sm:ring-zw-border">
        <AppShell />
      </div>
    </main>
  );
}
