"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";

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

/* ==========================================================================
   CUSTOMER TYPES & DATA
   ========================================================================== */

type Customer = {
  id: string;
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
  const [customers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Inactive">("All");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedCustomer) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig || "unset";
      };
    }
  }, [selectedCustomer]);

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
      <AdminSidebar currentTab="customers" />

      {/* MAIN BODY */}
      <section className="lg:ml-64">
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
                  {totalCustomers}
                </p>
                <p className="mt-1 text-xs text-emerald-700 font-semibold">+18% new clients</p>
              </div>

              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-5 shadow-xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8B7A6C]">
                  Active Shoppers
                </p>
                <p className="mt-3 text-2xl font-bold tracking-tight text-[#1D1612]">
                  {activeCustomers}
                </p>
                <p className="mt-1 text-xs text-[#8B7A6C]">Placed orders in past 30 days</p>
              </div>

              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-5 shadow-xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8B7A6C]">
                  Total Lifetime Spent
                </p>
                <p className="mt-3 text-2xl font-bold tracking-tight text-[#1D1612]">
                  {formatPKR(totalRevenue)}
                </p>
                <p className="mt-1 text-xs text-[#8B7A6C]">Cumulative customer spend</p>
              </div>

              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-5 shadow-xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8B7A6C]">
                  Avg. Spend Per Client
                </p>
                <p className="mt-3 text-2xl font-bold tracking-tight text-[#1D1612]">
                  {formatPKR(avgSpent)}
                </p>
                <p className="mt-1 text-xs text-[#8B7A6C]">High-value retention</p>
              </div>
            </div>

            {/* CUSTOMER DIRECTORY TABLE */}
            <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white shadow-xs overflow-hidden">
              {/* TABS */}
              <div className="border-b border-[#D5C1A9]/60 px-6 pt-5">
                <div className="flex items-center gap-2 pb-4">
                  {[
                    { key: "All", label: "All Customers", count: customers.length },
                    { key: "Active", label: "Active", count: activeCustomers },
                    { key: "Inactive", label: "Inactive", count: customers.length - activeCustomers },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
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
                    {filteredCustomers.map((cust) => (
                      <tr
                        key={cust.id}
                        onClick={() => setSelectedCustomer(cust)}
                        className="cursor-pointer transition hover:bg-[#FAF7F2]/80 group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1D1612] text-xs font-bold text-[#D5C1A9] border border-[#A06E31]/30 group-hover:bg-[#A06E31] group-hover:text-white transition">
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
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCustomer(cust);
                            }}
                            className="rounded-lg border border-[#D5C1A9] bg-white px-3 py-1.5 text-xs font-semibold text-[#1D1612] hover:bg-[#1D1612] hover:text-white transition"
                          >
                            View
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

      {/* CUSTOMER MODAL */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCustomer(null)}
          />
          <div className="relative w-full max-w-md rounded-2xl border border-[#D5C1A9]/60 bg-white p-6 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-[#D5C1A9]/60 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#A06E31]">
                  Customer Details
                </span>
                <h3 className="text-xl font-bold text-[#1D1612]">{selectedCustomer.name}</h3>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="rounded-lg p-1.5 text-[#8B7A6C] hover:bg-[#FAF7F2] hover:text-[#1D1612] transition"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="space-y-2 text-xs text-[#1D1612]">
              <div className="flex justify-between py-1 border-b border-[#D5C1A9]/30">
                <span className="text-[#8B7A6C]">Customer ID:</span>
                <span className="font-semibold">{selectedCustomer.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#D5C1A9]/30">
                <span className="text-[#8B7A6C]">Email Address:</span>
                <span className="font-semibold">{selectedCustomer.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#D5C1A9]/30">
                <span className="text-[#8B7A6C]">Phone Number:</span>
                <span className="font-semibold">{selectedCustomer.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#D5C1A9]/30">
                <span className="text-[#8B7A6C]">City / Region:</span>
                <span className="font-semibold">{selectedCustomer.city}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#D5C1A9]/30">
                <span className="text-[#8B7A6C]">Total Orders:</span>
                <span className="font-semibold">{selectedCustomer.orders} orders</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#D5C1A9]/30">
                <span className="text-[#8B7A6C]">Lifetime Spent:</span>
                <span className="font-bold text-[#A06E31]">{formatPKR(selectedCustomer.totalSpent)}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="rounded-xl bg-[#1D1612] px-5 py-2 text-xs font-semibold text-white hover:bg-[#A06E31] transition shadow-xs"
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