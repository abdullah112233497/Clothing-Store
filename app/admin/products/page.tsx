"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminDropdown from "@/components/AdminDropdown";

/* ==========================================================================
   TYPES & DATA MODELS
   ========================================================================== */

export type ColorOption = {
  name: string;
  hex: string;
};

export type SizeSystem = "alpha" | "waist" | "footwear" | "free";

export type Product = {
  id: string;
  name: string;
  category: "Women" | "Men" | "Accessories" | "Unisex";
  productType: string;
  fitType: string;
  fabric: string;
  season: string;
  sku: string;
  price: string;
  stock: number;
  status: "Active" | "Low Stock" | "Out of Stock";
  image: string; // Primary cover image
  images: string[]; // All gallery images
  sizeSystem: SizeSystem;
  sizes: string[];
  colors: ColorOption[];
};

/* ==========================================================================
   TAXONOMY & PRESETS
   ========================================================================== */

const PRODUCT_TYPE_TAXONOMY: Record<string, string[]> = {
  Women: [
    "Oversized T-Shirt",
    "Stitched Kurti",
    "Maxi Dress",
    "Co-Ord Set",
    "Wide-Leg Trousers",
    "Denim Jacket",
    "Pullover Hoodie",
    "Casual Blouse",
    "Embroidered Tunic",
  ],
  Men: [
    "Casual Button-Down",
    "Polo T-Shirt",
    "Oversized Tee",
    "Stitched Kurta",
    "Denim Jacket",
    "Tactical Cargo Pants",
    "Slim-Fit Chinos",
    "Heavy Fleece Hoodie",
    "Formal Oxford Shirt",
  ],
  Accessories: [
    "Minimal Shoulder Bag",
    "Leather Crossbody",
    "Cruelty-Free Tote Bag",
    "Everyday Sneakers",
    "Formal Derby Shoes",
    "Genuine Leather Belt",
    "Leather Wallet",
  ],
  Unisex: [
    "Oversized Graphic Tee",
    "Heavyweight Hoodie",
    "Relaxed Sweatshirt",
    "Canvas Backpack",
    "Baseball Cap",
  ],
};

const FIT_OPTIONS = [
  "Oversized Fit",
  "Regular Fit",
  "Relaxed Fit",
  "Slim Fit",
  "Straight Fit",
  "Tailored Fit",
  "Standard Fit",
];

const FABRIC_OPTIONS = [
  "100% Combed Cotton (220 GSM)",
  "Lawn Cotton (Summer Breathable)",
  "Egyptian Cotton Linen Blend",
  "Raw Rigid Denim (14 oz)",
  "Brushed Cotton Fleece (340 GSM)",
  "Cruelty-Free Vegan Leather",
  "Ripstop Cotton Stretch",
];

const SEASON_OPTIONS = [
  "All-Season Essential",
  "Summer / Spring '26",
  "Autumn / Winter Warm",
  "Festive / Eid Collection",
];

const SIZE_SYSTEMS_CONFIG: Record<
  SizeSystem,
  { label: string; helper: string; defaultSizes: string[] }
> = {
  alpha: {
    label: "Clothing (XS - 3XL)",
    helper: "T-shirts, shirts, kurtis, hoodies & outerwear",
    defaultSizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  },
  waist: {
    label: "Waist (28\" - 42\")",
    helper: "Jeans, trousers, chinos & cargo pants",
    defaultSizes: ["28\"", "30\"", "32\"", "34\"", "36\"", "38\"", "40\"", "42\""],
  },
  footwear: {
    label: "Footwear (EU 39 - 45)",
    helper: "Sneakers, loafers, derby shoes & sandals",
    defaultSizes: ["EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45"],
  },
  free: {
    label: "One-Size / Universal",
    helper: "Bags, wallets, belts, caps & accessories",
    defaultSizes: ["Standard", "Free Size"],
  },
};

const POPULAR_COLORS: ColorOption[] = [
  { name: "Jet Black", hex: "#111111" },
  { name: "Off-White", hex: "#F5F5F0" },
  { name: "Mocha Brown", hex: "#8B5A2B" },
  { name: "Navy Blue", hex: "#1B263B" },
  { name: "Olive Green", hex: "#4A5320" },
  { name: "Charcoal Gray", hex: "#3A3A3A" },
  { name: "Sand Beige", hex: "#D5C1A9" },
  { name: "Deep Maroon", hex: "#6B1724" },
  { name: "Forest Green", hex: "#1E3F20" },
  { name: "Dusty Pink", hex: "#C79288" },
  { name: "Powder Blue", hex: "#8AA2B8" },
  { name: "Terracotta", hex: "#B85D36" },
];

const PRESET_STORE_PHOTOS = [
  { label: "Women Oversized Tee", url: "/images/product-1.png", category: "Women" },
  { label: "Women Stitched Kurti", url: "/images/women-4.png", category: "Women" },
  { label: "Women Casual Dress", url: "/images/women-5.png", category: "Women" },
  { label: "Women Flowy Coord", url: "/images/women-7.png", category: "Women" },
  { label: "Men Classic Shirt", url: "/images/product-2.png", category: "Men" },
  { label: "Men Urban Jacket", url: "/images/product-5.png", category: "Men" },
  { label: "Men Cargo Pants", url: "/images/product-8.png", category: "Men" },
  { label: "Men Traditional Kurta", url: "/images/men-4.png", category: "Men" },
  { label: "Shoulder Bag", url: "/images/product-3.png", category: "Accessories" },
  { label: "Everyday Sneakers", url: "/images/product-6.png", category: "Accessories" },
  { label: "Basic Hoodie", url: "/images/product-7.png", category: "Accessories" },
  { label: "Leather Shoes", url: "/images/accessories-4.png", category: "Accessories" },
];

/* ==========================================================================
   INITIAL CATALOG DATA
   ========================================================================== */

const initialProducts: Product[] = [
  {
    id: "PROD-001",
    name: "Essential Oversized Tee",
    category: "Women",
    productType: "Oversized T-Shirt",
    fitType: "Oversized Fit",
    fabric: "100% Combed Cotton (220 GSM)",
    season: "Summer / Spring '26",
    sku: "WW-TEE-01",
    price: "Rs. 3,499",
    stock: 24,
    status: "Active",
    image: "/images/product-1.png",
    images: ["/images/product-1.png", "/images/women-4.png"],
    sizeSystem: "alpha",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Mocha Brown", hex: "#8B5A2B" },
      { name: "Off-White", hex: "#F5F5F0" },
      { name: "Jet Black", hex: "#111111" },
    ],
  },
  {
    id: "PROD-002",
    name: "Classic Casual Shirt",
    category: "Men",
    productType: "Casual Button-Down",
    fitType: "Regular Fit",
    fabric: "Egyptian Cotton Linen Blend",
    season: "All-Season Essential",
    sku: "WW-SHT-02",
    price: "Rs. 4,999",
    stock: 18,
    status: "Active",
    image: "/images/product-2.png",
    images: ["/images/product-2.png"],
    sizeSystem: "alpha",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Navy Blue", hex: "#1B263B" },
      { name: "Off-White", hex: "#F5F5F0" },
    ],
  },
  {
    id: "PROD-003",
    name: "Minimal Shoulder Bag",
    category: "Accessories",
    productType: "Minimal Shoulder Bag",
    fitType: "Standard Fit",
    fabric: "Cruelty-Free Vegan Leather",
    season: "All-Season Essential",
    sku: "WW-BAG-03",
    price: "Rs. 5,499",
    stock: 7,
    status: "Low Stock",
    image: "/images/product-3.png",
    images: ["/images/product-3.png"],
    sizeSystem: "free",
    sizes: ["Standard"],
    colors: [
      { name: "Jet Black", hex: "#111111" },
      { name: "Sand Beige", hex: "#D5C1A9" },
    ],
  },
  {
    id: "PROD-004",
    name: "Relaxed Fit Trousers",
    category: "Women",
    productType: "Wide-Leg Trousers",
    fitType: "Relaxed Fit",
    fabric: "Lightweight Twill Blend",
    season: "Summer / Spring '26",
    sku: "WW-TRS-04",
    price: "Rs. 6,499",
    stock: 15,
    status: "Active",
    image: "/images/product-4.png",
    images: ["/images/product-4.png"],
    sizeSystem: "waist",
    sizes: ["28\"", "30\"", "32\"", "34\""],
    colors: [
      { name: "Sand Beige", hex: "#D5C1A9" },
      { name: "Charcoal Gray", hex: "#3A3A3A" },
    ],
  },
  {
    id: "PROD-005",
    name: "Urban Denim Jacket",
    category: "Men",
    productType: "Denim Jacket",
    fitType: "Relaxed Fit",
    fabric: "Raw Rigid Denim (14 oz)",
    season: "Autumn / Winter Warm",
    sku: "WW-JCK-05",
    price: "Rs. 7,999",
    stock: 3,
    status: "Low Stock",
    image: "/images/product-5.png",
    images: ["/images/product-5.png"],
    sizeSystem: "alpha",
    sizes: ["M", "L", "XL", "2XL"],
    colors: [
      { name: "Navy Blue", hex: "#1B263B" },
      { name: "Jet Black", hex: "#111111" },
    ],
  },
  {
    id: "PROD-006",
    name: "Everyday Sneakers",
    category: "Accessories",
    productType: "Everyday Sneakers",
    fitType: "Standard Fit",
    fabric: "Breathable Canvas & Rubber Sole",
    season: "All-Season Essential",
    sku: "WW-SNK-06",
    price: "Rs. 8,499",
    stock: 0,
    status: "Out of Stock",
    image: "/images/product-6.png",
    images: ["/images/product-6.png"],
    sizeSystem: "footwear",
    sizes: ["EU 40", "EU 41", "EU 42", "EU 43"],
    colors: [
      { name: "Off-White", hex: "#F5F5F0" },
      { name: "Jet Black", hex: "#111111" },
    ],
  },
];

/* ==========================================================================
   MINIMALIST SVG ICONS
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

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function UploadCloudIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function StarBadgeIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

/* ==========================================================================
   STATUS BADGE STYLES
   ========================================================================== */

function getStatusClass(status: Product["status"]) {
  switch (status) {
    case "Active":
      return "bg-[#eee6dc] text-[#6f4b2d] border-[#6f4b2d]/20";
    case "Low Stock":
      return "bg-[#D5C1A9]/40 text-[#5d4634] border-[#A06E31]/40";
    case "Out of Stock":
      return "bg-[#f1dfdc] text-[#8a3f35] border-[#8a3f35]/25";
    default:
      return "bg-[#ebe8e4] text-[#6f665f] border-gray-300";
  }
}

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Low Stock" | "Out of Stock">("All");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<Product["category"]>("Women");
  const [formProductType, setFormProductType] = useState("Oversized T-Shirt");
  const [formFitType, setFormFitType] = useState("Oversized Fit");
  const [formFabric, setFormFabric] = useState("100% Combed Cotton (220 GSM)");
  const [formSeason, setFormSeason] = useState("Summer / Spring '26");
  const [formSku, setFormSku] = useState("");
  const [formPrice, setFormPrice] = useState("Rs. 3,499");
  const [formStock, setFormStock] = useState<number>(20);
  const [formStatus, setFormStatus] = useState<Product["status"]>("Active");

  // Images State (Empty array for brand new products!)
  const [formImages, setFormImages] = useState<string[]>([]);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [showPresetGallery, setShowPresetGallery] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sizes State
  const [formSizeSystem, setFormSizeSystem] = useState<SizeSystem>("alpha");
  const [formSizes, setFormSizes] = useState<string[]>(["S", "M", "L"]);
  const [customSizeInput, setCustomSizeInput] = useState("");

  // Colors State
  const [formColors, setFormColors] = useState<ColorOption[]>([
    { name: "Jet Black", hex: "#111111" },
    { name: "Off-White", hex: "#F5F5F0" },
  ]);
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#8B5A2B");

  // Prevent background scrolling and interaction when modal is open
  useEffect(() => {
    if (modalOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalBodyOverflow || "unset";
        document.documentElement.style.overflow = originalHtmlOverflow || "unset";
      };
    }
  }, [modalOpen]);

  /* ------------------- LOCAL FILE UPLOAD LOGIC ------------------- */

  const processUploadedFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newLoadedImages: string[] = [];
    let filesProcessed = 0;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        alert(`File ${file.name} is not a valid image format.`);
        filesProcessed++;
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result && !formImages.includes(result) && !newLoadedImages.includes(result)) {
          newLoadedImages.push(result);
        }
        filesProcessed++;
        if (filesProcessed === files.length) {
          setFormImages((prev) => [...prev, ...newLoadedImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processUploadedFiles(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files) {
      processUploadedFiles(e.dataTransfer.files);
    }
  };

  /* ------------------- FORM ACTIONS ------------------- */

  const openCreateModal = () => {
    setIsNewProduct(true);
    setEditingId(null);
    setFormName("");
    setFormCategory("Women");
    setFormProductType("Oversized T-Shirt");
    setFormFitType("Oversized Fit");
    setFormFabric("100% Combed Cotton (220 GSM)");
    setFormSeason("Summer / Spring '26");
    setFormSku(`WW-${Math.floor(100 + Math.random() * 900)}`);
    setFormPrice("Rs. 3,499");
    setFormStock(20);
    setFormStatus("Active");
    // Start with empty images so the admin sees the clean dropzone placeholder
    setFormImages([]);
    setShowPresetGallery(false);
    setFormSizeSystem("alpha");
    setFormSizes(["XS", "S", "M", "L", "XL"]);
    setFormColors([
      { name: "Jet Black", hex: "#111111" },
      { name: "Off-White", hex: "#F5F5F0" },
    ]);
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setIsNewProduct(false);
    setEditingId(p.id);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormProductType(p.productType);
    setFormFitType(p.fitType || "Regular Fit");
    setFormFabric(p.fabric);
    setFormSeason(p.season || "All-Season Essential");
    setFormSku(p.sku);
    setFormPrice(p.price);
    setFormStock(p.stock);
    setFormStatus(p.status);
    setFormImages(p.images && p.images.length > 0 ? p.images : [p.image]);
    setShowPresetGallery(false);
    setFormSizeSystem(p.sizeSystem || "alpha");
    setFormSizes(p.sizes || ["M"]);
    setFormColors(p.colors || [{ name: "Jet Black", hex: "#111111" }]);
    setModalOpen(true);
  };

  const handleSaveProduct = () => {
    if (!formName.trim()) {
      alert("Please enter a product title.");
      return;
    }

    const primaryImage = formImages.length > 0 ? formImages[0] : "/images/product-1.png";
    const cleanedPrice = formPrice.trim().startsWith("Rs.") ? formPrice.trim() : `Rs. ${formPrice.trim()}`;

    if (isNewProduct) {
      const newProduct: Product = {
        id: `PROD-${Math.floor(100 + Math.random() * 900)}`,
        name: formName.trim(),
        category: formCategory,
        productType: formProductType.trim() || "Apparel",
        fitType: formFitType,
        fabric: formFabric.trim() || "Premium Fabric",
        season: formSeason,
        sku: formSku.trim() || `WW-${Math.floor(100 + Math.random() * 900)}`,
        price: cleanedPrice,
        stock: Number(formStock) || 0,
        status: formStatus,
        image: primaryImage,
        images: formImages.length > 0 ? formImages : [primaryImage],
        sizeSystem: formSizeSystem,
        sizes: formSizes.length > 0 ? formSizes : ["Standard"],
        colors: formColors.length > 0 ? formColors : [{ name: "Jet Black", hex: "#111111" }],
      };
      setProducts([newProduct, ...products]);
    } else if (editingId) {
      setProducts(
        products.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: formName.trim(),
                category: formCategory,
                productType: formProductType.trim() || "Apparel",
                fitType: formFitType,
                fabric: formFabric.trim() || "Premium Fabric",
                season: formSeason,
                sku: formSku.trim(),
                price: cleanedPrice,
                stock: Number(formStock) || 0,
                status: formStatus,
                image: primaryImage,
                images: formImages.length > 0 ? formImages : [primaryImage],
                sizeSystem: formSizeSystem,
                sizes: formSizes,
                colors: formColors,
              }
            : p
        )
      );
    }
    setModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
      setModalOpen(false);
    }
  };

  // Image helpers
  const removeImage = (index: number) => {
    setFormImages(formImages.filter((_, i) => i !== index));
  };

  const setCoverImage = (index: number) => {
    if (index === 0) return;
    const selected = formImages[index];
    const rest = formImages.filter((_, i) => i !== index);
    setFormImages([selected, ...rest]);
  };

  const addPresetImage = (url: string) => {
    if (!formImages.includes(url)) {
      setFormImages([...formImages, url]);
    }
  };

  const addCustomImageUrl = () => {
    if (customImageUrl.trim() && !formImages.includes(customImageUrl.trim())) {
      setFormImages([...formImages, customImageUrl.trim()]);
      setCustomImageUrl("");
    }
  };

  // Size System switch
  const handleSizeSystemChange = (newSystem: SizeSystem) => {
    setFormSizeSystem(newSystem);
    const defaults = SIZE_SYSTEMS_CONFIG[newSystem].defaultSizes.slice(0, 4);
    setFormSizes(defaults);
  };

  const toggleSize = (size: string) => {
    if (formSizes.includes(size)) {
      if (formSizes.length > 1) {
        setFormSizes(formSizes.filter((s) => s !== size));
      }
    } else {
      setFormSizes([...formSizes, size]);
    }
  };

  const addCustomSize = () => {
    if (customSizeInput.trim() && !formSizes.includes(customSizeInput.trim())) {
      setFormSizes([...formSizes, customSizeInput.trim()]);
      setCustomSizeInput("");
    }
  };

  // Color helpers
  const toggleColor = (color: ColorOption) => {
    if (formColors.some((c) => c.name === color.name)) {
      if (formColors.length > 1) {
        setFormColors(formColors.filter((c) => c.name !== color.name));
      }
    } else {
      setFormColors([...formColors, color]);
    }
  };

  const addCustomColor = () => {
    if (newColorName.trim()) {
      const exists = formColors.some((c) => c.name.toLowerCase() === newColorName.trim().toLowerCase());
      if (!exists) {
        setFormColors([...formColors, { name: newColorName.trim(), hex: newColorHex }]);
        setNewColorName("");
      }
    }
  };

  const removeColor = (colorName: string) => {
    if (formColors.length <= 1) {
      alert("Product must have at least one color variation.");
      return;
    }
    setFormColors(formColors.filter((c) => c.name !== colorName));
  };

  // Filtered Products
  const filteredProducts = products.filter((product) => {
    const query = search.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      product.productType.toLowerCase().includes(query) ||
      product.fabric.toLowerCase().includes(query);

    const matchesCategory = category === "All" || product.category === category;
    const matchesTab = activeTab === "All" || product.status === activeTab;

    return matchesSearch && matchesCategory && matchesTab;
  });

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">
      <AdminSidebar currentTab="products" />

      {/* MAIN BODY */}
      <section
        className={`lg:ml-64 ${modalOpen ? "pointer-events-none select-none" : ""}`}
        aria-hidden={modalOpen}
      >
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#D5C1A9]/60 bg-[#FAF7F2]/95 px-5 backdrop-blur-md sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#A06E31] font-semibold">
                Admin Portal
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-[#1D1612] sm:text-xl">
                Products Catalog
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openCreateModal}
              className="rounded-xl bg-[#1D1612] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#A06E31] shadow-xs flex items-center gap-2"
            >
              <PlusIcon />
              <span>Create New Product</span>
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

        {/* CONTENT SECTION */}
        <div className="px-5 py-7 sm:px-8 lg:px-10">

            {/* HEADER BANNER */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#A06E31] font-semibold">
                  Catalog Management
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[#1D1612]">
                  Product Types, Variations & Media
                </h2>
                <p className="mt-1 text-sm text-[#8B7A6C]">
                  Manage items, upload product photography, and specify exact size curves and colors.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#8B7A6C]">Catalog:</span>
                <span className="rounded-lg bg-white border border-[#D5C1A9]/60 px-3 py-1 text-xs font-bold text-[#1D1612]">
                  {filteredProducts.length} items
                </span>
              </div>
            </div>

            {/* STATUS TABS */}
            <div className="mb-5 flex gap-2 overflow-x-auto border-b border-[#D5C1A9]/40 pb-3">
              {[
                { label: "All Products", key: "All", count: products.length },
                { label: "Active", key: "Active", count: products.filter((p) => p.status === "Active").length },
                { label: "Low Stock", key: "Low Stock", count: products.filter((p) => p.status === "Low Stock").length },
                { label: "Out of Stock", key: "Out of Stock", count: products.filter((p) => p.status === "Out of Stock").length },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab.key
                      ? "bg-[#1D1612] text-white shadow-xs"
                      : "border border-[#D5C1A9]/70 bg-white text-[#694F3D] hover:bg-[#FAF7F2] hover:border-[#A06E31]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      activeTab === tab.key ? "bg-[#A06E31] text-white" : "bg-[#F4EEE7] text-[#694F3D]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* SEARCH AND FILTER BAR */}
            <div className="mb-5 flex flex-col gap-3 rounded-xl border border-[#D5C1A9]/60 bg-white p-4 shadow-xs md:flex-row">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7A6C]">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search products by title, type, fabric or SKU..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-[#D5C1A9]/80 bg-[#FAF7F2] px-4 py-2.5 pl-10 text-sm text-[#1D1612] outline-none transition placeholder:text-[#8B7A6C] focus:border-[#A06E31] focus:bg-white"
                />
              </div>

              <AdminDropdown
                value={category}
                onChange={setCategory}
                options={[
                  { value: "All", label: "All Categories" },
                  { value: "Women", label: "Women Clothing" },
                  { value: "Men", label: "Men Clothing" },
                  { value: "Accessories", label: "Accessories" },
                ]}
                className="w-full sm:w-48"
              />

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setActiveTab("All");
                }}
                className="rounded-lg border border-[#D5C1A9]/80 bg-white px-4 py-2.5 text-xs font-semibold text-[#694F3D] hover:bg-[#FAF7F2]"
              >
                Reset
              </button>
            </div>

            {/* PRODUCTS TABLE */}
            <div className="overflow-hidden rounded-2xl border border-[#D5C1A9]/60 bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-[#1D1612]">
                  <thead className="border-b border-[#D5C1A9]/60 bg-[#FAF7F2] text-[11px] uppercase tracking-wider text-[#8B7A6C]">
                    <tr>
                      <th className="px-5 py-4">Product & Visual</th>
                      <th className="px-5 py-4">Classification & Fit</th>
                      <th className="px-5 py-4">Fabric Details</th>
                      <th className="px-5 py-4">Available Sizes</th>
                      <th className="px-5 py-4">Colors</th>
                      <th className="px-5 py-4">Price</th>
                      <th className="px-5 py-4">Stock</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#D5C1A9]/30 text-xs">
                    {filteredProducts.map((product) => {
                      const galleryCount = product.images?.length || 1;
                      return (
                        <tr
                          key={product.id}
                          onClick={() => openEditModal(product)}
                          className="hover:bg-[#F8F6F2]/70 cursor-pointer transition"
                        >
                          {/* PRODUCT & VISUAL */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative h-14 w-12 shrink-0 rounded-lg overflow-hidden border border-[#8B7A6C]/25 bg-[#F8F6F2]">
                                <img
                                  src={product.image || (product.images && product.images[0]) || "/images/product-1.png"}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/images/product-1.png";
                                  }}
                                />
                                {galleryCount > 1 && (
                                  <span className="absolute bottom-0.5 right-0.5 rounded bg-black/80 px-1 py-0.2 text-[8px] font-bold text-white leading-tight">
                                    +{galleryCount - 1}
                                  </span>
                                )}
                              </div>

                              <div className="min-w-0">
                                <p className="font-semibold text-[#080808] hover:text-[#A06E31] transition">
                                  {product.name}
                                </p>
                                <div className="mt-0.5 flex items-center gap-2 text-[10px] text-[#8B7A6C]">
                                  <span className="font-mono bg-[#F8F6F2] px-1.5 py-0.5 rounded border border-[#8B7A6C]/20">
                                    {product.sku}
                                  </span>
                                  <span>{product.category}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* CLASSIFICATION & FIT */}
                          <td className="px-5 py-4">
                            <div className="space-y-1">
                              <span className="inline-block rounded-md bg-[#080808] px-2 py-0.5 text-[10px] font-bold text-white">
                                {product.productType}
                              </span>
                              <p className="text-[11px] text-[#8B7A6C]">
                                {product.fitType || "Standard Fit"}
                              </p>
                            </div>
                          </td>

                          {/* FABRIC */}
                          <td className="px-5 py-4">
                            <p className="font-medium text-[#5f554e] max-w-[140px] truncate" title={product.fabric}>
                              {product.fabric}
                            </p>
                            <p className="text-[10px] text-[#8B7A6C]">
                              {product.season || "All-Season"}
                            </p>
                          </td>

                          {/* SIZES */}
                          <td className="px-5 py-4">
                            <div className="space-y-1">
                              <div className="flex flex-wrap gap-1 max-w-[130px]">
                                {product.sizes.map((s) => (
                                  <span
                                    key={s}
                                    className="rounded bg-[#F8F6F2] border border-[#8B7A6C]/25 px-1.5 py-0.5 text-[9px] font-bold text-[#5d4634]"
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </td>

                          {/* COLORS */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1.5">
                              {product.colors.map((c) => (
                                <span
                                  key={c.name}
                                  title={`${c.name} (${c.hex})`}
                                  className="h-4 w-4 rounded-full border border-black/25 shadow-xs shrink-0"
                                  style={{ backgroundColor: c.hex }}
                                />
                              ))}
                              <span className="text-[10px] text-[#8B7A6C] ml-1">
                                ({product.colors.length})
                              </span>
                            </div>
                          </td>

                          {/* PRICE */}
                          <td className="px-5 py-4 text-xs font-bold text-[#080808] whitespace-nowrap">
                            {product.price}
                          </td>

                          {/* STOCK */}
                          <td className="px-5 py-4 text-xs">
                            <span className="font-bold">{product.stock}</span>{" "}
                            <span className="text-[#8B7A6C]">units</span>
                          </td>

                          {/* STATUS */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold border ${getStatusClass(
                                product.status
                              )}`}
                            >
                              {product.status}
                            </span>
                          </td>

                          {/* ACTIONS */}
                          <td className="px-5 py-4 text-right whitespace-nowrap">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditModal(product);
                              }}
                              className="rounded-lg border border-[#8B7A6C]/25 bg-white p-2 text-[#5f554e] hover:bg-[#A06E31] hover:text-white transition shadow-2xs"
                              title="Edit product details, images & variations"
                            >
                              <EditIcon />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* EMPTY STATE */}
              {filteredProducts.length === 0 && (
                <div className="py-20 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F8F6F2] text-xl text-[#8B7A6C]">
                    <SearchIcon />
                  </div>
                  <h3 className="mt-4 font-semibold text-[#080808]">No products found</h3>
                  <p className="mt-1 text-sm text-[#8B7A6C]">
                    Try adjusting your search criteria, category or status tab.
                  </p>
                </div>
              )}
            </div>

          </div>

        </section>

      {/* ==========================================================================
          PROFESSIONAL PRODUCT STUDIO MODAL (SEAMLESS SINGLE-FLOW LAYOUT)
          ========================================================================== */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]/70 p-3 sm:p-5 backdrop-blur-md overscroll-contain overflow-y-auto animate-fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-5xl my-4 max-h-[92vh] overflow-hidden rounded-2xl bg-white shadow-2xl border border-[#D5C1A9]/60 text-[#080808] flex flex-col transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HIDDEN NATIVE FILE INPUT FOR LOCAL IMAGES */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              multiple
              onChange={handleFileInputChange}
              className="hidden"
            />

            {/* MODAL HEADER */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#D5C1A9]/60 px-6 py-4 bg-white shadow-xs">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A06E31]">
                  Product Atelier & Catalog Studio
                </p>
                <div className="flex items-center gap-2.5 mt-1">
                  <h3 className="text-xl font-bold tracking-tight text-[#1D1612]">
                    {isNewProduct ? "Create New Product" : formName || "Edit Product"}
                  </h3>
                  <span className="rounded-full bg-[#FAF7F2] border border-[#D5C1A9]/70 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#A06E31]">
                    {isNewProduct ? "Create Mode" : "Edit Mode"}
                  </span>
                  <span className="text-xs font-mono text-[#8B7A6C] hidden sm:inline">
                    · SKU: {formSku || "Auto-Generated"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF7F2] text-[#8B7A6C] border border-[#D5C1A9]/40 transition hover:bg-[#D5C1A9]/50 hover:text-[#080808]"
                title="Close studio"
              >
                <CloseIcon />
              </button>
            </div>

            {/* STUDIO WORKSPACE (FORM ON LEFT + LIVE PREVIEW ON RIGHT) */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* LEFT COLUMN: FORM SECTIONS (7 Cols) */}
              <div className="lg:col-span-7 space-y-5">

                {/* 1. MEDIA & PRODUCT IMAGES SECTION */}
                <div className="rounded-xl border border-[#8B7A6C]/20 bg-white p-4 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#080808]">
                        Product Photography & Media
                      </h4>
                      <p className="text-[11px] text-[#8B7A6C]">
                        Upload high-resolution item photos from your device.
                      </p>
                    </div>
                    {formImages.length > 0 && (
                      <span className="text-[10px] font-semibold text-[#A06E31]">
                        {formImages.length} {formImages.length === 1 ? "photo" : "photos"} attached
                      </span>
                    )}
                  </div>

                  {/* DRAG & DROP ZONE */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex flex-col items-center justify-center p-5 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                      isDraggingFile
                        ? "border-[#A06E31] bg-[#A06E31]/10 scale-[1.01]"
                        : "border-[#8B7A6C]/30 bg-[#F8F6F2] hover:border-[#080808] hover:bg-white"
                    }`}
                  >
                    <div className="h-10 w-10 rounded-full bg-white border border-[#8B7A6C]/20 flex items-center justify-center text-[#A06E31] mb-2 shadow-2xs">
                      <UploadCloudIcon />
                    </div>
                    <p className="text-xs font-bold text-[#080808]">
                      Drop product images here, or browse files
                    </p>
                    <p className="text-[10px] text-[#8B7A6C] mt-0.5">
                      Supports PNG, JPG, WEBP. Select multiple files at once.
                    </p>
                  </div>

                  {/* ATTACHED IMAGES GALLERY */}
                  {formImages.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[10px] text-[#8B7A6C]">
                        <span>Click photo to set as ⭐ Cover · Click ✕ to remove</span>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                        {formImages.map((imgUrl, idx) => (
                          <div
                            key={idx}
                            onClick={() => setCoverImage(idx)}
                            className={`group relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                              idx === 0
                                ? "border-[#A06E31] shadow-sm ring-1 ring-[#A06E31]"
                                : "border-gray-200 hover:border-[#080808]"
                            }`}
                          >
                            <img
                              src={imgUrl}
                              alt={`Product upload ${idx + 1}`}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/product-1.png";
                              }}
                            />
                            {idx === 0 ? (
                              <div className="absolute top-1 left-1 rounded bg-[#A06E31] px-1.5 py-0.5 text-[8px] font-black uppercase text-white shadow-xs flex items-center gap-0.5">
                                <StarBadgeIcon />
                                <span>Cover</span>
                              </div>
                            ) : (
                              <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition rounded bg-black/70 px-1 py-0.5 text-[8px] text-white">
                                Set Cover
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(idx);
                              }}
                              className="absolute top-1 right-1 h-5 w-5 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-700 shadow-xs"
                              title="Delete photo"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PRESET GALLERY TOGGLE */}
                  <div className="pt-2 border-t border-[#8B7A6C]/15 flex items-center justify-between text-[11px]">
                    <button
                      type="button"
                      onClick={() => setShowPresetGallery(!showPresetGallery)}
                      className="text-[#A06E31] hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>{showPresetGallery ? "Hide Store Library" : "+ Pick from Store Demo Photos"}</span>
                    </button>
                  </div>

                  {/* OPTIONAL PRESET PHOTOS GRID */}
                  {showPresetGallery && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 p-2.5 rounded-lg border border-[#8B7A6C]/20 bg-[#F8F6F2] max-h-36 overflow-y-auto">
                      {PRESET_STORE_PHOTOS.map((item) => {
                        const isAdded = formImages.includes(item.url);
                        return (
                          <div
                            key={item.url}
                            onClick={() => {
                              if (isAdded) removeImage(formImages.indexOf(item.url));
                              else addPresetImage(item.url);
                            }}
                            className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border ${
                              isAdded ? "border-[#A06E31] ring-2 ring-[#A06E31]" : "border-gray-200"
                            }`}
                            title={item.label}
                          >
                            <img src={item.url} alt={item.label} className="h-full w-full object-cover" />
                            {isAdded && (
                              <div className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-[#A06E31] text-white text-[8px] flex items-center justify-center font-bold">
                                ✓
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 2. GENERAL INFORMATION */}
                <div className="rounded-xl border border-[#8B7A6C]/20 bg-white p-4 space-y-3.5 shadow-2xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#080808]">
                    General Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-[#5f554e] mb-1">
                        Product Title *
                      </label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Essential Oversized Tee, Stitched Kurta, Denim Jacket"
                        className="w-full rounded-lg border border-[#8B7A6C]/30 bg-white p-2.5 text-xs text-[#080808] outline-none focus:border-[#A06E31]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#5f554e] mb-1">
                        SKU Code
                      </label>
                      <input
                        type="text"
                        value={formSku}
                        onChange={(e) => setFormSku(e.target.value)}
                        placeholder="WW-TEE-01"
                        className="w-full rounded-lg border border-[#8B7A6C]/30 bg-white p-2.5 text-xs font-mono text-[#080808] outline-none focus:border-[#A06E31]"
                      />
                    </div>
                  </div>

                  {/* TARGET DEPARTMENT */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5f554e] mb-1">
                      Department / Category
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(["Women", "Men", "Accessories", "Unisex"] as const).map((cat) => (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => {
                            setFormCategory(cat);
                            const types = PRODUCT_TYPE_TAXONOMY[cat];
                            if (types && types.length > 0) setFormProductType(types[0]);
                          }}
                          className={`rounded-lg py-2 text-xs font-bold transition border ${
                            formCategory === cat
                              ? "bg-[#080808] text-white border-[#080808] shadow-xs"
                              : "bg-white text-[#5f554e] border-[#8B7A6C]/25 hover:border-[#A06E31]"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* PRODUCT TYPE SELECTOR */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-semibold text-[#5f554e]">
                        Product Type / Classification
                      </label>
                      <span className="text-[10px] text-[#A06E31] font-semibold">
                        Selected: {formProductType}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {(PRODUCT_TYPE_TAXONOMY[formCategory] || PRODUCT_TYPE_TAXONOMY.Women).map((item) => (
                        <button
                          type="button"
                          key={item}
                          onClick={() => setFormProductType(item)}
                          className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition border ${
                            formProductType === item
                              ? "bg-[#A06E31] text-white border-[#A06E31] font-bold"
                              : "bg-[#F8F6F2] text-[#5f554e] border-[#8B7A6C]/25 hover:border-[#A06E31]"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    <input
                      type="text"
                      value={formProductType}
                      onChange={(e) => setFormProductType(e.target.value)}
                      placeholder="Or specify custom product type..."
                      className="w-full rounded-lg border border-[#8B7A6C]/30 bg-white p-2 text-xs text-[#080808] outline-none focus:border-[#A06E31]"
                    />
                  </div>

                  {/* FIT & FABRIC */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5f554e] mb-1">
                        Fit Profile
                      </label>
                      <AdminDropdown
                        value={formFitType}
                        onChange={setFormFitType}
                        options={FIT_OPTIONS.map((fit) => ({ value: fit, label: fit }))}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#5f554e] mb-1">
                        Season / Collection
                      </label>
                      <AdminDropdown
                        value={formSeason}
                        onChange={setFormSeason}
                        options={SEASON_OPTIONS.map((s) => ({ value: s, label: s }))}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#5f554e] mb-1">
                      Fabric & Material
                    </label>
                    <input
                      type="text"
                      value={formFabric}
                      onChange={(e) => setFormFabric(e.target.value)}
                      placeholder="e.g. 100% Combed Cotton, Lawn, Raw Denim"
                      className="w-full rounded-lg border border-[#8B7A6C]/30 bg-white p-2.5 text-xs text-[#080808] outline-none focus:border-[#A06E31]"
                    />
                  </div>

                  {/* PRICING & INVENTORY */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#8B7A6C]/15">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5f554e] mb-1">
                        Retail Price (PKR)
                      </label>
                      <input
                        type="text"
                        value={formPrice}
                        onChange={(e) => setFormPrice(e.target.value)}
                        placeholder="Rs. 3,499"
                        className="w-full rounded-lg border border-[#8B7A6C]/30 bg-white p-2.5 text-xs font-bold text-[#080808] outline-none focus:border-[#A06E31]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#5f554e] mb-1">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        value={formStock}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setFormStock(val);
                          if (val <= 0) setFormStatus("Out of Stock");
                          else if (val <= 5) setFormStatus("Low Stock");
                          else setFormStatus("Active");
                        }}
                        className="w-full rounded-lg border border-[#8B7A6C]/30 bg-white p-2.5 text-xs text-[#080808] outline-none focus:border-[#A06E31]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#5f554e] mb-1">
                        Status Override
                      </label>
                      <AdminDropdown
                        value={formStatus}
                        onChange={(val) => setFormStatus(val as any)}
                        options={[
                          { value: "Active", label: "Active (In Stock)" },
                          { value: "Low Stock", label: "Low Stock" },
                          { value: "Out of Stock", label: "Out of Stock" },
                        ]}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. AVAILABLE SIZES SECTION ("KON KON SE SIZE AVAILABLE HAIN") */}
                <div className="rounded-xl border border-[#8B7A6C]/20 bg-white p-4 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#080808]">
                        Available Sizes
                      </h4>
                      <p className="text-[11px] text-[#8B7A6C]">
                        Select which size variations will be available for customers to order.
                      </p>
                    </div>
                    <span className="rounded-full bg-[#080808] text-white px-2 py-0.5 text-[10px] font-bold">
                      {formSizes.length} active
                    </span>
                  </div>

                  {/* SIZE METRIC SELECTOR TABS */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(Object.keys(SIZE_SYSTEMS_CONFIG) as SizeSystem[]).map((sysKey) => {
                      const sys = SIZE_SYSTEMS_CONFIG[sysKey];
                      const isCurrent = formSizeSystem === sysKey;
                      return (
                        <button
                          type="button"
                          key={sysKey}
                          onClick={() => handleSizeSystemChange(sysKey)}
                          className={`p-2 rounded-lg border text-left transition ${
                            isCurrent
                              ? "bg-[#080808] text-white border-[#080808] shadow-xs"
                              : "bg-[#F8F6F2] text-[#5f554e] border-[#8B7A6C]/20 hover:border-[#A06E31]"
                          }`}
                        >
                          <span className="block text-[11px] font-bold">{sys.label.split("(")[0]}</span>
                          <span className={`block text-[9px] truncate ${isCurrent ? "text-gray-300" : "text-[#8B7A6C]"}`}>
                            {sys.label.includes("(") ? sys.label.split("(")[1].replace(")", "") : ""}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* ACTIVE SIZES TOGGLE BUTTONS */}
                  <div className="rounded-lg border border-[#8B7A6C]/20 bg-[#F8F6F2] p-3 space-y-2">
                    <span className="text-[10px] font-bold text-[#8B7A6C] uppercase tracking-wider block">
                      Click to toggle in-stock sizes:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {SIZE_SYSTEMS_CONFIG[formSizeSystem].defaultSizes.map((sz) => {
                        const isSelected = formSizes.includes(sz);
                        return (
                          <button
                            type="button"
                            key={sz}
                            onClick={() => toggleSize(sz)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition border ${
                              isSelected
                                ? "bg-[#080808] text-white border-[#080808] shadow-xs"
                                : "bg-white text-[#5f554e] border-[#8B7A6C]/25 hover:border-[#A06E31]"
                            }`}
                          >
                            {sz}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ADD CUSTOM SIZE */}
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={customSizeInput}
                      onChange={(e) => setCustomSizeInput(e.target.value)}
                      placeholder='Add custom size (e.g. 4XL, 26, Petite)...'
                      className="flex-1 rounded-lg border border-[#8B7A6C]/30 bg-white p-2 text-xs outline-none focus:border-[#A06E31]"
                    />
                    <button
                      type="button"
                      onClick={addCustomSize}
                      className="rounded-lg bg-[#080808] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#A06E31] transition"
                    >
                      + Add Size
                    </button>
                  </div>
                </div>

                {/* 4. COLORS SECTION */}
                <div className="rounded-xl border border-[#8B7A6C]/20 bg-white p-4 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#080808]">
                        Color Options
                      </h4>
                      <p className="text-[11px] text-[#8B7A6C]">
                        Select shades offered for this product.
                      </p>
                    </div>
                    <span className="rounded-full bg-[#080808] text-white px-2 py-0.5 text-[10px] font-bold">
                      {formColors.length} selected
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {POPULAR_COLORS.map((col) => {
                      const isSelected = formColors.some((c) => c.name === col.name);
                      return (
                        <button
                          type="button"
                          key={col.name}
                          onClick={() => toggleColor(col)}
                          className={`flex items-center gap-2 rounded-xl p-2 transition border text-left ${
                            isSelected
                              ? "border-[#080808] bg-[#F8F6F2] font-bold shadow-xs"
                              : "border-[#8B7A6C]/20 bg-white text-[#5f554e] hover:border-[#A06E31]"
                          }`}
                        >
                          <span
                            className="h-4 w-4 rounded-full border border-black/25 shrink-0"
                            style={{ backgroundColor: col.hex }}
                          />
                          <span className="text-[11px] truncate flex-1">{col.name}</span>
                          {isSelected && <span className="text-[10px] text-[#A06E31]">✓</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* CUSTOM COLOR ADDER */}
                  <div className="rounded-lg border border-[#8B7A6C]/20 bg-[#F8F6F2] p-2.5 flex items-center gap-2">
                    <input
                      type="color"
                      value={newColorHex}
                      onChange={(e) => setNewColorHex(e.target.value)}
                      className="h-8 w-10 cursor-pointer rounded border border-[#8B7A6C]/30 bg-white p-0.5"
                    />
                    <input
                      type="text"
                      value={newColorName}
                      onChange={(e) => setNewColorName(e.target.value)}
                      placeholder="Custom color name (e.g. Sage Green)..."
                      className="flex-1 rounded-lg border border-[#8B7A6C]/30 bg-white p-2 text-xs outline-none focus:border-[#A06E31]"
                    />
                    <button
                      type="button"
                      onClick={addCustomColor}
                      className="rounded-lg bg-[#080808] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#A06E31] transition"
                    >
                      + Add
                    </button>
                  </div>

                  {/* SELECTED COLOR CHIPS */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {formColors.map((c) => (
                      <span
                        key={c.name}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#8B7A6C]/25 bg-white px-2.5 py-1 text-xs text-[#080808]"
                      >
                        <span
                          className="h-3 w-3 rounded-full border border-black/20"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="font-semibold text-[11px]">{c.name}</span>
                        <button
                          type="button"
                          onClick={() => removeColor(c.name)}
                          className="text-[#8B7A6C] hover:text-red-600 text-[10px] ml-0.5"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: STICKY LIVE CUSTOMER STOREFRONT PREVIEW (5 Cols) */}
              <div className="lg:col-span-5 bg-[#F8F6F2] rounded-2xl border border-[#8B7A6C]/20 p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#8B7A6C]/20 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B7A6C]">
                      Live Store Showcase Preview
                    </span>
                    <span className="rounded-full bg-green-100 text-green-800 border border-green-200 px-2 py-0.5 text-[9px] font-bold">
                      ● Real-time
                    </span>
                  </div>

                  {/* PREVIEW CARD */}
                  <div className="rounded-2xl border border-[#8B7A6C]/25 bg-white p-4 shadow-sm space-y-4">

                    {/* PHOTO PREVIEW OR LUXURY EMPTY PLACEHOLDER */}
                    {formImages.length > 0 ? (
                      <div className="space-y-2">
                        <div className="relative aspect-4/5 w-full rounded-xl overflow-hidden bg-[#F8F6F2] border border-[#8B7A6C]/20">
                          <img
                            src={formImages[0]}
                            alt="Cover preview"
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/product-1.png";
                            }}
                          />
                          <div className="absolute top-2.5 left-2.5">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold border shadow-xs ${getStatusClass(
                                formStatus
                              )}`}
                            >
                              {formStatus}
                            </span>
                          </div>
                          <div className="absolute top-2.5 right-2.5 rounded-full bg-black/75 backdrop-blur-xs text-white px-2 py-0.5 text-[9px] font-bold">
                            {formStock} units left
                          </div>
                        </div>

                        {formImages.length > 1 && (
                          <div className="flex gap-1.5 overflow-x-auto pb-1">
                            {formImages.map((thumb, idx) => (
                              <img
                                key={idx}
                                src={thumb}
                                alt="Thumbnail"
                                className={`h-10 w-9 shrink-0 rounded-lg object-cover border ${
                                  idx === 0 ? "border-[#A06E31] ring-1 ring-[#A06E31]" : "border-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* CLEAN EMPTY DROPZONE PLACEHOLDER - NO DUMMY WOMAN PHOTO! */
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-4/5 w-full rounded-xl border-2 border-dashed border-[#8B7A6C]/30 bg-[#F8F6F2] hover:bg-white hover:border-[#080808] transition flex flex-col items-center justify-center p-6 text-center cursor-pointer group"
                      >
                        <div className="h-12 w-12 rounded-full bg-white border border-[#8B7A6C]/20 flex items-center justify-center text-[#A06E31] mb-3 group-hover:scale-110 transition shadow-2xs">
                          <UploadCloudIcon />
                        </div>
                        <p className="font-bold text-xs text-[#080808]">Drop product images here</p>
                        <p className="text-[11px] text-[#8B7A6C] mt-1">or click to browse from device</p>
                        <span className="mt-3 text-[10px] font-semibold text-[#A06E31] bg-[#A06E31]/10 px-2.5 py-1 rounded-full">
                          PNG, JPG, WEBP supported
                        </span>
                      </div>
                    )}

                    {/* PRODUCT BADGES */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                      <span className="rounded bg-[#080808] px-2 py-0.5 font-bold text-white">
                        {formProductType}
                      </span>
                      <span className="rounded bg-[#D5C1A9]/40 border border-[#8B7A6C]/20 px-2 py-0.5 font-semibold text-[#5d4634]">
                        {formFitType}
                      </span>
                      <span className="rounded bg-[#F8F6F2] border border-[#8B7A6C]/20 px-2 py-0.5 text-[#5f554e]">
                        {formCategory}
                      </span>
                    </div>

                    {/* TITLE, SKU & FABRIC */}
                    <div>
                      <h4 className="font-bold text-[#080808] text-base leading-snug">
                        {formName || "Untitled Product"}
                      </h4>
                      <p className="text-[11px] text-[#8B7A6C] mt-0.5">
                        Fabric: <span className="text-[#080808] font-medium">{formFabric}</span>
                      </p>
                      <p className="text-[10px] text-[#8B7A6C] font-mono mt-0.5">
                        SKU: {formSku || "WW-NEW-01"} · {formSeason}
                      </p>
                    </div>

                    {/* PRICE */}
                    <div className="pt-2 border-t border-[#8B7A6C]/15 flex items-baseline justify-between">
                      <span className="text-lg font-black text-[#080808]">{formPrice}</span>
                      <span className="text-[10px] text-[#8B7A6C]">Cash on Delivery (COD)</span>
                    </div>

                    {/* COLOR VARIANT PREVIEW */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold text-[#8B7A6C] uppercase">
                        Colors ({formColors.length}):
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {formColors.map((c) => (
                          <div
                            key={c.name}
                            className="flex items-center gap-1 rounded-full border border-black/15 bg-[#F8F6F2] px-2 py-0.5"
                          >
                            <span
                              className="h-2.5 w-2.5 rounded-full border border-black/20"
                              style={{ backgroundColor: c.hex }}
                            />
                            <span className="text-[9px] font-semibold text-[#080808]">{c.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SIZES PREVIEW */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-[#8B7A6C] uppercase">
                          Available Sizes ({formSizes.length}):
                        </span>
                        <span className="font-semibold text-[#A06E31]">
                          {SIZE_SYSTEMS_CONFIG[formSizeSystem].label.split("(")[0]}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {formSizes.map((s) => (
                          <span
                            key={s}
                            className="rounded border border-[#8B7A6C]/30 bg-white px-2 py-0.5 text-[10px] font-bold text-[#080808]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>

            {/* STICKY BOTTOM MODAL ACTION BAR */}
            <div className="sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-3 border-t border-[#D5C1A9]/60 bg-white px-6 py-4 shadow-xs">
              {!isNewProduct && editingId ? (
                <button
                  type="button"
                  onClick={() => handleDeleteProduct(editingId)}
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 flex items-center gap-1.5 transition"
                >
                  <TrashIcon />
                  <span>Delete Product</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-[#D5C1A9]/70 bg-white px-5 py-2 text-xs font-semibold text-[#8B7A6C] hover:bg-[#FAF7F2] hover:text-[#1D1612] transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProduct}
                  className="rounded-xl bg-[#1D1612] px-6 py-2 text-xs font-bold text-white hover:bg-[#A06E31] transition shadow-xs"
                >
                  {isNewProduct ? "Create & Publish Product" : "Save Changes"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}