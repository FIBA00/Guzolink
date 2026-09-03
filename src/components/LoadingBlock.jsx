
export  default function LoadingBlock({ rows = 3 }) {
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
