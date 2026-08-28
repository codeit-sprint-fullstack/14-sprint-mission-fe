const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export function getProductImageUrl(imageUrl) {
  if (!imageUrl) {
    return "/images/img_default.png";
  }

  if (imageUrl.startsWith("/uploads")) {
    return `${API_BASE_URL}${imageUrl}`;
  }

  return imageUrl;
}
