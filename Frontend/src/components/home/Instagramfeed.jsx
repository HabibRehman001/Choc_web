import "../../Styles/Whychooseus.css";

const POSTS = [
  { id: 1, imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=80" },
  { id: 2, imageUrl: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=900&q=80" },
  { id: 3, imageUrl: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=900&q=80" },
  { id: 4, imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80" },
  { id: 5, imageUrl: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=900&q=80" },
  { id: 6, imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80" },
  { id: 7, imageUrl: "https://images.unsplash.com/photo-1514517220017-8ce97a34a7b6?auto=format&fit=crop&w=900&q=80" },
  { id: 8, imageUrl: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=900&q=80" },
  { id: 9, imageUrl: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80" },
  { id: 10, imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80" },
  { id: 11, imageUrl: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=900&q=80" },
  { id: 12, imageUrl: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=900&q=80" },
];

const InstaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="ig-icon" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="white" strokeWidth="2" />
    <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
  </svg>
);

export default function InstagramFeed() {
  return (
    <section className="ig-section">
      <h2 className="ig-heading">Catch us on instagram</h2>

      <div className="ig-grid">
        {POSTS.map((post) => (
          <a
            key={post.id}
            href={post.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ig-cell"
            aria-label="View on Instagram"
          >
            <img src={post.imageUrl} alt={`Chocolate review post ${post.id}`} className="ig-placeholder ig-placeholder--image" loading="lazy" />
            <div className="ig-overlay">
              <InstaIcon />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
