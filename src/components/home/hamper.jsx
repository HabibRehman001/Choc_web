import { useEffect, useState } from "react";
import "../../Styles/Hamper.css";
import { fetchImagesByTag } from "../../utils/imageApi";

function Hamper() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const images = await fetchImagesByTag("hamper-banner", 1);
        setImageUrl(images[0]?.url || null);
      } catch (error) {
        console.error("Failed to load hamper image", error);
      }
    };

    load();
  }, []);

  return (
    <section
      className={`hamper-banner${imageUrl ? " hamper-banner--with-image" : ""}`}
      role="img"
      aria-label="Chocolate and cake hamper showcase"
      style={
        imageUrl
          ? {
              backgroundImage: `linear-gradient(120deg, rgba(18, 10, 6, 0.7), rgba(18, 10, 6, 0.25)), url(${imageUrl})`,
            }
          : undefined
      }
    />
  );
}

export default Hamper;
