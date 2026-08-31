/** Style: Market Ledger — catalogue browsing gives filters a sturdy side rail and preserves product cards as the focus. */
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MarketplaceShell from "../components/layout/MarketplaceShell";
import ProductCard from "../components/common/ProductCard";
import {
  EmptyState,
  ErrorState,
  LoadingBlock,
} from "../components/common/AsyncState";
import { categories } from "../data/previewData";
import { useProducts } from "../features/catalogue/catalogueQueries";
export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filters = useMemo(
    () => ({
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "all",
      maxPrice: searchParams.get("maxPrice") || "",
      sort: searchParams.get("sort") || "newest",
    }),
    [searchParams]
  );
  const query = useProducts(filters);
  function update(key, value) {
    const params = new URLSearchParams(searchParams);
    value && value !== "all" && value !== "newest"
      ? params.set(key, value)
      : params.delete(key);
    setSearchParams(params);
  }
  const filterContent = (
    <div className="grid gap-6">
      <div>
        <p className="ledger-label">Filter the shelves</p>
        <label className="field-label mt-5" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          className="text-field"
          value={filters.category}
          onChange={event => update("category", event.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
      <div className="rule-top pt-5">
        <label className="field-label" htmlFor="price">
          Maximum price
        </label>
        <select
          id="price"
          className="text-field"
          value={filters.maxPrice}
          onChange={event => update("maxPrice", event.target.value)}
        >
          <option value="">Any price</option>
          <option value="500">Up to ETB 500</option>
          <option value="1000">Up to ETB 1,000</option>
          <option value="1500">Up to ETB 1,500</option>
        </select>
      </div>
      <button
        className="inline-flex items-center gap-2 self-start text-sm font-extrabold text-ochre-dark"
        onClick={() => setSearchParams({})}
      >
        <X size={15} /> Clear filters
      </button>
    </div>
  );
  return (
    <MarketplaceShell>
      <div className="page-enter mx-auto max-w-[1440px] px-4 py-10 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[15.5rem_1fr]">
          <aside className="hidden border-r border-line pr-8 lg:block">
            {filterContent}
          </aside>
          <div>
            <div className="flex flex-col justify-between gap-5 border-b border-line pb-6 sm:flex-row sm:items-end">
              <div>
                <p className="ledger-label">Marketplace catalogue</p>
                <h1 className="mt-3 font-display text-5xl tracking-[-.05em]">
                  Browse all goods.
                </h1>
              </div>
              <button
                className="button-secondary self-start lg:hidden"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <Filter size={16} /> Filters
              </button>
            </div>
            {filtersOpen && (
              <aside className="mt-4 border border-line bg-[#fffdf7] p-5 lg:hidden">
                {filterContent}
              </aside>
            )}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <label className="flex min-w-0 flex-1 items-center gap-2 border border-line bg-[#fffdf7] px-3">
                <Search size={17} className="text-[#737870]" />
                <input
                  className="w-full bg-transparent py-3 text-sm outline-none"
                  value={filters.search}
                  onChange={event => update("search", event.target.value)}
                  placeholder="Search goods and merchants"
                />
              </label>
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={17} className="text-[#737870]" />
                <label className="sr-only" htmlFor="sort">
                  Sort goods
                </label>
                <select
                  id="sort"
                  className="border border-line bg-[#fffdf7] px-3 py-3 text-sm font-bold"
                  value={filters.sort}
                  onChange={event => update("sort", event.target.value)}
                >
                  <option value="newest">Newest first</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
              </div>
            </div>
            <p className="mt-7 text-sm text-[#656b64]">
              {query.data?.total || 0} goods available
            </p>
            {query.isLoading ? (
              <div className="mt-5">
                <LoadingBlock rows={4} />
              </div>
            ) : query.isError ? (
              <div className="mt-5">
                <ErrorState error={query.error} onRetry={query.refetch} />
              </div>
            ) : query.data.items.length ? (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {query.data.items.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="mt-5">
                <EmptyState
                  title="No matching goods"
                  description="Try a different search or clear your filters."
                  actionLabel="Clear filters"
                  actionTo="/marketplace"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </MarketplaceShell>
  );
}
