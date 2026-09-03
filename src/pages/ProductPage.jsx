/** Style: Market Ledger — product detail gives the object generous visual space and keeps merchant provenance near the buy decision. */
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  ShoppingBag,
  Store,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MarketplaceShell from "../layout/MarketplaceShell";
import ProductCard from "../components/ProductCard";
import QuantityControl from "../components/QuantityControl";
import {
  EmptyState,
  ErrorState,
  LoadingBlock,
} from "../components/InlineLoading";
import {
  useProduct,
  useProducts,
} from "../features/catalogue/catalogueQueries";
import { formatCurrency } from "../lib/utils";
import { useCartStore } from "../store/cartStore";
import { toast } from "sonner";
export default function ProductPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const query = useProduct(id);
  const relatedQuery = useProducts({});
  const addItem = useCartStore(state => state.addItem);
  if (query.isLoading)
    return (
      <MarketplaceShell>
        <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8">
          <LoadingBlock rows={3} />
        </div>
      </MarketplaceShell>
    );
  if (query.isError)
    return (
      <MarketplaceShell>
        <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8">
          <ErrorState error={query.error} onRetry={query.refetch} />
        </div>
      </MarketplaceShell>
    );
  const product = query.data;
  if (!product)
    return (
      <MarketplaceShell>
        <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8">
          <EmptyState
            title="Product not found"
            description="This product may have moved or is no longer available."
            actionLabel="Browse the market"
            actionTo="/marketplace"
          />
        </div>
      </MarketplaceShell>
    );
  const soldOut = Number(product.stock) === 0;
  function addToCart() {
    addItem(product, quantity);
    toast.success(`${quantity} × ${product.name} added to cart.`);
  }
  return (
    <MarketplaceShell>
      <div className="page-enter mx-auto max-w-[1440px] px-4 py-7 md:px-8">
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-sm font-extrabold text-[#596059]"
        >
          <ArrowLeft size={16} /> Back to catalogue
        </Link>
        <section className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
          <div className="registration-mark overflow-hidden bg-[#e9e2d3]">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col py-2">
            <p className="ledger-label">{product.category}</p>
            <h1 className="mt-4 font-display text-5xl leading-[.95] tracking-[-.055em] sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-6 text-2xl font-extrabold text-ochre-dark">
              {formatCurrency(product.price, product.currency)}
            </p>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#5e645d]">
              {product.description}
            </p>
            <div className="mt-7 border-y border-line py-5">
              <Link
                className="flex items-center justify-between gap-4"
                to={`/shops/${product.shopSlug}`}
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e9dfca] text-ochre-dark">
                    <Store size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold">
                      {product.shop}
                    </span>
                    <span className="mt-1 flex items-center gap-1 text-xs text-[#666c65]">
                      <MapPin size={13} /> Visit merchant storefront
                    </span>
                  </span>
                </span>
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <QuantityControl
                value={quantity}
                onChange={setQuantity}
                max={product.stock || 1}
              />
              <span
                className={`text-xs font-bold ${soldOut ? "text-clay" : "text-moss"}`}
              >
                {soldOut ? "Out of stock" : `${product.stock} available`}
              </span>
            </div>
            <button
              className="button-primary mt-5 w-full sm:w-auto"
              disabled={soldOut}
              onClick={addToCart}
            >
              <ShoppingBag size={17} />{" "}
              {soldOut ? "Currently unavailable" : "Add to cart"}
            </button>
            <p className="mt-4 text-xs leading-5 text-[#72776f]">
              Availability and delivery options are confirmed when you place
              your order.
            </p>
          </div>
        </section>
        <section className="mt-16 border-t border-line pt-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="ledger-label">Keep browsing</p>
              <h2 className="mt-3 font-display text-4xl tracking-[-.04em]">
                More to discover.
              </h2>
            </div>
            <Link
              to="/marketplace"
              className="text-sm font-extrabold text-ochre-dark"
            >
              All goods
            </Link>
          </div>
          {relatedQuery.isLoading ? (
            <div className="mt-6">
              <LoadingBlock rows={2} />
            </div>
          ) : (
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {relatedQuery.data.items
                .filter(item => item.id !== product.id)
                .slice(0, 4)
                .map(item => (
                  <ProductCard key={item.id} product={item} />
                ))}
            </div>
          )}
        </section>
      </div>
    </MarketplaceShell>
  );
}
