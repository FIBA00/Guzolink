/** Style: Market Ledger — an order detail gives status, order number, and the next action the clearest visual weight. */
import { ArrowLeft, CircleCheckBig, MapPin, ReceiptText } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import MarketplaceShell from "../components/layout/MarketplaceShell";
import StatusBadge from "../components/common/StatusBadge";
import {
  EmptyState,
  ErrorState,
  LoadingBlock,
} from "../components/common/AsyncState";
import { useOrder } from "../features/orders/orderQueries";
import { formatCurrency, formatDate } from "../lib/utils";
export default function OrderDetailsPage() {
  const { id } = useParams();
  const query = useOrder(id);
  if (query.isLoading)
    return (
      <MarketplaceShell>
        <div className="mx-auto max-w-[1000px] px-4 py-10 md:px-8">
          <LoadingBlock rows={3} />
        </div>
      </MarketplaceShell>
    );
  if (query.isError)
    return (
      <MarketplaceShell>
        <div className="mx-auto max-w-[1000px] px-4 py-10 md:px-8">
          <ErrorState error={query.error} onRetry={query.refetch} />
        </div>
      </MarketplaceShell>
    );
  const order = query.data;
  if (!order)
    return (
      <MarketplaceShell>
        <div className="mx-auto max-w-[1000px] px-4 py-10 md:px-8">
          <EmptyState
            title="Order not found"
            description="This order may not be available to this account."
            actionLabel="View my orders"
            actionTo="/orders"
          />
        </div>
      </MarketplaceShell>
    );
  return (
    <MarketplaceShell>
      <div className="page-enter mx-auto max-w-[1000px] px-4 py-8 md:px-8">
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-sm font-extrabold text-[#596059]"
        >
          <ArrowLeft size={16} /> My orders
        </Link>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_18rem]">
          <section className="surface bg-[#fffdf7] p-6 sm:p-8">
            <p className="ledger-label">
              Order {order.id || order.orderNumber}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <h1 className="font-display text-5xl tracking-[-.05em]">
                Order update.
              </h1>
              <StatusBadge>
                {order.orderStatus || order.status || "New"}
              </StatusBadge>
            </div>
            <div className="mt-8 border-y border-line py-5">
              <div className="flex items-start gap-3">
                <CircleCheckBig className="mt-0.5 text-moss" size={20} />
                <div>
                  <p className="font-extrabold">
                    {order.orderStatus === "Delivered"
                      ? "Delivered"
                      : "Order is with the merchant"}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#666c65]">
                    {order.orderStatus === "Delivered"
                      ? "This order has been marked delivered."
                      : "Payment and delivery updates will appear here as your merchant processes the order."}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-start gap-3 text-sm">
              <ReceiptText className="mt-0.5 text-ochre-dark" size={19} />
              <div>
                <p className="font-extrabold">Order summary</p>
                <p className="mt-1 text-[#656b64]">
                  {order.product || "Items from your order"} ·{" "}
                  {order.items?.length || order.items || 1} item(s)
                </p>
              </div>
            </div>
          </section>
          <aside className="surface h-fit bg-[#fffdf7] p-5">
            <p className="ledger-label">Payment & delivery</p>
            <div className="mt-5 grid gap-4 text-sm">
              <div>
                <p className="text-xs font-bold text-[#767b74]">Payment</p>
                <div className="mt-2">
                  <StatusBadge>{order.paymentStatus || "Pending"}</StatusBadge>
                </div>
              </div>
              <div className="rule-top pt-4">
                <p className="text-xs font-bold text-[#767b74]">Placed</p>
                <p className="mt-2 font-extrabold">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <div className="rule-top pt-4">
                <p className="text-xs font-bold text-[#767b74]">Total</p>
                <p className="mt-2 text-lg font-extrabold text-ochre-dark">
                  {formatCurrency(order.total)}
                </p>
              </div>
              <div className="rule-top flex gap-2 pt-4 text-xs leading-5 text-[#666c65]">
                <MapPin size={15} className="shrink-0 text-ochre-dark" />{" "}
                Delivery details are held with the merchant for fulfilment.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </MarketplaceShell>
  );
}
