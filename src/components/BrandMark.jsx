/** Style: Market Ledger — a prominent linked-market tile and customised wordmark make every global entry point unmistakably Guzolink. */
import { Link } from "react-router-dom";

// TODO: fix this using real image.
const markUrl = "/manus-storage/guzolink-linked-market-mark_d6a14816.png";

export default function BrandMark ( { compact = false, dark = false } )
{
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2.5"
      aria-label="Guzolink home"
    >
      <span
        className="brand-tile relative grid h-11 w-11 place-items-center overflow-hidden"
        aria-hidden="true"
      >
        <span className="brand-tile-fallback" />
        <img
          src={markUrl}
          alt=""
          className="relative z-10 h-full w-full object-contain"
          onError={event => {
            event.currentTarget.style.opacity = "0";
          }}
        />
      </span>
      {!compact && (
        <span
          className={`guzolink-wordmark text-[1.06rem] font-extrabold ${dark ? "text-white" : "text-ink"}`}
        >
          guzo<span>link</span>
        </span>
      )}
    </Link>
  );
}
