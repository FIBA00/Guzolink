/** Style: Market Ledger — media management uses a visible contact sheet with primary-image logic, upload feedback, and reversible removal. */
import { ImagePlus, LoaderCircle, Star, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ! internal imports
import { uploadMerchantImage } from "../services/mediaUpload";

export default function MediaManager({
  images = [],
  onChange,
  context = "product",
  maxImages = 5,
  label = "Product images",
  onActivity,
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);


  async function handleFiles(event) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const remaining = maxImages - images.length;
    if (remaining <= 0) {
      toast.error(`You can add up to ${maxImages} images.`);
      return;
    }
    setUploading(true);
    try {
      const uploads = await Promise.all(
        files
          .slice(0, remaining)
          .map(file => uploadMerchantImage(file, context))
      );
      onChange([...images, ...uploads]);
      onActivity?.({
        title: `${uploads.length} image${uploads.length > 1 ? "s" : ""} added`,
        detail: `${label} was updated with ${uploads.length} new image${uploads.length > 1 ? "s" : ""}.`,
        kind: "media",
      });
      toast.success(
        `${uploads.length} image${uploads.length > 1 ? "s" : ""} ready to save.`
      );
    } catch (error) {
      toast.error(error.message || "We could not add that image.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function removeImage(index) {
    const next = images.filter((_, itemIndex) => itemIndex !== index);
    onChange(next);
    onActivity?.({
      title: "Image removed",
      detail: `${label} was updated and one image was removed.`,
      kind: "media",
    });
    toast.success("Image removed.");
  }

  function makePrimary(index) {
    if (!index) return;
    onChange([
      images[index],
      ...images.filter((_, itemIndex) => itemIndex !== index),
    ]);
    toast.success("Primary image updated.");
  }
  
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="field-label !mb-1">{label}</p>
          <p className="text-xs leading-5 text-[#747970]">
            PNG, JPG, WEBP, or GIF · up to 5 MB each · {images.length}/
            {maxImages} selected
          </p>
        </div>
        <button
          type="button"
          className="button-secondary"
          onClick={() => inputRef.current?.click()}
          disabled={uploading || images.length >= maxImages}
        >
          {uploading ? (
            <LoaderCircle className="animate-spin" size={16} />
          ) : (
            <Upload size={16} />
          )}{" "}
          {uploading ? "Adding…" : "Choose images"}
        </button>
        <input
          ref={inputRef}
          className="sr-only"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          multiple={maxImages > 1}
          onChange={handleFiles}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image, index) => (
          <article
            key={`${image}-${index}`}
            className="registration-mark relative overflow-hidden border border-line bg-[#f2ecdf]"
          >
            <img
              src={image}
              alt={`${label} ${index + 1}`}
              className="aspect-square h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-between gap-1 bg-ink/78 p-2">
              <button
                type="button"
                className="grid h-7 w-7 place-items-center text-white hover:bg-white/15"
                aria-label={
                  index === 0 ? "Primary image" : "Make primary image"
                }
                onClick={() => makePrimary(index)}
              >
                <Star size={15} fill={index === 0 ? "currentColor" : "none"} />
              </button>
              <button
                type="button"
                className="grid h-7 w-7 place-items-center text-[#ffd4c8] hover:bg-white/15"
                aria-label={`Remove image ${index + 1}`}
                onClick={() => removeImage(index)}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </article>
        ))}
        {images.length < maxImages && (
          <button
            type="button"
            className="flex aspect-square flex-col items-center justify-center gap-2 border border-dashed border-[#bfb6a6] bg-[#faf5ea] px-3 text-center text-xs font-extrabold text-[#6a706a] hover:border-ochre-dark hover:text-ochre-dark"
            onClick={() => inputRef.current?.click()}
          >
            <ImagePlus size={21} /> Add image
          </button>
        )}
      </div>
    </section>
  );
}
