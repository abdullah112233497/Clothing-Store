"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function StoreAvailabilityGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [status, setStatus] = useState<"loading" | "online" | "offline">("loading");
  const isAdminPath = pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminPath) return;
    fetch("/api/store/status", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setStatus(data?.settings?.store_status === false ? "offline" : "online"))
      .catch(() => setStatus("online"));
  }, [isAdminPath, pathname]);

  if (isAdminPath) return <>{children}</>;

  if (status === "offline") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F6F2] px-6 text-[#1D1612]">
        <section className="w-full max-w-xl rounded-3xl border border-[#D5C1A9]/70 bg-white p-10 text-center shadow-sm sm:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A06E31]">WEARWELL</p>
          <div className="mx-auto mt-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#F4EEE7] text-2xl">◌</div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight">We’ll be back shortly</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#8B7A6C]">Our store is temporarily unavailable while we make a few improvements. Please check back soon.</p>
        </section>
      </main>
    );
  }
  return <>{children}</>;
}
