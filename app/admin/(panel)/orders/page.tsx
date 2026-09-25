"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNotificationBell from "@/components/AdminNotificationBell";
import AdminDropdown from "@/components/AdminDropdown";
import AdminDateRangeFilter, { DateRangeValue } from "@/components/AdminDateRangeFilter";
import AdminTableSkeletonRows from "@/components/AdminTableSkeletonRows";
import { adminFetch, invalidateAdminCache } from "@/lib/admin-cache";

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
  dbId?: number;
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
  status: "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Returned";
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

function EyeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <circle cx="12" cy="12" r="3" />
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

function formatOrderPrice(val: string | number) {
  if (!val && val !== 0) return "Rs. 0";
  const str = String(val).trim();
  const digitsOnly = str.replace(/[^\d]/g, "");
  if (digitsOnly) {
    return `Rs. ${Number(digitsOnly).toLocaleString()}`;
  }
  return str.startsWith("Rs.") ? str : `Rs. ${str}`;
}

/* =========================
   MAIN ORDERS COMPONENT
========================= */

export default function OrdersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Pending" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled">("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [dateRange, setDateRange] = useState<DateRangeValue>({
    startDate: "",
    endDate: "",
    preset: "all",
    label: "All Dates",
  });

  // Dispatch fields inside modal
  const [courierName, setCourierName] = useState("TCS Express");
  const [trackingNumberInput, setTrackingNumberInput] = useState("");
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);

  useEffect(() => {
    adminFetch("/api/admin/orders")
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!data?.orders) return;
        setOrders(data.orders.map((order: { id: number; orderNumber: string; customer: { name: string; phone: string; email: string; address: string; city: string; notes?: string }; items: Array<{ name: string; size?: string; sku: string; price: number; quantity: number }>; courier?: string; trackingNumber?: string; total: number; paymentMethod: string; paymentStatus: string; status: string; createdAt: string }) => ({
          id: order.orderNumber,
          dbId: order.id,
          customer: order.customer.name,
          phone: order.customer.phone,
          email: order.customer.email,
          address: order.customer.address,
          city: order.customer.city,
          notes: order.customer.notes,
          product: order.items.map((item) => `${item.name}${item.size ? ` (${item.size})` : ""}`).join(", "),
          items: order.items.map((item) => ({ name: item.name, size: item.size || "", sku: item.sku, price: `Rs. ${Number(item.price).toLocaleString("en-PK")}`, quantity: item.quantity })),
          courier: order.courier || "Unassigned",
          trackingNumber: order.trackingNumber || undefined,
          total: `Rs. ${Number(order.total).toLocaleString("en-PK")}`,
          paymentMethod: "Cash on Delivery",
          paymentStatus: order.paymentStatus === "paid" ? "Collected" : "Pending",
          status: order.status.charAt(0).toUpperCase() + order.status.slice(1) as Order["status"],
          date: new Date(order.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        })));
      })
      .catch((error) => console.error("Orders load failed:", error))
      .finally(() => setIsLoading(false));
  }, []);

  // Prevent background scrolling and interaction when modal is open
  useEffect(() => {
    if (selectedOrder) {
      const origBody = document.body.style.overflow;
      const origHtml = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = origBody || "";
        document.documentElement.style.overflow = origHtml || "";
      };
    }
  }, [selectedOrder]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.phone.includes(search) ||
      order.city.toLowerCase().includes(search.toLowerCase()) ||
      order.product.toLowerCase().includes(search.toLowerCase());

    const matchesTab = activeTab === "All" || order.status === activeTab;
    const matchesCity = cityFilter === "All" || order.city === cityFilter;

    let matchesDate = true;
    if (dateRange.startDate || dateRange.endDate) {
      const orderDate = new Date(order.date);
      if (dateRange.startDate) {
        const start = new Date(dateRange.startDate);
        start.setHours(0, 0, 0, 0);
        if (orderDate < start) matchesDate = false;
      }
      if (dateRange.endDate) {
        const end = new Date(dateRange.endDate);
        end.setHours(23, 59, 59, 999);
        if (orderDate > end) matchesDate = false;
      }
    }

    return matchesSearch && matchesTab && matchesCity && matchesDate;
  });

  // Tab counts
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const confirmedCount = orders.filter((o) => o.status === "Confirmed").length;
  const shippedCount = orders.filter((o) => o.status === "Shipped").length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;
  const cancelledCount = orders.filter((o) => o.status === "Cancelled").length;

  // Manual Status Handlers
  const handleUpdateStatus = async (newStatus: Order["status"], extraProps?: Partial<Order>) => {
    if (!selectedOrder) return;
    if (isUpdatingOrder) return;
    const payload: Record<string, string> = {};
    if (newStatus) payload.status = newStatus.toLowerCase();
    if (extraProps?.paymentStatus) payload.paymentStatus = extraProps.paymentStatus === "Collected" ? "paid" : "pending";
    if (extraProps?.courier) payload.courier = extraProps.courier;
    if (extraProps?.trackingNumber) payload.trackingNumber = extraProps.trackingNumber;
    setIsUpdatingOrder(true);
    const response = await fetch(`/api/admin/orders/${selectedOrder.dbId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await response.json().catch(() => null);
    if (!response.ok) { alert(data?.error || "Unable to update order status."); setIsUpdatingOrder(false); return; }
    const serverOrder = data?.order;
    const updated = {
      ...selectedOrder,
      status: (serverOrder?.status ? String(serverOrder.status).charAt(0).toUpperCase() + String(serverOrder.status).slice(1) : newStatus) as Order["status"],
      paymentStatus: serverOrder?.paymentStatus === "paid" ? "Collected" as const : extraProps?.paymentStatus || selectedOrder.paymentStatus,
      courier: serverOrder?.courier || extraProps?.courier || selectedOrder.courier,
      trackingNumber: serverOrder?.trackingNumber || extraProps?.trackingNumber || selectedOrder.trackingNumber,
    };
    setOrders((prev) => prev.map((o) => (o.id === selectedOrder.id ? updated : o)));
    setSelectedOrder(updated);
    invalidateAdminCache("/api/admin/orders");
    invalidateAdminCache("/api/admin/inventory");
    invalidateAdminCache("/api/admin/payments");
    invalidateAdminCache("/api/admin/dashboard");
    setIsUpdatingOrder(false);
  };

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
      <AdminSidebar currentTab="orders" />

      {/* MAIN CONTENT */}
      <section className={`transition-[margin] duration-300 lg:ml-[var(--admin-sidebar-width)] ${selectedOrder ? "pointer-events-none select-none" : ""}`} aria-hidden={!!selectedOrder}>
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#D5C1A9]/60 bg-[#FAF7F2]/95 px-5 backdrop-blur-md sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#A06E31] font-semibold">
                Admin Panel
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-[#1D1612] sm:text-xl">
                Orders & Deliveries
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block rounded-xl border border-[#D5C1A9]/80 bg-white px-3.5 py-1.5 text-xs text-[#5d4634] font-medium shadow-2xs">
              Payment: Cash on Delivery (COD)
            </span>
            <AdminNotificationBell />
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-[#1D1612]">Admin</p>
              <p className="text-xs text-[#8B7A6C]">Administrator</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1D1612] text-sm font-semibold text-[#D5C1A9] border border-[#A06E31]/40">
              A
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="px-5 py-7 sm:px-8 lg:px-10">

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
            <div className="mb-5 flex gap-2 overflow-x-auto border-b border-[#D5C1A9]/40 pb-3">
              {([
                { label: "All Orders", key: "All", count: orders.length },
                { label: "Pending Verification", key: "Pending", count: pendingCount },
                { label: "Confirmed & Packing", key: "Confirmed", count: confirmedCount },
                { label: "Shipped (In Transit)", key: "Shipped", count: shippedCount },
                { label: "Delivered & Paid", key: "Delivered", count: deliveredCount },
                { label: "Cancelled", key: "Cancelled", count: cancelledCount },
              ] as const).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab.key
                      ? "bg-[#1D1612] text-white shadow-xs"
                      : "border border-[#D5C1A9]/70 bg-white text-[#694F3D] hover:bg-[#FAF7F2] hover:border-[#A06E31]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      activeTab === tab.key
                        ? "bg-[#A06E31] text-white"
                        : "bg-[#F4EEE7] text-[#694F3D]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* FILTER BAR */}
            <div className="mb-5 rounded-2xl border border-[#D5C1A9]/60 bg-white p-4 shadow-xs">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7A6C]">
                    <SearchIcon />
                  </span>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search order ID, customer name, phone number or product..."
                    className="w-full rounded-xl border border-black/10 bg-[#F8F6F2]/50 py-2.5 pl-10 pr-4 text-xs text-[#080808] outline-none transition focus:border-black/30 focus:bg-white placeholder:text-black/40"
                  />
                </div>

                {/* CUSTOM CITY DROPDOWN */}
                <AdminDropdown
                  value={cityFilter}
                  onChange={setCityFilter}
                  options={[
                    { value: "All", label: "All Cities" },
                    { value: "Lahore", label: "Lahore" },
                    { value: "Karachi", label: "Karachi" },
                    { value: "Islamabad", label: "Islamabad" },
                    { value: "Rawalpindi", label: "Rawalpindi" },
                    { value: "Faisalabad", label: "Faisalabad" },
                  ]}
                  className="w-full md:w-44"
                />

                {/* DATE & TIME RANGE FILTER */}
                <AdminDateRangeFilter
                  value={dateRange}
                  onChange={setDateRange}
                  className="w-full md:w-auto"
                />

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveTab("All");
                    setCityFilter("All");
                    setDateRange({
                      startDate: "",
                      endDate: "",
                      preset: "all",
                      label: "All Dates",
                    });
                  }}
                  className="rounded-xl border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-black/60 transition hover:bg-black/5 hover:text-black"
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
                    {isLoading ? <AdminTableSkeletonRows columns={8} /> : filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="transition hover:bg-[#F8F6F2]/50"
                      >

                        <td className="px-5 py-4">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setCourierName(order.courier !== "Unassigned" ? order.courier : "TCS Express");
                              setTrackingNumberInput(order.trackingNumber || "");
                            }}
                            className="font-bold text-[#080808] hover:text-[#A06E31] hover:underline"
                            title="Click to view order details"
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

                        <td className="px-5 py-4 whitespace-nowrap">
                          <p className="text-sm font-bold text-[#1D1612]">
                            {formatOrderPrice(order.total)}
                          </p>
                          <span
                            className={`inline-block mt-0.5 rounded-full px-2 py-0.5 text-[9px] font-semibold border ${
                              order.paymentStatus === "Collected"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
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

                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedOrder(order);
                              setCourierName(order.courier !== "Unassigned" ? order.courier : "TCS Express");
                              setTrackingNumberInput(order.trackingNumber || "");
                            }}
                            className="inline-flex items-center justify-center p-1.5 text-[#8B7A6C] hover:text-[#A06E31] transition-colors focus:outline-none"
                            title={`View order ${order.id} details`}
                            aria-label={`View order ${order.id} details`}
                          >
                            <EyeIcon className="h-5 w-5" />
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

      {/* ORDER DETAILS & DELIVERY MODAL */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]/70 p-3 sm:p-5 backdrop-blur-md overscroll-contain overflow-y-auto animate-fade-in"
          onClick={() => setSelectedOrder(null)}
        >

          <div
            className="w-full max-w-3xl lg:max-w-4xl max-h-[92vh] overflow-y-auto custom-scrollbar-thin rounded-2xl bg-white shadow-2xl border border-[#D5C1A9]/60 transition-all flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-[#D5C1A9]/60 px-6 py-4 sticky top-0 bg-white z-20 shadow-xs">

              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A06E31]">
                  Order details & Delivery Management
                </p>

                <div className="flex items-center gap-2.5 mt-1">
                  <h3 className="text-xl font-bold tracking-tight text-[#080808]">
                    {selectedOrder.id}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${getStatusClass(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                  <span className="text-xs text-[#8B7A6C] hidden sm:inline">
                    · Placed on {selectedOrder.date}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F8F6F2] text-[#8B7A6C] border border-[#D5C1A9]/40 transition hover:bg-[#D5C1A9]/50 hover:text-[#080808]"
                title="Close modal"
              >
                <CloseIcon />
              </button>

            </div>

            {/* MANUAL STATUS & COD PAYMENT CONTROLS */}
            <div className="border-b border-[#D5C1A9]/50 px-6 py-3.5 bg-[#FAF7F2] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-semibold text-[#080808]/70">Change Status:</span>
                <AdminDropdown
                  value={selectedOrder.status}
                  onChange={(val) => handleUpdateStatus(val as Order["status"])}
                  options={[
                    { value: "Pending", label: "Pending Verification" },
                    { value: "Confirmed", label: "Confirmed & Packing" },
                    { value: "Processing", label: "Processing / Packing" },
                    { value: "Shipped", label: "Shipped (In Transit)" },
                    { value: "Delivered", label: "Delivered & Paid" },
                    { value: "Cancelled", label: "Cancelled" },
                  ]}
                  size="sm"
                  className="w-48 sm:w-52"
                />
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-xs font-semibold text-[#080808]/70">COD Payment:</span>
                <AdminDropdown
                  value={selectedOrder.paymentStatus}
                  onChange={(val) => handleUpdateStatus(selectedOrder.status, { paymentStatus: val as Order["paymentStatus"] })}
                  options={[
                    { value: "Pending", label: "Pending (Not Collected)" },
                    { value: "Collected", label: "Collected (Cash Received)" },
                  ]}
                  size="sm"
                  className="w-48 sm:w-52"
                />
              </div>
            </div>

            {/* 2-COLUMN SECTION: CUSTOMER DOSSIER & COURIER DISPATCH */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* CUSTOMER & CONTACT INFORMATION */}
              <div className="rounded-xl border border-[#D5C1A9]/60 bg-[#FAF7F2]/50 p-4.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A06E31]">
                      Customer Dossier
                    </p>
                    <a
                      href={`tel:${selectedOrder.phone}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#080808] px-3 py-1.5 text-[11px] font-semibold text-white shadow-xs transition hover:bg-[#A06E31]"
                    >
                      <PhoneIcon />
                      <span>Call {selectedOrder.phone}</span>
                    </a>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D5C1A9] font-bold text-sm text-[#080808] border border-black/10 shadow-xs">
                      {selectedOrder.customer
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-[#080808]">
                        {selectedOrder.customer}
                      </p>

                      <p className="text-xs text-[#8B7A6C] mt-0.5">
                        {selectedOrder.email}
                      </p>

                      <div className="mt-2.5 rounded-lg bg-white border border-[#D5C1A9]/40 p-2.5 text-xs text-[#080808]">
                        <span className="font-semibold text-[#8B7A6C] block text-[10px] uppercase tracking-wider mb-0.5">
                          Delivery Destination · {selectedOrder.city}
                        </span>
                        <p className="font-medium leading-relaxed">
                          {selectedOrder.address}, {selectedOrder.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div className="mt-3.5 rounded-lg border border-amber-200 bg-amber-50/90 p-2.5 text-xs text-amber-900">
                    <span className="font-bold text-amber-800">Customer Note:</span> {selectedOrder.notes}
                  </div>
                )}
              </div>

              {/* COURIER DISPATCH CONTROL */}
              <div className="rounded-xl border border-[#D5C1A9]/60 bg-[#FAF7F2]/50 p-4.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A06E31]">
                      Courier Service & Tracking
                    </p>
                    <span className="text-[11px] font-medium text-[#8B7A6C]">
                      Carrier: <span className="font-semibold text-[#080808]">{courierName}</span>
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-[#080808]/70 block mb-1.5 font-semibold text-[11px]">
                        Select Delivery Partner
                      </label>
                      <AdminDropdown
                        value={courierName}
                        onChange={setCourierName}
                        options={[
                          { value: "TCS Express", label: "TCS Express" },
                          { value: "Leopards Courier", label: "Leopards Courier" },
                          { value: "Trax Logistics", label: "Trax Logistics" },
                          { value: "Call Courier", label: "Call Courier" },
                          { value: "M&P Express", label: "M&P Express" },
                        ]}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-[#080808]/70 block mb-1.5 font-semibold text-[11px]">
                        Consignment / Tracking Number
                      </label>
                      <input
                        type="text"
                        value={trackingNumberInput}
                        onChange={(e) => setTrackingNumberInput(e.target.value)}
                        placeholder="e.g. TCS-9028148 or LCS-882194"
                        className="w-full rounded-lg border border-[#D5C1A9] bg-white px-3 py-2 text-xs font-mono outline-none transition focus:border-[#A06E31] focus:ring-1 focus:ring-[#A06E31]"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.status, { courier: courierName, trackingNumber: trackingNumberInput })}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#080808] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#A06E31]"
                  >
                    <span>Save Courier & Tracking</span>
                  </button>
                </div>
              </div>

            </div>

            {/* ORDER ITEMS */}
            <div className="px-6 py-2">
              <div className="rounded-xl border border-[#D5C1A9]/60 bg-white p-4 shadow-xs">
                <div className="flex items-center justify-between mb-3 border-b border-[#D5C1A9]/40 pb-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A06E31]">
                    Order Items ({selectedOrder.items.length})
                  </p>
                  <p className="text-xs text-[#8B7A6C]">
                    Total Units: {selectedOrder.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#FAF7F2] p-3 border border-[#D5C1A9]/30 text-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[#080808] text-sm">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1 text-[#8B7A6C]">
                          <span className="rounded bg-white px-2 py-0.5 font-semibold text-[#080808] border border-[#D5C1A9]/40">
                            Size: {item.size}
                          </span>
                          <span className="font-mono text-[11px]">
                            SKU: {item.sku}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-sm text-[#1D1612]">{formatOrderPrice(item.price)}</p>
                        <p className="text-[11px] text-[#8B7A6C]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* TOTAL & COD PAYMENT SUMMARY */}
            <div className="mx-6 my-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#FAF7F2] border border-[#D5C1A9]/70 px-5 py-4 shadow-xs">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B7A6C] block">
                  Total Payable on Delivery (COD)
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-semibold text-[#5d4634]">
                    Payment Status:
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                      selectedOrder.paymentStatus === "Collected"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    {selectedOrder.paymentStatus === "Collected" ? "Cash Collected" : "Cash Pending (Due at Doorstep)"}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#8B7A6C] block uppercase tracking-wider">
                  Net Amount
                </span>
                <span className="text-2xl font-extrabold tracking-tight text-[#1D1612]">
                  {formatOrderPrice(selectedOrder.total)}
                </span>
              </div>
            </div>

            {/* STATUS ACTION BUTTONS FOOTER */}
            <div className="px-6 py-4 bg-white border-t border-[#D5C1A9]/60 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-20 shadow-xs">
              <button
                onClick={() => handleUpdateStatus("Cancelled")}
                className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
              >
                Cancel Order
              </button>

              <div className="flex flex-wrap items-center gap-2.5">
                {selectedOrder.status === "Pending" && (
                  <button
                    onClick={() => handleUpdateStatus("Confirmed")}
                    className="rounded-lg bg-[#080808] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#A06E31]"
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
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#A06E31] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#080808]"
                  >
                    <TruckIcon />
                    <span>Dispatch via {courierName.split(" ")[0]}</span>
                  </button>
                )}

                {selectedOrder.status !== "Delivered" && (
                  <button
                    onClick={() => handleUpdateStatus("Delivered")}
                    className="rounded-lg bg-green-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-green-800"
                  >
                    ✓ Mark Delivered & Paid
                  </button>
                )}

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-lg border border-[#D5C1A9] bg-white px-4 py-2 text-xs font-semibold text-[#080808] transition hover:bg-[#F8F6F2]"
                >
                  Close
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </main>
  );
}
