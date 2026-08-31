/** Style: Market Ledger — status is legible through words, weight, and grounded natural colors. */
import { classNames } from "../../lib/utils";
const styles = {
  Paid: "bg-[#e2eee0] text-[#31573b]",
  Packed: "bg-[#faedcf] text-[#8c570d]",
  Delivered: "bg-[#e6ece6] text-[#36513a]",
  Pending: "bg-[#f6e5dd] text-[#97472f]",
  New: "bg-[#e7edf1] text-[#35576a]",
  Active: "bg-[#e2eee0] text-[#31573b]",
  Draft: "bg-[#ece8de] text-[#655f55]",
  Low: "bg-[#f6e5dd] text-[#97472f]",
};
export default function StatusBadge({ children }) {
  return (
    <span
      className={classNames(
        "inline-flex whitespace-nowrap px-2.5 py-1 text-[.68rem] font-extrabold uppercase tracking-[.08em]",
        styles[children] || "bg-[#ece8de] text-[#655f55]"
      )}
    >
      {children}
    </span>
  );
}
