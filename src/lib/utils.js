/** Style: Market Ledger — shared formatting keeps commerce data clear and consistent. */
export function formatCurrency(value, currency = "ETB") {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

export function formatDate ( value )
{
  return value
    ? new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(value))
    : "—";
}

// Fix-me: use tailwind mergeing function instead of boolean filter.
export function classNames ( ...classes )
{
  return classes.filter(Boolean).join(" ");
}
