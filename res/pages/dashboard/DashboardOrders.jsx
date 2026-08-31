/** Style: Market Ledger — order management turns dense operational data into clear desktop ledgers and mobile-ready cards. */
import { ArrowLeft, ChevronRight, Package, Truck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import StatusBadge from "../../components/common/StatusBadge";
import {
  EmptyState,
  ErrorState,
  LoadingBlock,
} from "../../components/common/AsyncState";
import {
  useOrder,
  useOrders,
  useUpdateOrder,
} from "../../features/orders/orderQueries";
import { formatCurrency, formatDate } from "../../lib/utils";
import { isPreviewMode } from "../../services/api";
import { toast } from "sonner";
export default function DashboardOrders({ detail }) {
  const { id } = useParams();
  const listQuery = useOrders({ scope: "merchant" });
  const orderQuery = useOrder(id);
  const updateOrder = useUpdateOrder();
  async function changeStatus(orderId, orderStatus) {
    try {
      if (!isPreviewMode())
        await updateOrder.mutateAsync({ id: orderId, data: { orderStatus } });
      toast.success(`Order marked ${orderStatus.toLowerCase()}.`);
    } catch (error) {
      toast.error(error.message || "We could not update this order.");
    }
  }
  if (detail) {
    if (orderQuery.isLoading) return <LoadingBlock rows={3} />;
    if (orderQuery.isError)
      return (
        <ErrorState error={orderQuery.error} onRetry={orderQuery.refetch} />
      );
    const order = orderQuery.data;
    if (!order)
      return (
        <EmptyState
          title="Order not found"
          actionLabel="View orders"
          actionTo="/dashboard/orders"
        />
      );
    return (
      <>
        <Link
          to="/dashboard/orders"
          className="inline-flex items-center gap-2 text-sm font-extrabold text-[#555c55]"
        >
          <ArrowLeft size={16} /> Orders
        </Link>
        <section className="mt-6 grid gap-5 xl:grid-cols-[1fr_20rem]">
          <div className="border border-line bg-[#fffdf7] p-6 sm:p-8">
            <p className="ledger-label">
              Order {order.id || order.orderNumber}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <h1 className="font-display text-5xl tracking-[-.05em]">
                {order.customer || order.customerName}
              </h1>
              <StatusBadge>{order.orderStatus || "New"}</StatusBadge>
            </div>
            <div className="mt-8 grid gap-4 border-y border-line py-5 sm:grid-cols-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.1em] text-[#747970]">
                  Placed
                </p>
                <p className="mt-2 text-sm font-extrabold">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[.1em] text-[#747970]">
                  Payment
                </p>
                <div className="mt-2">
                  <StatusBadge>{order.paymentStatus || "Pending"}</StatusBadge>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[.1em] text-[#747970]">
                  Total
                </p>
                <p className="mt-2 text-sm font-extrabold text-ochre-dark">
                  {formatCurrency(order.total)}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <p className="font-extrabold">Order line</p>
              <div className="mt-3 flex items-center justify-between border-t border-line py-4 text-sm">
                <span>
                  {order.product || "Order items"} ·{" "}
                  {order.items?.length || order.items || 1} item(s)
                </span>
                <span className="font-extrabold">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </div>
          <aside className="border border-line bg-[#efe4cc] p-5">
            <p className="ledger-label">Next action</p>
            <h2 className="mt-3 font-display text-3xl">
              Move the order forward.
            </h2>
            <div className="mt-6 grid gap-3">
              <button
                className="button-secondary w-full justify-start !border-[#c4b292] !bg-transparent"
                onClick={() => changeStatus(order.id, "Packed")}
              >
                <Package size={16} /> Mark packed
              </button>
              <button
                className="button-secondary w-full justify-start !border-[#c4b292] !bg-transparent"
                onClick={() => changeStatus(order.id, "Delivered")}
              >
                <Truck size={16} /> Mark delivered
              </button>
            </div>
            <p className="mt-6 text-xs leading-5 text-[#65655e]">
              Merchant actions are sent to the configured orders API. The
              backend remains the source of truth.
            </p>
          </aside>
        </section>
      </>
    );
  }
  return (
    <>
      <div className="border-b border-line pb-6">
        <p className="ledger-label">Order desk</p>
        <h1 className="mt-3 font-display text-5xl tracking-[-.05em]">
          Orders.
        </h1>
      </div>
      {listQuery.isLoading ? (
        <div className="mt-7">
          <LoadingBlock rows={4} />
        </div>
      ) : listQuery.isError ? (
        <div className="mt-7">
          <ErrorState error={listQuery.error} onRetry={listQuery.refetch} />
        </div>
      ) : listQuery.data.items.length ? (
        <div className="mt-7 grid gap-3">
          {listQuery.data.items.map(order => (
            <article
              key={order.id}
              className="grid grid-cols-[1fr_auto] items-center gap-4 border border-line bg-[#fffdf7] p-4 sm:grid-cols-[1.1fr_.7fr_auto_auto]"
            >
              <div>
                <p className="text-sm font-extrabold">
                  {order.id || order.orderNumber}
                </p>
                <p className="mt-1 text-xs text-[#6e736c]">
                  {order.customer || order.customerName} ·{" "}
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-[#737870]">Payment</p>
                <div className="mt-1">
                  <StatusBadge>{order.paymentStatus || "Pending"}</StatusBadge>
                </div>
              </div>
              <div className="text-right sm:text-left">
                <StatusBadge>{order.orderStatus || "New"}</StatusBadge>
                <p className="mt-2 text-sm font-extrabold sm:hidden">
                  {formatCurrency(order.total)}
                </p>
              </div>
              <Link
                className="icon-button h-9 w-9"
                to={`/dashboard/orders/${order.id}`}
                aria-label={`Open order ${order.id}`}
              >
                <ChevronRight size={17} />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-7">
          <EmptyState
            title="No orders to process"
            description="New orders will appear here as customers place them."
          />
        </div>
      )}
    </>
  );
}
