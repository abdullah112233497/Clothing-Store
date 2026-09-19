
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#080808]">

      {/* ================= HEADER ================= */}
      <Header />


      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[650px] overflow-hidden bg-black text-white md:h-[750px]">

        {/* Hero Image */}
        <img
          src="/images/hero-fashion.png"
          alt="WEARWELL Fashion Collection"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-16 md:px-10 md:pb-20">

          <div className="max-w-2xl">

            <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-white/80">
              WEARWELL — Autumn / Winter 2026
            </p>

            <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Everyday
              <br />
              <span className="font-normal italic">
                Elegance.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-6 text-white/80 sm:text-base">
              Discover modern essentials designed for effortless
              everyday style.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">

              <a
                href="/shop"
                className="bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-[#A06E31] hover:text-white"
              >
                Shop Collection
              </a>

              <a
                href="/categories"
                className="border border-white px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white hover:text-black"
              >
                Explore
              </a>

            </div>

          </div>

        </div>

        {/* Bottom Label */}
        <div className="absolute bottom-6 right-6 z-10 hidden text-right sm:block">

          <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">
            New Collection
          </p>

          <p className="mt-1 text-sm">
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
      <section className="bg-[#F8F6F2] px-6 py-20 md:px-10">

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


          {/* Category Cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">


            {/* WOMEN */}
            <a
              href="/shop?category=women"
              className="group relative overflow-hidden bg-[#D5C1A9] p-8 transition duration-500 hover:-translate-y-1"
            >

              <div className="relative min-h-[300px] text-white">

                <img
                  src="/images/women-category.png"
                  alt="Women's Collection"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/30" />

                <div className="relative z-10">

                  <p className="text-xs uppercase tracking-[0.25em]">
                    Collection 01
                  </p>

                  <h3 className="mt-3 text-3xl font-semibold">
                    Women
                  </h3>

                  <span className="mt-8 inline-block text-sm underline underline-offset-4">
                    Shop Now →
                  </span>

                </div>

              </div>

            </a>


            {/* MEN */}
            <a
              href="/shop?category=men"
              className="group relative overflow-hidden bg-[#080808] p-8 text-white transition duration-500 hover:-translate-y-1"
            >

              <div className="relative min-h-[300px]">

                <img
                  src="/images/men-category.png"
                  alt="Men's Collection"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/30" />

                <div className="relative z-10">

                  <p className="text-xs uppercase tracking-[0.25em]">
                    Collection 02
                  </p>

                  <h3 className="mt-3 text-3xl font-semibold">
                    Men
                  </h3>

                  <span className="mt-8 inline-block text-sm underline underline-offset-4">
                    Shop Now →
                  </span>

                </div>

              </div>

            </a>


            {/* ACCESSORIES */}
            <a
              href="/shop?category=accessories"
              className="group relative overflow-hidden bg-[#A06E31] p-8 text-white transition duration-500 hover:-translate-y-1"
            >

              <div className="relative min-h-[300px]">

                <img
                  src="/images/accessories-category.png"
                  alt="Accessories Collection"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/30" />

                <div className="relative z-10">

                  <p className="text-xs uppercase tracking-[0.25em]">
                    Collection 03
                  </p>

                  <h3 className="mt-3 text-3xl font-semibold">
                    Accessories
                  </h3>

                  <span className="mt-8 inline-block text-sm underline underline-offset-4">
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


      {/* ================= NEWSLETTER ================= */}
      <section className="bg-[#080808] px-6 py-20 text-white md:px-10">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-xs uppercase tracking-[0.3em] text-[#D5C1A9]">
            Stay in the Loop
          </p>

          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Join the Outfitters List
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/60">
            Get updates about new collections, exclusive offers and
            the latest styles.
          </p>


          <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">

            <input
              type="email"
              placeholder="Enter your email"
              className="min-h-[50px] flex-1 border border-white/20 bg-white/10 px-5 text-sm text-white outline-none placeholder:text-white/50 focus:border-white"
            />

            <button
              type="submit"
              className="min-h-[50px] bg-white px-7 text-sm font-medium text-black transition hover:bg-[#A06E31] hover:text-white"
            >
              Subscribe
            </button>

          </form>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="bg-[#111111] px-6 py-12 text-white md:px-10">

        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>

            <h2 className="text-2xl font-semibold tracking-tight">
              WEARWELL
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-6 text-white/50">
              Modern fashion for everyday living.
            </p>

          </div>


          {/* Shop */}
          <div>

            <h3 className="text-sm font-medium uppercase tracking-wider">
              Shop
            </h3>

            <div className="mt-4 space-y-3 text-sm text-white/50">

              <a
                href="/shop?category=women"
                className="block transition hover:text-white"
              >
                Women
              </a>

              <a
                href="/shop?category=men"
                className="block transition hover:text-white"
              >
                Men
              </a>

              <a
                href="/shop?category=accessories"
                className="block transition hover:text-white"
              >
                Accessories
              </a>

            </div>

          </div>


          {/* Help */}
          <div>

            <h3 className="text-sm font-medium uppercase tracking-wider">
              Help
            </h3>

            <div className="mt-4 space-y-3 text-sm text-white/50">

              <a
                href="/cart"
                className="block transition hover:text-white"
              >
                Cart
              </a>

              <a
                href="/checkout"
                className="block transition hover:text-white"
              >
                Checkout
              </a>

              <a
                href="/contact"
                className="block transition hover:text-white"
              >
                Contact
              </a>

            </div>

          </div>


          {/* Social */}
          <div>

            <h3 className="text-sm font-medium uppercase tracking-wider">
              Follow Us
            </h3>

            <div className="mt-4 space-y-3 text-sm text-white/50">

              <a
                href="#"
                className="block transition hover:text-white"
              >
                Instagram
              </a>

              <a
                href="#"
                className="block transition hover:text-white"
              >
                Facebook
              </a>

              <a
                href="#"
                className="block transition hover:text-white"
              >
                Pinterest
              </a>

            </div>

          </div>

        </div>


        {/* Copyright */}
        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6">

          <p className="text-xs text-white/40">
            © 2026 WEARWELL. All rights reserved.
          </p>

        </div>

      </footer>

    </main>
  );
}

