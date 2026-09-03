/** Style: Market Ledger — modal work is a centered, focused desk with calm motion and a clear exit. */
import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  title,
  eyebrow,
  children,
  size = "max-w-2xl",
}) {
  useEffect(() => {
    if (!open) return undefined;
    function handleKey(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, open]);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-ink/55 p-4"
      role="presentation"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={`surface page-enter max-h-[calc(100vh-2rem)] w-full overflow-y-auto bg-[#fffdf7] shadow-2xl ${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-[#fffdf7] p-5 sm:p-6">
          <div>
            <p className="ledger-label">{eyebrow || "Workspace"}</p>
            <h2
              id="modal-title"
              className="mt-3 font-display text-3xl tracking-[-.04em]"
            >
              {title}
            </h2>
          </div>
          <button
            className="icon-button h-9 w-9 shrink-0"
            onClick={onClose}
            aria-label={`Close ${title}`}
          >
            <X size={17} />
          </button>
        </header>
        <div className="p-5 sm:p-6">{children}</div>
      </section>
    </div>
  );
}
