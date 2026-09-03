/** Style: Market Ledger — an asymmetric market spread with a dark photographic field, editorial lines, and varied discovery modules. */
import {
  ArrowRight,
  CookingPot,
  LampDesk,
  Palette,
  Search,
  Shirt,
  Sparkles,
  Store,
} from "lucide-react";

import { Link } from "react-router-dom";

// ! internal imports
import MarketplaceShell from "../layout/MarketplaceShell";
import ProductCard from "../components/ProductCard";
import ShopCard from "../components/ShopCard";
import LoadingBlock from "../components/LoadingBlock.jsx";

// # utils
import { categories } from "../data/data.customers.js";

import { useProducts, useShops } from "../features/catalogue/catalogueQueries";

// TODO: fix this by using real image.
const heroUrl = "/manus-storage/guzolink-market-ledger-hero_59c54f29.png";
const categoryIcons = { LampDesk, Shirt, CookingPot, Palette, Sparkles };

export default function HomePage() {
  const productsQuery = useProducts({});
  const shopsQuery = useShops({});
  const products = productsQuery.data?.items || [];
  const shops = shopsQuery.data?.items || [];
  
  return (
    <MarketplaceShell>
      <div className="page-enter">


        <section className="mx-auto grid max-w-[1440px] gap-0 px-0 md:grid-cols-[.82fr_1.18fr] md:px-8">
          <div className="order-2 flex flex-col justify-between bg-[#e7dfcf] px-5 py-10 sm:px-10 md:order-1 md:min-h-[580px] md:px-12">
            <div>
              <p className="ledger-label">Local marketplace · Ethiopia</p>
              <h1 className="mt-5 max-w-[12ch] font-display text-5xl leading-[.94] tracking-[-.055em] sm:text-6xl lg:text-7xl">
                Find the good stuff, close to home.
              </h1>
              <p className="mt-6 max-w-md text-sm leading-7 text-[#545b55]">
                From everyday essentials to one-of-a-kind finds, Guzolink
                gathers independent shops in one useful place.
              </p>
              <form
                className="mt-8 flex max-w-md border border-[#bcb3a2] bg-[#fffdf7] p-1"
                action="/marketplace"
              >
                <label className="sr-only" htmlFor="hero-search">
                  Search products and shops
                </label>
                <input
                  id="hero-search"
                  name="search"
                  className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
                  placeholder="Search products or shops"
                />
                <button className="button-primary" type="submit">
                  <Search size={16} />
                  <span className="hidden sm:inline">Search market</span>
                </button>
              </form>
            </div>
            
            <div className="mt-12 flex items-center gap-4 border-t border-[#bcb3a2] pt-5 text-xs font-bold text-[#596058]">
              <Store size={17} className="text-ochre-dark" /> Browse what local
              merchants are making and stocking now.
            </div>
          </div>
          <div className="relative order-1 min-h-[380px] overflow-hidden bg-ink md:order-2 md:min-h-[580px]">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={heroUrl}
              alt="Curated products at a local market"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/20 via-transparent to-ink/25" />
            <div className="absolute bottom-0 right-0 max-w-[15rem] bg-ochre p-5 text-white">
              <p className="text-[.66rem] font-extrabold uppercase tracking-[.13em] text-white/75">
                This week’s field note
              </p>
              <p className="mt-2 font-display text-2xl leading-tight">
                Small-batch goods worth keeping close.
              </p>
            </div>
          </div>
        </section>


        <section className="mx-auto max-w-[1440px] px-4 py-14 md:px-8">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="ledger-label">Start with a category</p>
              <h2 className="mt-3 font-display text-4xl tracking-[-.04em]">
                Browse the shelves.
              </h2>
            </div>
            <Link
              to="/marketplace"
              className="hidden items-center gap-2 text-sm font-extrabold text-ochre-dark sm:inline-flex"
            >
              All goods <ArrowRight size={16} />
            </Link>
          </div>
          <div className="hide-scrollbar mt-7 flex gap-3 overflow-x-auto pb-2">
            {categories.map(category => {
              const Icon = categoryIcons[category.icon];
              return (
                <Link
                  to={`/marketplace?category=${category.id}`}
                  key={category.id}
                  className="group flex min-w-36 flex-col gap-4 border border-line bg-[#fffdf7] p-4 hover:border-ink sm:min-w-40"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#f4ead5] text-ochre-dark">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <span className="text-sm font-extrabold">
                    {category.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>


        <section className="mx-auto max-w-[1440px] px-4 md:px-8">
          <div className="grid gap-8 border-y border-line py-12 lg:grid-cols-[.66fr_1.34fr]">
            <div>
              <p className="ledger-label">Merchant edit</p>
              <h2 className="mt-3 max-w-[9ch] font-display text-5xl leading-[.95] tracking-[-.05em]">
                Shop the stories behind the goods.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-[#626861]">
                When you know where an item comes from, the choice is simpler.
                Meet the stores shaping the local market.
              </p>
              <Link to="/shops" className="button-secondary mt-7">
                Meet the shops <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {shopsQuery.isLoading ? (
                <LoadingBlock rows={3} />
              ) : (
                shops
                  .slice(0, 3)
                  .map(shop => <ShopCard key={shop.id} shop={shop} />)
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 py-14 md:px-8">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="ledger-label">Fresh on the market</p>
              <h2 className="mt-3 font-display text-4xl tracking-[-.04em]">
                Worth a closer look.
              </h2>
            </div>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-ochre-dark"
            >
              See all <ArrowRight size={16} />
            </Link>
          </div>
          {productsQuery.isLoading ? (
            <div className="mt-8">
              <LoadingBlock rows={4} />
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {products
                .filter(product => product.featured)
                .slice(0, 4)
                .map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={index < 2}
                  />
                ))}
            </div>
          )}
        </section>

        <section className="bg-moss px-4 py-14 text-[#fffaf2] md:px-8">
          <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-[1fr_.9fr] md:items-end">
            <div>
              <p className="ledger-label !text-[#d4dccd]">
                A shopfront that travels
              </p>
              <h2 className="mt-4 max-w-[12ch] font-display text-5xl leading-[.95] tracking-[-.05em]">
                Your local business belongs in the everyday scroll.
              </h2>
            </div>
            <div className="md:justify-self-end">
              <p className="max-w-md text-sm leading-7 text-[#e1e7dc]">
                Guzolink gives merchants a clear place to show products, receive
                orders, and keep their shop moving.
              </p>
              <Link
                className="button-primary mt-6 !border-[#fffaf2] !bg-[#fffaf2] !text-ink hover:!bg-[#ede7da]"
                to="/dashboard"
              >
                Open merchant workspace <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>

    </MarketplaceShell>
  );
}
