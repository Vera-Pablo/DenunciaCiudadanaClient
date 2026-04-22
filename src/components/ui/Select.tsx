import React, { useState, useRef, useEffect } from "react";
import { MdExpandMore } from "react-icons/md";

export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string | number;
  onChange?: (e: { target: { name?: string; value: string } }) => void;
  error?: string;
  className?: string;
  name?: string;
  id?: string;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  className = "",
  name,
  id,
  placeholder = "Seleccionar...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (opt) => opt.value.toString() === value?.toString(),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: option.value.toString(),
        },
      });
    }
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full relative" ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-label text-on-surface-variant uppercase tracking-widest pl-2 font-medium"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full bg-surface-container-low border-0 outline-none
            rounded-2xl px-6 py-4 text-on-surface text-base font-body
            flex items-center justify-between transition-all shadow-sm
            hover:bg-surface-container-highest/50
            ${isOpen ? "ring-2 ring-primary/50 bg-surface-container-highest/30" : ""}
            ${error ? "ring-2 ring-error/50" : ""}
            ${className}
          `}
        >
          <span className={!selectedOption ? "text-on-surface-variant/60" : ""}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <MdExpandMore
            size={24}
            className={`text-on-surface-variant transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-[100] bg-surface-container-lowest border border-outline-variant/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <ul className="max-h-60 overflow-y-auto custom-scrollbar p-2">
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`
                      w-full text-left px-4 py-3 rounded-xl text-sm transition-colors
                      flex items-center justify-between
                      ${
                        option.value === value
                          ? "bg-primary-container text-on-primary-container font-medium"
                          : "text-on-surface hover:bg-surface-container-low"
                      }
                    `}
                  >
                    {option.label}
                    {option.value === value && (
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {error && <span className="text-xs text-error px-2">{error}</span>}
    </div>
  );
};

export default Select;
