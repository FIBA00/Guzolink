/** Style: Market Ledger — uploads use the configured REST endpoint in production and a transparent local preview fallback during development. */
import { api, isPreviewMode, unwrap } from "./api";

function toDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("The image could not be read."));
    reader.readAsDataURL(file);
  });
}

export async function uploadMerchantImage(file, context = "product") {
  if (!file?.type?.startsWith("image/"))
    throw new Error("Choose an image file in PNG, JPG, WEBP, or GIF format.");
  if (file.size > 5 * 1024 * 1024)
    throw new Error("Choose an image smaller than 5 MB.");
  const uploadPath =
    import.meta.env.VITE_API_MEDIA_UPLOAD_PATH || "/api/media/upload";

  if (!isPreviewMode() && uploadPath) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("context", context);
    const response = await api.post(uploadPath, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const result = unwrap(response);
    const url = result?.url || result?.file?.url || result?.data?.url;
    if (!url) throw new Error("The media service did not return an image URL.");
    return url;
  }

  return toDataUrl(file);
}
