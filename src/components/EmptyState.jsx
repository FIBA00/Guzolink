import { AlertCircle, ArrowRight, Inbox, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyState ( {
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