/** Style: Market Ledger — consequential actions are framed plainly and confirm intent before changing records. */
import { AlertTriangle, X } from "lucide-react";
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  destructive = false,
  onConfirm,
  onClose,
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/45 p-4"
      role="presentation"
    >
      <div
        className="surface w-full max-w-md bg-[#fffdf7] p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <div className="flex items-start justify-between gap-4">
          <AlertTriangle
            className={destructive ? "text-clay" : "text-ochre"}
            size={25}
          />
          <button
            className="icon-button h-8 w-8"
            onClick={onClose}
            aria-label="Close confirmation"
          >
            <X size={16} />
          </button>
        </div>
        <h2 id="confirm-title" className="mt-5 font-display text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#686d66]">{description}</p>
        <div className="mt-7 flex justify-end gap-3">
          <button className="button-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className={
              destructive
                ? "button-primary !border-clay !bg-clay hover:!bg-[#9d452f]"
                : "button-primary"
            }
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
