/** Style: Market Ledger — merchant onboarding is a calm operating guide connected to the configurable content API. */
import { BookOpenCheck, CheckCircle2, CircleDashed, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { ErrorState, LoadingBlock } from "../components/common/AsyncState";
import MarketplaceShell from "../components/layout/MarketplaceShell";
import { useMerchantOnboarding } from "../features/experience/experienceQueries";
export default function MerchantOnboardingPage() {
  const onboarding = useMerchantOnboarding();
  if (onboarding.isLoading)
    return (
      <MarketplaceShell>
        <LoadingBlock label="Loading merchant guide…" />
      </MarketplaceShell>
    );
  if (onboarding.isError)
    return (
      <MarketplaceShell>
        <ErrorState
          title="Merchant guide unavailable"
          description={onboarding.error.message}
          onRetry={onboarding.refetch}
        />
      </MarketplaceShell>
    );
  return (
    <MarketplaceShell>
      <div className="page-enter mx-auto max-w-[1100px] px-4 py-10 md:px-8">
        <section className="bg-ink p-6 text-[#fffaf2] sm:p-9">
          <p className="ledger-label !text-[#c7c3b7]">Merchant success guide</p>
          <h1 className="mt-3 font-display text-5xl">
            Put your best shop forward.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#d4d0c6]">
            Work through the practical publishing steps, then request
            marketplace review with confidence.
          </p>
        </section>
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <section className="border border-line bg-[#fffdf7] p-5 sm:p-7">
            <p className="ledger-label">Launch steps</p>
            <div className="mt-5 divide-y divide-line">
              {onboarding.data.items.map(item => (
                <div key={item.id} className="flex gap-4 py-4">
                  <span className="mt-0.5 text-ochre-dark">
                    {item.state === "Complete" ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <CircleDashed size={20} />
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-extrabold">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#646a63]">
                      {item.description}
                    </p>
                    <span className="mt-2 inline-block text-xs font-extrabold text-moss">
                      {item.state}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/dashboard/shop" className="button-primary mt-6">
              <Store size={16} /> Open shop settings
            </Link>
          </section>
          <aside className="border border-line bg-[#efe4cc] p-5 sm:p-7">
            <BookOpenCheck className="text-ochre-dark" size={23} />
            <p className="ledger-label mt-5">Merchant resources</p>
            <div className="mt-4 grid gap-3">
              {onboarding.data.guides.map(guide => (
                <button
                  key={guide}
                  className="border-b border-[#c8b996] py-3 text-left text-sm font-extrabold"
                  onClick={() =>
                    window.alert(
                      `${guide} will be served by your configured MERCHANT_ONBOARDING endpoint.`
                    )
                  }
                >
                  {guide}
                </button>
              ))}
            </div>
            <Link
              className="button-secondary mt-7 w-full"
              to="/policies/merchant"
            >
              Read merchant agreement
            </Link>
          </aside>
        </div>
      </div>
    </MarketplaceShell>
  );
}
