"use client";

import { Toaster as SonnerToaster } from "sonner";

export function ToastSystem() {
  return (
    <SonnerToaster 
      position="top-center"
      toastOptions={{
        className: "bg-bg-card-dark text-text-on-dark border border-border-dark shadow-dark rounded-xl font-jakarta",
        descriptionClassName: "text-text-on-dark-muted",
      }}
    />
  );
}
