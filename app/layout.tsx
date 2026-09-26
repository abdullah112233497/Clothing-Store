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
      suppressHydrationWarning
    >
      <head>
        <script
          id="wearwell-first-visit-intro"
          dangerouslySetInnerHTML={{
            __html: `(function(){
              var root = document.documentElement;
              if (location.pathname.startsWith('/admin') ||
                  (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
                root.setAttribute('data-store-intro', 'skip');
                return;
              }
              root.setAttribute('data-store-intro', 'ready');
              function play() {
                requestAnimationFrame(function() {
                  root.setAttribute('data-store-intro', 'playing');
                  window.setTimeout(function() { root.setAttribute('data-store-intro', 'done'); }, 2050);
                });
              }
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', play, { once: true });
              } else play();
            })();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="store-intro" aria-hidden="true">
          <div className="store-intro__panel store-intro__panel--left">
            <span className="store-intro__wordmark">WEARWELL</span>
          </div>
          <div className="store-intro__panel store-intro__panel--right">
            <span className="store-intro__wordmark">WEARWELL</span>
          </div>
        </div>
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
