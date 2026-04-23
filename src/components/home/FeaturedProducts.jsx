import { useEffect, useState } from "react";
import "../../Styles/FeaturedProducts.css";
import { fetchImagesByTag, getCycledImageUrl } from "../../utils/imageApi";

const CATEGORIES = [
  {
    label: "Chocolate bars",
    products: [
      { id: 1, name: "Pistachio Kunafa Bar 36%", price: 800, tone: "linear-gradient(140deg, #2c1810 0%, #4a312b 100%)" },
      { id: 2, name: "Sugar Free Dark Bar 70%", price: 1500, tone: "linear-gradient(140deg, #3e2723 0%, #5a3a33 100%)" },
      { id: 3, name: "70% Dark Chocolate Bar", price: 1400, tone: "linear-gradient(140deg, #2b160f 0%, #4f342d 100%)" },
      { id: 4, name: "Hazelnut Milk Bar 36%", price: 1400, tone: "linear-gradient(140deg, #35211b 0%, #6b473e 100%)" },
    ],
  },
  {
    label: "Chocolate boxes",
    products: [
      { id: 5, name: "Signature Box Of 9", price: 1880, tone: "linear-gradient(140deg, #3e2723 0%, #4a312b 100%)" },
      { id: 6, name: "Assorted Gift Box 16", price: 2800, tone: "linear-gradient(140deg, #2c1810 0%, #5a3a33 100%)" },
      { id: 7, name: "Dark Truffle Box", price: 2200, tone: "linear-gradient(140deg, #35211b 0%, #6b473e 100%)" },
      { id: 8, name: "Praline Collection", price: 3100, tone: "linear-gradient(140deg, #2b170f 0%, #5f3e35 100%)" },
    ],
  },
  {
    label: "Gifts hampers",
    products: [
      { id: 9, name: "Classic Hamper", price: 4500, tone: "linear-gradient(140deg, #2c1810 0%, #573831 100%)" },
      { id: 10, name: "Luxury Hamper", price: 6800, tone: "linear-gradient(140deg, #3e2723 0%, #6b473e 100%)" },
      { id: 11, name: "Birthday Hamper", price: 5200, tone: "linear-gradient(140deg, #35211b 0%, #5a3a33 100%)" },
      { id: 12, name: "Corporate Hamper", price: 7500, tone: "linear-gradient(140deg, #2b160f 0%, #4a312b 100%)" },
    ],
  },
  {
    label: "Cakes",
    products: [
      { id: 13, name: "Berry Cream Cake", price: 3200, tone: "linear-gradient(140deg, #4a312b 0%, #6e4a40 100%)" },
      { id: 14, name: "Eid Bento Cake", price: 3200, tone: "linear-gradient(140deg, #3e2723 0%, #5f3e35 100%)" },
      { id: 15, name: "Lemon Cream Cake", price: 2900, tone: "linear-gradient(140deg, #2c1810 0%, #5a3a33 100%)" },
      { id: 16, name: "Vanilla Naked Cake", price: 3000, tone: "linear-gradient(140deg, #35211b 0%, #6b473e 100%)" },
    ],
  },
];

const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="fp-cart-svg" aria-hidden>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

function ProductCard({ product, imageUrl }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`fp-card${hovered ? " fp-card--hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="fp-img-wrap">
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} className="fp-img-db" loading="lazy" />
        ) : (
          <div className="fp-img-placeholder" style={{ background: product.tone }} aria-hidden="true" />
        )}

        <div className="fp-img-actions">
          <button className="fp-icon-btn" onClick={() => setWishlisted((w) => !w)} aria-label="Wishlist">
            <HeartIcon filled={wishlisted} />
          </button>
          <button className="fp-icon-btn" aria-label="Quick view">
            <EyeIcon />
          </button>
        </div>

        {hovered && (
          <div className="fp-wishlist-toast">
            <HeartIcon filled={wishlisted} />
            <span>{wishlisted ? "Remove from wishlist" : `Add ${product.name} to wishlist`}</span>
          </div>
        )}
      </div>

      <div className="fp-info">
        <div className="fp-info-left">
          <p className="fp-name">{product.name}</p>
          <p className="fp-price">PKR {product.price.toLocaleString()}</p>
        </div>
        <button className="fp-cart-btn" aria-label="Add to cart">
          <CartIcon />
        </button>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState(0);
  const [images, setImages] = useState([]);
  const current = CATEGORIES[activeTab];

  useEffect(() => {
    const load = async () => {
      try {
        const results = await fetchImagesByTag("featured", 12);
        setImages(results);
      } catch (error) {
        console.error("Failed to load featured images", error);
      }
    };

    load();
  }, []);

  return (
    <section className="fp-section">
      <div className="fp-tabs-wrap">
        <div className="fp-tabs">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              className={`fp-tab${i === activeTab ? " active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="fp-grid">
        {current.products.map((p, idx) => (
          <ProductCard key={p.id} product={p} imageUrl={getCycledImageUrl(images, activeTab * 4 + idx)} />
        ))}
      </div>

      <div className="fp-view-all-wrap">
        <button className="fp-view-all">
          View all <ArrowRight />
        </button>
      </div>
    </section>
  );
}
