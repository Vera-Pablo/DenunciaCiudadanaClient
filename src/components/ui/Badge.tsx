import React from "react";

export type BadgeVariant =
  | "pending"
  | "success"
  | "warning"
  | "error"
  | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "neutral" }) => {
  const variants = {
    pending: "bg-error/10 text-error border-error/20",
    success: "bg-green-100 text-green-700 border-green-200 uppercase",
    warning: "bg-amber-100 text-amber-700 border-amber-200",
    error: "bg-red-50 text-red-600 border-red-100",
    neutral:
      "bg-surface-container-highest text-on-surface-variant border-outline-variant/30",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold border ${variants[variant]} transition-colors inline-flex items-center justify-center`}
    >
      {children}
    </span>
  );
};

export default Badge;
