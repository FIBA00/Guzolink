/** Style: Market Ledger — administrator review is a calm editorial decision desk, separating merchant context from the accountable action. */
import {
  CheckCircle2,
  Clock3,
  ExternalLink,
  ShieldCheck,
  Store,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ErrorState, LoadingBlock } from "../components/InlineLoading";
import BrandMark from "../components/BrandMark";
import LanguageSelector from "../components/LanguageSelector";
import Modal from "../components/Modal";
import { useCreateActivity } from "../api/activityQueries";
import {
  useStorefrontDecision,
  useStorefrontReviews,
} from "../features/admin/adminQueries";
import { formatDate } from "../lib/utils";

function ReviewModal({ shop, onClose }) {
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
export default function AdminPage() {
  const [status, setStatus] = useState("pending");
  const [selected, setSelected] = useState(null);
  const reviews = useStorefrontReviews({ status });
  const shops = reviews.data?.items || [];
  const metrics = {
    pending: shops.filter(shop => shop.approvalStatus === "pending").length,
    approved: shops.filter(shop => shop.approvalStatus === "approved").length,
    rejected: shops.filter(shop => shop.approvalStatus === "rejected").length,
  };
  if (reviews.isLoading)
    return <LoadingBlock label="Loading storefront review queue…" />;
  if (reviews.isError)
    return (
      <ErrorState
        title="Review queue is unavailable"
        description={reviews.error.message}
        onRetry={reviews.refetch}
      />
    );
  return (
    <div className="min-h-screen bg-[#f4f0e7] text-ink">
      <header className="border-b border-line bg-[#fffdf7]">
        <div className="mx-auto flex min-h-[4.7rem] max-w-[1440px] items-center justify-between px-4 md:px-8">
          <BrandMark />
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link className="button-secondary" to="/dashboard">
              Merchant desk
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1440px] px-4 py-8 md:px-8">
        <section className="registration-mark bg-ink p-6 text-[#fffaf2] sm:p-8">
          <p className="ledger-label !text-[#cbc3b5]">
            Administrator desk · Marketplace governance
          </p>
          <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="font-display text-5xl tracking-[-.055em]">
                Review the next storefronts.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#d7d2c7]">
                Approve shops that are ready for marketplace discovery, or
                return a concise reason that helps a merchant act.
              </p>
            </div>
            <span className="flex items-center gap-2 text-sm font-extrabold text-[#e9c580]">
              <ShieldCheck size={18} /> Admin only
            </span>
          </div>
        </section>
        <section className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "Pending review",
              value: metrics.pending,
              icon: Clock3,
              tone: "text-ochre-dark",
            },
            {
              label: "Approved",
              value: metrics.approved,
              icon: CheckCircle2,
              tone: "text-moss",
            },
            {
              label: "Returned",
              value: metrics.rejected,
              icon: XCircle,
              tone: "text-clay",
            },
          ].map(({ label, value, icon: Icon, tone }) => (
            <article
              key={label}
              className="border border-line bg-[#fffdf7] p-5"
            >
              <Icon className={tone} size={20} />
              <p className="mt-5 text-xs font-extrabold uppercase tracking-[.1em] text-[#747970]">
                {label}
              </p>
              <p className="mt-2 text-3xl font-extrabold">{value}</p>
            </article>
          ))}
        </section>
        <section className="mt-8 border border-line bg-[#fffdf7]">
          <header className="flex flex-col justify-between gap-4 border-b border-line p-5 sm:flex-row sm:items-end">
            <div>
              <p className="ledger-label">Storefront queue</p>
              <h2 className="mt-2 font-display text-3xl">
                Submission records.
              </h2>
            </div>
            <select
              className="text-field w-auto"
              value={status}
              onChange={event => setStatus(event.target.value)}
            >
              <option value="pending">Pending review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Returned</option>
              <option value="all">All records</option>
            </select>
          </header>
          <div className="divide-y divide-line">
            {shops.length ? (
              shops.map(shop => (
                <article
                  key={shop.id}
                  className="grid gap-4 p-5 md:grid-cols-[5rem_1fr_auto] md:items-center"
                >
                  <img
                    src={shop.image}
                    alt=""
                    className="h-20 w-20 object-cover"
                  />
                  <div>
                    <p className="text-sm font-extrabold">{shop.name}</p>
                    <p className="mt-1 text-xs text-[#666c65]">
                      {shop.category} · {shop.location} · Submitted{" "}
                      {formatDate(shop.submittedAt)}
                    </p>
                    <p className="mt-2 text-xs font-bold text-[#747970]">
                      Merchant: {shop.merchantName}
                    </p>
                  </div>
                  <button
                    className="button-secondary w-fit"
                    onClick={() => setSelected(shop)}
                  >
                    Review <ExternalLink size={15} />
                  </button>
                </article>
              ))
            ) : (
              <div className="p-10 text-center">
                <Store className="mx-auto text-ochre-dark" size={24} />
                <p className="mt-4 text-sm font-extrabold">
                  No storefronts in this queue.
                </p>
                <p className="mt-1 text-xs text-[#737870]">
                  Try another review status when you need historic decisions.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <ReviewModal shop={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
