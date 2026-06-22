"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  deadline: string; // ISO
  variant?: "compact" | "full";
  onExpire?: () => void;
}

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export function Countdown({ deadline, variant = "compact", onExpire }: CountdownProps) {
  const [remaining, setRemaining] = useState(0);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const tick = () => {
      const ms = new Date(deadline).getTime() - Date.now();
      if (ms <= 0) {
        setRemaining(0);
        setExpired(true);
        onExpire?.();
        return;
      }
      setRemaining(ms);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline, onExpire]);

  if (expired) {
    return (
      <span className="font-mono text-zw-danger font-semibold">EXPIRED</span>
    );
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const isUrgent = hours === 0 && mins < 30;
  const isWarning = hours === 0 && mins < 60;

  if (variant === "full") {
    return (
      <div className="flex items-center gap-1 font-mono">
        <TimeBox value={pad(hours)} label="HRS" urgent={isUrgent} />
        <span
          className={`text-lg font-bold ${isUrgent ? "text-zw-danger" : isWarning ? "text-zw-warning" : "text-zw-primary-700"}`}
        >
          :
        </span>
        <TimeBox value={pad(mins)} label="MIN" urgent={isUrgent} />
        <span
          className={`text-lg font-bold ${isUrgent ? "text-zw-danger" : isWarning ? "text-zw-warning" : "text-zw-primary-700"}`}
        >
          :
        </span>
        <TimeBox value={pad(secs)} label="SEC" urgent={isUrgent} />
      </div>
    );
  }

  return (
    <span
      className={`font-mono text-sm font-semibold tabular-nums ${
        isUrgent
          ? "text-zw-danger"
          : isWarning
            ? "text-zw-warning"
            : "text-zw-primary-700"
      }`}
    >
      {hours > 0 ? `${hours}h ` : ""}
      {pad(mins)}:{pad(secs)}
    </span>
  );
}

function TimeBox({
  value,
  label,
  urgent,
}: {
  value: string;
  label: string;
  urgent: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`min-w-9 rounded-md px-2 py-1 text-center font-mono text-lg font-bold tabular-nums ${
          urgent
            ? "bg-zw-danger/10 text-zw-danger"
            : "bg-zw-primary-50 text-zw-primary-800"
        }`}
      >
        {value}
      </div>
      <span className="mt-0.5 text-[9px] font-medium uppercase tracking-wider text-zw-text-muted">
        {label}
      </span>
    </div>
  );
}

export function formatRelativeTime(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now();
  const hours = Math.floor(Math.abs(diff) / 3600_000);
  const mins = Math.floor((Math.abs(diff) % 3600_000) / 60_000);
  const isPast = diff < 0;
  if (hours === 0) {
    return isPast ? `${mins}m ago` : `in ${mins}m`;
  }
  return isPast ? `${hours}h ago` : `in ${hours}h`;
}

export function formatINR(amount: number): string {
  return `\u20B9${amount.toLocaleString("en-IN")}`;
}

export function daysUntil(iso: string): number {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}
