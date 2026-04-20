const BANNER_SRC =
  "https://www.olmecchocolates.com/cdn/shop/files/4-desktop_compressed.webp?v=1761647587&width=3000";

export default function Sell() {
  return (
    <section className="bs-section" aria-labelledby="bs-heading">
      <div className="bs-title-wrap">
        <h2 id="bs-heading">Best selling items</h2>
      </div>
      <div className="bs-img-container">
        <img className="bs-img" src={BANNER_SRC} alt="Best selling chocolate gift boxes" />
      </div>
    </section>
  );
}
