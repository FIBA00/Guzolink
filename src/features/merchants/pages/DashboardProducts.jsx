/** Style: Market Ledger — inventory is a clean ledger; cached API records drive every row while edit work stays focused in a modal desk. */
import { ImagePlus, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ! internal imports
import ErrorState from "../../../components/ErrorState.jsx";
import LoadingBlock from "../../../components/LoadingBlock.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import ConfirmDialog from "../../../components/ConfirmDialog.jsx";
import Modal from "../../../components/Modal.jsx";
import ProductEditor from "../components/ProductEditor.jsx";
// # hooks
import { useCreateActivity } from "../../../api/activityQueries.js";
import {
  useDeleteMerchantProduct,
  useMerchantProducts,
} from "../hooks/useMerchantQueries.js";
import { formatCurrency } from "../../../lib/utils.js";

export default function DashboardProducts() {
  const productsQuery = useMerchantProducts();
  const deleteProduct = useDeleteMerchantProduct();
  const createActivity = useCreateActivity();

  
  const [editor, setEditor] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const products = productsQuery.data?.items || [];

  async function removeProduct() {
    try {
      await deleteProduct.mutateAsync(deleteTarget.id);
      await createActivity.mutateAsync({
        title: "Product deleted",
        detail: `${deleteTarget.name} was removed from the inventory ledger.`,
        kind: "product",
        link: "/dashboard/products",
      });
      toast.success("Product removed.");
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error.message || "The product could not be removed.");
    }
  }

  return (
    <>
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="ledger-label">Inventory ledger</p>
          <h1 className="mt-3 font-display text-5xl tracking-[-.05em]">
            Products.
          </h1>
        </div>
        <button
          className="button-primary self-start"
          onClick={() => setEditor({ mode: "create" })}
        >
          <Plus size={16} /> Add product
        </button>
      </div>
      <p className="mt-5 flex items-center gap-2 text-sm text-[#656b64]">
        <ImagePlus size={16} className="text-ochre-dark" /> Add up to five
        product images and make any one the primary catalogue image.
      </p>
      {productsQuery.isLoading ? (
        <LoadingBlock label="Loading inventory…" />
      ) : productsQuery.isError ? (
        <ErrorState
          title="Inventory is unavailable"
          description={productsQuery.error.message}
          onRetry={productsQuery.refetch}
        />
      ) : (
        <div className="mt-5 grid gap-3">
          {products.map(item => (
            <article
              key={item.id}
              className="grid grid-cols-[4rem_1fr_auto] items-center gap-4 border border-line bg-[#fffdf7] p-3 sm:grid-cols-[5rem_1fr_auto_auto]"
            >
              <img
                src={item.images?.[0] || item.image}
                alt=""
                className="h-16 w-16 object-cover sm:h-20 sm:w-20"
              />
              <div>
                <p className="text-sm font-extrabold">{item.name}</p>
                <p className="mt-1 text-xs text-[#6e736c]">
                  {item.category} · {item.stock} in stock ·{" "}
                  {item.images?.length || 1} image
                  {(item.images?.length || 1) === 1 ? "" : "s"}
                </p>
                <p className="mt-2 text-sm font-extrabold text-ochre-dark">
                  {formatCurrency(item.price)}
                </p>
              </div>
              <StatusBadge>{item.stock ? "Active" : "Draft"}</StatusBadge>
              <div className="flex gap-2">
                <button
                  className="icon-button h-9 w-9"
                  onClick={() => setEditor({ mode: "edit", product: item })}
                  aria-label={`Edit ${item.name}`}
                >
                  <MoreHorizontal size={18} />
                </button>
                <button
                  className="icon-button h-9 w-9 !text-clay"
                  onClick={() => setDeleteTarget(item)}
                  aria-label={`Delete ${item.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal
        open={Boolean(editor)}
        onClose={() => setEditor(null)}
        title={
          editor?.mode === "edit"
            ? `Edit ${editor.product.name}`
            : "Add a product"
        }
        eyebrow={
          editor?.mode === "edit" ? "Inventory record" : "New inventory record"
        }
        size="max-w-3xl"
      >
        {editor && (
          <ProductEditor
            key={editor.product?.id || "new"}
            product={editor.product}
            onClose={() => setEditor(null)}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Remove this product?"
        description={`This removes ${deleteTarget?.name || "this product"} from the merchant workspace and records the activity.`}
        confirmLabel="Remove product"
        destructive
        busy={deleteProduct.isPending || createActivity.isPending}
        onClose={() => setDeleteTarget(null)}
        onConfirm={removeProduct}
      />
    </>
  );
}
