"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";

type CartItem = {
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
};

export default function CheckoutPage() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    setLoaded(true);
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handlePlaceOrder = (event: React.FormEvent) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      return;
    }

    setPlacingOrder(true);

    const orderData = {
      items: cartItems,
      subtotal,
      shipping,
      total,
      customer: {
        name,
        email,
        phone,
        address,
        city,
        postalCode,
      },
      paymentMethod,
    };

    localStorage.setItem(
      "lastOrder",
      JSON.stringify(orderData)
    );

    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartItem");

    window.dispatchEvent(new Event("cartUpdated"));

    setTimeout(() => {
      router.push("/order-success");
    }, 500);
  };

  if (!loaded) {
    return (
      <>
        <Header />

        <main className="flex min-h-[60vh] items-center justify-center">
          <p className="text-sm text-gray-500">
            Loading checkout...
          </p>
        </main>
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />

        <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
          <div className="text-5xl">🛍️</div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Add some products to your cart before proceeding
            to checkout.
          </p>

          <Link
            href="/shop"
            className="mt-7 rounded-xl bg-black px-8 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              OUTFITTERS
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
              Checkout
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              Complete your information to place your order.
            </p>
          </div>

          <form
            onSubmit={handlePlaceOrder}
            className="grid gap-10 lg:grid-cols-[1fr_400px]"
          >
            {/* Delivery Information */}
            <section className="rounded-2xl border bg-white p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-900">
                Delivery Information
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Enter your details for order delivery.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone
                  </label>

                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                    placeholder="03XX-XXXXXXX"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Delivery Address
                  </label>

                  <textarea
                    required
                    value={address}
                    onChange={(event) =>
                      setAddress(event.target.value)
                    }
                    placeholder="House number, street, area..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    City
                  </label>

                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(event) =>
                      setCity(event.target.value)
                    }
                    placeholder="Faisalabad"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>

                  <input
                    type="text"
                    value={postalCode}
                    onChange={(event) =>
                      setPostalCode(event.target.value)
                    }
                    placeholder="38000"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                  />
                </div>
              </div>

              {/* Payment */}
              <div className="mt-10 border-t pt-8">
                <h2 className="text-xl font-semibold text-gray-900">
                  Payment Method
                </h2>

                <div className="mt-5 space-y-3">
                  {/* COD */}
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                      paymentMethod === "cod"
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(event) =>
                        setPaymentMethod(event.target.value)
                      }
                    />

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Cash on Delivery
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Pay when your order arrives.
                      </p>
                    </div>
                  </label>

                  {/* Card */}
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                      paymentMethod === "card"
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(event) =>
                        setPaymentMethod(event.target.value)
                      }
                    />

                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Credit / Debit Card
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Secure card payment.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Card Details */}
                {paymentMethod === "card" && (
                  <div className="mt-5 rounded-2xl bg-gray-50 p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Card Details
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Enter your card information below.
                        </p>
                      </div>

                      <span className="text-lg">💳</span>
                    </div>

                    <div className="space-y-4">
                      {/* Cardholder Name */}
                      <div>
                        <label className="mb-2 block text-xs font-medium text-gray-700">
                          Cardholder Name
                        </label>

                        <input
                          type="text"
                          required={paymentMethod === "card"}
                          value={cardName}
                          onChange={(event) =>
                            setCardName(event.target.value)
                          }
                          placeholder="Name on card"
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                        />
                      </div>

                      {/* Card Number */}
                      <div>
                        <label className="mb-2 block text-xs font-medium text-gray-700">
                          Card Number
                        </label>

                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={19}
                          required={paymentMethod === "card"}
                          value={cardNumber}
                          onChange={(event) =>
                            setCardNumber(event.target.value)
                          }
                          placeholder="1234 5678 9012 3456"
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                        />
                      </div>

                      {/* Expiry + CVV */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-xs font-medium text-gray-700">
                            Expiry Date
                          </label>

                          <input
                            type="text"
                            maxLength={5}
                            required={paymentMethod === "card"}
                            value={expiry}
                            onChange={(event) =>
                              setExpiry(event.target.value)
                            }
                            placeholder="MM/YY"
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-xs font-medium text-gray-700">
                            CVV
                          </label>

                          <input
                            type="password"
                            inputMode="numeric"
                            maxLength={4}
                            required={paymentMethod === "card"}
                            value={cvv}
                            onChange={(event) =>
                              setCvv(event.target.value)
                            }
                            placeholder="•••"
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                          />
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-5 text-gray-400">
                      🔒 Your payment information is protected
                      with secure checkout.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Order Summary */}
            <aside className="h-fit rounded-2xl border bg-white p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Order
                </h2>

                <span className="text-sm text-gray-500">
                  {totalQuantity} item
                  {totalQuantity > 1 ? "s" : ""}
                </span>
              </div>

              <div className="mt-6 space-y-5">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="flex gap-4"
                  >
                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />

                      <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="flex flex-1 justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          Size: {item.size}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="whitespace-nowrap text-sm font-semibold text-gray-900">
                        Rs.{" "}
                        {(
                          item.price * item.quantity
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 space-y-4 border-t pt-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-medium text-gray-900">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span className="font-medium text-gray-900">
                    FREE
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-900">
                      Total
                    </span>

                    <span className="text-xl font-bold text-gray-900">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={placingOrder}
                className="mt-7 w-full rounded-xl bg-black px-6 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {placingOrder
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

              <div className="mt-5 space-y-2 text-center text-xs text-gray-500">
                <p>✓ Secure checkout</p>
                <p>✓ Free shipping</p>
                <p>✓ Easy returns & exchanges</p>
              </div>
            </aside>
          </form>
        </div>
      </main>
    </>
  );
}