import "../../Styles/Whychooseus.css";

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
        <rect x="2" y="28" width="36" height="22" rx="3"/>
        <path d="M38 36h8l10 8H38"/>
        <circle cx="12" cy="52" r="4"/>
        <circle cx="44" cy="52" r="4"/>
        <path d="M2 36h6M14 28V18a4 4 0 0 1 4-4h10l8 14"/>
      </svg>
    ),
    title: "MELT FREE DELIVERY",
    desc: "Your chocolates arrive in perfect condition every single time",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
        <rect x="8" y="28" width="48" height="30" rx="3"/>
        <path d="M20 28V20a12 12 0 0 1 24 0v8"/>
        <path d="M8 38h48"/>
        <path d="M32 28v4M28 34h8"/>
        <path d="M20 10 Q32 4 44 10"/>
      </svg>
    ),
    title: "ELEVATED GIFTING",
    desc: "Every gift is designed to impress.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
        <rect x="18" y="8" width="28" height="48" rx="4" transform="rotate(-15 32 32)"/>
        <line x1="26" y1="18" x2="42" y2="14"/>
        <line x1="24" y1="26" x2="40" y2="22"/>
        <line x1="22" y1="34" x2="38" y2="30"/>
        <line x1="20" y1="42" x2="36" y2="38"/>
      </svg>
    ),
    title: "SIGNATURE CHOCOLATE",
    desc: "Small batch chocolate made with real Belgian couverture",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
        <path d="M32 8 L38 22 L54 24 L43 35 L46 51 L32 44 L18 51 L21 35 L10 24 L26 22 Z"/>
      </svg>
    ),
    title: "PREMIUM QUALITY",
    desc: "Crafted with the finest ingredients sourced worldwide",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
        <path d="M32 12 C20 12 10 22 10 34 C10 46 20 54 32 54 C44 54 54 46 54 34"/>
        <path d="M40 8 L54 8 L54 22"/>
        <path d="M32 24 L32 34 L40 38"/>
      </svg>
    ),
    title: "FRESH DAILY",
    desc: "Made fresh every day so you always get the best taste",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
        <path d="M20 32 C20 20 32 12 44 20"/>
        <path d="M44 32 C44 44 32 52 20 44"/>
        <circle cx="32" cy="32" r="6"/>
        <path d="M10 32 L20 32 M44 32 L54 32 M32 10 L32 20 M32 44 L32 54"/>
      </svg>
    ),
    title: "CUSTOM ORDERS",
    desc: "Personalized chocolates tailored exactly to your vision",
  },
];

// Double the array so the infinite loop is seamless
const TICKER_ITEMS = [...FEATURES, ...FEATURES];

export default function WhyChooseUs() {
  return (
    <section className="why-section">
      {/* ── Left heading (fixed, not scrolling) ── */}
      <div className="why-heading">
        <h2>
          Why choose <span className="why-us">us?</span>
        </h2>
      </div>

      {/* ── Infinite ticker ── */}
      <div className="ticker-viewport">
        <div className="ticker-track">
          {TICKER_ITEMS.map((feat, i) => (
            <div key={i} className="ticker-card">
              <div className="ticker-icon">{feat.icon}</div>
              <p className="ticker-title">{feat.title}</p>
              <p className="ticker-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}