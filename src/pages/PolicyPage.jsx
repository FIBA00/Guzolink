/** Style: Market Ledger — policy copy is server-ready content, presented as a readable formal record rather than a detached document. */
import { ShieldCheck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ErrorState, LoadingBlock } from "../components/InlineLoading";
import MarketplaceShell from "../layout/MarketplaceShell";
import { usePolicy } from "../api/useMerchantQueries";
export default function PolicyPage() {
  const { slug = "terms" } = useParams();
  const policyQ = usePolicy(slug);
  if (policyQ.isLoading)
    return (
      <MarketplaceShell>
        <LoadingBlock label="Loading policy…" />
      </MarketplaceShell>
    );
  if (policyQ.isError)
    return (
      <MarketplaceShell>
        <ErrorState
          title="Policy unavailable"
          description={policyQ.error.message}
          onRetry={policyQ.refetch}
        />
      </MarketplaceShell>
    );
  const policy = policyQ.data;
  return (
    <MarketplaceShell>
      <article className="page-enter mx-auto max-w-[900px] px-4 py-10 md:px-8">
        <div className="border-b border-line pb-7">
          <ShieldCheck className="text-ochre-dark" size={24} />
          <p className="ledger-label mt-5">Guzolink policy record</p>
          <h1 className="mt-3 font-display text-5xl">{policy.title}</h1>
          <p className="mt-4 text-sm text-[#6b7069]">{policy.updated}</p>
        </div>
        <div className="mt-8 space-y-8">
          {policy.sections.map(([heading, copy]) => (
            <section key={heading}>
              <h2 className="font-display text-3xl">{heading}</h2>
              <p className="mt-3 text-sm leading-8 text-[#565c56]">{copy}</p>
            </section>
          ))}
        </div>
        <aside className="mt-10 border border-[#d5c39b] bg-[#f4ead5] p-5 text-sm leading-6 text-[#645b4d]">
          This is a configurable preview policy. Obtain legal, tax,
          consumer-protection, and marketplace-policy review before public
          launch.
        </aside>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-extrabold text-ochre-dark">
          <Link to="/policies/terms">Terms</Link>
          <Link to="/policies/privacy">Privacy</Link>
          <Link to="/policies/returns">Returns</Link>
          <Link to="/policies/merchant">Merchant agreement</Link>
        </div>
      </article>
    </MarketplaceShell>
  );
}
