import { AlertCircle, ArrowRight, Inbox, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";


export default function ErrorState({
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
