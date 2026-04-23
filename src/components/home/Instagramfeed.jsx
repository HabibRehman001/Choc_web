import { useEffect, useMemo, useState } from "react";
import "../../Styles/Whychooseus.css";
import { fetchImagesByTag, getCycledImageUrl } from "../../utils/imageApi";

const POSTS = [
  { id: 1, tone: "linear-gradient(145deg, #2c1810 0%, #4a312b 100%)" },
  { id: 2, tone: "linear-gradient(145deg, #3e2723 0%, #5a3a33 100%)" },
  { id: 3, tone: "linear-gradient(145deg, #35211b 0%, #6b473e 100%)" },
  { id: 4, tone: "linear-gradient(145deg, #2b160f 0%, #4f342d 100%)" },
  { id: 5, tone: "linear-gradient(145deg, #2c1810 0%, #5a3a33 100%)" },
  { id: 6, tone: "linear-gradient(145deg, #3e2723 0%, #6b473e 100%)" },
  { id: 7, tone: "linear-gradient(145deg, #2b170f 0%, #5f3e35 100%)" },
  { id: 8, tone: "linear-gradient(145deg, #35211b 0%, #6e4a40 100%)" },
  { id: 9, tone: "linear-gradient(145deg, #2c1810 0%, #573831 100%)" },
  { id: 10, tone: "linear-gradient(145deg, #3e2723 0%, #5f3e35 100%)" },
  { id: 11, tone: "linear-gradient(145deg, #2b160f 0%, #4a312b 100%)" },
  { id: 12, tone: "linear-gradient(145deg, #35211b 0%, #6b473e 100%)" },
];

const InstaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="ig-icon" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="2" />
    <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
  </svg>
);

export default function InstagramFeed() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const results = await fetchImagesByTag("instagram", 12);
        setImages(results);
      } catch (error) {
        console.error("Failed to load instagram images", error);
      }
    };

    load();
  }, []);

  const posts = useMemo(
    () =>
      POSTS.map((post, index) => {
        const imageUrl = getCycledImageUrl(images, index);
        return {
          ...post,
          imageUrl,
          href: imageUrl || "#",
        };
      }),
    [images]
  );

  return (
    <section className="ig-section">
      <h2 className="ig-heading">Catch us on instagram</h2>

      <div className="ig-grid">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="ig-cell"
            aria-label="View on Instagram"
          >
            {post.imageUrl ? (
              <img src={post.imageUrl} alt={`Instagram post ${post.id}`} className="ig-placeholder ig-placeholder--image" loading="lazy" />
            ) : (
              <div className="ig-placeholder" style={{ background: post.tone }} aria-hidden="true" />
            )}
            <div className="ig-overlay">
              <InstaIcon />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
