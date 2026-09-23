"use client";

import Link from "next/link";

type Payment = {
  id: string;
  customer: string;
  method: "Cash on Delivery" | "Card" | "Bank Transfer";
  amount: string;
  date: string;
  status: "Paid" | "Pending" | "Failed";
};

const payments: Payment[] = [
  {
    id: "#PAY-001",
    customer: "Ayesha Khan",
    method: "Cash on Delivery",
    amount: "Rs. 8,499",
    date: "18 Sep 2026",
    status: "Paid",
  },
  {
    id: "#PAY-002",
    customer: "Sara Ahmed",
    method: "Card",
    amount: "Rs. 12,800",
    date: "17 Sep 2026",
    status: "Paid",
  },
  {
    id: "#PAY-003",
    customer: "Hina Malik",
    method: "Bank Transfer",
    amount: "Rs. 6,450",
    date: "17 Sep 2026",
    status: "Pending",
  },
  {
    id: "#PAY-004",
    customer: "Maham Ali",
    method: "Card",
    amount: "Rs. 14,700",
    date: "16 Sep 2026",
    status: "Paid",
  },
  {
    id: "#PAY-005",
    customer: "Zainab Noor",
    method: "Cash on Delivery",
    amount: "Rs. 9,900",
    date: "15 Sep 2026",
    status: "Paid",
  },
  {
    id: "#PAY-006",
    customer: "Fatima Raza",
    method: "Card",
    amount: "Rs. 8,999",
    date: "14 Sep 2026",
    status: "Failed",
  },
];

export default function PaymentsPage() {
  const paidPayments = payments.filter(
    (payment) => payment.status === "Paid"
  ).length;

  const pendingPayments = payments.filter(
    (payment) => payment.status === "Pending"
  ).length;

  const failedPayments = payments.filter(
    (payment) => payment.status === "Failed"
  ).length;

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-64 shrink-0 flex-col bg-[#080808] text-white lg:flex">

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

          <nav className="flex-1 px-4 py-6">

            {/* Dashboard */}
            <Link
              href="/admin"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span>▦</span>
              Dashboard
            </Link>

            {/* Orders */}
            <Link
              href="/admin/orders"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span>▤</span>
              Orders
            </Link>

            {/* Products */}
            <Link
              href="/admin/products"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span>□</span>
              Products
            </Link>

            {/* Inventory */}
            <Link
              href="/admin/inventory"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span>◫</span>
              Inventory
            </Link>

            {/* Customers */}
            <Link
              href="/admin/customers"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span>♙</span>
              Customers
            </Link>

            {/* Payments - ACTIVE */}
            <Link
              href="/admin/payments"
              className="mb-2 flex items-center gap-3 rounded-lg bg-[#A06E31] px-4 py-3 text-sm font-semibold text-white shadow-sm"
            >
              <span>◈</span>
              Payments
            </Link>

            {/* Settings */}
            <Link
              href="/admin/settings"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <span>⚙</span>
              Settings
            </Link>

          </nav>

          <div className="border-t border-white/10 p-5">
            <p className="text-xs text-[#8B7A6C]">
              Signed in as
            </p>

            <p className="mt-1 text-sm font-medium">
              Khizra Malik
            </p>
          </div>

        </aside>

        {/* MAIN */}
        <section className="min-w-0 flex-1">

          {/* HEADER */}
          <header className="flex h-20 items-center justify-between border-b border-[#D5C1A9]/50 bg-white px-6 lg:px-8">

            <div>
              <p className="text-xs text-[#8B7A6C]">
                Admin / Payments
              </p>

              <h1 className="mt-1 text-xl font-semibold">
                Payments
              </h1>
            </div>

            <button className="rounded-lg bg-[#080808] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#A06E31]">
              Export Payments
            </button>

          </header>

          {/* CONTENT */}
          <div className="p-5 sm:p-7 lg:p-8">

            {/* INTRO */}
            <div className="mb-7">

              <p className="text-xs uppercase tracking-[0.2em] text-[#A06E31]">
                Payment management
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Payment Overview
              </h2>

              <p className="mt-1 text-sm text-[#8B7A6C]">
                Monitor transactions, payment methods and payment status.
              </p>

            </div>

            {/* STATS */}
            <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* Total Revenue */}
              <div className="rounded-xl border border-[#D5C1A9]/60 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">

                <div className="flex items-center justify-between">

                  <p className="text-xs text-[#8B7A6C]">
                    Total Revenue
                  </p>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D5C1A9]/40 text-[#A06E31]">
                    ₨
                  </span>

                </div>

                <p className="mt-3 text-2xl font-semibold">
                  Rs. 61,348
                </p>

                <p className="mt-1 text-xs text-[#A06E31]">
                  From completed payments
                </p>

              </div>

              {/* Paid */}
              <div className="rounded-xl border border-[#D5C1A9]/60 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">

                <div className="flex items-center justify-between">

                  <p className="text-xs text-[#8B7A6C]">
                    Paid
                  </p>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D5C1A9]/40 text-[#A06E31]">
                    ✓
                  </span>

                </div>

                <p className="mt-3 text-2xl font-semibold">
                  {paidPayments}
                </p>

                <p className="mt-1 text-xs text-[#8B7A6C]">
                  Successful transactions
                </p>

              </div>

              {/* Pending */}
              <div className="rounded-xl border border-[#D5C1A9]/60 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">

                <div className="flex items-center justify-between">

                  <p className="text-xs text-[#8B7A6C]">
                    Pending
                  </p>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D5C1A9]/40 text-[#A06E31]">
                    !
                  </span>

                </div>

                <p className="mt-3 text-2xl font-semibold text-[#A06E31]">
                  {pendingPayments}
                </p>

                <p className="mt-1 text-xs text-[#8B7A6C]">
                  Awaiting confirmation
                </p>

              </div>

              {/* Failed */}
              <div className="rounded-xl border border-[#D5C1A9]/60 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">

                <div className="flex items-center justify-between">

                  <p className="text-xs text-[#8B7A6C]">
                    Failed
                  </p>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-[#080808]">
                    ×
                  </span>

                </div>

                <p className="mt-3 text-2xl font-semibold">
                  {failedPayments}
                </p>

                <p className="mt-1 text-xs text-[#8B7A6C]">
                  Unsuccessful transactions
                </p>

              </div>

            </div>

            {/* PAYMENT METHODS */}
            <div className="mb-6 rounded-xl border border-[#D5C1A9]/60 bg-white p-5">

              <div className="mb-5">

                <h3 className="font-semibold">
                  Payment Methods
                </h3>

                <p className="mt-1 text-xs text-[#8B7A6C]">
                  Payment methods used by customers
                </p>

              </div>

              <div className="space-y-5">

                {/* Cash */}
                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D5C1A9]/40 text-sm text-[#A06E31]">
                        ₨
                      </span>

                      <span className="text-sm font-medium">
                        Cash on Delivery
                      </span>

                    </div>

                    <span className="text-xs text-[#8B7A6C]">
                      45%
                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#F8F6F2]">
                    <div
                      className="h-full rounded-full bg-[#A06E31]"
                      style={{ width: "45%" }}
                    />
                  </div>

                </div>

                {/* Card */}
                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D5C1A9]/40 text-sm text-[#A06E31]">
                        ◈
                      </span>

                      <span className="text-sm font-medium">
                        Card
                      </span>

                    </div>

                    <span className="text-xs text-[#8B7A6C]">
                      35%
                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#F8F6F2]">
                    <div
                      className="h-full rounded-full bg-[#080808]"
                      style={{ width: "35%" }}
                    />
                  </div>

                </div>

                {/* Bank Transfer */}
                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D5C1A9]/40 text-sm text-[#A06E31]">
                        ⇄
                      </span>

                      <span className="text-sm font-medium">
                        Bank Transfer
                      </span>

                    </div>

                    <span className="text-xs text-[#8B7A6C]">
                      20%
                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#F8F6F2]">
                    <div
                      className="h-full rounded-full bg-[#D5C1A9]"
                      style={{ width: "20%" }}
                    />
                  </div>

                </div>

              </div>

            </div>

            {/* TRANSACTIONS */}
            <div className="overflow-hidden rounded-xl border border-[#D5C1A9]/60 bg-white shadow-sm">

              <div className="border-b border-[#D5C1A9]/50 px-5 py-5">

                <h3 className="font-semibold">
                  Recent Transactions
                </h3>

                <p className="mt-1 text-xs text-[#8B7A6C]">
                  Latest customer payment activity
                </p>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[850px] text-left">

                  <thead className="border-b border-[#D5C1A9]/50 bg-[#F8F6F2]">

                    <tr>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-[#8B7A6C]">
                        Payment ID
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-[#8B7A6C]">
                        Customer
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-[#8B7A6C]">
                        Method
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-[#8B7A6C]">
                        Amount
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-[#8B7A6C]">
                        Date
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-[#8B7A6C]">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-[#D5C1A9]/30">

                    {payments.map((payment) => (

                      <tr
                        key={payment.id}
                        className="transition hover:bg-[#F8F6F2]"
                      >

                        <td className="px-5 py-5 text-xs font-semibold">
                          {payment.id}
                        </td>

                        <td className="px-5 py-5">

                          <p className="text-sm font-semibold">
                            {payment.customer}
                          </p>

                          <p className="mt-1 text-xs text-[#8B7A6C]">
                            WEARWELL Customer
                          </p>

                        </td>

                        <td className="px-5 py-5 text-sm text-[#8B7A6C]">
                          {payment.method}
                        </td>

                        <td className="px-5 py-5 text-sm font-semibold">
                          {payment.amount}
                        </td>

                        <td className="px-5 py-5 text-sm text-[#8B7A6C]">
                          {payment.date}
                        </td>

                        <td className="px-5 py-5">

                          <span
                            className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                              payment.status === "Paid"
                                ? "bg-[#F8F6F2] text-[#080808]"
                                : payment.status === "Pending"
                                ? "bg-[#D5C1A9]/50 text-[#A06E31]"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {payment.status}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}