/** Style: Market Ledger — customer order history reads like an organised receipt ledger instead of an opaque tracking wall. */
import { ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import MarketplaceShell from "../layout/MarketplaceShell";
import StatusBadge from "../components/StatusBadge";
import {
  EmptyState,
  ErrorState,
  LoadingBlock,
} from "../components/InlineLoading";
import { useOrders } from "../features/orders/orderQueries";
import { formatCurrency, formatDate } from "../lib/utils";
export default function OrdersPage() {
  const query = useOrders({ scope: "customer" });
  return (
    <MarketplaceShell>
      <div className="page-enter mx-auto max-w-[1100px] px-4 py-10 md:px-8">
        <p className="ledger-label">My account · Order history</p>
        <div className="mt-3 border-b border-line pb-7">
          <h1 className="font-display text-5xl tracking-[-.05em]">Orders.</h1>
        </div>
        {query.isLoading ? (
          <div className="mt-8">
            <LoadingBlock rows={3} />
          </div>
        ) : query.isError ? (
          <div className="mt-8">
            <ErrorState error={query.error} onRetry={query.refetch} />
          </div>
        ) : query.data.items.length ? (
          <div className="mt-8 grid gap-3">
            {query.data.items.map(order => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="card-hover grid grid-cols-[auto_1fr_auto] items-center gap-4 border border-line bg-[#fffdf7] p-4 sm:grid-cols-[auto_1fr_auto_auto]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f1e3c7] text-ochre-dark">
                  <Package size={19} />
                </span>
                <div>
                  <p className="text-sm font-extrabold">
                    Order {order.id || order.orderNumber}
                  </p>
                  <p className="mt-1 text-xs text-[#6c716b]">
                    {formatDate(order.createdAt)} ·{" "}
                    {order.items?.length || order.items || 1} item
                    {(order.items?.length || order.items || 1) !== 1 ? "s" : ""}
                  </p>
                </div>
                <StatusBadge>
                  {order.orderStatus || order.status || "New"}
                </StatusBadge>
                <div className="hidden items-center gap-4 sm:flex">
                  <span className="text-sm font-extrabold">
                    {formatCurrency(order.total)}
                  </span>
                  <ArrowRight size={17} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState
              title="No orders yet"
              description="When you buy from a Guzolink shop, it will appear here."
              actionLabel="Browse marketplace"
              actionTo="/marketplace"
            />
          </div>
        )}
      </div>
    </MarketplaceShell>
  );
}
