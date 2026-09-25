"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import jsPDF from "jspdf";
import { readWishlistItems, writeWishlistItems } from "@/lib/wishlist-client";

// ================= TYPES =================
type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string;
  memberSince: string;
};

type Address = {
  id: string;
  label: "Home" | "Office" | "Other";
  isDefault: boolean;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

type OrderItem = {
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
};

type Order = {
  id: string;
  date: string;
  status: "Delivered" | "Processing" | "In Transit" | "Cancelled";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  shippingAddress: string;
};

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  inStock: boolean;
};

// ================= ICONS =================
function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-3.5 w-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0c-.693.037-1.328.43-1.736 1.039l-.821 1.316Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-8 w-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
    </svg>
  );
}

function ProfileTabUrlSync({
  onTabChange,
}: {
  onTabChange: (tab: "details" | "orders" | "addresses" | "wishlist" | "security") => void;
}) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  useEffect(() => {
    if (
      tabParam &&
      ["details", "orders", "addresses", "wishlist", "security"].includes(tabParam)
    ) {
      onTabChange(tabParam as "details" | "orders" | "addresses" | "wishlist" | "security");
    }
  }, [tabParam, onTabChange]);

  return null;
}

// ================= COMPONENT =================
export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, logout, updateUser } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "details" | "orders" | "addresses" | "wishlist" | "security"
  >("details");

  useEffect(() => {
    const checkUrlTab = () => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (
        tabParam &&
        ["details", "orders", "addresses", "wishlist", "security"].includes(tabParam)
      ) {
        setActiveTab(tabParam as "details" | "orders" | "addresses" | "wishlist" | "security");
      }
    };
    checkUrlTab();
    window.addEventListener("popstate", checkUrlTab);
    return () => window.removeEventListener("popstate", checkUrlTab);
  }, []);

  // Helper: switch tab AND update URL search param so URL stays in sync
  const switchTab = (
    tab: "details" | "orders" | "addresses" | "wishlist" | "security"
  ) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
      const url = new URL(window.location.href);
      if (tab === "details") {
        url.searchParams.delete("tab");
      } else {
        url.searchParams.set("tab", tab);
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  const handleTabSelect = (
    tab: "details" | "orders" | "addresses" | "wishlist" | "security",
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    switchTab(tab);
    if (e && e.currentTarget) {
      const btn = e.currentTarget;
      const container = btn.parentElement;
      if (container) {
        const targetLeft =
          btn.offsetLeft - container.clientWidth / 2 + btn.clientWidth / 2;
        container.scrollTo({ left: targetLeft, behavior: "smooth" });
      }
    }
  };

  // User Profile State
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "Abdullah",
    lastName: "Khan",
    email: "abdullah.khan@example.com",
    phone: "+92 300 1234567",
    birthday: "1998-05-14",
    gender: "Male",
    memberSince: "November 2024",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(profile);

  // Addresses State
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "addr-1",
      label: "Home",
      isDefault: true,
      fullName: "Abdullah Khan",
      phone: "+92 300 1234567",
      street: "House 42, Street 8, Block B",
      city: "Lahore",
      postalCode: "54000",
      country: "Pakistan",
    },
    {
      id: "addr-2",
      label: "Office",
      isDefault: false,
      fullName: "Abdullah Khan",
      phone: "+92 300 1234567",
      street: "Floor 3, Tech Plaza, Main Boulevard",
      city: "Lahore",
      postalCode: "54000",
      country: "Pakistan",
    },
  ]);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<Address, "id">>({
    label: "Home",
    isDefault: false,
    fullName: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Wishlist State (Loaded dynamically from PostgreSQL)
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Passwords Form
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmPass: "",
  });

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isAnyModalOpen = Boolean(selectedOrder || showAddressModal || showLogoutModal);

  // Disable background scrolling & interaction when any modal is active
  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedOrder(null);
          setShowAddressModal(false);
          setShowLogoutModal(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [isAnyModalOpen]);

  // ================= LOAD STORED DATA & AUTH =================
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/account/login?redirect=/profile");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (user) {
      // Mirror authenticated session data into this page's editable form state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoggedIn(true);
      setProfile((prev) => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || prev.phone,
        birthday: user.birthday || prev.birthday,
        gender: user.gender || prev.gender,
        memberSince: user.memberSince || prev.memberSince,
      }));
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || prev.phone,
        birthday: user.birthday || prev.birthday,
        gender: user.gender || prev.gender,
      }));
    }
  }, [user]);

  useEffect(() => {
    // Load Avatar
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar) {
      // Hydrate the client-only avatar from browser storage after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAvatarUrl(savedAvatar);
    }

    const savedAddrs = localStorage.getItem("savedAddresses");
    if (savedAddrs) {
      try {
        const parsed = JSON.parse(savedAddrs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAddresses(parsed);
        }
      } catch (err) {
        console.error("Failed to parse savedAddresses", err);
      }
    } else {
      localStorage.setItem("savedAddresses", JSON.stringify(addresses));
    }

    // Load & sync wishlist from PostgreSQL database
    const fetchUserWishlist = async () => {
      try {
        const res = await fetch("/api/wishlist", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.items)) {
            setWishlist(data.items);
            localStorage.setItem("wishlistItems", JSON.stringify(data.items));
            return;
          }
        }
      } catch (e) {
        console.error("Failed to load wishlist from DB", e);
      }
      const savedWishlist = localStorage.getItem("wishlistItems");
      if (savedWishlist) {
        try {
          setWishlist(JSON.parse(savedWishlist));
        } catch (err) {
          console.error("Failed to parse wishlistItems", err);
        }
      }
    };

    fetchUserWishlist();

    const handleSyncWishlist = (event: Event) => {
      const customEvent = event as CustomEvent<{ items?: WishlistItem[] }>;
      if (Array.isArray(customEvent.detail?.items)) {
        setWishlist(customEvent.detail.items);
        return;
      }

      setWishlist(readWishlistItems<WishlistItem>());
    };

    window.addEventListener("wishlistUpdated", handleSyncWishlist);
    window.addEventListener("storage", handleSyncWishlist);

    // Database is the source of truth for authenticated order history.
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        if (!Array.isArray(data.orders)) return;
        setOrders(data.orders.map((order: {
          orderNumber: string; createdAt: string; status: string; items: Array<{ name: string; price: number; quantity: number; image: string; size?: string; attributes?: Record<string, string | { value?: string }> }>;
          subtotal: number; shipping: number; total: number; paymentMethod: string; customer?: { address?: string; city?: string };
        }) => ({
          id: order.orderNumber,
          date: new Date(order.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          status: order.status === "shipped" ? "In Transit" : `${order.status.charAt(0).toUpperCase()}${order.status.slice(1)}` as Order["status"],
          items: order.items.map((item) => ({ ...item, size: item.size || "—" })),
          subtotal: order.subtotal,
          shipping: order.shipping,
          total: order.total,
          paymentMethod: order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod,
          shippingAddress: [order.customer?.address, order.customer?.city].filter(Boolean).join(", "),
        })));
      } catch (error) {
        console.error("Failed to load orders from database", error);
      }
    };
    fetchOrders();

    const baseOrders: Order[] = [
      {
        id: "#WW-849102",
        date: "March 12, 2026",
        status: "Delivered",
        items: [
          {
            name: "Relaxed Fit Coat",
            price: 4500,
            size: "M",
            quantity: 1,
            image: "/images/product-1.png",
          },
          {
            name: "Everyday Sneakers",
            price: 5490,
            size: "42",
            quantity: 1,
            image: "/images/product-6.png",
          },
        ],
        subtotal: 9990,
        shipping: 0,
        total: 9990,
        paymentMethod: "Cash on Delivery",
        shippingAddress: "House 42, Street 8, Block B, Lahore",
      },
      {
        id: "#WW-710443",
        date: "February 24, 2026",
        status: "Delivered",
        items: [
          {
            name: "Classic Oversized Black Dress",
            price: 2990,
            size: "S",
            quantity: 1,
            image: "/images/product-2.png",
          },
        ],
        subtotal: 2990,
        shipping: 0,
        total: 2990,
        paymentMethod: "Credit Card",
        shippingAddress: "House 42, Street 8, Block B, Lahore",
      },
    ];

    const savedLastOrder = localStorage.getItem("lastOrder");
    const savedOrderNumber = localStorage.getItem("orderNumber") || "#WW-982105";

    if (savedLastOrder) {
      try {
        const parsedOrder = JSON.parse(savedLastOrder);
        const newLiveOrder: Order = {
          id: savedOrderNumber,
          date: "Today",
          status: "Processing",
          items: parsedOrder.items || [],
          subtotal: parsedOrder.subtotal || 0,
          shipping: parsedOrder.shipping || 0,
          total: parsedOrder.total || 0,
          paymentMethod:
            parsedOrder.paymentMethod === "cod"
              ? "Cash on Delivery"
              : "Credit / Debit Card",
          shippingAddress: parsedOrder.customer
            ? `${parsedOrder.customer.address}, ${parsedOrder.customer.city}`
            : "House 42, Street 8, Lahore",
        };

        setOrders([newLiveOrder, ...baseOrders]);

        if (parsedOrder.customer && !user) {
          const names = parsedOrder.customer.name.split(" ");
          const updated: UserProfile = {
            firstName: names[0] || "Abdullah",
            lastName: names.slice(1).join(" ") || "Khan",
            email: parsedOrder.customer.email || "abdullah.khan@example.com",
            phone: parsedOrder.customer.phone || "+92 300 1234567",
            birthday: "1998-05-14",
            gender: "Male",
            memberSince: "November 2024",
          };
          setProfile(updated);
          setFormData(updated);
        }
      } catch (e) {
        console.error("Failed to parse lastOrder", e);
        setOrders(baseOrders);
      }
    } else {
      setOrders(baseOrders);
    }
  }, []);

  // Avatar Upload Handler
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("Please choose an image smaller than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setAvatarUrl(base64);
        localStorage.setItem("userAvatar", base64);
        showToast("Profile picture updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDemoLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    showToast("Signed in as " + profile.firstName + " " + profile.lastName);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProfile(formData);
        updateUser(formData);
        setEditMode(false);
        showToast("Profile details updated successfully!");
      } else {
        showToast(data.error || "Failed to update profile.");
      }
    } catch {
      showToast("Error updating profile. Please try again.");
    }
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.fullName || !newAddress.street || !newAddress.city) {
      showToast("Please fill in all required address fields.");
      return;
    }

    const created: Address = {
      ...newAddress,
      id: "addr-" + Date.now(),
    };

    let updatedList = [...addresses];
    if (created.isDefault || updatedList.length === 0) {
      updatedList = updatedList.map((a) => ({ ...a, isDefault: false }));
      created.isDefault = true;
    }
    updatedList.push(created);

    setAddresses(updatedList);
    localStorage.setItem("savedAddresses", JSON.stringify(updatedList));
    window.dispatchEvent(new Event("addressesUpdated"));
    setShowAddressModal(false);
    setNewAddress({
      label: "Home",
      isDefault: false,
      fullName: "",
      phone: "",
      street: "",
      city: "",
      postalCode: "",
      country: "Pakistan",
    });
    showToast("New address added and saved to profile!");
  };

  const handleDeleteAddress = (id: string) => {
    const filtered = addresses.filter((a) => a.id !== id);
    if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
      filtered[0].isDefault = true;
    }
    setAddresses(filtered);
    localStorage.setItem("savedAddresses", JSON.stringify(filtered));
    window.dispatchEvent(new Event("addressesUpdated"));
    showToast("Address removed from profile.");
  };

  const handleSetDefaultAddress = (id: string) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    setAddresses(updated);
    localStorage.setItem("savedAddresses", JSON.stringify(updated));
    window.dispatchEvent(new Event("addressesUpdated"));
    const selected = updated.find((a) => a.id === id);
    showToast(`"${selected?.label || "Address"}" set as default address for checkout!`);
  };

  const handleAddToCart = (item: WishlistItem) => {
    const newItem = {
      name: item.name,
      price: item.price,
      size: "",
      quantity: 1,
      image: item.image,
    };

    const savedCart = localStorage.getItem("cartItems");
    const cartItems = savedCart ? JSON.parse(savedCart) : [];

    const existingIndex = cartItems.findIndex(
      (c: OrderItem) => c.name === newItem.name && c.size === newItem.size
    );

    if (existingIndex !== -1) {
      cartItems[existingIndex].quantity += 1;
    } else {
      cartItems.push(newItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
    showToast(`Added "${item.name}" to your shopping bag!`);
  };

  const handleRemoveWishlist = async (id: number) => {
    const target = wishlist.find((w) => w.id === id);
    const previous = wishlist;
    const updated = wishlist.filter((w) => w.id !== id);
    setWishlist(updated);
    writeWishlistItems(updated);
    showToast("Item removed from your wishlist.");

    try {
      const response = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: target?.name }),
      });

      if (!response.ok) {
        setWishlist(previous);
        writeWishlistItems(previous);
        showToast("Could not remove this item. Please try again.");
      }
    } catch (e) {
      console.error("Failed to delete wishlist item from DB", e);
      setWishlist(previous);
      writeWishlistItems(previous);
      showToast("Could not remove this item. Please try again.");
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirmPass) {
      showToast("New passwords do not match!");
      return;
    }
    if (passwords.newPass.length < 6) {
      showToast("Password must be at least 6 characters long.");
      return;
    }
    setPasswords({ current: "", newPass: "", confirmPass: "" });
    showToast("Password changed successfully!");
  };

  const handleDownloadReceipt = (order: Order) => {
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Dark Header Bar
      doc.setFillColor(8, 8, 8);
      doc.rect(0, 0, 210, 32, "F");

      // Brand Name
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("WEARWELL", 15, 18);

      doc.setFontSize(8);
      doc.setTextColor(190, 150, 90);
      doc.setFont("helvetica", "normal");
      doc.text("LUXURY APPAREL & READY TO WEAR", 15, 24);

      // Receipt badge & order ID on right
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("OFFICIAL RECEIPT", 195, 15, { align: "right" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(200, 200, 200);
      doc.text(`Order ID: ${order.id}`, 195, 21, { align: "right" });
      doc.text(`Date: ${order.date}`, 195, 26, { align: "right" });

      // Customer & Order Info Box
      doc.setFillColor(248, 246, 242);
      doc.roundedRect(15, 40, 180, 32, 2, 2, "F");

      doc.setTextColor(120, 120, 120);
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.text("CUSTOMER NAME", 20, 47);
      doc.text("PAYMENT METHOD", 110, 47);
      doc.text("DELIVERY DESTINATION", 20, 59);

      doc.setTextColor(15, 15, 15);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      const customerName = `${profile.firstName} ${profile.lastName}`.trim() || "Valued Customer";
      doc.text(customerName, 20, 53);
      doc.text(order.paymentMethod, 110, 53);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      const splitAddress = doc.splitTextToSize(order.shippingAddress || "N/A", 170);
      doc.text(splitAddress, 20, 65);

      // Table Header
      let y = 80;
      doc.setFillColor(8, 8, 8);
      doc.rect(15, y, 180, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text("ITEM DESCRIPTION", 20, y + 5.5);
      doc.text("SIZE", 120, y + 5.5);
      doc.text("QTY", 145, y + 5.5);
      doc.text("TOTAL", 190, y + 5.5, { align: "right" });

      // Items Rows
      y += 8;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(20, 20, 20);

      order.items.forEach((item, index) => {
        if (index % 2 === 1) {
          doc.setFillColor(252, 252, 252);
          doc.rect(15, y, 180, 9, "F");
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.text(item.name, 20, y + 6);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.text(item.size || "M", 120, y + 6);
        doc.text(String(item.quantity), 145, y + 6);
        doc.text(`Rs. ${(item.price * item.quantity).toLocaleString()}`, 190, y + 6, { align: "right" });

        doc.setDrawColor(240, 240, 240);
        doc.line(15, y + 9, 195, y + 9);
        y += 9;
      });

      // Price Summary
      y += 6;
      const summaryX = 120;
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(90, 90, 90);

      doc.text("Subtotal:", summaryX, y);
      doc.setTextColor(15, 15, 15);
      doc.text(`Rs. ${order.subtotal.toLocaleString()}`, 190, y, { align: "right" });

      y += 6;
      doc.setTextColor(90, 90, 90);
      doc.text("Express Shipping:", summaryX, y);
      doc.setTextColor(22, 163, 74);
      doc.setFont("helvetica", "bold");
      doc.text("FREE", 190, y, { align: "right" });

      y += 7;
      doc.setDrawColor(8, 8, 8);
      doc.setLineWidth(0.3);
      doc.line(summaryX, y - 2, 195, y - 2);

      doc.setFontSize(10.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(8, 8, 8);
      doc.text("Total Paid:", summaryX, y + 4);
      doc.text(`Rs. ${order.total.toLocaleString()}`, 190, y + 4, { align: "right" });

      // Guarantee footer
      y += 24;
      doc.setFillColor(248, 246, 242);
      doc.roundedRect(15, y, 180, 16, 2, 2, "F");
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "normal");
      doc.text("GUARANTEE: 14-Day Hassle-Free Returns & Exchanges across Pakistan.", 20, y + 7);
      doc.text("Customer Care: support@wearwell.pk | Official E-Commerce Store", 20, y + 12);

      // Download file directly
      const cleanId = order.id.replace(/[^a-zA-Z0-9-_]/g, "");
      doc.save(`WEARWELL-Receipt-${cleanId}.pdf`);
      showToast("Receipt PDF downloaded successfully!");
    } catch (err) {
      console.error("PDF generation failed", err);
      showToast("Failed to generate PDF. Please try again.");
    }
  };

  const handleConfirmLogout = async () => {
    setShowLogoutModal(false);
    showToast("Signing out...");
    await logout();
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
            WEARWELL
          </p>
          <div className="mt-4 mx-auto h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
          <p className="mt-3 text-sm text-gray-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#080808] overflow-x-hidden w-full max-w-full relative">
      {/* Background Page Content - Disabled, inert and visually dimmed when any modal is open */}
      <div
        className={`transition-[filter,opacity] duration-200 ${
          isAnyModalOpen ? "pointer-events-none select-none filter blur-[1px] opacity-60" : ""
        }`}
        aria-hidden={isAnyModalOpen ? true : undefined}
      >
      {/* Sync URL ?tab= parameter to active tab (reacts to client-side navigation) */}
      <Suspense fallback={null}>
        <ProfileTabUrlSync onTabChange={setActiveTab} />
      </Suspense>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-black px-5 py-3.5 text-xs font-medium tracking-wide text-white shadow-2xl">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black border border-white/20 text-white">
            <CheckIcon />
          </span>
          {toastMessage}
        </div>
      )}

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 w-full max-w-full">
        
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-black font-semibold">My Account</span>
        </nav>

        {/* ================= LOGGED IN DASHBOARD ================= */}
        <div>
            
            {/* ================= SEAMLESS MOBILE PROFILE HEADER (< lg screens) ================= */}
            <div className="block lg:hidden border-b border-gray-100 pb-8 mb-8 text-center">
              
              {/* Centered Avatar with Camera Upload Badge */}
              <div className="relative mx-auto h-24 w-24">
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-gray-100 bg-black text-white flex items-center justify-center text-3xl font-bold tracking-wider shadow-md">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    <span>{profile.firstName[0]}{profile.lastName[0]}</span>
                  )}
                </div>

                <label
                  htmlFor="mobile-avatar-upload-clean"
                  className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black text-white shadow-lg border-2 border-white transition hover:scale-110 active:scale-95"
                  title="Upload Profile Picture"
                >
                  <CameraIcon />
                  <input
                    id="mobile-avatar-upload-clean"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>

              {/* Name & Email */}
              <h2 className="mt-4 text-xl font-bold tracking-tight text-gray-900">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                {profile.email}
              </p>

              {/* Mobile Stats Row (Orders | Wishlist | Addresses) */}
              <div className="mt-6 flex items-center justify-center gap-8 border-y border-gray-100 py-3.5">
                <button
                  onClick={() => switchTab("orders")}
                  className="text-center group"
                >
                  <p className="text-lg font-bold text-gray-900 group-hover:text-black transition">
                    {orders.length}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Orders
                  </p>
                </button>

                <div className="h-6 w-px bg-gray-200" />

                <button
                  onClick={() => switchTab("wishlist")}
                  className="text-center group"
                >
                  <p className="text-lg font-bold text-gray-900 group-hover:text-black transition">
                    {wishlist.length}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Wishlist
                  </p>
                </button>

                <div className="h-6 w-px bg-gray-200" />

                <button
                  onClick={() => switchTab("addresses")}
                  className="text-center group"
                >
                  <p className="text-lg font-bold text-gray-900 group-hover:text-black transition">
                    {addresses.length}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Addresses
                  </p>
                </button>
              </div>

              {/* Mobile Action Bar */}
              <div className="mt-5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === "details" && editMode) {
                      setEditMode(false);
                    } else {
                      switchTab("details");
                      setFormData(profile);
                      setEditMode(true);
                    }
                  }}
                  className={`flex-1 inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-xs font-semibold tracking-wide transition active:scale-[0.98] ${
                    activeTab === "details" && editMode
                      ? "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 shadow-xs"
                      : "bg-black text-white shadow-sm hover:bg-neutral-800"
                  }`}
                >
                  {activeTab === "details" && editMode ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-3.5 w-3.5 text-gray-500"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                      <span>Cancel</span>
                    </>
                  ) : (
                    <>
                      <EditIcon />
                      <span>Edit Profile</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                      showToast("Profile link copied!");
                    }
                  }}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 text-xs font-medium tracking-wide text-gray-700 shadow-xs transition hover:border-black hover:text-black hover:bg-gray-50 active:scale-[0.98]"
                  title="Share Profile"
                >
                  <ShareIcon />
                  <span>Share</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowLogoutModal(true)}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-xs transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-[0.98]"
                  title="Sign Out"
                >
                  <LogOutIcon />
                </button>
              </div>

              {/* Mobile Segmented Navigation Tabs */}
              <div className="mt-6 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-1 px-1">
                  {/* Details */}
                  <button
                    type="button"
                    onClick={(e) => handleTabSelect("details", e)}
                    className={`inline-flex items-center gap-2 shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 ${
                      activeTab === "details"
                        ? "bg-black text-white shadow-sm ring-1 ring-black"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200/80 hover:text-black"
                    }`}
                  >
                    <UserIcon />
                    <span>Details</span>
                  </button>

                  {/* Orders */}
                  <button
                    type="button"
                    onClick={(e) => handleTabSelect("orders", e)}
                    className={`inline-flex items-center gap-2 shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 ${
                      activeTab === "orders"
                        ? "bg-black text-white shadow-sm ring-1 ring-black"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200/80 hover:text-black"
                    }`}
                  >
                    <PackageIcon />
                    <span>Orders</span>
                    {orders.length > 0 && (
                      <span
                        className={`inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                          activeTab === "orders" ? "bg-white/25 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {orders.length}
                      </span>
                    )}
                  </button>

                  {/* Addresses */}
                  <button
                    type="button"
                    onClick={(e) => handleTabSelect("addresses", e)}
                    className={`inline-flex items-center gap-2 shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 ${
                      activeTab === "addresses"
                        ? "bg-black text-white shadow-sm ring-1 ring-black"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200/80 hover:text-black"
                    }`}
                  >
                    <MapPinIcon />
                    <span>Addresses</span>
                    {addresses.length > 0 && (
                      <span
                        className={`inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                          activeTab === "addresses" ? "bg-white/25 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {addresses.length}
                      </span>
                    )}
                  </button>

                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={(e) => handleTabSelect("wishlist", e)}
                    className={`inline-flex items-center gap-2 shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 ${
                      activeTab === "wishlist"
                        ? "bg-black text-white shadow-sm ring-1 ring-black"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200/80 hover:text-black"
                    }`}
                  >
                    <HeartIcon />
                    <span>Wishlist</span>
                    {wishlist.length > 0 && (
                      <span
                        className={`inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-bold ${
                          activeTab === "wishlist" ? "bg-white/25 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {wishlist.length}
                      </span>
                    )}
                  </button>

                  {/* Settings */}
                  <button
                    type="button"
                    onClick={(e) => handleTabSelect("security", e)}
                    className={`inline-flex items-center gap-2 shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 ${
                      activeTab === "security"
                        ? "bg-black text-white shadow-sm ring-1 ring-black"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200/80 hover:text-black"
                    }`}
                  >
                    <ShieldCheckIcon />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ================= MAIN DESKTOP 2-COLUMN LUXURY DASHBOARD (≥ lg screens) ================= */}
            <div className="grid gap-8 lg:grid-cols-[280px_1fr] items-start">
              
              {/* DESKTOP SIDEBAR (Hidden on Mobile < lg) - Clean Seamless Column */}
              <aside
                className="hidden lg:flex flex-col justify-between border-r border-gray-100 pr-8 sticky top-28 self-start"
                style={{ height: "calc(100vh - 140px)", minHeight: "calc(100vh - 140px)" }}
              >
                <div>
                  {/* User Profile Card Header */}
                  <div className="border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 flex-shrink-0">
                        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-black text-lg font-bold text-white tracking-wider border border-gray-200 shadow-sm">
                          {avatarUrl ? (
                            <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                          ) : (
                            <span>{profile.firstName[0]}{profile.lastName[0]}</span>
                          )}
                        </div>

                        <label
                          htmlFor="desktop-avatar-upload-clean"
                          className="absolute -bottom-1 -right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black text-white shadow border border-white transition hover:scale-110"
                          title="Upload Picture"
                        >
                          <CameraIcon />
                          <input
                            id="desktop-avatar-upload-clean"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                          />
                        </label>
                      </div>

                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                          Welcome back
                        </span>
                        <h2 className="text-base font-bold text-gray-900 leading-tight truncate">
                          {profile.firstName} {profile.lastName}
                        </h2>
                        <p className="mt-0.5 text-xs text-gray-500 truncate">
                          {profile.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Navigation */}
                  <nav className="mt-6 flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => switchTab("details")}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-wider transition ${
                        activeTab === "details"
                          ? "bg-black text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100 hover:text-black"
                      }`}
                    >
                      <UserIcon />
                      My Details
                    </button>

                    <button
                      type="button"
                      onClick={() => switchTab("orders")}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-wider transition ${
                        activeTab === "orders"
                          ? "bg-black text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100 hover:text-black"
                      }`}
                    >
                      <PackageIcon />
                      My Orders ({orders.length})
                    </button>

                    <button
                      type="button"
                      onClick={() => switchTab("addresses")}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-wider transition ${
                        activeTab === "addresses"
                          ? "bg-black text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100 hover:text-black"
                      }`}
                    >
                      <MapPinIcon />
                      Saved Addresses ({addresses.length})
                    </button>

                    <button
                      type="button"
                      onClick={() => switchTab("wishlist")}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-wider transition ${
                        activeTab === "wishlist"
                          ? "bg-black text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100 hover:text-black"
                      }`}
                    >
                      <HeartIcon />
                      Wishlist ({wishlist.length})
                    </button>

                    <button
                      type="button"
                      onClick={() => switchTab("security")}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-wider transition ${
                        activeTab === "security"
                          ? "bg-black text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100 hover:text-black"
                      }`}
                    >
                      <ShieldCheckIcon />
                      Security & Settings
                    </button>
                  </nav>
                </div>

                {/* Sidebar Sign Out */}
                <div className="mt-auto border-t border-gray-100 pt-6">
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/50 py-3 text-xs font-semibold uppercase tracking-wider text-red-600 transition hover:bg-red-100"
                  >
                    <LogOutIcon />
                    Sign Out
                  </button>
                </div>
              </aside>

              {/* RIGHT CONTENT PANEL */}
              <div className="min-h-[500px]">
                
                {/* ================= TAB 1: MY DETAILS ================= */}
                {activeTab === "details" && (
                  <section className="space-y-6">
                    {/* Single Clean Section Header */}
                    <div className="border-b border-gray-100 pb-5 mb-6">
                      <div className="flex items-center justify-between gap-4">
                        <h1 className="text-base sm:text-xl font-bold uppercase tracking-wider text-gray-900">
                          My Details
                        </h1>

                        {!editMode ? (
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(profile);
                              setEditMode(true);
                            }}
                            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap shrink-0 shadow-xs transition hover:bg-neutral-800 active:scale-95"
                          >
                            <EditIcon />
                            <span>Edit Details</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="hidden lg:inline-flex text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-black whitespace-nowrap shrink-0"
                          >
                            Cancel
                          </button>
                        )}
                      </div>

                      <p className="mt-1.5 text-xs text-gray-500">
                        Manage your personal account details and contact information.
                      </p>
                    </div>

                    {!editMode ? (
                      <div className="mt-8 space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div className="border-b border-gray-100 pb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                              First Name
                            </span>
                            <p className="mt-1 text-sm font-semibold text-gray-900">
                              {profile.firstName}
                            </p>
                          </div>

                          <div className="border-b border-gray-100 pb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                              Last Name
                            </span>
                            <p className="mt-1 text-sm font-semibold text-gray-900">
                              {profile.lastName}
                            </p>
                          </div>

                          <div className="border-b border-gray-100 pb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                              Email Address
                            </span>
                            <p className="mt-1 text-sm font-semibold text-gray-900">
                              {profile.email}
                            </p>
                          </div>

                          <div className="border-b border-gray-100 pb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                              Phone Number
                            </span>
                            <p className="mt-1 text-sm font-semibold text-gray-900">
                              {profile.phone}
                            </p>
                          </div>

                          <div className="border-b border-gray-100 pb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                              Date of Birth
                            </span>
                            <p className="mt-1 text-sm font-semibold text-gray-900">
                              {profile.birthday}
                            </p>
                          </div>

                          <div className="border-b border-gray-100 pb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                              Gender
                            </span>
                            <p className="mt-1 text-sm font-semibold text-gray-900">
                              {profile.gender}
                            </p>
                          </div>
                        </div>

                        {/* Account Summary Strip */}
                        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50/70 p-5">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                              WEARWELL ACCOUNT
                            </span>
                            <h3 className="mt-0.5 text-sm font-bold text-gray-900">
                              Active Customer Profile
                            </h3>
                            <p className="text-xs text-gray-500">
                              Member since {profile.memberSince}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setFormData(profile);
                              setEditMode(true);
                            }}
                            className="rounded-xl border border-black bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black hover:bg-black hover:text-white transition"
                          >
                            Update Profile Info
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* EDIT FORM */
                      <form onSubmit={handleSaveProfile} className="mt-8 space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-700">
                              First Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.firstName}
                              onChange={(e) =>
                                setFormData({ ...formData, firstName: e.target.value })
                              }
                              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-700">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.lastName}
                              onChange={(e) =>
                                setFormData({ ...formData, lastName: e.target.value })
                              }
                              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-700">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-700">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-700">
                              Date of Birth
                            </label>
                            <input
                              type="date"
                              value={formData.birthday}
                              onChange={(e) =>
                                setFormData({ ...formData, birthday: e.target.value })
                              }
                              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-700">
                              Gender
                            </label>
                            <select
                              value={formData.gender}
                              onChange={(e) =>
                                setFormData({ ...formData, gender: e.target.value })
                              }
                              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                          <button
                            type="submit"
                            className="rounded-xl bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-gray-800"
                          >
                            Save Changes
                          </button>

                          <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="rounded-xl border border-gray-300 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-700 transition hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </section>
                )}

                {/* ================= TAB 2: MY ORDERS ================= */}
                {activeTab === "orders" && (
                  <section className="space-y-6">
                    <div className="border-b border-gray-100 pb-5 mb-6">
                      <div className="flex items-center justify-between gap-4">
                        <h1 className="text-base sm:text-xl font-bold uppercase tracking-wider text-gray-900">
                          My Orders
                        </h1>

                        <Link
                          href="/shop"
                          className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap shrink-0 shadow-xs transition hover:bg-neutral-800 active:scale-95"
                        >
                          Shop Catalog
                        </Link>
                      </div>

                      <p className="mt-1.5 text-xs text-gray-500">
                        Track active shipments and view your purchase history.
                      </p>
                    </div>

                    {orders.length === 0 ? (
                      <div className="p-12 text-center">
                        <p className="text-sm font-semibold text-gray-900">
                          No orders placed yet
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Explore our latest catalog and place your first order.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-6 space-y-4">
                        {orders.map((order) => (
                          <div
                            key={order.id}
                            className="rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6 transition hover:shadow-sm"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
                              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                <div>
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                    Order ID
                                  </span>
                                  <p className="text-sm font-bold text-gray-900">
                                    {order.id}
                                  </p>
                                </div>

                                <div>
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                    Date
                                  </span>
                                  <p className="text-xs font-medium text-gray-700">
                                    {order.date}
                                  </p>
                                </div>

                                <div>
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                    Total
                                  </span>
                                  <p className="text-xs font-bold text-gray-900">
                                    Rs. {order.total.toLocaleString()}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <span
                                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-amber-100 text-amber-800"
                                  }`}
                                >
                                  {order.status}
                                </span>

                                <button
                                  onClick={() => setSelectedOrder(order)}
                                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-black hover:text-black"
                                >
                                  Receipt
                                </button>
                              </div>
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                              {order.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-3 rounded-xl border border-gray-100 p-2.5"
                                >
                                  <img
                                    src={item.image || "/images/product-1.png"}
                                    alt={item.name}
                                    className="h-12 w-12 rounded-lg object-cover bg-gray-50 flex-shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <h4 className="truncate text-xs font-semibold text-gray-900">
                                      {item.name}
                                    </h4>
                                    <p className="text-[11px] text-gray-500">
                                      Size: {item.size} • Qty: {item.quantity}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                )}

                {/* ================= TAB 3: SAVED ADDRESSES ================= */}
                {activeTab === "addresses" && (
                  <section className="space-y-6">
                    <div className="border-b border-gray-100 pb-5 mb-6">
                      <div className="flex items-center justify-between gap-4">
                        <h1 className="text-base sm:text-xl font-bold uppercase tracking-wider text-gray-900">
                          Saved Addresses
                        </h1>

                        <button
                          type="button"
                          onClick={() => setShowAddressModal(true)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white whitespace-nowrap shrink-0 shadow-xs transition hover:bg-neutral-800 active:scale-95"
                        >
                          <PlusIcon />
                          <span>Add Address</span>
                        </button>
                      </div>

                      <p className="mt-1.5 text-xs text-gray-500">
                        Manage your delivery addresses for seamless checkout.
                      </p>
                    </div>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      {addresses.map((addr) => (
                        <div
                          key={addr.id}
                          onClick={() => handleSetDefaultAddress(addr.id)}
                          className={`group flex flex-col justify-between rounded-2xl border p-6 transition cursor-pointer select-none ${
                            addr.isDefault
                              ? "border-black bg-white ring-2 ring-black shadow-md"
                              : "border-gray-200 bg-white hover:border-black/60 hover:shadow-xs"
                          }`}
                          title={addr.isDefault ? "Currently selected for checkout" : "Click to select this address for checkout"}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-700">
                                {addr.label}
                              </span>

                              {addr.isDefault ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-black px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white shadow-xs">
                                  <CheckIcon />
                                  <span>In Use (Default)</span>
                                </span>
                              ) : (
                                <span className="text-[10px] font-semibold text-gray-400 group-hover:text-black transition">
                                  Click to use this
                                </span>
                              )}
                            </div>

                            <h3 className="mt-4 text-sm font-bold text-gray-900">
                              {addr.fullName}
                            </h3>
                            <p className="text-xs text-gray-500">{addr.phone}</p>

                            <p className="mt-3 text-xs leading-relaxed text-gray-700">
                              {addr.street}
                              <br />
                              {addr.city} {addr.postalCode}
                            </p>
                          </div>

                          <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                            {addr.isDefault ? (
                              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A06E31]">
                                <span className="h-2 w-2 rounded-full bg-[#A06E31] animate-pulse" />
                                <span>Active for Checkout</span>
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSetDefaultAddress(addr.id);
                                }}
                                className="text-xs font-semibold text-gray-600 hover:text-black transition underline underline-offset-2"
                              >
                                Make Default
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAddress(addr.id);
                              }}
                              className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                              title="Delete address"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                      ))}

                      {addresses.length === 0 && (
                        <div className="col-span-full rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-3">
                            <MapPinIcon />
                          </div>
                          <h3 className="text-sm font-bold text-gray-900">No saved addresses</h3>
                          <p className="text-xs text-gray-500 mt-1 mb-4">Add your shipping addresses for seamless 1-click checkout.</p>
                          <button
                            type="button"
                            onClick={() => setShowAddressModal(true)}
                            className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-xs transition hover:bg-neutral-800"
                          >
                            <PlusIcon />
                            <span>Add First Address</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {/* ================= TAB 4: WISHLIST ================= */}
                {activeTab === "wishlist" && (
                  <section className="space-y-6">
                    <div className="border-b border-gray-100 pb-5 mb-6">
                      <div className="flex items-center justify-between gap-4">
                        <h1 className="text-base sm:text-xl font-bold uppercase tracking-wider text-gray-900">
                          My Wishlist
                        </h1>

                        <Link
                          href="/shop"
                          className="inline-flex items-center gap-1.5 rounded-full border border-black bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black whitespace-nowrap shrink-0 hover:bg-black hover:text-white transition active:scale-95"
                        >
                          Browse Store
                        </Link>
                      </div>

                      <p className="mt-1.5 text-xs text-gray-500">
                        Saved items to buy later or add to bag.
                      </p>
                    </div>

                    {wishlist.length === 0 ? (
                      <div className="p-12 text-center">
                        <p className="text-sm font-semibold text-gray-900">
                          Your wishlist is empty
                        </p>
                      </div>
                    ) : (
                      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {wishlist.map((item) => (
                          <div
                            key={item.id}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 transition hover:shadow-md"
                          >
                            <div>
                              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <button
                                  onClick={() => handleRemoveWishlist(item.id)}
                                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow transition hover:bg-red-50 hover:text-red-600"
                                  title="Remove"
                                >
                                  <TrashIcon />
                                </button>
                              </div>

                              <div className="mt-4">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                                  {item.category}
                                </p>
                                <h3 className="mt-1 truncate text-sm font-bold text-gray-900">
                                  {item.name}
                                </h3>

                                <div className="mt-2 flex items-center gap-2">
                                  <span className="text-sm font-bold text-gray-900">
                                    Rs. {item.price.toLocaleString()}
                                  </span>
                                  {item.originalPrice && (
                                    <span className="text-xs text-gray-400 line-through">
                                      Rs. {item.originalPrice.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => handleAddToCart(item)}
                              className="mt-4 w-full rounded-xl bg-black py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-gray-800"
                            >
                              Add to Bag
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                )}

                {/* ================= TAB 5: SECURITY & SETTINGS ================= */}
                {activeTab === "security" && (
                  <section className="space-y-6">
                    <div className="border-b border-gray-100 pb-5 mb-6">
                      <h1 className="text-base sm:text-xl font-bold uppercase tracking-wider text-gray-900">
                        Security & Settings
                      </h1>
                      <p className="mt-1.5 text-xs text-gray-500">
                        Manage your password and account security preferences.
                      </p>
                    </div>

                    <form onSubmit={handlePasswordSubmit} className="mt-6 max-w-md space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        Change Password
                      </h3>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-700">
                          Current Password
                        </label>
                        <input
                          type="password"
                          required
                          value={passwords.current}
                          onChange={(e) =>
                            setPasswords({ ...passwords, current: e.target.value })
                          }
                          placeholder="••••••••"
                          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-700">
                          New Password
                        </label>
                        <input
                          type="password"
                          required
                          value={passwords.newPass}
                          onChange={(e) =>
                            setPasswords({ ...passwords, newPass: e.target.value })
                          }
                          placeholder="At least 6 characters"
                          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-700">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          required
                          value={passwords.confirmPass}
                          onChange={(e) =>
                            setPasswords({ ...passwords, confirmPass: e.target.value })
                          }
                          placeholder="Repeat new password"
                          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-black"
                        />
                      </div>

                      <button
                        type="submit"
                        className="rounded-xl bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-gray-800"
                      >
                        Update Password
                      </button>
                    </form>
                  </section>
                )}

              </div>
            </div>
          </div>
        </main>

        {/* ================= UNIFIED LUXURY FOOTER ================= */}
        <Footer />
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-black px-5 py-3.5 text-xs font-medium tracking-wide text-white shadow-2xl">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black border border-white/20 text-white">
            <CheckIcon />
          </span>
          {toastMessage}
        </div>
      )}

      {/* ================= ORDER DETAILS MODAL ================= */}
      {selectedOrder && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedOrder(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto"
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  WEARWELL RECEIPT
                </p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  Order {selectedOrder.id}
                </h3>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-black"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <div className="flex items-center justify-between rounded-xl bg-gray-50 border border-gray-100 p-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400">
                    Status
                  </span>
                  <p className="text-sm font-bold text-gray-900">
                    {selectedOrder.status}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400">
                    Payment Method
                  </span>
                  <p className="text-xs font-semibold text-gray-900">
                    {selectedOrder.paymentMethod}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Items ({selectedOrder.items.length})
                </h4>
                <div className="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-100">
                  {selectedOrder.items.map((it, i) => (
                    <div key={i} className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={it.image || "/images/product-1.png"}
                          alt={it.name}
                          className="h-14 w-14 rounded-lg object-cover bg-gray-50"
                        />
                        <div>
                          <p className="text-xs font-bold text-gray-900">
                            {it.name}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            Size: {it.size} • Qty: {it.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-gray-900">
                        Rs. {(it.price * it.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Shipping Destination
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-gray-600 rounded-xl bg-gray-50 p-4">
                  {selectedOrder.shippingAddress}
                </p>
              </div>

              <div className="space-y-2 border-t pt-4 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {selectedOrder.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-sm font-bold text-gray-900">
                  <span>Total Paid</span>
                  <span>Rs. {selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">
              <button
                onClick={() => handleDownloadReceipt(selectedOrder)}
                className="inline-flex items-center gap-2 rounded-xl border border-black bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-black transition hover:bg-black hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Receipt
              </button>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl bg-black px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-gray-800"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD ADDRESS MODAL ================= */}
      {showAddressModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddressModal(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto"
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Add New Shipping Address
              </h3>
              <button
                onClick={() => setShowAddressModal(false)}
                className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-black"
              >
                <CloseIcon />
              </button>
            </div>

            <form onSubmit={handleAddAddress} className="mt-6 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {(["Home", "Office", "Other"] as const).map((lbl) => (
                  <button
                    key={lbl}
                    type="button"
                    onClick={() => setNewAddress({ ...newAddress, label: lbl })}
                    className={`rounded-xl border py-2.5 text-xs font-semibold uppercase tracking-wider transition ${
                      newAddress.label === lbl
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-black"
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Abdullah Khan"
                  value={newAddress.fullName}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, fullName: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+92 300 1234567"
                  value={newAddress.phone}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, phone: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-black"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="House / Apartment, Street"
                  value={newAddress.street}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, street: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-700">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lahore"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 54000"
                    value={newAddress.postalCode}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, postalCode: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-black"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 pt-2 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newAddress.isDefault}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, isDefault: e.target.checked })
                  }
                  className="h-4 w-4 accent-black"
                />
                <span>Set as default shipping address</span>
              </label>

              <div className="mt-6 flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-black py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-gray-800"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="rounded-xl border border-gray-300 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= LOGOUT CONFIRMATION MODAL ================= */}
      {showLogoutModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowLogoutModal(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto"
        >
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <LogOutIcon />
            </div>

            <h3 className="mt-4 text-xl font-bold text-gray-900">
              Sign out of WEARWELL?
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-gray-500">
              Are you sure you want to sign out? You will need to log back in to access your account.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleConfirmLogout}
                className="flex-1 rounded-xl bg-red-600 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-red-700"
              >
                Yes, Sign Out
              </button>

              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 rounded-xl border border-gray-300 py-3 text-xs font-semibold uppercase tracking-wider text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
