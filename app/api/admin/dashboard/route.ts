import { NextResponse } from "next/server";
import { forbidden, getAuthenticatedUser, unauthorized } from "@/lib/api-auth";
import { sql } from "@/lib/db";

function validDate(value: string | null) {
  return value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
}

function percentageChange(current: unknown, previous: unknown) {
  const currentValue = Number(current || 0);
  const previousValue = Number(previous || 0);

  if (previousValue === 0) return currentValue === 0 ? 0 : null;
  return Math.round(((currentValue - previousValue) / previousValue) * 1000) / 10;
}

export async function GET(request: Request) {
  const admin = await getAuthenticatedUser();
  if (!admin) return unauthorized();
  if (admin.role !== "admin") return forbidden();

  const url = new URL(request.url);
  const from = validDate(url.searchParams.get("from"));
  const to = validDate(url.searchParams.get("to"));

  try {
    const [stats, recentOrders, sales, statusBreakdown, topProduct, comparison] = await Promise.all([
      sql`SELECT
        COALESCE((SELECT SUM(total_amount) FROM orders WHERE status NOT IN ('cancelled','returned') AND (${from}::date IS NULL OR created_at::date >= ${from}::date) AND (${to}::date IS NULL OR created_at::date <= ${to}::date)),0) revenue,
        (SELECT COUNT(*) FROM orders WHERE (${from}::date IS NULL OR created_at::date >= ${from}::date) AND (${to}::date IS NULL OR created_at::date <= ${to}::date)) orders,
        (SELECT COUNT(*) FROM users WHERE role='customer' AND is_active=TRUE) customers,
        (SELECT COUNT(*) FROM products WHERE status <> 'archived') products`,
      sql`SELECT o.id,o.order_number,o.customer_name,o.total_amount,o.status,o.created_at,
        COALESCE((SELECT product_name FROM order_items WHERE order_id=o.id ORDER BY id LIMIT 1),'') product
        FROM orders o
        WHERE (${from}::date IS NULL OR o.created_at::date >= ${from}::date)
          AND (${to}::date IS NULL OR o.created_at::date <= ${to}::date)
        ORDER BY o.created_at DESC LIMIT 10`,
      sql`SELECT TO_CHAR(date_trunc('month',created_at),'Mon YY') AS month_label,
        SUM(total_amount) revenue, COUNT(*) orders
        FROM orders
        WHERE status NOT IN ('cancelled','returned')
          AND (${from}::date IS NULL OR created_at::date >= ${from}::date)
          AND (${to}::date IS NULL OR created_at::date <= ${to}::date)
        GROUP BY date_trunc('month',created_at)
        ORDER BY date_trunc('month',created_at) DESC LIMIT 12`,
      sql`SELECT status, COUNT(*)::int count FROM orders
        WHERE (${from}::date IS NULL OR created_at::date >= ${from}::date)
          AND (${to}::date IS NULL OR created_at::date <= ${to}::date)
        GROUP BY status`,
      sql`SELECT oi.product_name name, SUM(oi.quantity)::int sold, SUM(oi.line_total) revenue
        FROM order_items oi JOIN orders o ON o.id=oi.order_id
        WHERE o.status NOT IN ('cancelled','returned')
          AND (${from}::date IS NULL OR o.created_at::date >= ${from}::date)
          AND (${to}::date IS NULL OR o.created_at::date <= ${to}::date)
        GROUP BY oi.product_name ORDER BY sold DESC LIMIT 1`,
      sql`SELECT
        COALESCE(SUM(total_amount) FILTER (WHERE status NOT IN ('cancelled','returned') AND created_at >= date_trunc('month', CURRENT_DATE)), 0) revenue_current,
        COALESCE(SUM(total_amount) FILTER (WHERE status NOT IN ('cancelled','returned') AND created_at >= date_trunc('month', CURRENT_DATE) - INTERVAL '1 month' AND created_at < date_trunc('month', CURRENT_DATE)), 0) revenue_previous,
        COUNT(*) FILTER (WHERE created_at >= date_trunc('month', CURRENT_DATE)) orders_current,
        COUNT(*) FILTER (WHERE created_at >= date_trunc('month', CURRENT_DATE) - INTERVAL '1 month' AND created_at < date_trunc('month', CURRENT_DATE)) orders_previous,
        (SELECT COUNT(*) FROM users WHERE role='customer' AND is_active=TRUE AND created_at >= date_trunc('month', CURRENT_DATE)) customers_current,
        (SELECT COUNT(*) FROM users WHERE role='customer' AND is_active=TRUE AND created_at >= date_trunc('month', CURRENT_DATE) - INTERVAL '1 month' AND created_at < date_trunc('month', CURRENT_DATE)) customers_previous,
        (SELECT COUNT(*) FROM products WHERE status <> 'archived' AND created_at >= date_trunc('month', CURRENT_DATE)) products_current,
        (SELECT COUNT(*) FROM products WHERE status <> 'archived' AND created_at >= date_trunc('month', CURRENT_DATE) - INTERVAL '1 month' AND created_at < date_trunc('month', CURRENT_DATE)) products_previous
        FROM orders`,
    ]);

    const period = comparison[0] || {};
    const changes = {
      revenue: percentageChange(period.revenue_current, period.revenue_previous),
      orders: percentageChange(period.orders_current, period.orders_previous),
      customers: percentageChange(period.customers_current, period.customers_previous),
      products: percentageChange(period.products_current, period.products_previous),
    };

    return NextResponse.json({
      stats: stats[0],
      changes,
      recentOrders,
      sales: [...sales].reverse().map((item) => ({
        month: item.month_label,
        revenue: item.revenue,
        orders: item.orders,
      })),
      statusBreakdown,
      topProduct: topProduct[0] || null,
    });
  } catch (error) {
    console.error("Admin dashboard load failed:", error);
    return NextResponse.json({ error: "Unable to load dashboard data" }, { status: 500 });
  }
}
