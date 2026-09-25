"use client";

import { useEffect, useState } from "react";

type Notification = { id: number; title: string; message: string; is_read: boolean; created_at: string };

export default function AdminNotificationBell() {
  const [items, setItems] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  const load = () => fetch("/api/admin/notifications", { cache: "no-store" })
    .then((response) => response.ok ? response.json() : null)
    .then((data) => setItems(data?.notifications || []))
    .catch(() => undefined);

  useEffect(() => { void load(); }, []);
  const unread = items.filter((item) => !item.is_read).length;
  const markAllRead = async () => {
    await fetch("/api/admin/notifications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: "all" }) });
    setItems((current) => current.map((item) => ({ ...item, is_read: true })));
  };

  return (
    <div className="fixed right-5 top-5 z-50">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-label="Open notifications" className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#D5C1A9]/70 bg-white text-[#1D1612] shadow-sm transition hover:border-[#A06E31]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg>
        {unread > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#A06E31] px-1 text-[9px] font-bold text-white">{unread > 9 ? "9+" : unread}</span>}
      </button>
      {open && <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-2xl border border-[#D5C1A9]/70 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#D5C1A9]/40 px-4 py-3"><p className="text-xs font-bold text-[#1D1612]">Notifications</p><button type="button" onClick={markAllRead} className="text-[10px] font-semibold text-[#A06E31]">Mark all read</button></div>
        <div className="max-h-80 overflow-y-auto">{items.length ? items.slice(0, 12).map((item) => <div key={item.id} className={`border-b border-[#D5C1A9]/25 px-4 py-3 ${item.is_read ? "bg-white" : "bg-[#FAF7F2]"}`}><p className="text-xs font-semibold text-[#1D1612]">{item.title}</p><p className="mt-1 text-[11px] leading-4 text-[#8B7A6C]">{item.message}</p></div>) : <p className="px-4 py-8 text-center text-xs text-[#8B7A6C]">No notifications yet.</p>}</div>
      </div>}
    </div>
  );
}
