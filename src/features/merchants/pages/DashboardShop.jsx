/** Style: Market Ledger — storefront data is cached from the merchant API; a single calm record controls identity, media, and publication approval. */
import {
  CheckCircle2,
  Clock3,
  Edit3,
  ImagePlus,
  MapPin,
  Phone,
  Plus,
  Send,
  Store,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ! internal importa
import ErrorState from "../../../components/ErrorState.jsx";
import LoadingBlock from "../../../components/LoadingBlock.jsx";
import ConfirmDialog from "../../../components/ConfirmDialog.jsx";
import Modal from "../../../components/Modal.jsx";

// # hooks
import { useCreateActivity } from "../../../api/activityQueries.js";
import {
  useDeleteMerchantShop,
  useMerchantShop,
  usePublishMerchantShop,
} from "../hooks/useMerchantQueries.js";
import ShopEditor from "../components/ShopEditor.jsx";

const approval = {
  approved: {
    label: "Published",
    detail: "Your storefront is visible to marketplace customers.",
    icon: CheckCircle2,
    tone: "text-moss",
  },
  pending: {
    label: "Approval pending",
    detail: "Your publish request is with the marketplace team.",
    icon: Clock3,
    tone: "text-ochre-dark",
  },
  draft: {
    label: "Draft storefront",
    detail: "Complete your details, then request publishing approval.",
    icon: Clock3,
    tone: "text-[#737870]",
  },
};

export default function DashboardShop() {
  const shopQuery = useMerchantShop();
  const deleteShop = useDeleteMerchantShop();
  const publishShop = usePublishMerchantShop();
  const createActivity = useCreateActivity();
  const [editing, setEditing] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const shop = shopQuery.data;
  const state = approval[shop?.approvalStatus] || approval.draft;
  async function closeShop() {
    try {
      await deleteShop.mutateAsync();
      await createActivity.mutateAsync({
        title: "Shop closed",
        detail: `${shop.name} was removed from the merchant workspace.`,
        kind: "shop",
        link: "/dashboard/shop",
      });
      toast.success("Shop closed.");
      setDeleteOpen(false);
    } catch (error) {
      toast.error(error.message || "The shop could not be closed.");
    }
  }
  async function requestPublication() {
    try {
      await publishShop.mutateAsync({ approvalStatus: "pending" });
      await createActivity.mutateAsync({
        title: "Publishing approval requested",
        detail: `${shop.name} is awaiting marketplace approval before it can be published.`,
        kind: "shop",
        link: "/dashboard/shop",
      });
      toast.success("Publish request sent for approval.");
    } catch (error) {
      toast.error(error.message || "The publish request could not be sent.");
    }
  }
  if (shopQuery.isLoading) return <LoadingBlock label="Loading storefront…" />;
  if (shopQuery.isError)
    return (
      <ErrorState
        title="Storefront is unavailable"
        description={shopQuery.error.message}
        onRetry={shopQuery.refetch}
      />
    );
  if (!shop)
    return (
      <section className="registration-mark max-w-2xl border border-line bg-[#fffdf7] p-6 sm:p-8">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f2e2c3] text-ochre-dark">
          <Store size={20} />
        </span>
        <p className="ledger-label mt-6">Storefront management</p>
        <h1 className="mt-3 font-display text-5xl tracking-[-.05em]">
          Open a shop.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-[#656b64]">
          Create a storefront with its own name, identity, contact information,
          and media before you publish products.
        </p>
        <button
          className="button-primary mt-7"
          onClick={() => setEditing(true)}
        >
          <Plus size={16} /> Create shop
        </button>
        <Modal
          open={editing}
          onClose={() => setEditing(false)}
          title="Create a shop"
          eyebrow="New storefront"
        >
          <ShopEditor onClose={() => setEditing(false)} />
        </Modal>
      </section>
    );
  const ApprovalIcon = state.icon;
  return (
    <>
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="ledger-label">Storefront management</p>
          <h1 className="mt-3 font-display text-5xl tracking-[-.05em]">
            Your shop.
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="button-secondary" onClick={() => setEditing(true)}>
            <Edit3 size={16} /> Edit shop
          </button>
          <button
            className="icon-button !text-clay"
            onClick={() => setDeleteOpen(true)}
            aria-label="Close shop"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <section className="registration-mark mt-7 grid overflow-hidden border border-line bg-[#fffdf7] lg:grid-cols-[.8fr_1.2fr]">
        <div className="min-h-64 bg-[#e9e0cd]">
          <img
            src={shop.banner || shop.image}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-[#f1e3c6] text-ochre-dark">
              {shop.logo ? (
                <img
                  src={shop.logo}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <Store size={23} />
              )}
            </div>
            <div>
              <p className="ledger-label">Public storefront</p>
              <h2 className="mt-3 font-display text-4xl tracking-[-.04em]">
                {shop.name}
              </h2>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-[#5e645e]">
            {shop.description}
          </p>
          <div className="mt-6 grid gap-3 border-t border-line pt-5 text-sm sm:grid-cols-2">
            <p className="flex items-center gap-2 font-bold">
              <MapPin size={16} className="text-ochre-dark" /> {shop.location}
            </p>
            <p className="flex items-center gap-2 font-bold">
              <Phone size={16} className="text-ochre-dark" />{" "}
              {shop.phone || "Add contact phone"}
            </p>
          </div>
          <div className="mt-6 border border-[#dccba6] bg-[#f8f0dd] p-4">
            <p
              className={`flex items-center gap-2 text-sm font-extrabold ${state.tone}`}
            >
              <ApprovalIcon size={17} /> {state.label}
            </p>
            <p className="mt-2 text-xs leading-5 text-[#686d66]">
              {state.detail}
            </p>
            {shop.approvalStatus !== "approved" && (
              <button
                className="button-primary mt-4"
                onClick={requestPublication}
                disabled={publishShop.isPending || createActivity.isPending}
              >
                <Send size={15} />{" "}
                {publishShop.isPending
                  ? "Requesting…"
                  : shop.approvalStatus === "pending"
                    ? "Refresh approval"
                    : "Request publishing approval"}
              </button>
            )}
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs leading-5 text-[#70756e]">
            <ImagePlus size={15} className="text-ochre-dark" /> Shop logo and
            banner can be updated inside the edit shop modal.
          </p>
        </div>
      </section>
      <Modal
        open={editing}
        onClose={() => setEditing(false)}
        title="Edit your shop"
        eyebrow="Storefront record"
        size="max-w-3xl"
      >
        <ShopEditor
          key={shop.id}
          shop={shop}
          onClose={() => setEditing(false)}
        />
      </Modal>
      <ConfirmDialog
        open={deleteOpen}
        title="Close this shop?"
        description="The storefront will be removed from this merchant workspace. This can affect active product visibility."
        confirmLabel="Close shop"
        destructive
        busy={deleteShop.isPending || createActivity.isPending}
        onClose={() => setDeleteOpen(false)}
        onConfirm={closeShop}
      />
    </>
  );
}
