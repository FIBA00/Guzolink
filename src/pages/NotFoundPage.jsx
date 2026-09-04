/** Style: Market Ledger — a missing route is treated as a navigational dead-end with a straightforward return to discovery. */
import { ArrowRight, Map } from "lucide-react";
import { Link } from "react-router-dom";
import MarketplaceShell from "../layout/MarketplaceShell";
export default function NotFoundPage() {
  return (
    <MarketplaceShell>
      <div className="grid min-h-[60vh] place-items-center px-4 py-16 text-center">
        <div>
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#f1e2c5] text-ochre-dark">
            <Map size={25} />
          </span>
          <p className="ledger-label mt-7">404 · Wrong turn</p>
          <h1 className="mt-4 font-display text-5xl tracking-[-.05em]">
            This shelf is empty.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#666b65]">
            The page you looked for may have moved, or it may never have been
            part of this marketplace.
          </p>
          <Link className="button-primary mt-7" to="/marketplace">
            Browse the market <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </MarketplaceShell>
  );
}
