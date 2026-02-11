import footerLogo from "../assets/hero/Veera Dharmaja Events.png";
import footerBg from "../assets/hero/footer-dark.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";

function Footer() {
  return (
    <footer
      className="footer text-light pt-5"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,0.75),
            rgba(0,0,0,0.75)
          ),
          url(${footerBg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row gy-4">

          {/* Logo & About */}
          <div className="col-lg-4 col-md-6">
            <img
              src={footerLogo}
              alt="Veera Dharmaja Events"
              className="img-fluid mb-3"
              style={{ maxWidth: "280px" }}
            />
            <p className="small">
              Crafting beautiful celebrations with creativity,
              precision, and a passion for unforgettable moments.
            </p>
          </div>

          {/* Services */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3">Our Services</h5>
            <ul className="list-unstyled small">
              <li className="mb-2">Wedding Events</li>
              <li className="mb-2">Engagement & Sangeeth</li>
              <li className="mb-2">Birthday Celebrations</li>
              <li className="mb-2">Corporate Events</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-12">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <p className="small mb-2">
              📍 Godhavarikhani, Telangana
            </p>
            <p className="small mb-2">
              📞 +91 XXXXX XXXXX
            </p>
            <p className="small mb-2">
              📧 veeradharmajaevents@gmail.com
            </p>
          </div>

        </div>

        {/* Bottom */}
        <hr className="border-secondary my-4" />
        <div className="text-center small pb-3">
          © {new Date().getFullYear()} Veera Dharmaja Events. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
