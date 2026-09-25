"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminDropdown from "@/components/AdminDropdown";
import AdminTableSkeletonRows from "@/components/AdminTableSkeletonRows";

type InventoryItem = {
  variantId?: number;
  lowStockThreshold?: number;
  name: string;
  category: string;
  sku: string;
  stock: number;
  sold: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
};

const initialInventory: InventoryItem[] = [
  {
    name: "Essential Oversized Tee",
    category: "Women",
    sku: "WW-TEE-01",
    stock: 24,
    sold: 42,
    status: "In Stock",
  },
  {
    name: "Classic Casual Shirt",
    category: "Men",
    sku: "WW-SHT-02",
    stock: 18,
    sold: 28,
    status: "In Stock",
  },
  {
    name: "Minimal Shoulder Bag",
    category: "Accessories",
    sku: "WW-BAG-03",
    stock: 7,
    sold: 35,
    status: "Low Stock",
  },
  {
    name: "Relaxed Fit Trousers",
    category: "Women",
    sku: "WW-TRS-04",
    stock: 15,
    sold: 21,
    status: "In Stock",
  },
  {
    name: "Urban Denim Jacket",
    category: "Men",
    sku: "WW-JCK-05",
    stock: 3,
    sold: 19,
    status: "Low Stock",
  },
  {
    name: "Everyday Sneakers",
    category: "Accessories",
    sku: "WW-SNK-06",
    stock: 0,
    sold: 47,
    status: "Out of Stock",
  },
  {
    name: "Premium Basic Hoodie",
    category: "Women",
    sku: "WW-HOD-07",
    stock: 21,
    sold: 33,
    status: "In Stock",
  },
  {
    name: "Tactical Cargo Pants",
    category: "Men",
    sku: "WW-PNT-08",
    stock: 11,
    sold: 26,
    status: "In Stock",
  },
];

/* Minimalist Stroke SVG Icons */
function StockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function AlertTriangleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
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

export default function InventoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetch("/api/admin/inventory", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!data?.inventory) return;
        setInventoryList(data.inventory.map((item: { variant_id: number; name: string; category: string; sku: string; stock_quantity: number; sold: number; low_stock_threshold: number }) => ({
          variantId: item.variant_id,
          name: item.name,
          category: item.category,
          sku: item.sku,
          stock: Number(item.stock_quantity),
          sold: Number(item.sold),
          lowStockThreshold: Number(item.low_stock_threshold),
          status: Number(item.stock_quantity) === 0 ? "Out of Stock" : Number(item.stock_quantity) <= Number(item.low_stock_threshold) ? "Low Stock" : "In Stock",
        })));
      })
      .catch((error) => console.error("Inventory load failed:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const editStock = async (item: InventoryItem) => {
    if (!item.variantId) return;
    const value = window.prompt(`Set available stock for ${item.name} (${item.sku})`, String(item.stock));
    if (value === null) return;
    const stock = Number(value);
    if (!Number.isInteger(stock) || stock < 0) { alert("Enter a non-negative whole number."); return; }
    const response = await fetch("/api/admin/inventory", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ variantId: item.variantId, stockQuantity: stock, reason: "admin_adjustment" }) });
    if (!response.ok) { const data = await response.json(); alert(data.error || "Unable to update stock."); return; }
    setInventoryList((current) => current.map((row) => row.variantId === item.variantId ? { ...row, stock, status: stock === 0 ? "Out of Stock" : stock <= (row.lowStockThreshold || 5) ? "Low Stock" : "In Stock" } : row));
  };

  const totalStock = inventoryList.reduce((sum, item) => sum + item.stock, 0);
  const totalSold = inventoryList.reduce((sum, item) => sum + item.sold, 0);
  const lowStockCount = inventoryList.filter((item) => item.status === "Low Stock").length;
  const outOfStockCount = inventoryList.filter((item) => item.status === "Out of Stock").length;

  const filteredItems = inventoryList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
      {/* UNIFIED SIDEBAR */}
      <AdminSidebar currentTab="inventory" />

      {/* MAIN BODY */}
      <section className="transition-[margin] duration-300 lg:ml-[var(--admin-sidebar-width)]">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#D5C1A9]/60 bg-[#FAF7F2]/95 px-5 backdrop-blur-md sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#A06E31] font-semibold">
                Admin Portal
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-[#1D1612] sm:text-xl">
                Inventory & Stock
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/products"
              className="rounded-xl bg-[#1D1612] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#A06E31] shadow-xs"
            >
              Manage Products
            </Link>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-[#1D1612]">Admin</p>
              <p className="text-xs text-[#8B7A6C]">Store Manager</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1D1612] text-sm font-semibold text-[#D5C1A9] border border-[#A06E31]/40 shadow-xs">
              A
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="px-5 py-7 sm:px-8 lg:px-10">

          {/* PAGE HEADER */}
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#A06E31] font-semibold">
                Stock Management
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#1D1612]">
                Inventory Overview
              </h2>
              <p className="mt-1 text-sm text-[#8B7A6C]">
                Monitor available units, restock warnings, and sales velocity across all apparel.
              </p>
            </div>
            <p className="text-sm font-medium text-[#8B7A6C]">
              {filteredItems.length} items listed
            </p>
          </div>

          {/* STATS CARDS */}
          <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wider text-[#8B7A6C] font-semibold">Total In Stock</p>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF7F2] text-[#A06E31] border border-[#D5C1A9]/50">
                  <StockIcon />
                </div>
              </div>
              <p className="mt-4 text-2xl font-bold text-[#1D1612]">{isLoading ? <span className="admin-loading-value">000</span> : totalStock} <span className="text-xs font-normal text-[#8B7A6C]">units</span></p>
              <p className="mt-1 text-xs text-emerald-700 font-medium">Ready to dispatch</p>
            </div>

            <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wider text-[#8B7A6C] font-semibold">Total Sold</p>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF7F2] text-emerald-700 border border-[#D5C1A9]/50">
                  <TrendingUpIcon />
                </div>
              </div>
              <p className="mt-4 text-2xl font-bold text-[#1D1612]">{isLoading ? <span className="admin-loading-value">000</span> : totalSold} <span className="text-xs font-normal text-[#8B7A6C]">units</span></p>
              <p className="mt-1 text-xs text-[#8B7A6C]">Customer orders shipped</p>
            </div>

            <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wider text-[#8B7A6C] font-semibold">Low Stock Alert</p>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4EEE7] text-[#A06E31] border border-[#D5C1A9]/50">
                  <AlertTriangleIcon />
                </div>
              </div>
              <p className="mt-4 text-2xl font-bold text-[#A06E31]">{isLoading ? <span className="admin-loading-value">000</span> : lowStockCount} <span className="text-xs font-normal text-[#8B7A6C]">items</span></p>
              <p className="mt-1 text-xs text-[#A06E31] font-medium">Reorder recommended</p>
            </div>

            <div className="rounded-2xl border border-[#D5C1A9]/60 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wider text-[#8B7A6C] font-semibold">Out of Stock</p>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                  <AlertTriangleIcon />
                </div>
              </div>
              <p className="mt-4 text-2xl font-bold text-rose-600">{isLoading ? <span className="admin-loading-value">000</span> : outOfStockCount} <span className="text-xs font-normal text-[#8B7A6C]">items</span></p>
              <p className="mt-1 text-xs text-rose-500 font-medium">Disabled on storefront</p>
            </div>
          </div>

          {/* SEARCH & FILTER BAR */}
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[#D5C1A9]/60 bg-white p-4 shadow-xs md:flex-row">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7A6C]">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search inventory by item title or SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-[#D5C1A9]/80 bg-[#FAF7F2] px-4 py-2.5 pl-10 text-sm text-[#1D1612] outline-none transition placeholder:text-[#8B7A6C] focus:border-[#A06E31] focus:bg-white"
              />
            </div>

            <AdminDropdown
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: "All", label: "All Statuses" },
                { value: "In Stock", label: "In Stock" },
                { value: "Low Stock", label: "Low Stock" },
                { value: "Out of Stock", label: "Out of Stock" },
              ]}
              className="w-full md:w-48"
            />
          </div>

          {/* INVENTORY TABLE */}
          <div className="overflow-hidden rounded-2xl border border-[#D5C1A9]/60 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#1D1612]">
                <thead className="border-b border-[#D5C1A9]/60 bg-[#FAF7F2] text-xs uppercase tracking-wider text-[#8B7A6C]">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Product Item</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">SKU</th>
                    <th className="px-6 py-4 font-semibold">Available Units</th>
                    <th className="px-6 py-4 font-semibold">Total Sold</th>
                    <th className="px-6 py-4 font-semibold">Stock Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#D5C1A9]/30">
                  {isLoading ? <AdminTableSkeletonRows columns={7} /> : filteredItems.map((item) => (
                    <tr key={item.sku} className="transition-colors hover:bg-[#FAF7F2]/80">
                      <td className="px-6 py-4 font-semibold text-[#1D1612]">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-[#8B7A6C]">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-[#8B7A6C]">
                        {item.sku}
                      </td>
                      <td className="px-6 py-4 font-bold text-[#1D1612]">
                        {item.stock} units
                      </td>
                      <td className="px-6 py-4 text-[#8B7A6C]">
                        {item.sold} sold
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                            item.status === "In Stock"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : item.status === "Low Stock"
                              ? "bg-[#F4EEE7] text-[#A06E31] border-[#D5C1A9]"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => editStock(item)}
                          className="text-xs font-semibold text-[#A06E31] hover:underline"
                        >
                          Edit Stock →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredItems.length === 0 && (
              <div className="p-12 text-center text-sm text-[#8B7A6C]">
                No inventory items match your search.
              </div>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
