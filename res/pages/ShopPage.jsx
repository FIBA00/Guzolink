/** Style: Market Ledger — each merchant storefront has a distinct banner field, trust metadata, and catalogue body. */
import { ArrowLeft, MapPin, Package, Phone } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import MarketplaceShell from "../components/layout/MarketplaceShell";
import ProductCard from "../components/common/ProductCard";
import {
  EmptyState,
  ErrorState,
  LoadingBlock,
} from "../components/common/AsyncState";
import { useShop } from "../features/catalogue/catalogueQueries";
export default function ShopPage() {
  const { slug } = useParams();
  const query = useShop(slug);
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
  const shop = query.data;
  if (!shop)
    return (
      <MarketplaceShell>
        <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8">
          <EmptyState
            title="Shop not found"
            description="This storefront may have changed its address."
            actionLabel="Browse shops"
            actionTo="/shops"
          />
        </div>
      </MarketplaceShell>
    );
  return (
    <MarketplaceShell>
      <div className="page-enter mx-auto max-w-[1440px] px-4 py-7 md:px-8">
        <Link
          to="/shops"
          className="inline-flex items-center gap-2 text-sm font-extrabold text-[#596059]"
        >
          <ArrowLeft size={16} /> Merchant directory
        </Link>
        <section className="registration-mark mt-6 overflow-hidden bg-ink">
          <div className="relative min-h-[280px] overflow-hidden sm:min-h-[360px]">
            <img
              src={shop.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 grid gap-6 p-6 text-white sm:p-10 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="ledger-label !text-[#e4d8bf]">{shop.category}</p>
                <h1 className="mt-4 font-display text-5xl leading-[.95] tracking-[-.055em] sm:text-6xl">
                  {shop.name}
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#ece7dc]">
                  {shop.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-xs font-bold text-[#f1eadf]">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {shop.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Package size={14} />
                  {shop.products} goods
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-12">
          <div className="flex items-end justify-between border-b border-line pb-5">
            <div>
              <p className="ledger-label">Shop catalogue</p>
              <h2 className="mt-3 font-display text-4xl tracking-[-.04em]">
                Available now.
              </h2>
            </div>
            <span className="hidden items-center gap-2 text-xs font-bold text-[#616761] sm:flex">
              <Phone size={15} /> Contact through order notes
            </span>
          </div>
          {shop.products?.length ? (
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {shop.products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-7">
              <EmptyState
                title="This shop is restocking"
                description="There are no public products listed just now."
                actionLabel="Browse all goods"
                actionTo="/marketplace"
              />
            </div>
          )}
        </section>
      </div>
    </MarketplaceShell>
  );
}
