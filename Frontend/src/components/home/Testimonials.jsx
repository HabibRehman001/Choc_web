import { useState, useEffect, useRef } from "react";
import "../../Styles/Testimonials.css";

const REVIEWS = [
  {
    id: 1,
    name: "Abdulmajid Mahmood",
    initial: "A",
    avatar: null,
    color: "#c07a6a",
    rating: 5,
    text: "Ordered the heritage box and blush luxe cake. Both are perfect and the staff is very cooperative.",
  },
  {
    id: 2,
    name: "Faizan Shah",
    initial: "F",
    avatar: null,
    color: "#e8487a",
    rating: 4,
    text: "Pistachio Kunafa is best in town. Prices are good if you buy without gift packaging.",
  },
  {
    id: 3,
    name: "Haresh Kumar",
    initial: "H",
    avatar: null,
    color: "#c07a6a",
    rating: 5,
    text: "The Pistachio Kunafa Milk Chocolate Bar is an absolute treat. Highly recommended!",
  },
  {
    id: 4,
    name: "Sana Malik",
    initial: "S",
    avatar: null,
    color: "#7a5a9a",
    rating: 5,
    text: "Beautiful packaging and even better taste. Got the corporate hamper for our team and everyone loved it.",
  },
  {
    id: 5,
    name: "Usman Tariq",
    initial: "U",
    avatar: null,
    color: "#4a7a5a",
    rating: 4,
    text: "Super fresh chocolates delivered perfectly. Will definitely be ordering again for Eid gifts.",
  },
];

function Stars({ count }) {
  return (
    <div className="ts-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "ts-star filled" : "ts-star"}>★</span>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="ts-card">
      <div className="ts-quote-bubble">
        <span className="ts-quote-icon" aria-hidden="true">"</span>
      </div>
      <Stars count={review.rating} />
      <p className="ts-text">{review.text}</p>
      <div className="ts-divider" />
      <div className="ts-author">
        {review.avatar ? (
          <img src={review.avatar} alt={review.name} className="ts-avatar-img" />
        ) : (
          <div className="ts-avatar-letter" style={{ background: review.color }}>
            {review.initial}
          </div>
        )}
        <span className="ts-name">{review.name}</span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true); // true = auto-advancing
  const trackRef = useRef(null);
  const timerRef = useRef(null);

  // Auto-advance on mobile when playing
  useEffect(() => {
    if (!playing) return;
    timerRef.current = setInterval(() => {
      setActive(p => (p + 1) % REVIEWS.length);
    }, 3000);
    return () => clearInterval(timerRef.current);
  }, [playing]);

  // Scroll the mobile track to the active card
  useEffect(() => {
    if (!trackRef.current) return;
    const cards = trackRef.current.querySelectorAll(".ts-mobile-card");
    if (cards[active]) {
      const track = trackRef.current;
      const card = cards[active];
      const targetLeft = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
      track.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
    }
  }, [active]);

  const handleDot = (i) => {
    if (i === active) {
      // Toggle play/pause
      setPlaying(p => !p);
    } else {
      setActive(i);
      setPlaying(false); // user took control — pause
    }
  };

  return (
    <section className="ts-section">
      <h2 className="ts-heading">What people are saying</h2>

      {/* ── Desktop: 3-col grid ── */}
      <div className="ts-grid">
        {REVIEWS.slice(0, 3).map(r => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>

      {/* ── Mobile: horizontal scroll track ── */}
      <div className="ts-mobile-wrap">
        <div className="ts-mobile-track" ref={trackRef}>
          {REVIEWS.map((r, i) => (
            <div
              key={r.id}
              className={`ts-mobile-card${i === active ? " ts-mobile-card--active" : ""}`}
            >
              <ReviewCard review={r} />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="ts-dots">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              className={`ts-dot${i === active ? " ts-dot--active" : ""}`}
              onClick={() => handleDot(i)}
              aria-label={i === active ? (playing ? "Pause" : "Play") : `Go to review ${i + 1}`}
            >
              {/* Show pause bars on the active dot when playing, play triangle when paused */}
              {i === active ? (
                playing ? (
                  /* Pause icon */
                  <span className="ts-dot-icon">
                    <span className="ts-bar" />
                    <span className="ts-bar" />
                  </span>
                ) : (
                  /* Play icon */
                  <span className="ts-dot-icon ts-dot-icon--play">▶</span>
                )
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}