import "../../Styles/HeaderScroller.css";

export default function HeaderScroller() {
  return (
    <div className="header-scroller" role="status" aria-live="polite">
      <span className="header-scroller__text">
        Free Shipping on orders above Rs. 5,000 - Karachi only
      </span>
    </div>
  );
}
