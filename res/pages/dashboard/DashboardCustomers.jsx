/** Style: Market Ledger — customer information is an API-backed, privacy-aware ledger with useful purchase signals. */
import { Mail, Search, UsersRound } from "lucide-react";
import { useState } from "react";
import { ErrorState, LoadingBlock } from "../../components/common/AsyncState";
import { useMerchantCustomers } from "../../features/merchant/merchantQueries";
import { formatCurrency } from "../../lib/utils";
export default function DashboardCustomers() {
  const [search, setSearch] = useState("");
  const customersQuery = useMerchantCustomers({ search });
  const customers = customersQuery.data?.items || [];
  return (
    <>
      <div className="border-b border-line pb-6">
        <p className="ledger-label">Customer ledger</p>
        <h1 className="mt-3 font-display text-5xl tracking-[-.05em]">
          Customers.
        </h1>
      </div>
      <div className="mt-7 flex flex-col justify-between gap-4 sm:flex-row">
        <label className="flex max-w-md flex-1 items-center gap-2 border border-line bg-[#fffdf7] px-3">
          <Search size={17} className="text-[#737870]" />
          <span className="sr-only">Search customers</span>
          <input
            className="w-full bg-transparent py-3 text-sm outline-none"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search customer name or email"
          />
        </label>
        <p className="flex items-center gap-2 text-sm text-[#646a64]">
          <UsersRound size={18} className="text-ochre-dark" />{" "}
          {customersQuery.data?.total || 0} customers
        </p>
      </div>
      {customersQuery.isLoading ? (
        <LoadingBlock label="Loading customers…" />
      ) : customersQuery.isError ? (
        <ErrorState
          title="Customers are unavailable"
          description={customersQuery.error.message}
          onRetry={customersQuery.refetch}
        />
      ) : (
        <section className="mt-5 overflow-hidden border border-line bg-[#fffdf7]">
          <div className="hidden grid-cols-[1.2fr_.7fr_.7fr_.8fr] gap-4 border-b border-line bg-[#f4efe3] px-5 py-3 text-[.68rem] font-extrabold uppercase tracking-[.1em] text-[#6e736c] md:grid">
            <span>Customer</span>
            <span>Orders</span>
            <span>Total spent</span>
            <span>Last order</span>
          </div>
          <div className="divide-y divide-line">
            {customers.map(customer => (
              <article
                key={customer.id}
                className="grid gap-3 p-5 md:grid-cols-[1.2fr_.7fr_.7fr_.8fr] md:items-center md:gap-4"
              >
                <div>
                  <p className="text-sm font-extrabold">{customer.name}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-[#6d726c]">
                    <Mail size={12} /> {customer.email}
                  </p>
                </div>
                <p className="text-sm">
                  <span className="mr-2 text-xs font-bold text-[#777c75] md:hidden">
                    Orders
                  </span>
                  {customer.orders}
                </p>
                <p className="text-sm font-extrabold">
                  <span className="mr-2 text-xs font-bold text-[#777c75] md:hidden">
                    Spent
                  </span>
                  {formatCurrency(customer.spent)}
                </p>
                <p className="text-sm text-[#616761]">
                  <span className="mr-2 text-xs font-bold text-[#777c75] md:hidden">
                    Last order
                  </span>
                  {customer.lastOrder}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
