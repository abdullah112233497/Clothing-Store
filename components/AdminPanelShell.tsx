"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { prefetchAdminData } from "@/lib/admin-cache";

const ADMIN_DATA_ROUTES: Record<string, string> = {
  "/admin": "/api/admin/dashboard?",
  "/admin/orders": "/api/admin/orders",
  "/admin/products": "/api/admin/products",
  "/admin/customers": "/api/admin/customers",
  "/admin/inventory": "/api/admin/inventory",
  "/admin/payments": "/api/admin/payments",
  "/admin/settings": "/api/admin/settings",
};

type AdminSidebarContextValue = {
  collapsed: boolean;
  toggle: () => void;
};

const AdminSidebarContext = createContext<AdminSidebarContextValue | null>(null);

export function useAdminSidebar() {
  const context = useContext(AdminSidebarContext);
  if (!context) throw new Error("useAdminSidebar must be used inside AdminPanelShell");
  return context;
}

export default function AdminPanelShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const value = useMemo(
    () => ({ collapsed, toggle: () => setCollapsed((current) => !current) }),
    [collapsed],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      for (const [page, endpoint] of Object.entries(ADMIN_DATA_ROUTES)) {
        if (page !== pathname) void prefetchAdminData(endpoint);
      }
    }, 300);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const notifyVisiblePage = () => {
      if (document.visibilityState === "visible") {
        window.dispatchEvent(new Event("adminDataRefresh"));
      }
    };
    const timer = window.setInterval(notifyVisiblePage, 15_000);
    document.addEventListener("visibilitychange", notifyVisiblePage);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", notifyVisiblePage);
    };
  }, []);

  return (
    <AdminSidebarContext.Provider value={value}>
      <div
        style={{ "--admin-sidebar-width": collapsed ? "5rem" : "16rem" } as React.CSSProperties}
      >
        {children}
      </div>
    </AdminSidebarContext.Provider>
  );
}
