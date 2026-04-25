import { useEffect, useState } from "react";
import { fetchImagesByTag } from "../../utils/imageApi";

export default function Sell() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const images = await fetchImagesByTag("bestsell", 1);
        setImageUrl(images[0]?.url || null);
      } catch (error) {
        console.error("Failed to load sell banner image", error);
      }
    };

    load();
  }, []);

  return (
    <section className="bs-section" aria-labelledby="bs-heading">
      <div className="bs-title-wrap">
        <h2 id="bs-heading">Best selling items</h2>
      </div>
      <div className="bs-img-container">
        <div className={`bs-placeholder${imageUrl ? " bs-placeholder--with-image" : ""}`} role="img" aria-label="Best selling product banner">
          {imageUrl ? <img src={imageUrl} alt="Best selling items" className="bs-img-db" /> : null}
        </div>
      </div>
    </section>
  );
}
