/** Style: Market Ledger — storefront data is cached from the merchant API; a single calm record controls identity, media, and publication approval. */
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// ! internal importa
import MediaManager from "../../../components/MediaManager.jsx";

// # hooks
import { useCreateActivity } from "../../../api/activityQueries.js";
import {
  useCreateMerchantShop,
  useUpdateMerchantShop,
} from "../hooks/useMerchantQueries.js";
import { shopSchema } from "../../../schemas/shop.schema.js";

export default function ShopEditor({ shop, onClose }) {
  const createShop = useCreateMerchantShop();
  const updateShop = useUpdateMerchantShop();
  const createActivity = useCreateActivity();
  const [logoImages, setLogoImages] = useState([shop?.logo].filter(Boolean));
  const [bannerImages, setBannerImages] = useState(
    [shop?.banner || shop?.image].filter(Boolean)
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(shopSchema),
    defaultValues: shop || {
      name: "",
      slug: "",
      description: "",
      phone: "",
      location: "",
    },
  });

  async function record(activity) {
    await createActivity.mutateAsync({
      ...activity,
      kind: activity.kind || "shop",
      link: "/dashboard/shop",
    });
  }

  async function submit(values) {
    const data = {
      ...values,
      logo: logoImages[0] || "",
      banner: bannerImages[0] || "",
      image: bannerImages[0] || shop?.image || "",
      approvalStatus: shop?.approvalStatus || "draft",
    };
    try {
      if (shop) {
        await updateShop.mutateAsync(data);
        await record({
          title: "Shop updated",
          detail: `${values.name} storefront details and media were saved.`,
        });
        toast.success("Shop details saved.");
      } else {
        await createShop.mutateAsync(data);
        await record({
          title: "Shop created",
          detail: `${values.name} was added to the merchant workspace.`,
        });
        toast.success("Shop created.");
      }
      onClose();
    } catch (error) {
      toast.error(error.message || "The shop could not be saved.");
    }
  }

  const busy =
    isSubmitting ||
    createShop.isPending ||
    updateShop.isPending ||
    createActivity.isPending;

  return (
    <form className="grid gap-6" onSubmit={handleSubmit(submit)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className="field-label">Shop name</span>
          <input className="text-field" {...register("name")} />
          {errors.name && (
            <span className="mt-1 block text-xs font-bold text-clay">
              {errors.name.message}
            </span>
          )}
        </label>
        <label>
          <span className="field-label">Shop slug</span>
          <input className="text-field" {...register("slug")} />
          {errors.slug && (
            <span className="mt-1 block text-xs font-bold text-clay">
              {errors.slug.message}
            </span>
          )}
          <span className="mt-1 block text-[11px] text-[#777c75]">
            guzolink.example/shops/your-slug
          </span>
        </label>
      </div>
      <label>
        <span className="field-label">Shop story</span>
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
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className="field-label">Contact phone</span>
          <span className="relative block">
            <Phone className="absolute left-3 top-3 text-[#777c75]" size={16} />
            <input className="text-field pl-9" {...register("phone")} />
          </span>
          {errors.phone && (
            <span className="mt-1 block text-xs font-bold text-clay">
              {errors.phone.message}
            </span>
          )}
        </label>
        <label>
          <span className="field-label">City / location</span>
          <span className="relative block">
            <MapPin
              className="absolute left-3 top-3 text-[#777c75]"
              size={16}
            />
            <input className="text-field pl-9" {...register("location")} />
          </span>
          {errors.location && (
            <span className="mt-1 block text-xs font-bold text-clay">
              {errors.location.message}
            </span>
          )}
        </label>
      </div>
      <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
        <MediaManager
          images={logoImages}
          onChange={setLogoImages}
          context="shop-logo"
          maxImages={1}
          label="Shop logo"
          onActivity={record}
        />
        <MediaManager
          images={bannerImages}
          onChange={setBannerImages}
          context="shop-banner"
          maxImages={1}
          label="Storefront banner"
          onActivity={record}
        />
      </div>
      <div className="flex flex-wrap justify-end gap-3 border-t border-line pt-6">
        <button className="button-secondary" type="button" onClick={onClose}>
          Cancel
        </button>
        <button className="button-primary" disabled={busy}>
          {busy ? "Saving…" : shop ? "Save shop" : "Create shop"}
        </button>
      </div>
    </form>
  );
}
