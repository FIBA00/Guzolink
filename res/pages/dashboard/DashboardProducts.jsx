/** Style: Market Ledger — inventory is a clean ledger; cached API records drive every row while edit work stays focused in a modal desk. */
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ErrorState, LoadingBlock } from "../../components/common/AsyncState";
import MediaManager from "../../components/common/MediaManager";
import StatusBadge from "../../components/common/StatusBadge";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Modal from "../../components/ui/Modal";
import { categories } from "../../data/previewData";
import { useCreateActivity } from "../../features/activities/activityQueries";
import {
  useCreateMerchantProduct,
  useDeleteMerchantProduct,
  useMerchantProducts,
  useUpdateMerchantProduct,
} from "../../features/merchant/merchantQueries";
import { formatCurrency } from "../../lib/utils";
import { toast } from "sonner";

const productSchema = z.object({
  name: z.string().min(2, "Name is required."),
  price: z.coerce.number().positive("Use a price greater than zero."),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative."),
  category: z.string().min(1, "Choose a category."),
  description: z.string().min(12, "Use at least 12 characters."),
});

function ProductEditor({ product, onClose }) {
  const createProduct = useCreateMerchantProduct();
  const updateProduct = useUpdateMerchantProduct();
  const createActivity = useCreateActivity();
  const [images, setImages] = useState(
    product?.images?.length ? product.images : [product?.image].filter(Boolean)
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      name: "",
      price: "",
      stock: "",
      category: "",
      description: "",
    },
  });
  async function recordActivity(activity) {
    await createActivity.mutateAsync({
      ...activity,
      link: "/dashboard/products",
    });
  }
  async function submit(values) {
    const data = {
      ...values,
      images,
      image: images[0] || product?.image || "",
    };
    try {
      if (product) {
        await updateProduct.mutateAsync({ id: product.id, data });
        await recordActivity({
          title: "Product updated",
          detail: `${values.name} was updated in the inventory ledger.`,
          kind: "product",
        });
        toast.success("Product changes saved.");
      } else {
        await createProduct.mutateAsync(data);
        await recordActivity({
          title: "Product created",
          detail: `${values.name} was added to the inventory ledger.`,
          kind: "product",
        });
        toast.success("Product created.");
      }
      onClose();
    } catch (error) {
      toast.error(error.message || "The product could not be saved.");
    }
  }
  const busy =
    isSubmitting ||
    createProduct.isPending ||
    updateProduct.isPending ||
    createActivity.isPending;
  return (
    <form className="grid gap-6" onSubmit={handleSubmit(submit)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className="field-label">Product name</span>
          <input className="text-field" {...register("name")} />
          {errors.name && (
            <span className="mt-1 block text-xs font-bold text-clay">
              {errors.name.message}
            </span>
          )}
        </label>
        <label>
          <span className="field-label">Category</span>
          <select className="text-field" {...register("category")}>
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="mt-1 block text-xs font-bold text-clay">
              {errors.category.message}
            </span>
          )}
        </label>
        <label>
          <span className="field-label">Price in ETB</span>
          <input
            className="text-field"
            type="number"
            min="1"
            {...register("price")}
          />
          {errors.price && (
            <span className="mt-1 block text-xs font-bold text-clay">
              {errors.price.message}
            </span>
          )}
        </label>
        <label>
          <span className="field-label">Available quantity</span>
          <input
            className="text-field"
            type="number"
            min="0"
            {...register("stock")}
          />
          {errors.stock && (
            <span className="mt-1 block text-xs font-bold text-clay">
              {errors.stock.message}
            </span>
          )}
        </label>
      </div>
      <label>
        <span className="field-label">Description</span>
        <textarea
          className="text-field min-h-28 resize-y"
          {...register("description")}
        />
        {errors.description && (
          <span className="mt-1 block text-xs font-bold text-clay">
            {errors.description.message}
          </span>
        )}
      </label>
      <MediaManager
        images={images}
        onChange={setImages}
        context="product"
        label="Product images"
        onActivity={recordActivity}
      />
      <div className="flex flex-wrap justify-end gap-3 border-t border-line pt-6">
        <button className="button-secondary" type="button" onClick={onClose}>
          Cancel
        </button>
        <button className="button-primary" disabled={busy}>
          {busy ? "Saving…" : product ? "Save product" : "Create product"}
        </button>
      </div>
    </form>
  );
}

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
