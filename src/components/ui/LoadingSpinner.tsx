import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-6 w-6 border-2",
  md: "h-10 w-10 border-[3px]",
  lg: "h-14 w-14 border-4",
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  return (
    <div className={`flex justify-center items-center py-12 ${className}`}>
      <div
        className={`animate-spin rounded-full border-primary border-t-transparent ${sizeMap[size]}`}
      />
    </div>
  );
};

export default LoadingSpinner;
