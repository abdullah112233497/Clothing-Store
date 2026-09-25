import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import StoreAvailabilityGate from "@/components/StoreAvailabilityGate";
import PersistentStoreHeader from "@/components/PersistentStoreHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WEARWELL - Modern Clothing Store",
  description: "Discover the latest fashion trends and modern clothing at WEARWELL.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <StoreAvailabilityGate>
            <PersistentStoreHeader />
            {children}
          </StoreAvailabilityGate>
        </AuthProvider>
      </body>
    </html>
  );
}
