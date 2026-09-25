
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">

      {/* ================= HEADER ================= */}


      {/* ================= HERO SECTION ================= */}
      <section className="relative flex min-h-[540px] sm:min-h-[600px] md:h-[750px] items-end overflow-hidden bg-black text-white">

        {/* Original Hero Image - adjusted focal positioning for mobile screens */}
        <img
          src="/images/hero-fashion.png"
          alt="WEARWELL Fashion Collection"
          className="absolute inset-0 h-full w-full object-cover object-[24%_25%] md:object-center"
        />

        {/* Dynamic Contrast Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-9 pt-14 sm:px-8 sm:pb-14 md:px-10 md:pb-20">

          <div className="max-w-2xl">

            <p className="mb-2 sm:mb-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-white/90">
              WEARWELL — Autumn / Winter 2026
            </p>

            <h1 className="text-3xl sm:text-5xl md:text-7xl font-semibold leading-[1.05] sm:leading-[0.95] tracking-tight text-white">
              Everyday
              <br />
              <span className="font-normal italic text-white/95">
                Elegance.
              </span>
            </h1>

            <p className="mt-2.5 sm:mt-5 max-w-lg text-xs sm:text-base leading-relaxed text-white/80">
              Discover modern essentials designed for effortless everyday style.
            </p>

            {/* Responsive Action Buttons */}
            <div className="mt-5 sm:mt-8 flex flex-row items-center gap-2.5 sm:gap-3.5">

              <a
                href="/shop"
                className="flex-1 sm:flex-initial rounded-xl bg-white px-5 py-3 sm:px-8 sm:py-3.5 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider text-black shadow-lg transition hover:bg-[#A06E31] hover:text-white"
              >
                Shop Collection
              </a>

              <a
                href="/categories"
                className="flex-1 sm:flex-initial rounded-xl border border-white/80 bg-white/10 backdrop-blur-sm px-5 py-3 sm:px-8 sm:py-3.5 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-black"
              >
                Explore
              </a>

            </div>

          </div>

        </div>

        {/* Bottom Label (Desktop only) */}
        <div className="absolute bottom-8 right-8 z-10 hidden text-right sm:block">

          <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold">
            New Collection
          </p>

          <p className="mt-0.5 text-sm font-bold text-white">
            2026
          </p>

        </div>

      </section>


      {/* ================= PROMO STRIP ================= */}
      <section className="border-b border-black/10 bg-[#080808] py-4 text-white">

        <div className="mx-auto flex max-w-7xl items-center justify-center px-6">

          <p className="text-center text-xs font-medium uppercase tracking-[0.25em] sm:text-sm">
            Free Shipping on Orders Over Rs. 5,000
          </p>

        </div>

      </section>


      {/* ================= CATEGORIES ================= */}
      <section className="bg-[#F8F6F2] px-4 py-12 sm:px-6 sm:py-20 md:px-10">

        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>

              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#A06E31]">
                Explore
              </p>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Shop by Category
              </h2>

            </div>

            <a
              href="/categories"
              className="text-sm font-medium underline underline-offset-4 transition hover:text-[#A06E31]"
            >
              View All
            </a>

          </div>


          {/* Category Cards - 2 Columns on Small Devices */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">

            {/* WOMEN */}
            <a
              href="/shop?category=women"
              className="group relative overflow-hidden rounded-2xl bg-black transition duration-500 hover:-translate-y-1 shadow-sm"
            >
              <div className="relative min-h-[220px] sm:min-h-[340px] w-full p-5 sm:p-8 flex flex-col justify-between text-white">
                <img
                  src="/images/women-category.png"
                  alt="Women's Collection"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />

                <div className="relative z-10">
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                    Collection 01
                  </p>

                  <h3 className="mt-1 sm:mt-2 text-xl sm:text-3xl font-bold tracking-tight text-white">
                    Women
                  </h3>
                </div>

                <div className="relative z-10 mt-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/10 backdrop-blur-md px-3.5 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white transition duration-300 group-hover:bg-white group-hover:text-black">
                    Shop Now →
                  </span>
                </div>
              </div>
            </a>

            {/* MEN */}
            <a
              href="/shop?category=men"
              className="group relative overflow-hidden rounded-2xl bg-black transition duration-500 hover:-translate-y-1 shadow-sm"
            >
              <div className="relative min-h-[220px] sm:min-h-[340px] w-full p-5 sm:p-8 flex flex-col justify-between text-white">
                <img
                  src="/images/men-category.png"
                  alt="Men's Collection"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />

                <div className="relative z-10">
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                    Collection 02
                  </p>

                  <h3 className="mt-1 sm:mt-2 text-xl sm:text-3xl font-bold tracking-tight text-white">
                    Men
                  </h3>
                </div>

                <div className="relative z-10 mt-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/10 backdrop-blur-md px-3.5 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white transition duration-300 group-hover:bg-white group-hover:text-black">
                    Shop Now →
                  </span>
                </div>
              </div>
            </a>

            {/* ACCESSORIES */}
            <a
              href="/shop?category=accessories"
              className="group relative col-span-2 sm:col-span-1 overflow-hidden rounded-2xl bg-black transition duration-500 hover:-translate-y-1 shadow-sm"
            >
              <div className="relative min-h-[180px] sm:min-h-[340px] w-full p-5 sm:p-8 flex flex-col justify-between text-white">
                <img
                  src="/images/accessories-category.png"
                  alt="Accessories Collection"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />

                <div className="relative z-10">
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                    Collection 03
                  </p>

                  <h3 className="mt-1 sm:mt-2 text-xl sm:text-3xl font-bold tracking-tight text-white">
                    Accessories
                  </h3>
                </div>

                <div className="relative z-10 mt-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/10 backdrop-blur-md px-3.5 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white transition duration-300 group-hover:bg-white group-hover:text-black">
                    Shop Now →
                  </span>
                </div>
              </div>
            </a>

          </div>

        </div>

      </section>


      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="bg-white px-6 py-20 md:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#A06E31]">
                New Arrivals
              </p>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Featured Collection
              </h2>

            </div>

            <a
              href="/shop"
              className="text-sm font-medium underline underline-offset-4 transition hover:text-[#A06E31]"
            >
              Shop All
            </a>

          </div>

          {/* Existing Product Grid */}
          <ProductGrid />

        </div>

      </section>


      {/* ================= BRAND STATEMENT ================= */}
      <section className="bg-[#D5C1A9] px-6 py-24 md:px-10">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#8B6A4A]">
            The WEARWELL Edit
          </p>

          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Style that feels
            <br />
            <span className="font-normal italic">
              completely yours.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#6F6258] sm:text-base">
            From everyday essentials to statement pieces, discover
            thoughtfully selected styles made for your everyday life.
          </p>

          <a
            href="/shop"
            className="mt-9 inline-flex bg-[#080808] px-8 py-4 text-sm font-medium text-white transition hover:bg-[#A06E31]"
          >
            Discover More
          </a>

        </div>

      </section>


      {/* ================= UNIFIED LUXURY FOOTER ================= */}
      <Footer />

    </main>
  );
}

