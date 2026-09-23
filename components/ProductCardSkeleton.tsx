import React from "react";

export default function ProductCardSkeleton() {
  return (
    <article className="group flex flex-col" aria-hidden="true">
      {/* Image Skeleton */}
      <div className="skeleton-shimmer relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-black/5 bg-[#ECE7E0]">
        {/* Subtle badge placeholder */}
        <div className="absolute left-3 top-3 h-4 w-10 rounded-sm bg-white/70" />

        {/* Wishlist round button placeholder */}
        <div className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/75 shadow-sm" />
      </div>

      {/* Product Information Skeleton */}
      <div className="pt-3 sm:pt-4 space-y-2.5">
        {/* Category line */}
        <div className="skeleton-shimmer h-2 w-16 rounded bg-[#E4DDD4]" />

        {/* Title and Price */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-1.5">
            <div className="skeleton-shimmer h-3.5 w-4/5 rounded bg-[#DFD6CC]" />
            <div className="skeleton-shimmer h-3 w-1/2 rounded bg-[#E8E2D9]" />
          </div>
          <div className="skeleton-shimmer h-3.5 w-14 shrink-0 rounded bg-[#DFD6CC]" />
        </div>

        {/* Swatches placeholder */}
        <div className="mt-2 flex items-center gap-1.5 pt-0.5">
          <div className="skeleton-shimmer h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3 bg-[#DFD6CC]" />
          <div className="skeleton-shimmer h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3 bg-[#E5DFD6]" />
          <div className="skeleton-shimmer h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3 bg-[#ECE7DF]" />
        </div>
      </div>
    </article>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-3.5 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
