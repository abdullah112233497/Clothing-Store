"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

const STORE_ROUTES = ["/", "/shop", "/cart", "/checkout", "/order-success", "/product", "/profile"];

export default function PersistentStoreHeader() {
  const pathname = usePathname();
  const visible = STORE_ROUTES.some((route) =>
    route === "/" ? pathname === route : pathname === route || pathname.startsWith(`${route}/`),
  );

  return visible ? <Header /> : null;
}
