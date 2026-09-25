"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminSidebar } from "@/components/AdminPanelShell";

/* ==========================================================================
   ICONS (Identical Stroke SVGs from /admin dashboard)
   ========================================================================== */

function DashboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 3h12v18H6z" />
      <path d="M9 7h6M9 11h6M9 15h4" />
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16v13H4z" />
      <path d="M8 7a4 4 0 0 1 8 0" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
    </svg>
  );
}

function InventoryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 7l9-4 9 4-9 4-9-4Z" />
      <path d="M3 7v10l9 4 9-4V7" />
      <path d="M12 11v10" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h4" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
    </svg>
  );
}

function ChevronIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export type AdminNavTab =
  | "dashboard"
  | "orders"
  | "products"
  | "customers"
  | "inventory"
  | "payments"
  | "settings";

interface AdminSidebarProps {
  currentTab: AdminNavTab;
}

export default function AdminSidebar({ currentTab }: AdminSidebarProps) {
  const router = useRouter();
  const { collapsed, toggle } = useAdminSidebar();
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }
  const navItems = [
    { key: "dashboard", label: "Dashboard", href: "/admin", icon: DashboardIcon },
    { key: "orders", label: "Orders", href: "/admin/orders", icon: OrdersIcon },
    { key: "products", label: "Products", href: "/admin/products", icon: ProductsIcon },
    { key: "customers", label: "Customers", href: "/admin/customers", icon: UsersIcon },
    { key: "inventory", label: "Inventory", href: "/admin/inventory", icon: InventoryIcon },
    { key: "payments", label: "Payments", href: "/admin/payments", icon: PaymentIcon },
    { key: "settings", label: "Settings", href: "/admin/settings", icon: SettingsIcon },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-40 hidden h-screen flex-col border-r border-[#3A2C22] bg-[#1D1612] text-white transition-[width] duration-300 lg:flex ${collapsed ? "w-20" : "w-64"}`}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={collapsed ? "Expand admin sidebar" : "Collapse admin sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-16 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[#A06E31]/60 bg-[#1D1612] text-[#D5C1A9] shadow-md transition-colors hover:bg-[#A06E31] hover:text-white"
      >
        <ChevronIcon collapsed={collapsed} />
      </button>

      {/* Logo */}
      <div className={`flex h-20 items-center border-b border-[#3A2C22] ${collapsed ? "justify-center px-2" : "px-7"}`}>
        <Link href="/admin" className={collapsed ? "text-center" : ""} title={collapsed ? "WEARWELL Admin" : undefined}>
          <h1 className={`font-bold text-[#F8F6F2] ${collapsed ? "text-xl tracking-normal" : "text-xl tracking-[0.18em]"}`}>
            {collapsed ? "W" : "WEARWELL"}
          </h1>
          {!collapsed && (
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#D5C1A9]">
              Admin Portal
            </p>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 space-y-2 py-6 ${collapsed ? "px-3" : "px-4"}`}>
        {navItems.map((item) => {
          const isActive = currentTab === item.key;
          const Icon = item.icon;
          return (
            <Link
              key={item.key}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`group flex items-center rounded-xl py-3 text-sm transition-all duration-300 ${collapsed ? "justify-center px-2" : "gap-3 px-4"} ${
                isActive
                  ? "bg-[#A06E31] font-semibold text-white shadow-md shadow-[#A06E31]/25"
                  : `text-[#D5C1A9]/75 hover:bg-[#2C211B] hover:text-white ${collapsed ? "" : "hover:translate-x-1"}`
              }`}
            >
              <Icon />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className={`border-t border-[#3A2C22] ${collapsed ? "p-3" : "p-4"}`}>
        <button
          type="button"
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className={`flex w-full items-center rounded-xl py-3 text-sm text-[#D5C1A9]/70 transition-all duration-300 hover:bg-rose-500/15 hover:text-rose-200 ${collapsed ? "justify-center px-2" : "gap-3 px-4"}`}
        >
          <LogoutIcon />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
