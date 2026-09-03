/** Style: Market Ledger — inventory is a clean ledger; cached API records drive every row while edit work stays focused in a modal desk. */
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// ! internal imports
import MediaManager from "../../../components/MediaManager.jsx";

// # hooks
import { categories } from "../../../data/data.categories.js";
import { useCreateActivity } from "../../../api/activityQueries.js";
import {
  useCreateMerchantProduct,
  useUpdateMerchantProduct,
} from "../hooks/useMerchantQueries.js";
import { productSchema } from "../../../schemas/product.schema.js";

export default function ProductEditor({ product, onClose }) {
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
