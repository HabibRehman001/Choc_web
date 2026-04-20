import "../../Styles/footer.css";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4.5"/>
    <circle cx="17.6" cy="6.4" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="ft-footer">
      {/* ── Main content ── */}
      <div className="ft-main">

        {/* Col 1 — Contact */}
        <div className="ft-col">
          <h3 className="ft-col-heading">Contact Us</h3>
          <ul className="ft-contact-list">
            <li><span className="ft-label">UAN:</span> (021)111-165-632</li>
            <li><span className="ft-label">Whatsapp:</span> +92 301 1165632</li>
            <li><span className="ft-label">Email:</span> <a href="mailto:customercare@olmec.pk">customercare@olmec.pk</a></li>
            <li><span className="ft-label">Corporate Gifts:</span> +92 336 8565146</li>
            <li><a href="mailto:corporate.sales@olmec.pk">corporate.sales@olmec.pk</a></li>
          </ul>
        </div>

        {/* Col 2 — Links */}
        <div className="ft-col">
          <h3 className="ft-col-heading">Links</h3>
          <ul className="ft-link-list">
            <li><a href="#">Shop chocolate</a></li>
            <li><a href="#">Corporate gifting</a></li>
            <li><a href="#">Make your own hamper</a></li>
            <li><a href="#">Track your order</a></li>
          </ul>
        </div>

        {/* Col 3 — Information */}
        <div className="ft-col">
          <h3 className="ft-col-heading">Information</h3>
          <ul className="ft-link-list">
            <li><a href="#">Menu</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">Terms &amp; conditions</a></li>
            <li><a href="#">Shipping and return policy</a></li>
          </ul>
        </div>

        {/* Col 4 — Keep in touch */}
        <div className="ft-col">
          <h3 className="ft-col-heading">Keep in touch</h3>
          <div className="ft-email-row">
            <input
              type="email"
              placeholder="Enter your email address"
              className="ft-email-input"
            />
            <button className="ft-submit-btn">Submit</button>
          </div>

          <h3 className="ft-col-heading ft-social-heading">Our social media</h3>
          <div className="ft-social-row">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="ft-social-btn" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="ft-social-btn" aria-label="Facebook">
              <FacebookIcon />
            </a>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <p>
          © 2026 <span className="ft-brand">OLMEC</span>. All rights reserved. Design and Developed by{" "}
          <a href="#" className="ft-dev-link">Mean3 Pvt Ltd</a>.
        </p>
      </div>
    </footer>
  );
}