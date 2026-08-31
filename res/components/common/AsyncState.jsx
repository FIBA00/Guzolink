/** Style: Market Ledger — loading, empty, and error states use the same calm editorial composition as content. */
import { AlertCircle, ArrowRight, Inbox, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
export function LoadingBlock({ rows = 3 }) {
  return (
    <div className="grid gap-3" aria-label="Loading content">
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          className="h-24 animate-pulse border border-line bg-[#f1ecdf]"
        />
      ))}
    </div>
  );
}
export function EmptyState({
  title = "Nothing here yet",
  description = "Try adjusting your filters or come back soon.",
  actionLabel,
  actionTo,
}) {
  return (
    <section className="surface registration-mark grid min-h-64 place-items-center p-8 text-center">
      <div className="max-w-sm">
        <Inbox
          className="mx-auto mb-4 text-ochre"
          size={30}
          strokeWidth={1.5}
        />
        <h2 className="font-display text-3xl">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#676d66]">{description}</p>
        {actionLabel && actionTo && (
          <Link className="button-primary mt-5" to={actionTo}>
            {actionLabel}
            <ArrowRight size={15} />
          </Link>
        )}
      </div>
    </section>
  );
}
export function ErrorState({
  title = "We could not load this",
  error,
  onRetry,
}) {
  return (
    <section
      className="surface registration-mark grid min-h-64 place-items-center p-8 text-center"
      role="alert"
    >
      <div className="max-w-sm">
        <AlertCircle
          className="mx-auto mb-4 text-clay"
          size={30}
          strokeWidth={1.5}
        />
        <h2 className="font-display text-3xl">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#676d66]">
          {error?.message || "Please check your connection and try again."}
        </p>
        {onRetry && (
          <button className="button-secondary mt-5" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    </section>
  );
}
export function InlineLoading() {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-[#676d66]">
      <LoaderCircle size={16} className="animate-spin" /> Updating
    </span>
  );
}
