import { useEffect, useState } from "react";
import "../../Styles/CorporateGifting.css";
import { fetchImagesByTag } from "../../utils/imageApi";

export default function CorporateGifting() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const images = await fetchImagesByTag("corporate", 1);
        setImageUrl(images[0]?.url || null);
      } catch (error) {
        console.error("Failed to load corporate image", error);
      }
    };

    load();
  }, []);

  return (
    <section className="cg-section">
      <div className="cg-text">
        <h2 className="cg-heading">
          <em>Corporate gifting</em>
        </h2>
        <p className="cg-subheading">Chocolate gifts that speak for you</p>
        <p className="cg-body">
          Whether you&apos;re thanking clients, hyping up your team, or adding a sweet
          touch to an event, our edible gifts are designed to wow. They look great,
          taste even better, and we handle everything from start to finish.
        </p>
        <button className="cg-btn">Impress now</button>
      </div>

      <div className="cg-img-wrap" aria-hidden="true">
        <div className="cg-blob-bg" />
        <div className={`cg-circle${imageUrl ? " cg-circle--with-image" : ""}`}>
          {imageUrl ? <img src={imageUrl} alt="Corporate gifting" className="cg-image" /> : null}
        </div>
      </div>
    </section>
  );
}
