const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const getApiBaseUrl = () => API_BASE_URL;

export const fetchImagesByTag = async (tag, limit = 20) => {
  if (!tag) return [];

  const response = await fetch(
    `${API_BASE_URL}/api/images?active=true&tag=${encodeURIComponent(tag)}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch images for tag: ${tag}`);
  }

  const data = await response.json();
  return Array.isArray(data.images) ? data.images : [];
};

export const getCycledImageUrl = (images, index) => {
  if (!Array.isArray(images) || images.length === 0) return null;
  return images[index % images.length]?.url || null;
};
