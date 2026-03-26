import footerLogo from "../assets/hero/Veera Dharmaja Events.png";
import footerBg from "../assets/hero/footer-dark.jpg";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";

function Footer() {
  return (
    <footer
      className="footer text-light"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(28, 18, 12, 0.86),
            rgba(28, 18, 12, 0.9)
          ),
          url(${footerBg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="container footer-container">
        <div className="row gy-4 footer-row">
          <div className="col-lg-4 col-md-6 footer-col">
            <span className="footer-label">Veera Dharmaja Events</span>
            <div className="footer-accent-line" aria-hidden="true" />
            <img
              src={footerLogo}
              alt="Veera Dharmaja Events"
              className="img-fluid mb-3 footer-brand-logo"
              style={{ maxWidth: "280px" }}
            />
            <p className="footer-text footer-about">
              Crafting beautiful celebrations with creativity, precision, and a
              passion for unforgettable moments.
            </p>
          </div>

          <div className="col-lg-4 col-md-6 footer-col">
            <h5 className="footer-heading">Our Services</h5>
            <ul className="list-unstyled footer-list">
              <li className="footer-list-item">
                <Link to="/portfolio" className="footer-service-link">
                  <span className="footer-link-dot" aria-hidden="true" />
                  <span>Wedding Events</span>
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/portfolio" className="footer-service-link">
                  <span className="footer-link-dot" aria-hidden="true" />
                  <span>Engagement</span>
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/portfolio" className="footer-service-link">
                  <span className="footer-link-dot" aria-hidden="true" />
                  <span>Birthday Celebrations</span>
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/portfolio" className="footer-service-link">
                  <span className="footer-link-dot" aria-hidden="true" />
                  <span>Haldi</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12 footer-col">
            <h5 className="footer-heading">Contact Us</h5>
            <p className="footer-text footer-contact-item">
              <span className="footer-contact-label">Location</span>
              Godhavarikhani, Telangana
            </p>
            <p className="footer-text footer-contact-item">
              <span className="footer-contact-label">Phone</span>
              +91 9849836691
            </p>
            <p className="footer-text footer-contact-item">
              <span className="footer-contact-label">Email</span>
              veeradharmajaevents@gmail.com
            </p>
          </div>
        </div>

        <hr className="footer-divider" />
        <div className="footer-bottom-text">
          Copyright {new Date().getFullYear()} Veera Dharmaja Events. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
