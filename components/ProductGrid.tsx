
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Relaxed Fit Coat",
    price: "Rs. 4500",
    category: "Women",
    image: "/images/product-1.png",
  },
  
  {
    id: 2,
    name: "Classic Oversized Black Dress",
    price: "Rs. 2,990",
    category: "Men",
    image: "/images/product-2.png",
  },
  {
    id: 3,
    name: "Brown Blazer",
    price: "Rs. 4,990",
    category: "Women",
    image: "/images/product-3.png",
  },
  {
    id: 4,
    name: "Brown leather Bag",
    price: "Rs. 6,490",
    category: "Men",
    image: "/images/product-4.png",
  },
  {
    id: 5,
    name: "Minimal Shoulder Bag",
    price: "Rs. 3,990",
    category: "Accessories",
    image: "/images/product-5.png",
  },
  {
    id: 6,
    name: "Everyday Sneakers",
    price: "Rs. 5,490",
    category: "Accessories",
    image: "/images/product-6.png",
  },
  {
    id: 7,
    name: "Premium Knit Top",
    price: "Rs. 3,790",
    category: "Women",
    image: "/images/product-7.png",
  },
  {
    id: 8,
    name: "Relaxed Cargo Pants",
    price: "Rs. 4,490",
    category: "Men",
    image: "/images/product-8.png",
  },
];

export default function ProductGrid() {
  return (
    <section className="w-full">

      {/* Product Heading */}
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#A06E31]">
            New Season
          </p>

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Latest Arrivals
          </h2>
        </div>

        <a
          href="/shop"
          className="text-sm font-medium underline underline-offset-4 transition hover:text-[#A06E31]"
        >
          View All Products
        </a>

      </div>


      {/* Products - 2 Columns on small devices */}
      <div className="grid grid-cols-2 gap-x-3.5 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
            image={product.image}
          />
        ))}

      </div>

    </section>
  );
}

