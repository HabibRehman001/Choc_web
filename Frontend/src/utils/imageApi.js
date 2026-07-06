// Empty base URL in dev uses Vite's /api proxy (same port as the frontend).
// In production (Vercel), set VITE_API_BASE_URL to your deployed backend URL before building.
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

export const getApiBaseUrl = () => API_BASE_URL;

/** Rewrite image URLs so they always point at the configured API host in production. */
export const resolveImageUrl = (url) => {
  if (!url) return null;

  try {
    const { pathname } = new URL(url);
    return API_BASE_URL ? `${API_BASE_URL}${pathname}` : url;
  } catch {
    if (url.startsWith("/")) {
      return API_BASE_URL ? `${API_BASE_URL}${url}` : url;
    }
    return url;
  }
};

export const fetchImagesByTag = async (tag, limit = 20) => {
  if (!tag) return [];

  if (import.meta.env.PROD && !API_BASE_URL) {
    console.error(
      "VITE_API_BASE_URL is not set. Add it in Vercel → Settings → Environment Variables, then redeploy."
    );
    return [];
  }

  const response = await fetch(
    `${API_BASE_URL}/api/images?active=true&tag=${encodeURIComponent(tag)}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch images for tag: ${tag}`);
  }

  const data = await response.json();
  const images = Array.isArray(data.images) ? data.images : [];

  return images.map((image) => ({
    ...image,
    url: resolveImageUrl(image.url),
  }));
};

export const getCycledImageUrl = (images, index) => {
  if (!Array.isArray(images) || images.length === 0) return null;
  return resolveImageUrl(images[index % images.length]?.url);
};
