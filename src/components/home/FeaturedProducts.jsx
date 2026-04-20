import { useState } from "react";
import "../../Styles/FeaturedProducts.css";

/* ─── Data ──────────────────────────────────────────── */

/* Pexels / Unsplash — verified CDN URLs (chocolate, desserts, cakes) */
const P = (path) =>
  `https://images.pexels.com/photos/${path}.jpeg?auto=compress&cs=tinysrgb&w=640`;
const U = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=640&q=82`;

const CATEGORIES = [
  {
    label: "Chocolate bars",
    products: [
      { id: 1, name: "Pistachio Kunafa Bar 36%", price: 800,  src: P("65882/chocolate-dark-coffee-confiserie-65882") },
      { id: 2, name: "Sugar Free Dark Bar 70%", price: 1500, src: P("1377452/pexels-photo-1377452") },
      { id: 3, name: "70% Dark Chocolate Bar",   price: 1400, src: P("2067628/pexels-photo-2067628") },
      { id: 4, name: "Hazelnut Milk Bar 36%",    price: 1400, src: P("132694/pexels-photo-132694") },
    ],
  },
  {
    label: "Chocolate boxes",
    products: [
      { id: 5, name: "Signature Box Of 9",       price: 1880, src: P("4109998/pexels-photo-4109998") },
      { id: 6, name: "Assorted Gift Box 16",     price: 2800, src: P("2915280/pexels-photo-2915280") },
      { id: 7, name: "Dark Truffle Box",         price: 2200, src: P("3992132/pexels-photo-3992132") },
      { id: 8, name: "Praline Collection",       price: 3100, src: P("1739590/pexels-photo-1739590") },
    ],
  },
  {
    label: "Gifts hampers",
    products: [
      { id: 9,  name: "Classic Hamper",          price: 4500, src: P("918327/pexels-photo-918327") },
      { id: 10, name: "Luxury Hamper",           price: 6800, src: P("887853/pexels-photo-887853") },
      { id: 11, name: "Birthday Hamper",         price: 5200, src: P("5677798/pexels-photo-5677798") },
      { id: 12, name: "Corporate Hamper",        price: 7500, src: P("140831/pexels-photo-140831") },
    ],
  },
  {
    label: "Cakes",
    products: [
      { id: 13, name: "Berry Cream Cake",        price: 3200, src: U("1578985545062-69928b1d9587") },
      { id: 14, name: "Eid Bento Cake",          price: 3200, src: U("1464349095431-e9a21285b5f3") },
      { id: 15, name: "Lemon Cream Cake",        price: 2900, src: U("1563805042-7684c019e1cb") },
      { id: 16, name: "Vanilla Naked Cake",      price: 3000, src: P("3776947/pexels-photo-3776947") },
    ],
  },
];

/* ─── Icons ─────────────────────────────────────────── */
const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "#c07a6a" : "none"} stroke="#c07a6a" strokeWidth="2" className="w-4 h-4">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="fp-cart-svg" aria-hidden>
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

/* ─── Product Card ───────────────────────────────────── */
function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [hovered,    setHovered]    = useState(false);

  return (
    <div
      className={`fp-card${hovered ? " fp-card--hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className="fp-img-wrap">
        <img
          src={product.src}
          alt={product.name}
          className="fp-img"
          loading="lazy"
          decoding="async"
        />

        {/* Top-right icon buttons */}
        <div className="fp-img-actions">
          <button
            className="fp-icon-btn"
            onClick={() => setWishlisted(w => !w)}
            aria-label="Wishlist"
          >
            <HeartIcon filled={wishlisted} />
          </button>
          <button className="fp-icon-btn" aria-label="Quick view">
            <EyeIcon />
          </button>
        </div>

        {/* Wishlist hover tooltip — appears on card hover */}
        {hovered && (
          <div className="fp-wishlist-toast">
            <HeartIcon filled={wishlisted} />
            <span>{wishlisted ? "Remove from wishlist" : `Add ${product.name} to wishlist`}</span>
          </div>
        )}
      </div>

      {/* Info row */}
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

/* ─── Main Component ─────────────────────────────────── */
export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState(0);
  const current = CATEGORIES[activeTab];

  return (
    <section className="fp-section">
      {/* ── Tab bar ── */}
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

      {/* ── Product grid ── */}
      <div className="fp-grid">
        {current.products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* ── View all ── */}
      <div className="fp-view-all-wrap">
        <button className="fp-view-all">
          View all <ArrowRight />
        </button>
      </div>
    </section>
  );
}