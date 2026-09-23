"use client";

import React, { useState, useRef, useEffect } from "react";

export interface DropdownOption {
  value: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
  badge?: string;
}

interface AdminDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  label?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  align?: "left" | "right";
  size?: "sm" | "md";
}

export default function AdminDropdown({
  value,
  onChange,
  options,
  placeholder = "Select...",
  label,
  className = "",
  buttonClassName = "",
  menuClassName = "",
  align = "left",
  size = "md",
}: AdminDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const paddingClasses = size === "sm" ? "px-3 py-1.5 text-xs" : "px-3.5 py-2 text-xs";

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      {label && (
        <label className="mb-1 block text-[11px] font-semibold tracking-wider text-black/50 uppercase">
          {label}
        </label>
      )}

      {/* TRIGGER BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between gap-2.5 rounded-xl border border-[#D5C1A9]/80 bg-white ${paddingClasses} font-medium text-[#1D1612] shadow-xs transition hover:border-[#A06E31] hover:bg-[#FAF7F2] focus:border-[#A06E31] focus:outline-none ${
          isOpen ? "border-[#A06E31] ring-2 ring-[#A06E31]/15" : ""
        } ${buttonClassName}`}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedOption?.icon && <span className="shrink-0">{selectedOption.icon}</span>}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>

        <span className="flex items-center gap-1.5 shrink-0 text-[#8B7A6C]">
          {selectedOption?.count !== undefined && (
            <span className="rounded-full bg-[#F4EEE7] px-2 py-0.5 text-[10px] font-semibold text-[#694F3D]">
              {selectedOption.count}
            </span>
          )}
          {selectedOption?.badge && (
            <span className="rounded-md bg-[#F4EEE7] px-1.5 py-0.5 text-[10px] font-semibold text-[#694F3D]">
              {selectedOption.badge}
            </span>
          )}
          <svg
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#A06E31]" : "text-[#8B7A6C]"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } z-50 mt-1.5 min-w-[180px] max-h-64 w-full overflow-y-auto rounded-xl border border-[#D5C1A9]/80 bg-white p-1.5 shadow-xl animate-fade-in focus:outline-none ${menuClassName}`}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-xs transition ${
                  isSelected
                    ? "bg-[#1D1612] text-white font-semibold shadow-xs"
                    : "text-[#1D1612] hover:bg-[#F6EFE7] hover:text-[#1D1612]"
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  {option.icon && (
                    <span className={isSelected ? "text-white" : "text-[#8B7A6C]"}>
                      {option.icon}
                    </span>
                  )}
                  <span className="truncate">{option.label}</span>
                </span>

                <span className="flex items-center gap-1.5 shrink-0">
                  {option.count !== undefined && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-[#F4EEE7] text-[#694F3D]"
                      }`}
                    >
                      {option.count}
                    </span>
                  )}

                  {isSelected && (
                    <svg
                      className="h-3.5 w-3.5 text-[#D5C1A9]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
