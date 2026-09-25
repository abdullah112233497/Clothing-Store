const CLOUDINARY_DELIVERY_HOST = "res.cloudinary.com";

/**
 * Temporary catalog artwork delivered by Cloudinary's public demo cloud.
 * Replace this with an asset from the store's own cloud once its cloud name is configured.
 */
export const PRODUCT_IMAGE_PLACEHOLDER =
  "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_fill,g_auto,w_1200,h_1600/docs/models";

export function isCloudinaryImageUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === CLOUDINARY_DELIVERY_HOST &&
      /^\/[^/]+\/image\/(upload|fetch)\//.test(url.pathname)
    );
  } catch {
    return false;
  }
}

export function optimizeCloudinaryImageUrl(value: string): string {
  if (!isCloudinaryImageUrl(value) || value.includes("/upload/f_auto,")) return value;
  return value.replace("/image/upload/", "/image/upload/f_auto,q_auto,c_limit,w_1600/");
}
