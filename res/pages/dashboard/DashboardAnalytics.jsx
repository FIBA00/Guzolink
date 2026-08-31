/** Style: Market Ledger — analytics renders cached merchant signals from the API, retaining a useful preview story until production data is available. */
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { ErrorState, LoadingBlock } from "../../components/common/AsyncState";
import { useMerchantAnalytics } from "../../features/merchant/merchantQueries";
import { formatCurrency } from "../../lib/utils";
export default function DashboardAnalytics() {
  const analyticsQuery = useMerchantAnalytics();
  if (analyticsQuery.isLoading)
    return <LoadingBlock label="Loading shop signals…" />;
  if (analyticsQuery.isError)
    return (
      <ErrorState
        title="Analytics is unavailable"
        description={analyticsQuery.error.message}
        onRetry={analyticsQuery.refetch}
      />
    );
  const data = analyticsQuery.data || {};
  return (
    <>
      <div className="border-b border-line pb-6">
        <p className="ledger-label">Shop signals</p>
        <h1 className="mt-3 font-display text-5xl tracking-[-.05em]">
          Analytics.
        </h1>
      </div>
      <section className="mt-7 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <article className="border border-line bg-[#fffdf7] p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="ledger-label">Sales overview · This week</p>
              <p className="mt-4 text-4xl font-extrabold tracking-[-.055em]">
                {formatCurrency(data.totalSales || 0)}
              </p>
              <p className="mt-2 flex items-center gap-1 text-sm font-bold text-moss">
                <TrendingUp size={16} /> {data.growth || 0}% more than last week
              </p>
            </div>
            <span className="border border-line px-3 py-2 text-xs font-extrabold text-[#616761]">
              {data.period || "Current period"}
            </span>
          </div>
          <div className="mt-10 flex h-52 items-end gap-2 border-b border-line pb-1 sm:gap-4">
            {(data.sales || []).map(day => (
              <div
                key={day.label}
                className="flex h-full flex-1 flex-col justify-end gap-2"
              >
                <div
                  className="group relative w-full bg-ochre/85 transition hover:bg-ochre"
                  style={{ height: `${day.value}%` }}
                >
                  <span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap bg-ink px-2 py-1 text-[10px] font-bold text-white group-hover:block">
                    {formatCurrency(day.amount || day.value * 100)}
                  </span>
                </div>
                <span className="text-center text-[10px] font-bold text-[#777c75]">
                  {day.label}
                </span>
              </div>
            ))}
          </div>
        </article>
        <aside className="border border-line bg-[#e7dfcf] p-5 sm:p-7">
          <p className="ledger-label">Top signal</p>
          <h2 className="mt-3 font-display text-3xl">
            Your {data.topProduct || "top item"} is carrying the week.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#616660]">
            {data.topProduct || "Your leading product"} accounts for{" "}
            {data.topProductShare || "—"} of current sales and remains the most
            frequently revisited listing.
          </p>
          <div className="mt-8 border-t border-[#c8bca6] pt-5">
            <p className="text-xs font-extrabold uppercase tracking-[.1em] text-[#6e7069]">
              Conversion snapshot
            </p>
            <p className="mt-3 text-2xl font-extrabold">
              {data.conversion || "—"}
            </p>
            <p className="mt-1 text-xs text-[#686d66]">
              Product views that became orders
            </p>
          </div>
        </aside>
      </section>
      <section className="mt-5 grid gap-3 sm:grid-cols-3">
        {(data.metrics || []).map(metric => (
          <article
            key={metric.label}
            className="border border-line bg-[#fffdf7] p-5"
          >
            <p className="text-xs font-extrabold uppercase tracking-[.1em] text-[#70766f]">
              {metric.label}
            </p>
            <p className="mt-4 text-2xl font-extrabold tracking-[-.04em]">
              {metric.value}
            </p>
            <p className="mt-2 flex items-center gap-1 text-xs font-bold text-moss">
              <ArrowUpRight size={13} /> {metric.change}
            </p>
          </article>
        ))}
      </section>
    </>
  );
}
