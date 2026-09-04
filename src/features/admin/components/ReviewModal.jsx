/** Style: Market Ledger — administrator review is a calm editorial decision desk, separating merchant context from the accountable action. */
import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ! internal imports
import Modal from "../../../components/Modal.jsx";

// # hooks
import { useCreateActivity } from "../../../api/activityQueries.js";
import { useStorefrontDecision } from "../features/admin/adminQueries";
import { formatDate } from "../../../lib/utils.js";

export default function ReviewModal({ shop, onClose }) {
  const [reason, setReason] = useState("");
  const decision = useStorefrontDecision();
  const activity = useCreateActivity();

  async function resolve(status) {
    if (status === "rejected" && reason.trim().length < 8) {
      toast.error("Add a short rejection reason for the merchant.");
      return;
    }
    try {
      await decision.mutateAsync({
        id: shop.id,
        decision: status,
        reason: reason.trim(),
      });
      await activity.mutateAsync({
        title: `Storefront ${status}`,
        detail: `${shop.name} was ${status} by an administrator${reason.trim() ? `: ${reason.trim()}` : "."}`,
        kind: "shop",
        link: "/admin",
      });
      toast.success(
        status === "approved"
          ? "Storefront approved."
          : "Storefront rejected with feedback."
      );
      onClose();
    } catch (error) {
      toast.error(error.message || "The review decision could not be saved.");
    }
  }
  const busy = decision.isPending || activity.isPending;
  return (
    <Modal
      open={Boolean(shop)}
      onClose={onClose}
      title={shop?.name || "Storefront review"}
      eyebrow="Administrator review"
      size="max-w-2xl"
    >
      {shop && (
        <div>
          <div className="grid gap-5 sm:grid-cols-[10rem_1fr]">
            <img
              src={shop.image}
              alt=""
              className="aspect-[4/3] h-full w-full object-cover"
            />
            <div>
              <p className="ledger-label">Merchant submission</p>
              <p className="mt-3 text-sm font-extrabold">{shop.merchantName}</p>
              <p className="mt-1 text-sm text-[#686d66]">
                {shop.merchantEmail}
              </p>
              <p className="mt-4 text-sm leading-6 text-[#59605a]">
                {shop.description}
              </p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[.1em] text-[#777c75]">
                Submitted {formatDate(shop.submittedAt)}
              </p>
            </div>
          </div>
          <label className="mt-6 block">
            <span className="field-label">
              Review note{" "}
              <span className="font-normal text-[#747970]">
                (required when rejecting)
              </span>
            </span>
            <textarea
              className="text-field min-h-24 resize-y"
              value={reason}
              onChange={event => setReason(event.target.value)}
              placeholder="Share a clear next step for the merchant."
            />
          </label>
          <div className="mt-7 flex flex-wrap justify-between gap-3 border-t border-line pt-6">
            <button
              className="button-secondary !text-clay"
              onClick={() => resolve("rejected")}
              disabled={busy}
            >
              <XCircle size={16} /> Reject
            </button>
            <button
              className="button-primary !bg-moss !border-moss"
              onClick={() => resolve("approved")}
              disabled={busy}
            >
              <CheckCircle2 size={16} />{" "}
              {busy ? "Saving decision…" : "Approve storefront"}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
