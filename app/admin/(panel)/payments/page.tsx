"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminDropdown from "@/components/AdminDropdown";
import AdminDateRangeFilter, { DateRangeValue } from "@/components/AdminDateRangeFilter";
import AdminTableSkeletonRows from "@/components/AdminTableSkeletonRows";

/* ==========================================================================
   ICONS (Exact SVG Design System from Admin Panel)
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

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
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
   TYPES & DATA
   ========================================================================== */

export type PaymentMethodType =
  | "Cash on Delivery"
  | "Credit / Debit Card"
  | "JazzCash"
  | "EasyPaisa"
  | "Bank Transfer";

export type PaymentStatusType = "Collected" | "Pending" | "Refunded";

export type PaymentRecord = {
  id: string;
  dbId?: number;
  orderId: string;
  customer: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  method: PaymentMethodType;
  amount: number;
  date: string;
  time: string;
  status: PaymentStatusType;
  courier?: string;
  trackingNumber?: string;
  cardBrand?: string;
  cardLast4?: string;
  itemsSummary: string;
  reconciled: boolean;
};

const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: "#PAY-1024",
    orderId: "#192541",
    customer: "Esther Howard",
    email: "esther@example.com",
    phone: "0321-4829102",
    city: "Lahore",
    address: "House 42-B, Sector Y, DHA Phase 5",
    method: "Cash on Delivery",
    amount: 3499,
    date: "Jun 19, 2026",
    time: "03:42 PM",
    status: "Collected",
    courier: "TCS Express",
    trackingNumber: "TCS-9028148",
    itemsSummary: "Essential Oversized Tee (M)",
    reconciled: true,
  },
  {
    id: "#PAY-1023",
    orderId: "#192540",
    customer: "David Miller",
    email: "david@example.com",
    phone: "0300-9284712",
    city: "Karachi",
    address: "Apartment 402, Al-Razi Heights, Clifton Block 4",
    method: "Cash on Delivery",
    amount: 4999,
    date: "Jun 19, 2026",
    time: "01:15 PM",
    status: "Pending",
    courier: "Leopards Courier",
    trackingNumber: "LCS-7819204",
    itemsSummary: "Classic Casual Shirt (L)",
    reconciled: false,
  },
  {
    id: "#PAY-1022",
    orderId: "#192539",
    customer: "James Moore",
    email: "james@example.com",
    phone: "0333-5192837",
    city: "Islamabad",
    address: "House 18, Street 12, Sector F-8/2",
    method: "Credit / Debit Card",
    amount: 7999,
    date: "Jun 18, 2026",
    time: "06:20 PM",
    status: "Collected",
    cardBrand: "Mastercard",
    cardLast4: "4921",
    itemsSummary: "Urban Denim Jacket (XL)",
    reconciled: true,
  },
  {
    id: "#PAY-1021",
    orderId: "#192538",
    customer: "Robert Anderson",
    email: "robert@example.com",
    phone: "0345-8172940",
    city: "Rawalpindi",
    address: "Plot 104, Westridge 1, Peshawar Road",
    method: "Cash on Delivery",
    amount: 6999,
    date: "Jun 18, 2026",
    time: "11:05 AM",
    status: "Pending",
    courier: "Trax Logistics",
    trackingNumber: "TRX-4491028",
    itemsSummary: "Modern Cargo Pants (32)",
    reconciled: false,
  },
  {
    id: "#PAY-1020",
    orderId: "#192537",
    customer: "Ayesha Khan",
    email: "ayesha.k@example.com",
    phone: "0322-9471029",
    city: "Lahore",
    address: "Villa 12, Model Town Block C",
    method: "JazzCash",
    amount: 8499,
    date: "Jun 17, 2026",
    time: "04:30 PM",
    status: "Collected",
    itemsSummary: "Minimal Shoulder Bag (Oatmeal Beige)",
    reconciled: true,
  },
  {
    id: "#PAY-1019",
    orderId: "#192536",
    customer: "Sara Ahmed",
    email: "sara.ahmed@example.com",
    phone: "0312-3849102",
    city: "Karachi",
    address: "House 88, Khayaban-e-Seher, DHA Phase 6",
    method: "Credit / Debit Card",
    amount: 12999,
    date: "Jun 17, 2026",
    time: "02:10 PM",
    status: "Collected",
    cardBrand: "Visa",
    cardLast4: "8834",
    itemsSummary: "Premium Heavyweight Hoodie + Cargo Pants",
    reconciled: true,
  },
  {
    id: "#PAY-1018",
    orderId: "#192535",
    customer: "Zainab Noor",
    email: "zainab@example.com",
    phone: "0331-8274910",
    city: "Faisalabad",
    address: "Street 4, Peoples Colony #1",
    method: "EasyPaisa",
    amount: 5499,
    date: "Jun 16, 2026",
    time: "05:45 PM",
    status: "Refunded",
    itemsSummary: "Relaxed Fit Cotton Trousers (Returned)",
    reconciled: true,
  },
  {
    id: "#PAY-1017",
    orderId: "#192534",
    customer: "Fatima Raza",
    email: "fatima.raza@example.com",
    phone: "0301-4928173",
    city: "Peshawar",
    address: "House 5, University Town",
    method: "Bank Transfer",
    amount: 9999,
    date: "Jun 16, 2026",
    time: "10:15 AM",
    status: "Collected",
    itemsSummary: "Stitched Embroidered Tunic + Silk Scarf",
    reconciled: true,
  },
];

/* ==========================================================================
   HELPER FORMATTERS
   ========================================================================== */

function formatPKR(val: number) {
  return "Rs. " + Number(val).toLocaleString("en-PK");
}

function getStatusBadge(status: PaymentStatusType) {
  switch (status) {
    case "Collected":
      return {
        bg: "bg-[#eee6dc] text-[#6f4b2d] border-[#d5c1a9]/70",
        label: "Collected & Settled",
      };
    case "Pending":
      return {
        bg: "bg-[#D5C1A9]/40 text-[#5d4634] border-[#8B7A6C]/30",
        label: "Pending COD Collection",
      };
    case "Refunded":
      return {
        bg: "bg-[#f1dfdc] text-[#8a3f35] border-red-200",
        label: "Refunded / Returned",
      };
    default:
      return {
        bg: "bg-[#ebe8e4] text-[#6f665f] border-gray-200",
        label: status,
      };
  }
}

function getMethodBadge(method: PaymentMethodType) {
  switch (method) {
    case "Cash on Delivery":
      return "bg-[#080808] text-white";
    case "Credit / Debit Card":
      return "bg-[#A06E31] text-white";
    case "JazzCash":
      return "bg-amber-100 text-amber-900 border border-amber-300";
    case "EasyPaisa":
      return "bg-emerald-100 text-emerald-900 border border-emerald-300";
    case "Bank Transfer":
      return "bg-[#D5C1A9]/50 text-[#5d4634] border border-[#8B7A6C]/30";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

/* ==========================================================================
   PAYMENTS PAGE COMPONENT
   ========================================================================== */

export default function PaymentsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Collected" | "Pending" | "Refunded">("All");
  const [methodFilter, setMethodFilter] = useState<string>("All");
  const [dateRange, setDateRange] = useState<DateRangeValue>({
    startDate: "",
    endDate: "",
    preset: "all",
    label: "All Dates",
  });
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/payments", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!data?.payments) return;
        setPayments(data.payments.map((payment: { id: number; order_id: number; order_number: string; customer_name: string; customer_email: string; customer_phone?: string; shipping_address_snapshot?: { city?: string; line1?: string }; courier?: string; tracking_number?: string; method: string; status: string; amount: number; reconciled_at?: string; created_at: string; items_summary?: string }) => ({
          id: `#PAY-${payment.id}`,
          dbId: payment.id,
          orderId: `#${payment.order_number}`,
          customer: payment.customer_name,
          email: payment.customer_email,
          phone: payment.customer_phone || "",
          city: payment.shipping_address_snapshot?.city || "—",
          address: payment.shipping_address_snapshot?.line1 || "—",
          method: payment.method === "cod" ? "Cash on Delivery" : payment.method as PaymentMethodType,
          amount: Number(payment.amount),
          date: new Date(payment.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          time: new Date(payment.created_at).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" }),
          status: payment.reconciled_at || payment.status === "paid" || payment.status === "authorized" ? "Collected" : payment.status === "refunded" ? "Refunded" : "Pending",
          courier: payment.courier || "Unassigned",
          trackingNumber: payment.tracking_number || undefined,
          itemsSummary: payment.items_summary || "—",
          reconciled: Boolean(payment.reconciled_at),
        })));
      })
      .catch((error) => console.error("Payments load failed:", error))
      .finally(() => setIsLoading(false));
  }, []);

  // Prevent background scrolling and interaction when modal is open
  useEffect(() => {
    if (selectedPayment) {
      const origBody = document.body.style.overflow;
      const origHtml = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = origBody || "";
        document.documentElement.style.overflow = origHtml || "";
      };
    }
  }, [selectedPayment]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Calculations
  const totalRevenue = payments
    .filter((p) => p.status === "Collected")
    .reduce((acc, p) => acc + p.amount, 0);

  const pendingCodAmount = payments
    .filter((p) => p.status === "Pending")
    .reduce((acc, p) => acc + p.amount, 0);

  const refundedAmount = payments
    .filter((p) => p.status === "Refunded")
    .reduce((acc, p) => acc + p.amount, 0);

  const digitalAmount = payments
    .filter((p) => p.status === "Collected" && p.method !== "Cash on Delivery")
    .reduce((acc, p) => acc + p.amount, 0);

  const codTotalCount = payments.filter((p) => p.method === "Cash on Delivery").length;
  const cardTotalCount = payments.filter((p) => p.method === "Credit / Debit Card").length;
  const digitalWalletsCount = payments.filter(
    (p) => p.method === "JazzCash" || p.method === "EasyPaisa" || p.method === "Bank Transfer"
  ).length;

  const codShare = Math.round((codTotalCount / payments.length) * 100);
  const cardShare = Math.round((cardTotalCount / payments.length) * 100);
  const walletShare = Math.round((digitalWalletsCount / payments.length) * 100);

  // Filters
  const filteredPayments = payments.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      p.id.toLowerCase().includes(q) ||
      p.orderId.toLowerCase().includes(q) ||
      p.customer.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.phone.includes(q) ||
      p.itemsSummary.toLowerCase().includes(q);

    const matchesTab = activeTab === "All" || p.status === activeTab;
    const matchesMethod = methodFilter === "All" || p.method === methodFilter;

    let matchesDate = true;
    if (dateRange.startDate || dateRange.endDate) {
      const paymentDate = new Date(p.date);
      if (dateRange.startDate) {
        const start = new Date(dateRange.startDate);
        start.setHours(0, 0, 0, 0);
        if (paymentDate < start) matchesDate = false;
      }
      if (dateRange.endDate) {
        const end = new Date(dateRange.endDate);
        end.setHours(23, 59, 59, 999);
        if (paymentDate > end) matchesDate = false;
      }
    }

    return matchesSearch && matchesTab && matchesMethod && matchesDate;
  });

  // Export CSV functionality
  const handleExportCSV = () => {
    const headers = [
      "Payment ID",
      "Order ID",
      "Customer",
      "Phone",
      "City",
      "Method",
      "Amount (PKR)",
      "Date",
      "Status",
      "Courier/Card",
    ];

    const rows = filteredPayments.map((p) => [
      p.id,
      p.orderId,
      `"${p.customer}"`,
      p.phone,
      p.city,
      `"${p.method}"`,
      p.amount,
      p.date,
      p.status,
      `"${p.courier || p.cardBrand || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `wearwell_payments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Payment statement downloaded successfully.");
  };

  const handleMarkReconciled = async (paymentId: string) => {
    const payment = payments.find((item) => item.id === paymentId);
    if (!payment) return;
    const response = await fetch("/api/admin/payments", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: payment.dbId, reconciled: true }) });
    if (!response.ok) return;
    setPayments((prev) => prev.map((p) => p.id === paymentId ? { ...p, status: "Collected", reconciled: true } : p));
    if (selectedPayment && selectedPayment.id === paymentId) {
      setSelectedPayment((prev) => (prev ? { ...prev, status: "Collected", reconciled: true } : null));
    }
    showToast(`Payment ${paymentId} reconciled and marked as Collected.`);
  };

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-[#080808] px-5 py-3.5 text-sm text-white shadow-xl animate-fade-in border border-white/10">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#A06E31] text-white">
            <CheckIcon />
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      <AdminSidebar currentTab="payments" />

      {/* ==========================================================================
         MAIN CONTENT AREA
         ========================================================================== */}
      <section className={`transition-[margin] duration-300 lg:ml-[var(--admin-sidebar-width)] ${selectedPayment ? "pointer-events-none select-none" : ""}`} aria-hidden={!!selectedPayment}>
        {/* STICKY TOP BAR */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#D5C1A9]/60 bg-[#FAF7F2]/95 px-5 backdrop-blur-md sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#A06E31] font-semibold">
                Admin Portal
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-[#1D1612] sm:text-xl">
                Payments & Settlements
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 rounded-xl bg-[#1D1612] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#A06E31] shadow-sm active:scale-95"
            >
              <DownloadIcon />
              <span>Export Statement</span>
            </button>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-[#1D1612]">Admin</p>
              <p className="text-xs text-[#8B7A6C]">Store Manager</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1D1612] text-sm font-semibold text-[#D5C1A9] border border-[#A06E31]/40 shadow-xs">
              A
            </div>
          </div>
        </header>

        {/* PAGE BODY */}
        <div className="px-5 py-7 sm:px-8 lg:px-10 space-y-7">
            {/* SUBHEADER TITLE */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#A06E31] font-semibold">
                  Revenue & Transaction Management
                </p>
                <h2 className="mt-1.5 text-2xl font-semibold text-[#1D1612]">
                  Payment Overview
                </h2>
                <p className="mt-1 text-sm text-[#8B7A6C]">
                  Track Cash on Delivery (COD) reconciliations, card settlements, and courier handovers in real time.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#8B7A6C]">
                <span>Showing {filteredPayments.length} of {payments.length} transactions</span>
              </div>
            </div>

            {/* ==========================================================================
               KPI STAT CARDS (Warm Luxury Styled)
               ========================================================================== */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Total Collected */}
              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8B7A6C]">
                    Total Collected
                  </p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4EEE7] text-xs font-bold text-[#694F3D]">
                    ₨
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold tracking-tight text-[#1D1612]">
                  {formatPKR(totalRevenue)}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700">
                  <span className="font-semibold">+14.8%</span>
                  <span className="text-[#8B7A6C]">vs last cycle</span>
                </div>
              </div>

              {/* Pending COD Collection */}
              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8B7A6C]">
                    COD In Transit
                  </p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4EEE7] text-xs font-bold text-[#A06E31]">
                    COD
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold tracking-tight text-[#1D1612]">
                  {formatPKR(pendingCodAmount)}
                </p>
                <p className="mt-2 text-xs text-[#8B7A6C]">
                  {payments.filter((p) => p.status === "Pending").length} consignments awaiting delivery
                </p>
              </div>

              {/* Digital & Direct Card Payments */}
              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8B7A6C]">
                    Digital Settlements
                  </p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4EEE7] text-xs font-bold text-[#A06E31]">
                    💳
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold tracking-tight text-[#1D1612]">
                  {formatPKR(digitalAmount)}
                </p>
                <p className="mt-2 text-xs text-[#8B7A6C]">
                  Cards, JazzCash & EasyPaisa
                </p>
              </div>

              {/* Refunds & Returns */}
              <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8B7A6C]">
                    Refunds & Reversals
                  </p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-xs font-bold text-rose-700">
                    ↺
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold tracking-tight text-rose-700">
                  {formatPKR(refundedAmount)}
                </p>
                <p className="mt-2 text-xs text-[#8B7A6C]">
                  1 item returned & refunded
                </p>
              </div>
            </div>

            {/* ==========================================================================
               PAYMENT CHANNELS DISTRIBUTION
               ========================================================================== */}
            <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D5C1A9]/40 pb-4">
                <div>
                  <h3 className="font-semibold text-base text-[#1D1612]">
                    Payment Methods Distribution
                  </h3>
                  <p className="text-xs text-[#8B7A6C] mt-0.5">
                    Breakdown of customer payment preferences across all orders
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#694F3D] bg-[#F4EEE7] px-3 py-1 rounded-full border border-[#D5C1A9]/50">
                  Total Volume: {formatPKR(totalRevenue + pendingCodAmount)}
                </span>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {/* Cash on Delivery */}
                <div className="rounded-xl border border-[#D5C1A9]/50 bg-[#FAF7F2]/60 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#1D1612]">Cash on Delivery (COD)</p>
                      <p className="text-xs text-[#8B7A6C] mt-0.5">Courier Doorstep Collection</p>
                    </div>
                    <span className="rounded-md bg-[#1D1612] px-2.5 py-1 text-[11px] font-bold text-[#D5C1A9]">
                      {codShare}%
                    </span>
                  </div>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#D5C1A9]/40">
                    <div
                      className="h-full rounded-full bg-[#1D1612] transition-all duration-500"
                      style={{ width: `${codShare}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-[#8B7A6C]">
                    {codTotalCount} transactions · TCS & Leopards
                  </p>
                </div>

                {/* Credit / Debit Card */}
                <div className="rounded-xl border border-[#D5C1A9]/50 bg-[#FAF7F2]/60 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#1D1612]">Credit / Debit Cards</p>
                      <p className="text-xs text-[#8B7A6C] mt-0.5">Visa & Mastercard</p>
                    </div>
                    <span className="rounded-md bg-[#1D1612] px-2.5 py-1 text-[11px] font-bold text-[#D5C1A9]">
                      {cardShare}%
                    </span>
                  </div>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#D5C1A9]/40">
                    <div
                      className="h-full rounded-full bg-[#A06E31] transition-all duration-500"
                      style={{ width: `${cardShare}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-[#8B7A6C]">
                    {cardTotalCount} transactions · Instant 3D Secure
                  </p>
                </div>

                {/* Digital Wallets & Bank */}
                <div className="rounded-xl border border-[#D5C1A9]/50 bg-[#FAF7F2]/60 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#1D1612]">Mobile Wallets & Bank</p>
                      <p className="text-xs text-[#8B7A6C] mt-0.5">JazzCash, EasyPaisa, IBFT</p>
                    </div>
                    <span className="rounded-md bg-[#1D1612] px-2.5 py-1 text-[11px] font-bold text-[#D5C1A9]">
                      {walletShare}%
                    </span>
                  </div>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#D5C1A9]/40">
                    <div
                      className="h-full rounded-full bg-[#8B7A6C] transition-all duration-500"
                      style={{ width: `${walletShare}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-[#8B7A6C]">
                    {digitalWalletsCount} transactions · Direct Settlement
                  </p>
                </div>
              </div>
            </div>

            {/* ==========================================================================
               TRANSACTIONS SECTION: FILTERS & TABLE
               ========================================================================== */}
            <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white shadow-xs overflow-hidden">
              {/* STATUS FILTER TABS */}
              <div className="border-b border-[#D5C1A9]/60 px-6 pt-5">
                <div className="flex flex-wrap items-center gap-2 pb-4">
                  {([
                    { key: "All", label: "All Transactions", count: payments.length },
                    {
                      key: "Collected",
                      label: "Collected & Settled",
                      count: payments.filter((p) => p.status === "Collected").length,
                    },
                    {
                      key: "Pending",
                      label: "Pending COD",
                      count: payments.filter((p) => p.status === "Pending").length,
                    },
                    {
                      key: "Refunded",
                      label: "Refunds",
                      count: payments.filter((p) => p.status === "Refunded").length,
                    },
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
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] ${
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
              </div>

              {/* SEARCH, METHOD & DATE CONTROLS */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-5 border-b border-[#D5C1A9]/60 bg-[#FAF7F2]/40">
                <div className="relative flex-1 max-w-md">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7A6C]">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by Payment ID, Order #, Customer, City..."
                    className="w-full rounded-xl border border-[#D5C1A9]/80 bg-[#FAF7F2] py-2.5 pl-10 pr-4 text-xs text-[#1D1612] outline-none placeholder:text-[#8B7A6C] focus:border-[#A06E31]"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8B7A6C] hover:text-[#1D1612]"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <AdminDropdown
                    value={methodFilter}
                    onChange={setMethodFilter}
                    options={[
                      { value: "All", label: "All Methods" },
                      { value: "Cash on Delivery", label: "Cash on Delivery" },
                      { value: "Credit / Debit Card", label: "Credit / Debit Card" },
                      { value: "JazzCash", label: "JazzCash" },
                      { value: "EasyPaisa", label: "EasyPaisa" },
                      { value: "Bank Transfer", label: "Bank Transfer" },
                    ]}
                    className="w-full sm:w-48"
                  />

                  <AdminDateRangeFilter
                    value={dateRange}
                    onChange={setDateRange}
                  />

                  {(methodFilter !== "All" || dateRange.preset !== "all" || search) && (
                    <button
                      onClick={() => {
                        setSearch("");
                        setMethodFilter("All");
                        setDateRange({
                          startDate: "",
                          endDate: "",
                          preset: "all",
                          label: "All Dates",
                        });
                      }}
                      className="rounded-xl border border-[#D5C1A9]/80 bg-white px-3 py-2 text-xs font-semibold text-[#694F3D] hover:bg-[#FAF7F2] transition"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#D5C1A9]/60 bg-[#FAF7F2] text-[10px] font-bold uppercase tracking-wider text-[#8B7A6C] whitespace-nowrap">
                      <th className="px-6 py-4">Transaction / Order</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Method & Channel</th>
                      <th className="px-6 py-4">Date & Time</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#D5C1A9]/40 text-xs">
                    {isLoading ? <AdminTableSkeletonRows columns={7} /> : filteredPayments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-[#8B7A6C]">
                          <p className="text-base font-semibold text-[#1D1612]">No transactions found</p>
                          <p className="mt-1 text-xs">Try adjusting your search query or status filter.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredPayments.map((payment) => {
                        const badge = getStatusBadge(payment.status);
                        return (
                          <tr
                            key={payment.id}
                            onClick={() => setSelectedPayment(payment)}
                            className="cursor-pointer transition hover:bg-[#FAF7F2]/80 group"
                          >
                            {/* Transaction ID & Order */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <p className="font-bold text-[#1D1612] group-hover:text-[#A06E31] transition">
                                {payment.id}
                              </p>
                              <p className="mt-0.5 text-[11px] text-[#8B7A6C]">
                                Order {payment.orderId}
                              </p>
                            </td>

                            {/* Customer */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <p className="font-semibold text-[#1D1612]">{payment.customer}</p>
                              <p className="text-[11px] text-[#8B7A6C]">
                                {payment.city} · {payment.phone}
                              </p>
                            </td>

                            {/* Method */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center whitespace-nowrap rounded-md px-2.5 py-1 text-[10px] font-semibold tracking-wide shadow-2xs ${getMethodBadge(
                                  payment.method
                                )}`}
                              >
                                {payment.method}
                              </span>
                              {payment.courier && (
                                <p className="mt-1 text-[10px] text-[#8B7A6C] whitespace-nowrap">
                                  Via {payment.courier}
                                </p>
                              )}
                              {payment.cardBrand && (
                                <p className="mt-1 text-[10px] text-[#8B7A6C] whitespace-nowrap">
                                  {payment.cardBrand} •••• {payment.cardLast4}
                                </p>
                              )}
                            </td>

                            {/* Date */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <p className="font-medium text-[#1D1612]">{payment.date}</p>
                              <p className="text-[11px] text-[#8B7A6C]">{payment.time}</p>
                            </td>

                            {/* Amount */}
                            <td className="px-6 py-4 font-bold text-[#1D1612] text-sm whitespace-nowrap">
                              {formatPKR(payment.amount)}
                            </td>

                            {/* Status */}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold whitespace-nowrap ${badge.bg}`}
                              >
                                {badge.label}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 text-right whitespace-nowrap">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPayment(payment);
                                }}
                                className="rounded-lg border border-[#D5C1A9] bg-white px-3 py-1.5 text-xs font-semibold text-[#1D1612] transition hover:bg-[#1D1612] hover:text-white"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* TABLE FOOTER */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#D5C1A9]/60 bg-[#FAF7F2]/50 px-6 py-4 text-xs text-[#8B7A6C]">
                <span>
                  Showing <strong className="text-[#1D1612]">{filteredPayments.length}</strong> records
                </span>
                <span className="text-[11px]">
                  Payment settlement ledger is synchronized with Pakistani banking hours (Mon-Fri).
                </span>
              </div>
            </div>
          </div>
        </section>

      {/* ==========================================================================
         TRANSACTION DETAILS / RECEIPT MODAL
         ========================================================================== */}
      {/* TRANSACTION DETAILS / RECEIPT MODAL */}
      {selectedPayment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]/70 p-3 sm:p-5 backdrop-blur-md overscroll-contain overflow-y-auto animate-fade-in"
          onClick={() => setSelectedPayment(null)}
        >
          <div
            className="w-full max-w-xl max-h-[92vh] overflow-y-auto custom-scrollbar-thin rounded-2xl bg-white shadow-2xl border border-[#D5C1A9]/60 transition-all flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-[#D5C1A9]/60 px-6 py-4 sticky top-0 bg-white z-20 shadow-xs">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A06E31]">
                  Official Settlement Voucher
                </p>
                <div className="flex items-center gap-2.5 mt-1">
                  <h3 className="text-xl font-bold tracking-tight text-[#080808]">
                    {selectedPayment.id}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                      getStatusBadge(selectedPayment.status).bg
                    }`}
                  >
                    {getStatusBadge(selectedPayment.status).label}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedPayment(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF7F2] text-[#8B7A6C] border border-[#D5C1A9]/40 transition hover:bg-[#D5C1A9]/50 hover:text-[#080808]"
                title="Close modal"
              >
                <CloseIcon />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 space-y-5">
              {/* Voucher Information Grid */}
              <div className="rounded-xl border border-[#D5C1A9]/60 bg-[#FAF7F2]/80 p-4 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#8B7A6C]">Order Reference:</span>
                  <span className="font-bold text-[#1D1612]">{selectedPayment.orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8B7A6C]">Transaction Date:</span>
                  <span className="font-medium text-[#1D1612]">
                    {selectedPayment.date} at {selectedPayment.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8B7A6C]">Payment Method:</span>
                  <span className="font-semibold text-[#1D1612]">{selectedPayment.method}</span>
                </div>
                {selectedPayment.courier && (
                  <div className="flex justify-between items-center">
                    <span className="text-[#8B7A6C]">Courier Logistics:</span>
                    <span className="font-semibold text-[#1D1612]">
                      {selectedPayment.courier} ({selectedPayment.trackingNumber})
                    </span>
                  </div>
                )}
                {selectedPayment.cardBrand && (
                  <div className="flex justify-between items-center">
                    <span className="text-[#8B7A6C]">Card Details:</span>
                    <span className="font-semibold text-[#1D1612]">
                      {selectedPayment.cardBrand} •••• {selectedPayment.cardLast4}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center border-t border-[#D5C1A9]/40 pt-2.5">
                  <span className="text-[#8B7A6C]">Settlement Status:</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      getStatusBadge(selectedPayment.status).bg
                    }`}
                  >
                    {getStatusBadge(selectedPayment.status).label}
                  </span>
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-1.5 text-xs">
                <p className="font-bold uppercase tracking-wider text-[11px] text-[#A06E31]">
                  Customer & Shipping
                </p>
                <div className="rounded-xl border border-[#D5C1A9]/60 bg-white p-3 space-y-1 text-[#1D1612]">
                  <p className="font-semibold text-sm">{selectedPayment.customer}</p>
                  <p className="text-[#8B7A6C]">{selectedPayment.email} · {selectedPayment.phone}</p>
                  <p className="text-[#8B7A6C]">{selectedPayment.address}, {selectedPayment.city}</p>
                </div>
              </div>

              {/* Purchased Items Note */}
              <div className="space-y-1.5 text-xs">
                <p className="font-bold uppercase tracking-wider text-[11px] text-[#A06E31]">
                  Order Items Summary
                </p>
                <div className="rounded-xl border border-[#D5C1A9]/60 bg-white p-3 text-[#1D1612] flex items-center justify-between">
                  <span>{selectedPayment.itemsSummary}</span>
                  <span className="font-bold">{formatPKR(selectedPayment.amount)}</span>
                </div>
              </div>

              {/* Total Highlight */}
              <div className="flex items-center justify-between rounded-xl bg-[#1D1612] px-5 py-4 text-white shadow-xs">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#D5C1A9]">Net Settled Amount</p>
                  <p className="text-[10px] text-[#D5C1A9]/60">Includes all applicable duties & delivery</p>
                </div>
                <p className="text-2xl font-bold tracking-tight text-[#D5C1A9]">
                  {formatPKR(selectedPayment.amount)}
                </p>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="px-6 py-4 bg-white border-t border-[#D5C1A9]/60 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-20 shadow-xs">
              {selectedPayment.status === "Pending" ? (
                <button
                  onClick={() => handleMarkReconciled(selectedPayment.id)}
                  className="rounded-lg bg-[#A06E31] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#855822]"
                >
                  Mark as Collected & Settled
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="rounded-lg border border-[#D5C1A9] bg-white px-3.5 py-2 text-xs font-semibold text-[#080808] transition hover:bg-[#FAF7F2]"
                >
                  Print Receipt
                </button>
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="rounded-lg bg-[#080808] px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#A06E31]"
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
