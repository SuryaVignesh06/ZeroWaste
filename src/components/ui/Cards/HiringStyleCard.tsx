import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Pencil, HeartHandshake, ShieldCheck } from "lucide-react";
import { Avatar } from "../Display/Avatar";

export interface HiringStyleCardProps {
  id?: string;
  avatarSrc?: string;
  fallbackInitial: string;
  title: string;
  subtitle: string;
  progressLabel: string;
  progressValue: number;
  progressColor?: string;
  onTopRightAction?: () => void;
  onAction1?: () => void;
  onAction2?: () => void;
  action1Icon?: ReactNode;
  action2Icon?: ReactNode;
  className?: string;
  isListed?: boolean;
  expiryStatus?: "urgent" | "warning" | "normal";
}

export function HiringStyleCard({
  avatarSrc,
  fallbackInitial,
  title,
  subtitle,
  progressLabel,
  progressValue,
  progressColor = "#879B5E",
  onTopRightAction,
  onAction1,
  onAction2,
  action1Icon = <Pencil size={18} className="text-text-primary" />,
  action2Icon = <HeartHandshake size={18} className="text-text-primary" />,
  className = "",
  isListed = false,
  expiryStatus = "normal",
}: HiringStyleCardProps) {
  const dotsCount = 14;

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className={`relative w-full rounded-[40px] border p-6 pb-7 flex flex-col gap-6 shrink-0 overflow-hidden ${className}`}
      style={{
        background: "rgba(255,255,255,0.90)",
        borderColor: "rgba(255,255,255,0.55)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.07), 0 2px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.95)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <Avatar src={avatarSrc} fallback={fallbackInitial} size="md" />
          <div className="flex flex-col">
            <h3 className="font-outfit text-h3 leading-tight tracking-tight text-text-primary">
              {title}
            </h3>
            <span className="font-jakarta text-[13px] text-text-muted font-medium mt-0.5 tracking-wide">
              {subtitle}
            </span>
          </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onTopRightAction?.(); }}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.10)] border border-white/70 hover:bg-white transition-colors shrink-0"
        >
          <ArrowUpRight size={18} className="text-text-secondary" />
        </button>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-end mt-1">
        <div className="flex flex-col gap-2 flex-1 pr-6">
          <span className="font-jakarta text-[11px] font-semibold text-text-secondary tracking-wide">
            {progressLabel}
          </span>
          <div className="flex items-center gap-1.5 h-2 w-full max-w-[180px]">
            <div
              className="h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressValue}%`, backgroundColor: progressColor }}
            />
            <div className="flex-1 flex gap-1 items-center h-full overflow-hidden opacity-30">
              {Array.from({ length: dotsCount }).map((_, i) => (
                <div key={i} className="w-[3px] h-[3px] rounded-full bg-text-muted shrink-0" />
              ))}
            </div>
          </div>
        </div>

        {isListed ? (
          <div className="flex items-center gap-1.5 px-4 py-2 bg-accent-green/10 text-accent-green border border-accent-green/20 rounded-full font-bold font-outfit text-[12px] shrink-0">
            <ShieldCheck size={14} className="text-accent-green" />
            <span>LISTED</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={(e) => { e.stopPropagation(); onAction1?.(); }}
              className="w-11 h-11 rounded-full bg-white/60 border border-white/70 backdrop-blur-md flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-white/80 transition-all duration-200 active:scale-90 pointer-events-auto"
            >
              {action1Icon}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onAction2?.(); }}
              className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.10)] border border-white/80 hover:bg-white transition-all duration-200 active:scale-90 pointer-events-auto"
            >
              {action2Icon}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
