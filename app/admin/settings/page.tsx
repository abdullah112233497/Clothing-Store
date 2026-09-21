"use client";

import Link from "next/link";

type Payment = {
  id: string;
  customer: string;
  method: string;
  amount: string;
  date: string;
  status: "Paid" | "Pending" | "Refunded";
};

const payments: Payment[] = [
  {
    id: "#PAY-1024",
    customer: "Ayesha Khan",
    method: "Cash on Delivery",
    amount: "Rs. 8,499",
    date: "18 Sep 2026",
    status: "Paid",
  },
  {
    id: "#PAY-1023",
    customer: "Sara Ahmed",
    method: "Credit Card",
    amount: "Rs. 12,999",
    date: "18 Sep 2026",
    status: "Paid",
  },
  {
    id: "#PAY-1022",
    customer: "Hina Malik",
    method: "JazzCash",
    amount: "Rs. 5,499",
    date: "17 Sep 2026",
    status: "Pending",
  },
  {
    id: "#PAY-1021",
    customer: "Maham Ali",
    method: "Cash on Delivery",
    amount: "Rs. 7,999",
    date: "17 Sep 2026",
    status: "Paid",
  },
  {
    id: "#PAY-1020",
    customer: "Zainab Noor",
    method: "Credit Card",
    amount: "Rs. 15,499",
    date: "16 Sep 2026",
    status: "Refunded",
  },
  {
    id: "#PAY-1019",
    customer: "Fatima Raza",
    method: "EasyPaisa",
    amount: "Rs. 4,999",
    date: "16 Sep 2026",
    status: "Paid",
  },
];

export default function PaymentsPage() {
  return (
    <main className="min-h-screen bg-[#f5f6f8] text-[#111827]">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-64 shrink-0 flex-col bg-[#07111d] text-white lg:flex">

          <div className="border-b border-white/10 px-6 py-7">
            <Link
              href="/admin"
              className="text-xl font-black tracking-[0.2em]"
            >
              WEARWELL
            </Link>

            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-gray-400">
              Admin Panel
            </p>
          </div>

          <nav className="flex-1 px-4 py-6">

            <Link
              href="/admin"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ▦ Dashboard
            </Link>

            <Link
              href="/admin/orders"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ▤ Orders
            </Link>

            <Link
              href="/admin/products"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              □ Products
            </Link>

            <Link
              href="/admin/inventory"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ◫ Inventory
            </Link>

            <Link
              href="/admin/customers"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ♙ Customers
            </Link>

            <Link
              href="/admin/payments"
              className="mb-2 flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-medium text-white"
            >
              ◈ Payments
            </Link>

            <Link
              href="/admin/settings"
              className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ⚙ Settings
            </Link>

          </nav>

          <div className="border-t border-white/10 p-5">
            <p className="text-xs text-gray-400">Signed in as</p>
            <p className="mt-1 text-sm font-medium">Khizra Malik</p>
          </div>

        </aside>

        {/* MAIN */}
        <section className="min-w-0 flex-1">

          {/* HEADER */}
          <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6 lg:px-8">

            <div>
              <p className="text-xs text-gray-400">
                Admin / Payments
              </p>

              <h1 className="mt-1 text-xl font-semibold">
                Payments
              </h1>
            </div>

            <button className="rounded-lg bg-[#07111d] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-black">
              Export Payments
            </button>

          </header>

          {/* CONTENT */}
          <div className="p-5 sm:p-7 lg:p-8">

            {/* INTRO */}
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Financial management
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Payment Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Monitor transactions, payment methods and refunds.
              </p>
            </div>

            {/* STATS */}
            <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs text-gray-400">
                  Total Revenue
                </p>

                <p className="mt-2 text-2xl font-semibold">
                  Rs. 1.84M
                </p>

                <p className="mt-1 text-xs text-emerald-600">
                  +14.8% this month
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs text-gray-400">
                  Successful
                </p>

                <p className="mt-2 text-2xl font-semibold text-emerald-600">
                  236
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Completed payments
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs text-gray-400">
                  Pending
                </p>

                <p className="mt-2 text-2xl font-semibold text-amber-600">
                  8
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Awaiting confirmation
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="text-xs text-gray-400">
                  Refunds
                </p>

                <p className="mt-2 text-2xl font-semibold text-red-600">
                  Rs. 24,500
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  This month
                </p>
              </div>

            </div>

            {/* PAYMENT METHODS */}
            <div className="mb-7 grid gap-4 md:grid-cols-3">

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    Cash on Delivery
                  </p>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-medium">
                    COD
                  </span>
                </div>

                <p className="mt-5 text-2xl font-semibold">
                  42%
                </p>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-[42%] rounded-full bg-[#07111d]" />
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    Credit Card
                  </p>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-medium">
                    CARD
                  </span>
                </div>

                <p className="mt-5 text-2xl font-semibold">
                  35%
                </p>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-[35%] rounded-full bg-[#07111d]" />
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    Wallet Payments
                  </p>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-medium">
                    WALLET
                  </span>
                </div>

                <p className="mt-5 text-2xl font-semibold">
                  23%
                </p>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-[23%] rounded-full bg-[#07111d]" />
                </div>
              </div>

            </div>

            {/* TRANSACTIONS */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

              <div className="border-b border-gray-200 px-5 py-5">
                <h3 className="font-semibold">
                  Recent Transactions
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  Latest payment activity
                </p>
              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[850px] text-left">

                  <thead className="border-b border-gray-200 bg-gray-50">

                    <tr>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Transaction
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Customer
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Method
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Amount
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Date
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-wider text-gray-400">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-gray-100">

                    {payments.map((payment) => (

                      <tr
                        key={payment.id}
                        className="transition hover:bg-gray-50"
                      >

                        <td className="px-5 py-5 text-sm font-semibold">
                          {payment.id}
                        </td>

                        <td className="px-5 py-5">

                          <p className="text-sm font-medium">
                            {payment.customer}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            WEARWELL customer
                          </p>

                        </td>

                        <td className="px-5 py-5 text-sm text-gray-600">
                          {payment.method}
                        </td>

                        <td className="px-5 py-5 text-sm font-semibold">
                          {payment.amount}
                        </td>

                        <td className="px-5 py-5 text-sm text-gray-500">
                          {payment.date}
                        </td>

                        <td className="px-5 py-5">

                          <span
                            className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                              payment.status === "Paid"
                                ? "bg-emerald-50 text-emerald-700"
                                : payment.status === "Pending"
                                ? "bg-amber-50 text-amber-700"
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