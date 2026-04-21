import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  className = "",
  id,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-label text-on-surface-variant uppercase tracking-widest pl-2 font-medium"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          className={`
            w-full bg-surface-container-low border-0 outline-none
            rounded-2xl px-6 py-4 text-on-surface font-body 
            transition-all placeholder:text-on-surface-variant/50 
            shadow-sm focus:ring-2 focus:ring-primary/50
            ${error ? "ring-2 ring-error/50" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-error px-2">{error}</span>}
    </div>
  );
};

export default Input;
