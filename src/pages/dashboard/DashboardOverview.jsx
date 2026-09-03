/** Style: Market Ledger — merchant overview is a concise cached operating record instead of a static dashboard snapshot. */
import {
  ArrowRight,
  PackageCheck,
  ShoppingBag,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ErrorState, LoadingBlock } from "../../components/InlineLoading";
import StatusBadge from "../../components/StatusBadge";
import { useMerchantOverview } from "../../api/merchantQueries";
import { formatCurrency, formatDate } from "../../lib/utils";

export default function DashboardOverview() {
  const overviewQuery = useMerchantOverview();
  if (overviewQuery.isLoading)
    return <LoadingBlock label="Loading shop overview…" />;
  if (overviewQuery.isError)
    return (
      <ErrorState
        title="Overview is unavailable"
        description={overviewQuery.error.message}
        onRetry={overviewQuery.refetch}
      />
    );
  const overview = overviewQuery.data || {};
  const metrics = [
    {
      label: "Total sales",
      value: formatCurrency(overview.totalSales || 0),
      detail: overview.salesChange
        ? `${overview.salesChange}% vs last month`
        : "Current sales period",
      icon: WalletCards,
    },
    {
      label: "Orders",
      value: overview.orders || 0,
      detail: `${overview.ordersAwaiting || 0} waiting on action`,
      icon: ShoppingBag,
    },
    {
      label: "Products",
      value: overview.products || 0,
      detail: `${overview.lowStock?.length || 0} low stock`,
      icon: PackageCheck,
    },
    {
      label: "Customers",
      value: overview.customers || 0,
      detail: `${overview.returningCustomers || 0} returning this month`,
      icon: UsersRound,
    },
  ];
  return (
    <>
      <section className="registration-mark bg-ink p-6 text-[#fbf7ee] sm:p-8">
        <p className="ledger-label !text-[#d2c8b6]">Guzo Studio · Overview</p>
        <div className="mt-4 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-display text-5xl leading-[.94] tracking-[-.055em]">
              Good morning, Mekdes.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#d6d2c7]">
              Here’s the part of your shop that needs an eye today.
            </p>
          </div>
          <Link
            className="button-primary self-start sm:self-auto"
            to="/dashboard/products"
          >
            Manage products <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, detail, icon: Icon }) => (
          <article
            key={label}
            className="registration-mark border border-line bg-[#fffdf7] p-5"
          >
            <Icon className="text-ochre-dark" size={20} />
            <p className="mt-7 text-xs font-extrabold uppercase tracking-[.1em] text-[#72776f]">
              {label}
            </p>
            <p className="mt-2 text-2xl font-extrabold tracking-[-.045em]">
              {value}
            </p>
            <p className="mt-2 text-xs text-[#687068]">{detail}</p>
          </article>
        ))}
      </section>
      <section className="mt-8 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <div className="border border-line bg-[#fffdf7]">
          <div className="flex items-end justify-between border-b border-line p-5">
            <div>
              <p className="ledger-label">Latest orders</p>
              <h2 className="mt-2 font-display text-3xl">The order desk.</h2>
            </div>
            <Link
              to="/dashboard/orders"
              className="text-sm font-extrabold text-ochre-dark"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-line">
            {(overview.recentOrders || []).map(order => (
              <Link
                key={order.id}
                to={`/dashboard/orders/${order.id}`}
                className="grid grid-cols-[1fr_auto] items-center gap-4 p-5 hover:bg-[#faf5ea] sm:grid-cols-[1fr_auto_auto]"
              >
                <div>
                  <p className="text-sm font-extrabold">
                    {order.id} · {order.customer}
                  </p>
                  <p className="mt-1 text-xs text-[#737870]">
                    {formatDate(order.createdAt)} · {order.items} items
                  </p>
                </div>
                <StatusBadge>{order.orderStatus}</StatusBadge>
                <p className="hidden text-sm font-extrabold sm:block">
                  {formatCurrency(order.total)}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <aside className="border border-line bg-[#efe4cc] p-5">
          <p className="ledger-label">Stock note</p>
          <h2 className="mt-3 font-display text-3xl">
            {overview.lowStock?.length
              ? `${overview.lowStock.length} shelves need attention.`
              : "Shelves are in good shape."}
          </h2>
          <div className="mt-6 grid gap-3">
            {(overview.lowStock || []).map(product => (
              <div
                key={product.id}
                className="flex items-center justify-between border-t border-[#cfc1a6] pt-3"
              >
                <div>
                  <p className="text-sm font-extrabold">{product.name}</p>
                  <p className="mt-1 text-xs text-[#666a62]">
                    {product.stock
                      ? `${product.stock} remaining`
                      : "Out of stock"}
                  </p>
                </div>
                <StatusBadge>{product.stock ? "Low" : "Draft"}</StatusBadge>
              </div>
            ))}
          </div>
          <Link
            className="button-secondary mt-7 w-full !border-[#b9aa8d] !bg-transparent"
            to="/dashboard/products"
          >
            Review stock
          </Link>
        </aside>
      </section>
    </>
  );
}
