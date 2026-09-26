import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { forbidden, getAuthenticatedUser, unauthorized } from "@/lib/api-auth";
import { optimizeCloudinaryImageUrl } from "@/lib/product-images";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const admin = await getAuthenticatedUser();
  if (!admin) return unauthorized();
  if (admin.role !== "admin") return forbidden();

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary is not fully configured on the server." },
      { status: 503 },
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);
  if (!(file instanceof File) || !allowedTypes.has(file.type)) {
    return NextResponse.json({ error: "Please select a valid image file." }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "Each image must be smaller than 8 MB." }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "wearwell/products";
  const signature = createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");
  const upload = new FormData();
  upload.append("file", file);
  upload.append("api_key", apiKey);
  upload.append("timestamp", String(timestamp));
  upload.append("folder", folder);
  upload.append("signature", signature);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: upload,
      signal: AbortSignal.timeout(30_000),
    });
    const data = await response.json() as { secure_url?: string; public_id?: string; error?: { message?: string } };
    if (!response.ok || !data.secure_url) {
      return NextResponse.json({ error: data.error?.message || "Cloudinary upload failed." }, { status: 502 });
    }
    return NextResponse.json({ url: optimizeCloudinaryImageUrl(data.secure_url), publicId: data.public_id });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: "Cloudinary did not respond in time. Please try again." }, { status: 502 });
  }
}
