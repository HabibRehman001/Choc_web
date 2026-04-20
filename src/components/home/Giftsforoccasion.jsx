import { useState } from "react";
import "../../Styles/Giftsforoccasion.css";

/* Realistic product imagery (Unsplash) — matches occasion labels */
const OCCASIONS = [
  {
    label: "Birthday",
    src: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=640&q=80",
  },
  {
    label: "Just Love",
    src: "https://images.unsplash.com/photo-1542848285-4778cbddb9ab?auto=format&fit=crop&w=640&q=80",
  },
  {
    label: "Wedding",
    src: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=640&q=80",
  },
  {
    label: "New baby",
    src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=640&q=80",
  },
];

const SLIDE_COUNT = Math.ceil(OCCASIONS.length / 2);

export default function GiftsForOccasion() {
  const [slide, setSlide] = useState(0);

  const prev = () => setSlide(p => (p - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  const next = () => setSlide(p => (p + 1) % SLIDE_COUNT);

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
            you&apos;ll find the perfect treats for all of life&apos;s little, big, and
            in-between moments.
          </p>
        </div>

        <div className="gfo-grid">
          {OCCASIONS.map(occ => (
            <button key={occ.label} type="button" className="gfo-card">
              <div className="gfo-blob">
                <img src={occ.src} alt={occ.label} loading="lazy" decoding="async" />
              </div>
              <p className="gfo-label">{occ.label}</p>
            </button>
          ))}
        </div>

        <div className="gfo-slider">
          <div
            className="gfo-slider-track"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {Array.from({ length: SLIDE_COUNT }).map((_, si) => (
              <div key={si} className="gfo-slide">
                {OCCASIONS.slice(si * 2, si * 2 + 2).map(occ => (
                  <button key={occ.label} type="button" className="gfo-card">
                    <div className="gfo-blob">
                      <img src={occ.src} alt={occ.label} loading="lazy" decoding="async" />
                    </div>
                    <p className="gfo-label">{occ.label}</p>
                  </button>
                ))}
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
