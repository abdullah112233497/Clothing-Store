import React from "react";
import Footer from "./Footer";

export default function ProductDetailSkeleton() {
  return (
    <>
      <main className="min-h-screen bg-[#F8F6F2]">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb Skeleton */}
          <div className="mb-8 flex items-center gap-2">
            <div className="skeleton-shimmer h-3 w-12 rounded" />
            <span className="text-gray-300">/</span>
            <div className="skeleton-shimmer h-3 w-12 rounded" />
            <span className="text-gray-300">/</span>
            <div className="skeleton-shimmer h-3 w-32 rounded" />
          </div>

          {/* Product Hero Layout */}
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* Gallery Column */}
            <div className="grid gap-4 sm:grid-cols-[82px_1fr]">
              {/* Thumbnails */}
              <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:flex-col">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="skeleton-shimmer h-24 w-20 shrink-0 rounded-lg border border-black/5 bg-[#EAE5DE]"
                  />
                ))}
              </div>

              {/* Main Image */}
              <div className="skeleton-shimmer relative order-1 aspect-[3/4] w-full overflow-hidden rounded-2xl border border-black/5 bg-[#EAE5DE] sm:order-2" />
            </div>

            {/* Information Column */}
            <div className="flex flex-col justify-start space-y-6">
              {/* Category & Badge */}
              <div className="flex items-center gap-2">
                <div className="skeleton-shimmer h-3 w-20 rounded" />
                <div className="skeleton-shimmer h-5 w-16 rounded-full" />
              </div>

              {/* Title & Price */}
              <div className="space-y-3">
                <div className="skeleton-shimmer h-8 w-4/5 rounded-md" />
                <div className="skeleton-shimmer h-4 w-1/3 rounded" />
                <div className="flex items-center gap-3 pt-2">
                  <div className="skeleton-shimmer h-7 w-28 rounded-md" />
                  <div className="skeleton-shimmer h-5 w-20 rounded" />
                </div>
              </div>

              <div className="border-t border-black/10 pt-5 space-y-4">
                {/* Color swatches */}
                <div className="space-y-2">
                  <div className="skeleton-shimmer h-3 w-24 rounded" />
                  <div className="flex gap-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="skeleton-shimmer h-8 w-8 rounded-full border border-black/10"
                      />
                    ))}
                  </div>
                </div>

                {/* Size options */}
                <div className="space-y-2 pt-2">
                  <div className="skeleton-shimmer h-3 w-20 rounded" />
                  <div className="flex flex-wrap gap-2">
                    {["XS", "S", "M", "L", "XL"].map((s) => (
                      <div
                        key={s}
                        className="skeleton-shimmer h-10 w-14 rounded-xl border border-black/10"
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity & CTA Buttons */}
                <div className="space-y-3 pt-4">
                  <div className="skeleton-shimmer h-12 w-full rounded-xl" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="skeleton-shimmer h-12 w-full rounded-xl" />
                    <div className="skeleton-shimmer h-12 w-full rounded-xl" />
                  </div>
                </div>

                {/* Perks strip */}
                <div className="grid grid-cols-3 gap-2 pt-4">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="skeleton-shimmer h-16 rounded-xl border border-black/5 bg-white"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
