"use client";

import React, { useState, useRef, useEffect } from "react";

export interface DateRangeValue {
  startDate: string; // YYYY-MM-DD or ""
  endDate: string; // YYYY-MM-DD or ""
  preset: "all" | "today" | "yesterday" | "7days" | "30days" | "this_month" | "custom";
  label: string;
}

interface AdminDateRangeFilterProps {
  value: DateRangeValue;
  onChange: (val: DateRangeValue) => void;
  className?: string;
}

export default function AdminDateRangeFilter({
  value,
  onChange,
  className = "",
}: AdminDateRangeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStart, setTempStart] = useState(value.startDate);
  const [tempEnd, setTempEnd] = useState(value.endDate);
  const [tempPreset, setTempPreset] = useState(value.preset);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Preset calculation helper
  const handleSelectPreset = (preset: DateRangeValue["preset"]) => {
    const today = new Date();
    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    let start = "";
    let end = "";
    let label = "All Dates";

    if (preset === "today") {
      start = formatDate(today);
      end = formatDate(today);
      label = "Today";
    } else if (preset === "yesterday") {
      const y = new Date();
      y.setDate(today.getDate() - 1);
      start = formatDate(y);
      end = formatDate(y);
      label = "Yesterday";
    } else if (preset === "7days") {
      const past7 = new Date();
      past7.setDate(today.getDate() - 6);
      start = formatDate(past7);
      end = formatDate(today);
      label = "Last 7 Days";
    } else if (preset === "30days") {
      const past30 = new Date();
      past30.setDate(today.getDate() - 29);
      start = formatDate(past30);
      end = formatDate(today);
      label = "Last 30 Days";
    } else if (preset === "this_month") {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      start = formatDate(firstDay);
      end = formatDate(today);
      label = "This Month";
    } else if (preset === "all") {
      start = "";
      end = "";
      label = "All Dates";
    }

    setTempPreset(preset);
    setTempStart(start);
    setTempEnd(end);

    if (preset !== "custom") {
      onChange({
        startDate: start,
        endDate: end,
        preset,
        label,
      });
      setIsOpen(false);
    }
  };

  const handleApplyCustom = () => {
    let label = "Custom Range";
    if (tempStart && tempEnd) {
      label = `${tempStart} – ${tempEnd}`;
    } else if (tempStart) {
      label = `From ${tempStart}`;
    } else if (tempEnd) {
      label = `Until ${tempEnd}`;
    } else {
      label = "All Dates";
    }

    onChange({
      startDate: tempStart,
      endDate: tempEnd,
      preset: "custom",
      label,
    });
    setIsOpen(false);
  };

  const handleReset = () => {
    handleSelectPreset("all");
  };

  const isFiltered = value.preset !== "all";

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      {/* TRIGGER BUTTON */}
      <button
        type="button"
        onClick={() => {
          if (!isOpen) {
            setTempStart(value.startDate);
            setTempEnd(value.endDate);
            setTempPreset(value.preset);
          }
          setIsOpen(!isOpen);
        }}
        className={`flex items-center gap-2.5 rounded-xl border border-[#D5C1A9]/80 bg-white px-3.5 py-2 text-xs font-medium text-[#1D1612] shadow-xs transition hover:border-[#A06E31] hover:bg-[#FAF7F2] focus:border-[#A06E31] focus:outline-none ${
          isFiltered ? "border-[#A06E31] bg-[#F5EEE6] ring-1 ring-[#A06E31]/20" : ""
        }`}
      >
        {/* Calendar Icon */}
        <svg
          className={`h-4 w-4 shrink-0 ${isFiltered ? "text-[#A06E31]" : "text-[#8B7A6C]"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>

        <span className="truncate">
          {value.label || "Date Filter"}
        </span>

        {isFiltered && (
          <span className="h-1.5 w-1.5 rounded-full bg-[#A06E31] animate-pulse" />
        )}

        <svg
          className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#A06E31]" : "text-[#8B7A6C]"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* DROPDOWN POPOVER */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-1.5 w-80 rounded-2xl border border-[#D5C1A9]/80 bg-white p-4 shadow-2xl animate-fade-in sm:w-88">
          <div className="flex items-center justify-between border-b border-[#D5C1A9]/40 pb-3">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#A06E31]">
                Filter by Timeline
              </p>
              <h4 className="text-xs font-semibold text-[#1D1612]">Date & Range Selector</h4>
            </div>
            {isFiltered && (
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] font-semibold text-[#A06E31] hover:text-[#7C5220] transition"
              >
                Clear
              </button>
            )}
          </div>

          {/* PRESET CHIPS */}
          <div className="mt-3.5">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
              Quick Presets
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {([
                { id: "all", label: "All Time" },
                { id: "today", label: "Today" },
                { id: "yesterday", label: "Yesterday" },
                { id: "7days", label: "Last 7 Days" },
                { id: "30days", label: "Last 30 Days" },
                { id: "this_month", label: "This Month" },
              ] as const).map((p) => {
                const active = tempPreset === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectPreset(p.id)}
                    className={`rounded-lg px-2.5 py-1.5 text-center text-[11px] font-medium transition ${
                      active
                        ? "bg-[#A06E31] text-white shadow-xs"
                        : "bg-[#F4EEE7] text-[#694F3D] hover:bg-[#EAE0D4] hover:text-[#1D1612]"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CUSTOM DATE RANGE INPUTS */}
          <div className="mt-4 border-t border-[#D5C1A9]/40 pt-3.5 space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
              Custom Range
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] font-medium text-[#8B7A6C] mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  value={tempStart}
                  onChange={(e) => {
                    setTempStart(e.target.value);
                    setTempPreset("custom");
                  }}
                  className="w-full rounded-xl border border-[#D5C1A9]/80 bg-[#FAF7F2] px-2.5 py-1.5 text-[11px] text-[#1D1612] outline-none focus:border-[#A06E31]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium text-[#8B7A6C] mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  value={tempEnd}
                  onChange={(e) => {
                    setTempEnd(e.target.value);
                    setTempPreset("custom");
                  }}
                  className="w-full rounded-xl border border-[#D5C1A9]/80 bg-[#FAF7F2] px-2.5 py-1.5 text-[11px] text-[#1D1612] outline-none focus:border-[#A06E31]"
                />
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-[#D5C1A9] bg-white px-3 py-1.5 text-xs font-semibold text-[#8B7A6C] hover:bg-[#FAF7F2] transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyCustom}
                className="rounded-xl bg-[#1D1612] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#A06E31] shadow-xs transition active:scale-95"
              >
                Apply Range
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
