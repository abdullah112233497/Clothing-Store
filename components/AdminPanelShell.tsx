"use client";

import { createContext, useContext, useMemo, useState } from "react";
import AdminNotificationBell from "@/components/AdminNotificationBell";

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
  const [collapsed, setCollapsed] = useState(false);
  const value = useMemo(
    () => ({ collapsed, toggle: () => setCollapsed((current) => !current) }),
    [collapsed],
  );

  return (
    <AdminSidebarContext.Provider value={value}>
      <div
        style={{ "--admin-sidebar-width": collapsed ? "5rem" : "16rem" } as React.CSSProperties}
      >
        <AdminNotificationBell />
        {children}
      </div>
    </AdminSidebarContext.Provider>
  );
}
