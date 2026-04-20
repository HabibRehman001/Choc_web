
import "../../Styles/Whychooseus.css";
const POSTS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&q=80",
    href: "https://instagram.com/p/abc1",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&q=80",
    href: "https://instagram.com/p/abc2",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1481391032119-d89fee407e44?w=400&q=80",
    href: "https://instagram.com/p/abc3",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&q=80",
    href: "https://instagram.com/p/abc4",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&q=80",
    href: "https://instagram.com/p/abc5",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&q=80",
    href: "https://instagram.com/p/abc6",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80",
    href: "https://instagram.com/p/abc7",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80",
    href: "https://instagram.com/p/abc8",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=400&q=80",
    href: "https://instagram.com/p/abc9",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=400&q=80",
    href: "https://instagram.com/p/abc10",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400&q=80",
    href: "https://instagram.com/p/abc11",
  },
  {
    id: 12,
    src: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800",
    href: "https://instagram.com/p/abc12",
  },
];

/* Instagram logo SVG */
const InstaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="ig-icon" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="2"/>
    <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2"/>
    <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
  </svg>
);

export default function InstagramFeed() {
  const handleImageError = (event) => {
    const fallback =
      "https://images.pexels.com/photos/4110094/pexels-photo-4110094.jpeg?auto=compress&cs=tinysrgb&w=800";
    if (event.currentTarget.src !== fallback) {
      event.currentTarget.src = fallback;
    }
  };

  return (
    <section className="ig-section">
      <h2 className="ig-heading">Catch us on instagram</h2>

      <div className="ig-grid">
        {POSTS.map(post => (
          <a
            key={post.id}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="ig-cell"
            aria-label="View on Instagram"
          >
            <img
              src={post.src}
              alt=""
              className="ig-img"
              loading="lazy"
              onError={handleImageError}
            />
            <div className="ig-overlay">
              <InstaIcon />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}