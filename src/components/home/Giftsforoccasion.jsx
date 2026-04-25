import { useEffect, useState } from "react";
import "../../Styles/Giftsforoccasion.css";
import { fetchImagesByTag } from "../../utils/imageApi";

const OCCASIONS = [
  { label: "Birthday", imageTag: "gfo-birthday", tone: "linear-gradient(150deg, #3e2723 0%, #5a3a33 100%)" },
  { label: "Just Love", imageTag: "gfo-love", tone: "linear-gradient(150deg, #2c1810 0%, #4a312b 100%)" },
  { label: "Wedding", imageTag: "gfo-wedding", tone: "linear-gradient(150deg, #4a312b 0%, #6b473e 100%)" },
  { label: "New baby", imageTag: "gfo-newborn", tone: "linear-gradient(150deg, #35211b 0%, #5a3a33 100%)" },
];

const SLIDE_COUNT = Math.ceil(OCCASIONS.length / 2);

function OccasionBlob({ imageUrl, tone, label }) {
  return (
    <div className={`gfo-blob${imageUrl ? " gfo-blob--with-image" : ""}`} style={{ background: imageUrl ? undefined : tone }} aria-hidden="true">
      {imageUrl ? <img src={imageUrl} alt={label} loading="lazy" /> : null}
    </div>
  );
}

export default function GiftsForOccasion() {
  const [slide, setSlide] = useState(0);
  const [imagesByTag, setImagesByTag] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const results = await Promise.all(
          OCCASIONS.map(async (occasion) => {
            const images = await fetchImagesByTag(occasion.imageTag, 1);
            return [occasion.imageTag, images];
          })
        );
        setImagesByTag(Object.fromEntries(results));
      } catch (error) {
        console.error("Failed to load occasion images", error);
      }
    };

    load();
  }, []);

  const prev = () => setSlide((p) => (p - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  const next = () => setSlide((p) => (p + 1) % SLIDE_COUNT);

  return (
    <section className="gfo-section">
      <div className="gfo-inner">
        <div className="gfo-text">
          <h2 className="gfo-heading">
            <em>
              Gifts for every <span className="gfo-accent">occasion</span>
            </em>
          </h2>
          <p className="gfo-body">
            Whether it&apos;s a birthday, a thank-you for a colleague, or just because;
            you&apos;ll find the perfect treats for life&apos;s little, big, and in-between
            moments.
          </p>
        </div>

        <div className="gfo-grid">
          {OCCASIONS.map((occ, index) => {
            const imageUrl = imagesByTag[occ.imageTag]?.[0]?.url || null;
            return (
              <button key={occ.label} type="button" className="gfo-card">
                <OccasionBlob imageUrl={imageUrl} tone={occ.tone} label={occ.label} />
                <p className="gfo-label">{occ.label}</p>
              </button>
            );
          })}
        </div>

        <div className="gfo-slider">
          <div className="gfo-slider-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
            {Array.from({ length: SLIDE_COUNT }).map((_, si) => (
              <div key={si} className="gfo-slide">
                {OCCASIONS.slice(si * 2, si * 2 + 2).map((occ, localIndex) => {
                  const imageUrl = imagesByTag[occ.imageTag]?.[0]?.url || null;
                  return (
                    <button key={occ.label} type="button" className="gfo-card">
                      <OccasionBlob imageUrl={imageUrl} tone={occ.tone} label={occ.label} />
                      <p className="gfo-label">{occ.label}</p>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <button className="gfo-arrow gfo-arrow--left" type="button" onClick={prev} aria-label="Previous">
            ‹
          </button>
          <button className="gfo-arrow gfo-arrow--right" type="button" onClick={next} aria-label="Next">
            ›
          </button>

          <div className="gfo-dots">
            {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`gfo-dot${i === slide ? " active" : ""}`}
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
