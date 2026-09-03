/** Style: Market Ledger — loading, empty, and error states use the same calm editorial composition as content. */
import { LoaderCircle } from "lucide-react";

export function InlineLoading() {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-[#676d66]">
      <LoaderCircle size={16} className="animate-spin" /> Updating
    </span>
  );
}
