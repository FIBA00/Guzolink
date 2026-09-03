/** Style: Market Ledger — quantity changes are compact, keyboard-friendly, and visibly bounded by stock. */
import { Minus, Plus } from "lucide-react";
export default function QuantityControl({
  value,
  onChange,
  max = Infinity,
  label = "Quantity",
}) {
  const decrement = () => onChange(Math.max(1, Number(value) - 1));
  const increment = () => onChange(Math.min(max, Number(value) + 1));
  return (
    <div
      className="inline-flex items-center border border-line bg-[#fffdf7]"
      aria-label={label}
    >
      <button
        className="grid h-10 w-10 place-items-center hover:bg-[#f4efe3] disabled:opacity-40"
        onClick={decrement}
        disabled={value <= 1}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <span
        className="grid h-10 min-w-10 place-items-center border-x border-line text-sm font-extrabold"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        className="grid h-10 w-10 place-items-center hover:bg-[#f4efe3] disabled:opacity-40"
        onClick={increment}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
