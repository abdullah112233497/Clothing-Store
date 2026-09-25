"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNotificationBell from "@/components/AdminNotificationBell";
import AdminTableSkeletonRows from "@/components/AdminTableSkeletonRows";
import { adminFetch, invalidateAdminCache } from "@/lib/admin-cache";

/* ==========================================================================
   ICONS (Exact SVG Design System)
   ========================================================================== */

function DashboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
  );
}

function InventoryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function CustomersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function PaymentsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <path d="M6 16h4" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EyeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* ==========================================================================
   CUSTOMER TYPES & DATA
   ========================================================================== */

type Customer = {
  id: string;
  dbId?: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  orders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: "Active" | "Inactive";
};

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "CUST-001",
    name: "Esther Howard",
    email: "esther@example.com",
    phone: "0321-4829102",
    city: "Lahore",
    orders: 6,
    totalSpent: 42500,
    lastOrderDate: "19 Jun 2026",
    status: "Active",
  },
  {
    id: "CUST-002",
    name: "David Miller",
    email: "david@example.com",
    phone: "0300-9284712",
    city: "Karachi",
    orders: 4,
    totalSpent: 28900,
    lastOrderDate: "19 Jun 2026",
    status: "Active",
  },
  {
    id: "CUST-003",
    name: "James Moore",
    email: "james@example.com",
    phone: "0333-5192837",
    city: "Islamabad",
    orders: 3,
    totalSpent: 23997,
    lastOrderDate: "18 Jun 2026",
    status: "Active",
  },
  {
    id: "CUST-004",
    name: "Robert Anderson",
    email: "robert@example.com",
    phone: "0345-8172940",
    city: "Rawalpindi",
    orders: 2,
    totalSpent: 13998,
    lastOrderDate: "18 Jun 2026",
    status: "Active",
  },
  {
    id: "CUST-005",
    name: "Ayesha Khan",
    email: "ayesha.k@example.com",
    phone: "0322-9471029",
    city: "Lahore",
    orders: 5,
    totalSpent: 36400,
    lastOrderDate: "17 Jun 2026",
    status: "Active",
  },
  {
    id: "CUST-006",
    name: "Sara Ahmed",
    email: "sara.ahmed@example.com",
    phone: "0312-3849102",
    city: "Karachi",
    orders: 7,
    totalSpent: 54900,
    lastOrderDate: "17 Jun 2026",
    status: "Active",
  },
  {
    id: "CUST-007",
    name: "Hina Malik",
    email: "hina@example.com",
    phone: "0324-5192837",
    city: "Islamabad",
    orders: 1,
    totalSpent: 6450,
    lastOrderDate: "12 May 2026",
    status: "Inactive",
  },
  {
    id: "CUST-008",
    name: "Fatima Raza",
    email: "fatima@example.com",
    phone: "0301-4928173",
    city: "Peshawar",
    orders: 1,
    totalSpent: 9999,
    lastOrderDate: "28 Apr 2026",
    status: "Inactive",
  },
];

function formatPKR(val: number) {
  return "Rs. " + Number(val).toLocaleString("en-PK");
}

/* ==========================================================================
   CUSTOMERS PAGE COMPONENT
   ========================================================================== */

export default function CustomersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Inactive">("All");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    adminFetch("/api/admin/customers")
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!data?.customers) return;
        setCustomers(data.customers.map((customer: { id: number; first_name: string; last_name: string; email: string; phone?: string; city?: string; orders: number; spent: number; last_order_date?: string; is_active: boolean }) => ({
          id: `CUST-${String(customer.id).padStart(3, "0")}`,
          dbId: customer.id,
          name: `${customer.first_name} ${customer.last_name}`,
          email: customer.email,
          phone: customer.phone || "",
          city: customer.city || "—",
          orders: Number(customer.orders),
          totalSpent: Number(customer.spent),
          lastOrderDate: customer.last_order_date ? new Date(customer.last_order_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—",
          status: customer.is_active ? "Active" : "Inactive",
        })));
      })
      .catch((error) => console.error("Customers load failed:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const toggleCustomerStatus = async (customer: Customer) => {
    if (!customer.dbId) return;
    const isActive = customer.status !== "Active";
    const response = await fetch("/api/admin/customers", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: customer.dbId, isActive }) });
    if (!response.ok) { const data = await response.json(); alert(data.error || "Unable to update customer."); return; }
    invalidateAdminCache("/api/admin/customers");
    invalidateAdminCache("/api/admin/dashboard");
    const updated: Customer = { ...customer, status: isActive ? "Active" : "Inactive" };
    setCustomers((current) => current.map((item) => item.dbId === customer.dbId ? updated : item));
    setSelectedCustomer(updated);
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "Active").length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgSpent = Math.round(totalRevenue / (totalCustomers || 1));

  const filteredCustomers = customers.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.phone.includes(q);
    const matchesTab = activeTab === "All" || c.status === activeTab;
    return matchesSearch && matchesTab;
  });

  // Prevent background scrolling and interaction when modal is open
  useEffect(() => {
    if (selectedCustomer) {
      const origBody = document.body.style.overflow;
      const origHtml = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = origBody || "";
        document.documentElement.style.overflow = origHtml || "";
      };
    }
  }, [selectedCustomer]);

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
      <AdminSidebar currentTab="customers" />

      {/* MAIN BODY */}
      <section className={`transition-[margin] duration-300 lg:ml-[var(--admin-sidebar-width)] ${selectedCustomer ? "pointer-events-none select-none" : ""}`} aria-hidden={!!selectedCustomer}>
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#D5C1A9]/60 bg-[#FAF7F2]/95 px-5 backdrop-blur-md sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#A06E31] font-semibold">
                Admin Portal
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-[#1D1612] sm:text-xl">
                Customer Profiles
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-[#D5C1A9]/80 bg-white px-3.5 py-1.5 text-xs text-[#694F3D] font-semibold">
              Verified Customer Accounts
            </span>
            <AdminNotificationBell />
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-[#1D1612]">Admin</p>
              <p className="text-xs text-[#8B7A6C]">Store Manager</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1D1612] text-sm font-semibold text-[#D5C1A9] border border-[#A06E31]/40 shadow-xs">
              A
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="px-5 py-7 sm:px-8 lg:px-10 space-y-7">
          {/* SUBHEADER */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#A06E31] font-semibold">
                  Customer Directory & Loyalty
                </p>
                <h2 className="mt-1.5 text-2xl font-semibold text-[#1D1612]">
                  Customer Overview
                </h2>
                <p className="mt-1 text-sm text-[#8B7A6C]">
                  Manage registered shoppers, monitor purchase histories, and contact clients across Pakistan.
                </p>
              </div>
            </div>

            {/* KPI STAT CARDS */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-5 shadow-xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8B7A6C]">
                  Total Customers
                </p>
                <p className="mt-3 text-2xl font-bold tracking-tight text-[#1D1612]">
                  {isLoading ? <span className="admin-loading-value">000</span> : totalCustomers}
                </p>
                <p className="mt-1 text-xs text-emerald-700 font-semibold">+18% new clients</p>
              </div>

              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-5 shadow-xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8B7A6C]">
                  Active Shoppers
                </p>
                <p className="mt-3 text-2xl font-bold tracking-tight text-[#1D1612]">
                  {isLoading ? <span className="admin-loading-value">000</span> : activeCustomers}
                </p>
                <p className="mt-1 text-xs text-[#8B7A6C]">Placed orders in past 30 days</p>
              </div>

              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-5 shadow-xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8B7A6C]">
                  Total Lifetime Spent
                </p>
                <p className="mt-3 text-2xl font-bold tracking-tight text-[#1D1612]">
                  {isLoading ? <span className="admin-loading-value">Rs. 00,000</span> : formatPKR(totalRevenue)}
                </p>
                <p className="mt-1 text-xs text-[#8B7A6C]">Cumulative customer spend</p>
              </div>

              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-5 shadow-xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8B7A6C]">
                  Avg. Spend Per Client
                </p>
                <p className="mt-3 text-2xl font-bold tracking-tight text-[#1D1612]">
                  {isLoading ? <span className="admin-loading-value">Rs. 00,000</span> : formatPKR(avgSpent)}
                </p>
                <p className="mt-1 text-xs text-[#8B7A6C]">High-value retention</p>
              </div>
            </div>

            {/* CUSTOMER DIRECTORY TABLE */}
            <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white shadow-xs overflow-hidden">
              {/* TABS */}
              <div className="border-b border-[#D5C1A9]/60 px-6 pt-5">
                <div className="flex items-center gap-2 pb-4">
                  {([
                    { key: "All", label: "All Customers", count: customers.length },
                    { key: "Active", label: "Active", count: activeCustomers },
                    { key: "Inactive", label: "Inactive", count: customers.length - activeCustomers },
                  ] as const).map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                        activeTab === tab.key
                          ? "bg-[#1D1612] text-white shadow-xs"
                          : "border border-[#D5C1A9]/70 bg-white text-[#694F3D] hover:bg-[#FAF7F2] hover:border-[#A06E31]"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        activeTab === tab.key ? "bg-[#A06E31] text-white" : "bg-[#F4EEE7] text-[#694F3D]"
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SEARCH */}
              <div className="p-5 border-b border-[#D5C1A9]/60 bg-[#FAF7F2]/40">
                <div className="relative max-w-md">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7A6C]">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by customer name, email, city, or phone..."
                    className="w-full rounded-xl border border-[#D5C1A9]/80 bg-[#FAF7F2] py-2.5 pl-10 pr-4 text-xs text-[#1D1612] outline-none placeholder:text-[#8B7A6C] focus:border-[#A06E31]"
                  />
                </div>
              </div>

              {/* TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#D5C1A9]/60 bg-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider text-[#8B7A6C]">
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">City</th>
                      <th className="px-6 py-4">Orders Placed</th>
                      <th className="px-6 py-4">Total Spent</th>
                      <th className="px-6 py-4">Last Order</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#D5C1A9]/30 text-xs">
                    {isLoading ? <AdminTableSkeletonRows columns={7} /> : filteredCustomers.map((cust) => (
                      <tr
                        key={cust.id}
                        className="transition hover:bg-[#FAF7F2]/60"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1D1612] text-xs font-bold text-[#D5C1A9] border border-[#A06E31]/30 transition">
                              {cust.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <p className="font-semibold text-[#1D1612]">{cust.name}</p>
                              <p className="text-[11px] text-[#8B7A6C]">{cust.email} · {cust.phone}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-[#8B7A6C] font-medium">
                          {cust.city}
                        </td>

                        <td className="px-6 py-4 font-semibold text-[#1D1612]">
                          {cust.orders} orders
                        </td>

                        <td className="px-6 py-4 font-bold text-[#1D1612]">
                          {formatPKR(cust.totalSpent)}
                        </td>

                        <td className="px-6 py-4 text-[#8B7A6C]">
                          {cust.lastOrderDate}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-semibold border ${
                              cust.status === "Active"
                                ? "bg-[#F4EEE7] text-[#694F3D] border-[#D5C1A9]"
                                : "bg-gray-100 text-gray-600 border-gray-200"
                            }`}
                          >
                            {cust.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedCustomer(cust)}
                            className="inline-flex items-center justify-center p-1.5 text-[#8B7A6C] hover:text-[#A06E31] transition-colors focus:outline-none"
                            title={`View ${cust.name} details`}
                            aria-label={`View ${cust.name} details`}
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

      {/* CUSTOMER DETAILS MODAL */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]/70 p-3 sm:p-5 backdrop-blur-md overscroll-contain overflow-y-auto animate-fade-in"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="w-full max-w-xl max-h-[92vh] overflow-y-auto custom-scrollbar-thin rounded-2xl bg-white shadow-2xl border border-[#D5C1A9]/60 transition-all flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-[#D5C1A9]/60 px-6 py-4 sticky top-0 bg-white z-20 shadow-xs">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A06E31]">
                  Customer Dossier & Profile
                </p>
                <div className="flex items-center gap-2.5 mt-1">
                  <h3 className="text-xl font-bold tracking-tight text-[#080808]">
                    {selectedCustomer.name}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                      selectedCustomer.status === "Active"
                        ? "bg-[#F4EEE7] text-[#694F3D] border-[#D5C1A9]"
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    }`}
                  >
                    {selectedCustomer.status}
                  </span>
                  <span className="text-xs font-mono text-[#8B7A6C] hidden sm:inline">
                    · {selectedCustomer.id}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF7F2] text-[#8B7A6C] border border-[#D5C1A9]/40 transition hover:bg-[#D5C1A9]/50 hover:text-[#080808]"
                title="Close modal"
              >
                <CloseIcon />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 space-y-5">
              {/* CUSTOMER IDENTITY & CONTACT CARD */}
              <div className="rounded-xl border border-[#D5C1A9]/60 bg-[#FAF7F2]/50 p-4.5">
                <div className="flex items-center justify-between mb-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A06E31]">
                    Primary Contact
                  </p>
                  <a
                    href={`tel:${selectedCustomer.phone}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#080808] px-3 py-1.5 text-[11px] font-semibold text-white shadow-xs transition hover:bg-[#A06E31]"
                  >
                    <PhoneIcon />
                    <span>Call {selectedCustomer.phone}</span>
                  </a>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1D1612] text-[#D5C1A9] font-bold text-base border border-[#A06E31]/40 shadow-xs">
                    {selectedCustomer.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-base text-[#080808]">
                      {selectedCustomer.name}
                    </p>
                    <p className="text-xs text-[#8B7A6C] mt-0.5">
                      {selectedCustomer.email}
                    </p>

                    <div className="mt-2.5 rounded-lg bg-white border border-[#D5C1A9]/40 p-2.5 text-xs text-[#080808]">
                      <span className="font-semibold text-[#8B7A6C] block text-[10px] uppercase tracking-wider mb-0.5">
                        Registered Location & Delivery City
                      </span>
                      <p className="font-medium leading-relaxed">
                        {selectedCustomer.city}, Pakistan
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACCOUNT METRICS GRID */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-[#D5C1A9]/60 bg-white p-3.5 shadow-2xs">
                  <p className="text-[10px] uppercase tracking-wider text-[#8B7A6C] font-semibold">
                    Orders Placed
                  </p>
                  <p className="mt-1.5 text-lg font-bold text-[#080808]">
                    {selectedCustomer.orders} orders
                  </p>
                  <p className="mt-0.5 text-[11px] text-emerald-700 font-medium">Active purchaser</p>
                </div>

                <div className="rounded-xl border border-[#D5C1A9]/60 bg-white p-3.5 shadow-2xs">
                  <p className="text-[10px] uppercase tracking-wider text-[#8B7A6C] font-semibold">
                    Lifetime Spend
                  </p>
                  <p className="mt-1.5 text-lg font-bold text-[#080808]">
                    {formatPKR(selectedCustomer.totalSpent)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#8B7A6C]">Settled via COD & Card</p>
                </div>

                <div className="rounded-xl border border-[#D5C1A9]/60 bg-white p-3.5 shadow-2xs">
                  <p className="text-[10px] uppercase tracking-wider text-[#8B7A6C] font-semibold">
                    Customer ID
                  </p>
                  <p className="mt-1.5 font-mono text-xs font-bold text-[#080808]">
                    {selectedCustomer.id}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#8B7A6C]">Verified profile</p>
                </div>

                <div className="rounded-xl border border-[#D5C1A9]/60 bg-white p-3.5 shadow-2xs">
                  <p className="text-[10px] uppercase tracking-wider text-[#8B7A6C] font-semibold">
                    Last Order Date
                  </p>
                  <p className="mt-1.5 text-xs font-bold text-[#080808]">
                    {selectedCustomer.lastOrderDate}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#8B7A6C]">Recent transaction</p>
                </div>
              </div>

              {/* LOYALTY & REWARDS SUMMARY */}
              <div className="rounded-xl border border-[#D5C1A9]/60 bg-[#FAF7F2] p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#080808]">VIP Shopper Status</p>
                  <p className="text-[11px] text-[#8B7A6C] mt-0.5">
                    Eligible for priority dispatch & complimentary shipping across Pakistan.
                  </p>
                </div>
                <span className="rounded-full bg-[#1D1612] px-3 py-1 text-[10px] font-bold text-[#D5C1A9]">
                  Tier 1
                </span>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="px-6 py-4 bg-white border-t border-[#D5C1A9]/60 flex items-center justify-between gap-3 sticky bottom-0 z-20 shadow-xs">
              <div className="flex items-center gap-2">
                <a href={`tel:${selectedCustomer.phone}`} className="inline-flex items-center gap-1.5 rounded-lg border border-[#D5C1A9] bg-white px-3.5 py-2 text-xs font-semibold text-[#080808] transition hover:bg-[#FAF7F2]"><PhoneIcon /><span>Call Client</span></a>
                <button type="button" onClick={() => toggleCustomerStatus(selectedCustomer)} className="rounded-lg border border-[#D5C1A9] bg-white px-3.5 py-2 text-xs font-semibold text-[#080808] transition hover:bg-[#FAF7F2]">{selectedCustomer.status === "Active" ? "Deactivate" : "Activate"}</button>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="rounded-lg bg-[#080808] px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#A06E31]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
