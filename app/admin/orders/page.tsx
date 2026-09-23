"use client";

import { useState } from "react";
import Link from "next/link";

/* =========================
   TYPES
========================= */

type OrderItem = {
  name: string;
  size: string;
  sku: string;
  price: string;
  quantity: number;
};

type Order = {
  id: string;
  customer: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes?: string;
  product: string;
  items: OrderItem[];
  courier: string;
  trackingNumber?: string;
  total: string;
  paymentMethod: "Cash on Delivery";
  paymentStatus: "Pending" | "Collected";
  status: "Pending" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
};

/* =========================
   COD ORDERS DATA
========================= */

const initialOrders: Order[] = [
  {
    id: "#192541",
    customer: "Esther Howard",
    phone: "0321-4829102",
    email: "esther@example.com",
    address: "House 42-B, Sector Y, DHA Phase 5",
    city: "Lahore",
    notes: "Please call before arriving. Cash is kept ready.",
    product: "Essential Oversized Tee (M)",
    items: [
      { name: "Essential Oversized Tee", size: "M", sku: "WW-TEE-01-M", price: "Rs. 3,499", quantity: 1 }
    ],
    courier: "TCS Express",
    trackingNumber: "TCS-9028148",
    total: "Rs. 3,499",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Collected",
    status: "Delivered",
    date: "Jun 19, 2026",
  },
  {
    id: "#192540",
    customer: "David Miller",
    phone: "0300-9284712",
    email: "david@example.com",
    address: "Apartment 402, Al-Razi Heights, Clifton Block 4",
    city: "Karachi",
    product: "Classic Casual Shirt (L)",
    items: [
      { name: "Classic Casual Shirt", size: "L", sku: "WW-SHT-03-L", price: "Rs. 4,999", quantity: 1 }
    ],
    courier: "Leopards Courier",
    trackingNumber: "LCS-7819204",
    total: "Rs. 4,999",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Shipped",
    date: "Jun 19, 2026",
  },
  {
    id: "#192539",
    customer: "James Moore",
    phone: "0333-5192837",
    email: "james@example.com",
    address: "House 18, Street 12, Sector F-8/2",
    city: "Islamabad",
    notes: "Leave at security desk if unavailable.",
    product: "Urban Denim Jacket (XL)",
    items: [
      { name: "Urban Denim Jacket", size: "XL", sku: "WW-JCK-02-XL", price: "Rs. 7,999", quantity: 1 }
    ],
    courier: "Trax Logistics",
    trackingNumber: "TRX-4491028",
    total: "Rs. 7,999",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Confirmed",
    date: "Jun 18, 2026",
  },
  {
    id: "#192538",
    customer: "Robert Anderson",
    phone: "0345-8172940",
    email: "robert@example.com",
    address: "Plot 104, Westridge 1, Peshawar Road",
    city: "Rawalpindi",
    product: "Modern Cargo Pants (32)",
    items: [
      { name: "Modern Cargo Pants", size: "32", sku: "WW-PNT-09-32", price: "Rs. 6,999", quantity: 1 }
    ],
    courier: "Unassigned",
    total: "Rs. 6,999",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Pending",
    date: "Jun 18, 2026",
  },
  {
    id: "#192537",
    customer: "Jessica Martinez",
    phone: "0312-7482910",
    email: "jessica@example.com",
    address: "Canal Park, Main Boulevard, House 29",
    city: "Faisalabad",
    notes: "Customer cancelled order during confirmation call.",
    product: "Minimal Shoulder Bag",
    items: [
      { name: "Minimal Shoulder Bag", size: "Standard", sku: "WW-BAG-01", price: "Rs. 5,499", quantity: 1 }
    ],
    courier: "Unassigned",
    total: "Rs. 5,499",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Cancelled",
    date: "Jun 17, 2026",
  },
  {
    id: "#192536",
    customer: "William Jackson",
    phone: "0322-8172039",
    email: "william@example.com",
    address: "Suit 11, Garden Town, Aibak Block",
    city: "Lahore",
    product: "Relaxed Fit Trousers (M)",
    items: [
      { name: "Relaxed Fit Trousers", size: "M", sku: "WW-TRS-02-M", price: "Rs. 6,499", quantity: 1 }
    ],
    courier: "TCS Express",
    trackingNumber: "TCS-9281740",
    total: "Rs. 6,499",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Collected",
    status: "Delivered",
    date: "Jun 17, 2026",
  },
  {
    id: "#192535",
    customer: "Christopher Harris",
    phone: "0301-4477291",
    email: "christopher@example.com",
    address: "Commercial Market, Satellite Town, Block B",
    city: "Rawalpindi",
    product: "Premium Basic Hoodie (L)",
    items: [
      { name: "Premium Basic Hoodie", size: "L", sku: "WW-HOD-04-L", price: "Rs. 5,999", quantity: 1 }
    ],
    courier: "Leopards Courier",
    trackingNumber: "LCS-6192837",
    total: "Rs. 5,999",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Shipped",
    date: "Jun 16, 2026",
  },
  {
    id: "#192534",
    customer: "Marcus Kent",
    phone: "0313-9988112",
    email: "marcus@example.com",
    address: "Gulberg 3, Street 15, House 88",
    city: "Lahore",
    product: "Everyday Sneakers (42)",
    items: [
      { name: "Everyday Sneakers", size: "42", sku: "WW-SNK-05-42", price: "Rs. 8,499", quantity: 1 }
    ],
    courier: "TCS Express",
    trackingNumber: "TCS-8192041",
    total: "Rs. 8,499",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Collected",
    status: "Delivered",
    date: "Jun 16, 2026",
  },
];

/* =========================
   CLEAN STROKE SVG ICONS
========================= */

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

function PhoneIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="2" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
      <circle cx="5" cy="12" r="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* =========================
   STATUS STYLE
========================= */

function getStatusClass(status: Order["status"]) {
  switch (status) {
    case "Delivered":
      return "bg-[#eee6dc] text-[#6f4b2d]";
    case "Shipped":
      return "bg-blue-50 text-blue-800 border-blue-200";
    case "Confirmed":
      return "bg-amber-50 text-amber-800 border-amber-200";
    case "Pending":
      return "bg-[#D5C1A9] text-[#5d4634]";
    case "Cancelled":
      return "bg-[#f1dfdc] text-[#8a3f35]";
    default:
      return "bg-[#ebe8e4] text-[#6f665f]";
  }
}

/* =========================
   MAIN ORDERS COMPONENT
========================= */

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Pending" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled">("All");
  const [cityFilter, setCityFilter] = useState("All");

  // Dispatch fields inside modal
  const [courierName, setCourierName] = useState("TCS Express");
  const [trackingNumberInput, setTrackingNumberInput] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.phone.includes(search) ||
      order.city.toLowerCase().includes(search.toLowerCase()) ||
      order.product.toLowerCase().includes(search.toLowerCase());

    const matchesTab = activeTab === "All" || order.status === activeTab;
    const matchesCity = cityFilter === "All" || order.city === cityFilter;

    return matchesSearch && matchesTab && matchesCity;
  });

  // Tab counts
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const confirmedCount = orders.filter((o) => o.status === "Confirmed").length;
  const shippedCount = orders.filter((o) => o.status === "Shipped").length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;
  const cancelledCount = orders.filter((o) => o.status === "Cancelled").length;

  // Manual Status Handlers
  const handleUpdateStatus = (newStatus: Order["status"], extraProps?: Partial<Order>) => {
    if (!selectedOrder) return;
    const updated = {
      ...selectedOrder,
      status: newStatus,
      ...(newStatus === "Delivered" ? { paymentStatus: "Collected" as const } : {}),
      ...extraProps,
    };
    setOrders((prev) => prev.map((o) => (o.id === selectedOrder.id ? updated : o)));
    setSelectedOrder(updated);
  };

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-64 shrink-0 flex-col bg-[#080808] text-white lg:flex border-r border-white/10">

          {/* LOGO */}
          <div className="border-b border-white/10 px-6 py-7">
            <Link
              href="/admin"
              className="text-xl font-black tracking-[0.2em]"
            >
              WEARWELL
            </Link>

            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#8B7A6C]">
              Admin Panel
            </p>
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 px-4 py-6">

            <Link
              href="/admin"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#8B7A6C] transition hover:bg-white/10 hover:text-white"
            >
              <DashboardIcon />
              Dashboard
            </Link>

            <Link
              href="/admin/orders"
              className="mb-2 flex items-center justify-between rounded-lg bg-[#A06E31] px-4 py-3 text-sm font-medium text-white shadow-sm"
            >
              <div className="flex items-center gap-3">
                <OrdersIcon />
                <span>Orders</span>
              </div>
              <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-bold">
                {orders.length}
              </span>
            </Link>

            <Link
              href="/admin/products"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#8B7A6C] transition hover:bg-white/10 hover:text-white"
            >
              <ProductsIcon />
              Products
            </Link>

            <Link
              href="/admin/inventory"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#8B7A6C] transition hover:bg-white/10 hover:text-white"
            >
              <InventoryIcon />
              Inventory
            </Link>

            <Link
              href="/admin/customers"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#8B7A6C] transition hover:bg-white/10 hover:text-white"
            >
              <CustomersIcon />
              Customers
            </Link>

            <Link
              href="/admin/payments"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#8B7A6C] transition hover:bg-white/10 hover:text-white"
            >
              <PaymentsIcon />
              Payments
            </Link>

            <Link
              href="/admin/settings"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#8B7A6C] transition hover:bg-white/10 hover:text-white"
            >
              <SettingsIcon />
              Settings
            </Link>

          </nav>

          {/* ADMIN INFO */}
          <div className="border-t border-white/10 p-5">
            <p className="text-xs text-[#8B7A6C]">
              Signed in as
            </p>

            <p className="mt-1 text-sm font-medium">
              Admin
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <section className="min-w-0 flex-1">

          {/* TOP BAR */}
          <header className="flex h-20 items-center justify-between border-b border-[#8B7A6C]/20 bg-white px-6 lg:px-8 sticky top-0 z-30">

            <div>
              <p className="text-xs text-[#8B7A6C]">
                Admin / Orders
              </p>

              <h1 className="mt-1 text-xl font-semibold">
                Orders & Deliveries
              </h1>
            </div>

            <div className="flex items-center gap-3">

              <span className="hidden sm:inline-block rounded-lg border border-[#8B7A6C]/30 bg-[#F8F6F2] px-3.5 py-1.5 text-xs text-[#5d4634] font-medium">
                Payment: Cash on Delivery (COD)
              </span>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D5C1A9] text-xs font-semibold text-[#080808]">
                AD
              </div>

            </div>
          </header>

          {/* CONTENT */}
          <div className="p-5 sm:p-7 lg:p-8">

            {/* PAGE HEADER */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8B7A6C]">
                  Store management
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  Customer Orders
                </h2>

                <p className="mt-1 text-sm text-[#8B7A6C]">
                  Customer orders placed with contact info. Dispatch via courier service and manually mark delivered upon cash collection.
                </p>
              </div>

              <p className="text-sm font-medium text-[#8B7A6C]">
                {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"}
              </p>

            </div>

            {/* ESSENTIAL STATUS TABS */}
            <div className="mb-5 flex gap-2 overflow-x-auto border-b border-[#8B7A6C]/20 pb-3">
              {[
                { label: "All Orders", key: "All", count: orders.length },
                { label: "Pending Verification", key: "Pending", count: pendingCount },
                { label: "Confirmed & Packing", key: "Confirmed", count: confirmedCount },
                { label: "Shipped (In Transit)", key: "Shipped", count: shippedCount },
                { label: "Delivered & Paid", key: "Delivered", count: deliveredCount },
                { label: "Cancelled", key: "Cancelled", count: cancelledCount },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab.key
                      ? "bg-[#080808] text-white shadow-sm"
                      : "border border-[#8B7A6C]/25 bg-white text-[#5f554e] hover:bg-[#F8F6F2] hover:border-[#A06E31]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      activeTab === tab.key
                        ? "bg-[#A06E31] text-white"
                        : "bg-[#F8F6F2] text-[#8B7A6C]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* FILTER BAR */}
            <div className="mb-5 rounded-xl border border-[#8B7A6C]/20 bg-white p-4 shadow-sm">

              <div className="flex flex-col gap-3 md:flex-row">

                <div className="relative flex-1">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7A6C]">
                    <SearchIcon />
                  </span>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search order ID, customer name, phone number or product..."
                    className="w-full rounded-lg border border-[#8B7A6C]/25 bg-[#F8F6F2] py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#A06E31] focus:bg-white"
                  />

                </div>

                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="rounded-lg border border-[#8B7A6C]/25 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#A06E31]"
                >
                  <option value="All">All Cities</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                </select>

                <button
                  onClick={() => {
                    setSearch("");
                    setActiveTab("All");
                    setCityFilter("All");
                  }}
                  className="rounded-lg border border-[#8B7A6C]/25 px-5 py-2.5 text-sm font-medium transition hover:border-[#A06E31] hover:bg-[#D5C1A9]/30"
                >
                  Reset
                </button>

              </div>
            </div>

            {/* ORDERS TABLE */}
            <div className="overflow-hidden rounded-xl border border-[#8B7A6C]/20 bg-white shadow-sm">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[980px] text-left">

                  <thead className="border-b border-[#8B7A6C]/20 bg-[#F8F6F2]">
                    <tr>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Order
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Customer & Phone
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Destination
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Product Items
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Courier & Tracking
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        COD Total
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#8B7A6C]">
                        Status
                      </th>

                      <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-[#8B7A6C] text-right">
                        Action
                      </th>

                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#8B7A6C]/10">

                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        onClick={() => {
                          setSelectedOrder(order);
                          setCourierName(order.courier !== "Unassigned" ? order.courier : "TCS Express");
                          setTrackingNumberInput(order.trackingNumber || "");
                        }}
                        className="transition hover:bg-[#F8F6F2]/70 cursor-pointer"
                      >

                        <td className="px-5 py-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(order);
                              setCourierName(order.courier !== "Unassigned" ? order.courier : "TCS Express");
                              setTrackingNumberInput(order.trackingNumber || "");
                            }}
                            className="font-bold text-[#080808] hover:text-[#A06E31] hover:underline"
                          >
                            {order.id}
                          </button>
                          <p className="text-[10px] text-[#8B7A6C] mt-0.5">{order.date}</p>
                        </td>

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D5C1A9] text-xs font-semibold text-[#080808]">
                              {order.customer
                                .split(" ")
                                .map((word) => word[0])
                                .join("")}
                            </div>

                            <div>
                              <p className="text-sm font-medium text-[#080808]">
                                {order.customer}
                              </p>

                              <a
                                href={`tel:${order.phone}`}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 text-xs font-mono text-[#A06E31] hover:underline"
                              >
                                <PhoneIcon />
                                <span>{order.phone}</span>
                              </a>
                            </div>

                          </div>

                        </td>

                        <td className="px-5 py-4 max-w-[180px]">
                          <p className="text-xs font-semibold text-[#080808]">{order.city}</p>
                          <p className="text-[11px] text-[#8B7A6C] truncate" title={order.address}>
                            {order.address}
                          </p>
                        </td>

                        <td className="max-w-[190px] px-5 py-4">
                          <p className="truncate text-sm text-[#5f554e] font-medium">
                            {order.product}
                          </p>
                          <p className="text-[10px] text-[#8B7A6C]">
                            Qty: {order.items.reduce((s, i) => s + i.quantity, 0)}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-xs font-medium text-[#080808]">
                            {order.courier}
                          </p>
                          {order.trackingNumber ? (
                            <p className="text-[10px] font-mono text-[#8B7A6C]">
                              {order.trackingNumber}
                            </p>
                          ) : (
                            <span className="text-[10px] text-[#A06E31] font-medium">
                              Not assigned
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-bold text-[#080808]">
                            {order.total}
                          </p>
                          <span
                            className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-semibold border ${
                              order.paymentStatus === "Collected"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-stone-100 text-stone-600 border-stone-200"
                            }`}
                          >
                            COD: {order.paymentStatus}
                          </span>
                        </td>

                        <td className="px-5 py-4">

                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-semibold border ${getStatusClass(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>

                        </td>

                        <td className="px-5 py-4 text-right">

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(order);
                              setCourierName(order.courier !== "Unassigned" ? order.courier : "TCS Express");
                              setTrackingNumberInput(order.trackingNumber || "");
                            }}
                            className="rounded-lg p-2 text-[#8B7A6C] transition hover:bg-[#D5C1A9]/40 hover:text-[#080808]"
                            title="View Order Details"
                          >
                            <DotsIcon />
                          </button>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

              {/* EMPTY STATE */}
              {filteredOrders.length === 0 && (
                <div className="px-6 py-20 text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F8F6F2] text-xl text-[#8B7A6C]">
                    <SearchIcon />
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-[#080808]">
                    No orders found
                  </h3>

                  <p className="mt-1 text-xs text-[#8B7A6C]">
                    Try changing your active tab, search term, or city filter.
                  </p>

                </div>
              )}

            </div>

            {/* FOOTER INFO */}
            <div className="mt-5 flex flex-col justify-between gap-2 text-xs text-[#8B7A6C] sm:flex-row">

              <p>
                Showing {filteredOrders.length} of {orders.length} orders
              </p>

              <p>
                WEARWELL Admin Panel · Cash on Delivery Flow
              </p>

            </div>

          </div>
        </section>
      </div>

      {/* ORDER DETAILS & DELIVERY MODAL */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedOrder(null)}
        >

          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-[#8B7A6C]/20"
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-[#8B7A6C]/15 px-6 py-5 sticky top-0 bg-white z-10">

              <div>
                <p className="text-xs text-[#8B7A6C]">
                  Order details & Delivery Management
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <h3 className="text-lg font-bold">
                    {selectedOrder.id}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${getStatusClass(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F8F6F2] text-[#8B7A6C] transition hover:bg-[#D5C1A9] hover:text-[#080808]"
              >
                <CloseIcon />
              </button>

            </div>

            {/* MANUAL STATUS & COD PAYMENT CONTROLS */}
            <div className="border-b border-[#8B7A6C]/15 px-6 py-3.5 bg-[#F8F6F2]/40 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#8B7A6C]">Change Status:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleUpdateStatus(e.target.value as any)}
                  className="rounded-lg border border-[#8B7A6C]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#080808] outline-none focus:border-[#A06E31]"
                >
                  <option value="Pending">Pending Verification</option>
                  <option value="Confirmed">Confirmed & Packing</option>
                  <option value="Shipped">Shipped (In Transit)</option>
                  <option value="Delivered">Delivered & Paid</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#8B7A6C]">COD Payment:</span>
                <select
                  value={selectedOrder.paymentStatus}
                  onChange={(e) => handleUpdateStatus(selectedOrder.status, { paymentStatus: e.target.value as any })}
                  className="rounded-lg border border-[#8B7A6C]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#080808] outline-none focus:border-[#A06E31]"
                >
                  <option value="Pending">Pending (Not Collected)</option>
                  <option value="Collected">Collected (Cash Received)</option>
                </select>
              </div>
            </div>

            {/* CUSTOMER & CONTACT INFORMATION */}
            <div className="border-b border-[#8B7A6C]/15 px-6 py-5 bg-[#F8F6F2]/50">

              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7A6C]">
                  Customer Dossier
                </p>
                <a
                  href={`tel:${selectedOrder.phone}`}
                  className="inline-flex items-center gap-1 rounded bg-[#080808] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#A06E31]"
                >
                  <PhoneIcon />
                  <span>Call {selectedOrder.phone}</span>
                </a>
              </div>

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D5C1A9] font-bold text-sm">
                  {selectedOrder.customer
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>

                <div className="min-w-0 flex-1">

                  <p className="font-semibold text-sm">
                    {selectedOrder.customer}
                  </p>

                  <p className="text-xs text-[#8B7A6C]">
                    {selectedOrder.email}
                  </p>

                  <p className="text-xs text-[#080808] mt-1 font-medium">
                    Address: {selectedOrder.address}, {selectedOrder.city}
                  </p>

                </div>

              </div>

              {selectedOrder.notes && (
                <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-xs text-amber-900">
                  <span className="font-semibold">Customer Note:</span> {selectedOrder.notes}
                </div>
              )}

            </div>

            {/* COURIER DISPATCH CONTROL */}
            <div className="border-b border-[#8B7A6C]/15 px-6 py-5">

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7A6C] mb-3">
                Courier Service & Tracking
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[#8B7A6C] block mb-1 font-medium">Select Courier</label>
                  <select
                    value={courierName}
                    onChange={(e) => setCourierName(e.target.value)}
                    className="w-full rounded-lg border border-[#8B7A6C]/30 bg-white p-2 text-xs outline-none focus:border-[#A06E31]"
                  >
                    <option value="TCS Express">TCS Express</option>
                    <option value="Leopards Courier">Leopards Courier</option>
                    <option value="Trax Logistics">Trax Logistics</option>
                    <option value="Call Courier">Call Courier</option>
                    <option value="M&P Express">M&P Express</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#8B7A6C] block mb-1 font-medium">Tracking Number</label>
                  <input
                    type="text"
                    value={trackingNumberInput}
                    onChange={(e) => setTrackingNumberInput(e.target.value)}
                    placeholder="e.g. TCS-982104"
                    className="w-full rounded-lg border border-[#8B7A6C]/30 bg-white p-2 text-xs font-mono outline-none focus:border-[#A06E31]"
                  />
                </div>
              </div>

              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.status, { courier: courierName, trackingNumber: trackingNumberInput })}
                  className="rounded-lg bg-[#080808] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#A06E31] transition"
                >
                  Save Courier & Tracking
                </button>
              </div>

            </div>

            {/* ORDER ITEMS & DETAILS */}
            <div className="px-6 py-4 border-b border-[#8B7A6C]/15">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7A6C] mb-2">
                Order Items
              </p>
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-2 rounded-lg bg-[#F8F6F2]">
                    <div>
                      <p className="font-semibold text-[#080808]">{item.name}</p>
                      <p className="text-[10px] text-[#8B7A6C]">Size: {item.size} · SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{item.price}</p>
                      <p className="text-[10px] text-[#8B7A6C]">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TOTAL & COD PAYMENT */}
            <div className="mx-6 my-4 flex items-center justify-between rounded-xl bg-[#D5C1A9]/35 px-5 py-3">

              <div>
                <span className="text-xs text-[#8B7A6C] block">
                  Total Payable on Delivery (COD)
                </span>
                <span className="text-sm font-bold text-[#5d4634]">
                  Payment Status: {selectedOrder.paymentStatus === "Collected" ? "Cash Collected" : "Cash Pending"}
                </span>
              </div>

              <span className="text-lg font-bold text-[#080808]">
                {selectedOrder.total}
              </span>

            </div>

            {/* MANUAL STATUS ACTION BUTTONS */}
            <div className="px-6 pb-6 pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#8B7A6C]/15">

              <button
                onClick={() => handleUpdateStatus("Cancelled")}
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100"
              >
                Cancel Order
              </button>

              <div className="flex items-center gap-2">
                {selectedOrder.status === "Pending" && (
                  <button
                    onClick={() => handleUpdateStatus("Confirmed")}
                    className="rounded-lg bg-[#080808] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#A06E31]"
                  >
                    Confirm Order
                  </button>
                )}

                {selectedOrder.status !== "Shipped" && selectedOrder.status !== "Delivered" && (
                  <button
                    onClick={() =>
                      handleUpdateStatus("Shipped", {
                        courier: courierName,
                        trackingNumber: trackingNumberInput || `TRK-${Math.floor(1000000 + Math.random() * 9000000)}`,
                      })
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#A06E31] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#080808]"
                  >
                    <TruckIcon />
                    <span>Dispatch via {courierName.split(" ")[0]}</span>
                  </button>
                )}

                {selectedOrder.status !== "Delivered" && (
                  <button
                    onClick={() => handleUpdateStatus("Delivered")}
                    className="rounded-lg bg-green-700 px-4 py-2 text-xs font-semibold text-white hover:bg-green-800 shadow-sm"
                  >
                    ✓ Mark Delivered & Paid
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}