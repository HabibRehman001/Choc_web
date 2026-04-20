import "../../Styles/CorporateGifting.css";

export default function CorporateGifting() {
  return (
    <section className="cg-section">
      {/* ── Left text ── */}
      <div className="cg-text">
        <h2 className="cg-heading">
          <em>Corporate gifting</em>
        </h2>
        <p className="cg-subheading">Chocolate gifts that speak for you</p>
        <p className="cg-body">
          Whether you're thanking clients, hyping up your team, or adding a sweet
          touch to an event, our edible gifts are designed to wow. They look great,
          taste even better, and best of all, we handle everything from start to
          finish so you don't have to lift a finger.
        </p>
        <button className="cg-btn">Impress now</button>
      </div>

      {/* ── Right image blob ── */}
      <div className="cg-img-wrap">
        <div className="cg-blob-bg" />
        <div className="cg-circle">
          <img
            src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&q=80"
            alt="Corporate chocolate gift box"
            className="cg-img"
          />
        </div>
      </div>
    </section>
  );
}
