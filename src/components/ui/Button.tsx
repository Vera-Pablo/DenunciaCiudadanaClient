import React from "react";
import { MdArrowForward } from "react-icons/md";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  fullWidth?: boolean;
  icon?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  icon = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "rounded-full font-headline font-semibold flex items-center justify-center gap-3 transition-all active:scale-[0.98] duration-200 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-primary text-on-primary py-4 px-8 shadow-md hover:bg-primary/90 hover:shadow-lg",
    secondary: "text-primary py-4 px-8 hover:bg-surface-container-low",
    outline:
      "border border-outline-variant text-primary py-4 px-8 hover:bg-surface-container-low",
    ghost:
      "text-on-surface-variant py-3 px-6 hover:text-on-surface hover:bg-surface-container-low",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
      {icon && variant === "primary" && (
        <MdArrowForward size={20} className="text-xl" />
      )}
    </button>
  );
};

export default Button;
