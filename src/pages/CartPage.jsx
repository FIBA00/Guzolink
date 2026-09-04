/** Style: Market Ledger — the cart is a clean order ledger with visible quantities and an always-legible total. */
import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import MarketplaceShell from "../layout/MarketplaceShell";
import QuantityControl from "../components/QuantityControl";
import { EmptyState } from "../components/InlineLoading";
import { formatCurrency } from "../lib/utils";
import { useCartStore } from "../store/cartStore";
export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  if (!items.length)
    return (
      <MarketplaceShell>
        <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8">
          <p className="ledger-label">Your order ledger</p>
          <div className="mt-6">
            <EmptyState
              title="Your cart is open for finds."
              description="Start with the independent shops around you."
              actionLabel="Browse the market"
              actionTo="/marketplace"
            />
          </div>
        </div>
      </MarketplaceShell>
    );
  return (
    <MarketplaceShell>
      <div className="page-enter mx-auto max-w-[1200px] px-4 py-10 md:px-8">
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-sm font-extrabold text-[#596059]"
        >
          <ArrowLeft size={16} /> Continue browsing
        </Link>
        <div className="mt-6 flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="ledger-label">Your order ledger</p>
            <h1 className="mt-3 font-display text-5xl tracking-[-.05em]">
              Cart.
            </h1>
          </div>
          <button
            className="inline-flex items-center gap-2 text-sm font-extrabold text-clay"
            onClick={clearCart}
          >
            <Trash2 size={15} /> Clear cart
          </button>
        </div>
        <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_21rem]">
          {
            <div className="grid gap-3">
              {items.map(item => (
                <article
                  key={item.id}
                  className="grid grid-cols-[5.5rem_1fr] gap-4 border border-line bg-[#fffdf7] p-3 sm:grid-cols-[7rem_1fr_auto] sm:p-4"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-[5.5rem] w-[5.5rem] object-cover sm:h-28 sm:w-28"
                  />
                  <div className="flex min-w-0 flex-col">
                    <p className="ledger-label !text-[.58rem]">{item.shop}</p>
                    <Link
                      to={`/products/${item.id}`}
                      className="mt-2 text-sm font-extrabold leading-5"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm font-extrabold text-ochre-dark">
                      {formatCurrency(item.price, item.currency)}
                    </p>
                    <div className="mt-auto pt-3">
                      <QuantityControl
                        value={item.quantity}
                        onChange={value => updateQuantity(item.id, value)}
                        max={item.stock ?? Infinity}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-between border-t border-line pt-3 sm:col-span-1 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                    <p className="text-sm font-extrabold">
                      {formatCurrency(
                        item.price * item.quantity,
                        item.currency
                      )}
                    </p>
                    <button
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-clay"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          }
          <aside className="surface h-fit bg-[#fffdf7] p-5">
            <p className="ledger-label">Order summary</p>
            <div className="mt-6 grid gap-3 border-b border-line pb-5 text-sm">
              <div className="flex justify-between">
                <span className="text-[#666b65]">Subtotal</span>
                <span className="font-extrabold">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666b65]">Delivery</span>
                <span className="font-bold">Calculated next</span>
              </div>
            </div>
            <div className="mt-5 flex items-baseline justify-between">
              <span className="font-display text-2xl">Total</span>
              <span className="text-xl font-extrabold text-ochre-dark">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <Link className="button-primary mt-6 w-full" to="/checkout">
              Continue to checkout <ArrowRight size={16} />
            </Link>
            <p className="mt-4 text-xs leading-5 text-[#737870]">
              Payment options and delivery will be confirmed before your order
              is sent.
            </p>
          </aside>
        </div>
      </div>
    </MarketplaceShell>
  );
}
