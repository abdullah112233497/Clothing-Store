# 🛍️ WEARWELL — Modern Luxury Fashion E-Commerce

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Neon Database](https://img.shields.io/badge/Database-Neon_Postgres-00e599?style=flat-square&logo=postgresql)](https://neon.tech/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](#license)

**WEARWELL** is an end-to-end luxury fashion e-commerce web application engineered with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Neon Serverless Postgres**. It features a modern minimalist aesthetic, complete user authentication via HTTP-only JWT cookies, dynamic product catalogs, an interactive shopping cart, checkout workflow, client-side PDF invoice generation, and a personal user dashboard with order history and wishlist synchronization.

---

## ✨ Features

### 🌟 Storefront & Product Experience
- **Editorial Hero & Collections**: High-impact luxury hero section showcasing seasonal collections (Autumn / Winter 2026) with smooth transitions and responsive layouts.
- **Categorized Product Catalog**: Browse products filtered by category (`Women`, `Men`, `Accessories`) with live keyword search and instant sorting.
- **Dynamic Product Detail Pages (`/product/[slug]`)**: Detailed view including high-res image galleries, sizing selectors, product details, stock indicator, and direct add-to-cart or add-to-wishlist triggers.

### 🛒 Shopping Bag & Checkout
- **Stateful Shopping Cart (`/cart`)**: Real-time quantity adjustments, item removal, promo code discount calculation, and synchronized subtotal/shipping totals backed by browser storage.
- **Streamlined Checkout (`/checkout`)**: Multi-field delivery form (name, email, phone, shipping address, city, postal code, notes) with automatic profile pre-filling for logged-in users.
- **Client-Side PDF Invoices (`/order-success`)**: Automatic generation and instant download of customized PDF invoices with order numbers (e.g. `#OUT-XXXXXX`) using **jsPDF**.

### 🔐 Authentication & Session Security
- **JWT Cookie Sessions**: Secure session generation and verification using `jose` with HTTP-only, `sameSite: lax`, 7-day persistent cookies.
- **Secure Password Hashing**: Passwords securely hashed with `bcryptjs` before persisting in PostgreSQL.
- **Edge Route Protection**: Custom Next.js `middleware.ts` guarding protected routes (e.g., `/profile`) and automatically redirecting logged-in users away from auth pages (`/account/login`, `/account/signup`).
- **Profile Updates**: Dedicated endpoints to update personal details (phone, birthday, gender, name).

### 👤 User Dashboard & Account Portal (`/profile`)
- **VIP Membership Status**: Displays user membership status tier (e.g., *VIP Black*).
- **Order Tracking**: Comprehensive order status monitoring (*Delivered*, *Processing*, *In Transit*, *Cancelled*) with individual PDF receipt downloads.
- **Address Book Management**: Store and manage multiple shipping destinations (*Home*, *Office*, *Other*) with default selection toggles.
- **Wishlist Synchronization**: Real-time wishlist synced with Neon Database via dedicated API endpoints with local storage fallback for guest mode.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router & Server Actions / Route Handlers) |
| **Frontend Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/postcss` |
| **Database** | [Neon Serverless Postgres](https://neon.tech/) (`@neondatabase/serverless`) |
| **Authentication** | [jose](https://github.com/panva/jose) (JWT) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| **PDF Generation** | [jsPDF](https://github.com/parallax/jsPDF) |

---

## 📁 Project Structure

```text
clothing-store/
├── app/
│   ├── account/              # Authentication pages (login, signup)
│   ├── api/
│   │   ├── auth/             # Login, signup, logout, me, update-profile
│   │   └── wishlist/         # Database-backed wishlist CRUD endpoints
│   ├── cart/                 # Shopping bag with promo code discounts
│   ├── checkout/             # Shipping details & order placement
│   ├── order-success/        # Order confirmation & instant PDF invoice
│   ├── product/[slug]/       # Dynamic product detail pages
│   ├── profile/              # User dashboard (orders, addresses, wishlist)
│   ├── shop/                 # Catalog with filter & search capabilities
│   ├── globals.css           # Tailwind CSS imports & global styles
│   ├── layout.tsx            # Root layout with AuthProvider wrapper
│   └── page.tsx              # Landing page / Home
├── components/
│   ├── Footer.tsx            # Site-wide luxury footer & links
│   ├── Header.tsx            # Navigation, live cart & wishlist counts, search bar
│   ├── ProductCard.tsx       # Reusable product card with wishlist & cart quick-action
│   └── ProductGrid.tsx       # Responsive grid for featured products
├── context/
│   └── AuthContext.tsx       # Global user state & authentication provider
├── data/
│   └── products.ts           # Product catalog data & metadata
├── lib/
│   ├── auth.ts               # JWT signing, verification, and cookie helpers
│   └── db.ts                 # Neon SQL client & table initialization logic
├── middleware.ts             # Route guard middleware for protected paths
├── public/
│   └── images/               # Product photography, hero banners, and assets
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.18 or higher (Node.js 20+ recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- **Neon PostgreSQL**: A free serverless PostgreSQL database from [Neon](https://neon.tech/)

### 2. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/abdullah112233497/Clothing-Store.git
cd Clothing-Store
npm install
```

### 3. Environment Variables Setup

Create a `.env.local` file in the root directory:

```bash
touch .env.local
```

Add the following environment variables:

```env
# Neon Postgres Connection URL
DATABASE_URL=postgresql://<user>:<password>@<host>/<dbname>?sslmode=require

# JWT Secret for Session Encryption
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary server-side upload credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> **Note**: Product images are stored in Cloudinary; PostgreSQL only stores their delivery URLs. If Cloudinary credentials are incomplete, the admin uploader uses a temporary Cloudinary demo image. Run `npm run migrate:images` once for a legacy database that contains local paths or base64 image data.

### 4. Running Locally

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build

To test the production build locally:

```bash
npm run build
npm run start
```

---

## 🗄️ Database Schema

The application uses **PostgreSQL** on Neon with the following tables initialized automatically by `lib/db.ts`:

### `users`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `SERIAL PRIMARY KEY` | Unique user ID |
| `first_name` | `VARCHAR(100)` | User's first name |
| `last_name` | `VARCHAR(100)` | User's last name |
| `email` | `VARCHAR(255) UNIQUE` | Unique email address (case-insensitive) |
| `password_hash`| `VARCHAR(255)` | Bcrypt-hashed password |
| `phone` | `VARCHAR(50)` | Optional contact phone number |
| `birthday` | `VARCHAR(50)` | Optional birth date |
| `gender` | `VARCHAR(50)` | Gender selection |
| `membership_tier`| `VARCHAR(50)` | Tier rank (default: `'VIP Black'`) |
| `created_at` | `TIMESTAMP` | Account registration timestamp |
| `updated_at` | `TIMESTAMP` | Profile last update timestamp |

### `wishlist_items`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `SERIAL PRIMARY KEY` | Unique item identifier |
| `user_id` | `INTEGER REFERENCES users(id)` | Foreign key tied to `users.id` with cascade deletion |
| `product_id` | `INTEGER` | Catalog product ID |
| `name` | `VARCHAR(255)` | Product name |
| `price` | `NUMERIC` | Current selling price |
| `original_price`| `NUMERIC` | Discounted original price |
| `category` | `VARCHAR(100)` | Item category |
| `image` | `VARCHAR(500)` | Product image URL |
| `in_stock` | `BOOLEAN` | Stock availability |
| `created_at` | `TIMESTAMP` | Added timestamp |

---

## 🌐 API Routes Reference

| Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/signup` | Registers a new user account & issues session cookie | ❌ |
| `POST` | `/api/auth/login` | Authenticates user credentials & issues session cookie | ❌ |
| `POST` | `/api/auth/logout` | Clears the `wearwell_session` HTTP-only cookie | ❌ |
| `GET` | `/api/auth/me` | Returns profile info for current authenticated user | ❌ (returns `null` if guest) |
| `POST` | `/api/auth/update-profile` | Updates personal account information | ✅ |
| `GET` | `/api/wishlist` | Retrieves all saved wishlist items for the logged-in user | ✅ |
| `POST` | `/api/wishlist` | Toggles (adds/removes) a product in the user's wishlist | ✅ |

---

## 📜 License

This project is licensed under the MIT License — feel free to use and modify it for your own projects.
