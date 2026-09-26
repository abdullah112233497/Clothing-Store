"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

type WishlistAuthPromptProps = {
  open: boolean;
  onClose: () => void;
  redirectTo: string;
};

export default function WishlistAuthPrompt({
  open,
  onClose,
  redirectTo,
}: WishlistAuthPromptProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>("button, a[href]")
        ?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]"),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const redirect = encodeURIComponent(redirectTo);

  return createPortal(
    <div
      className="fixed inset-0 z-[1200] flex items-end justify-center bg-black/55 p-4 backdrop-blur-[2px] sm:items-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-black/5 hover:text-black"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="px-7 pb-7 pt-9 text-center sm:px-9 sm:pb-9">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F6F0E8] text-[#A06E31]">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>

          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#A06E31]">
            Your Wishlist
          </p>
          <h2 id={titleId} className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
            Save your favourites
          </h2>
          <p id={descriptionId} className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
            Create an account or sign in to save products to your wishlist and access them whenever you return.
          </p>

          <div className="mt-7 grid gap-3">
            <Link
              href={`/account/signup?redirect=${redirect}`}
              className="rounded-xl bg-black px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#A06E31]"
            >
              Create an account
            </Link>
            <Link
              href={`/account/login?redirect=${redirect}`}
              className="rounded-xl border border-black/15 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-900 transition hover:border-black hover:bg-gray-50"
            >
              Sign in
            </Link>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-5 text-xs font-medium text-gray-500 underline decoration-gray-300 underline-offset-4 transition hover:text-black"
          >
            Continue browsing
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
