import footerBg from "../assets/hero/Veera Dharmaja Events.png"; // adjust name if needed
import "./Footer.css";

function Footer() {
  return (
    <footer
      className="home-footer"
style={{
  backgroundImage: `
    linear-gradient(
      rgba(0,0,0,0.4),
      rgba(0,0,0,0.4)
    ),
    url(${footerBg})
  `
}}

    >
      <div className="footer-content">
        <div className="footer-column">
          <h3>Veera Dharmaja Events</h3>
          <p>
            Crafting beautiful celebrations with creativity,
            precision, and a passion for unforgettable moments.
          </p>
        </div>

        <div className="footer-column">
          <h4>Our Services</h4>
          <ul>
            <li>Wedding Events</li>
            <li>Engagement & Sangeeth</li>
            <li>Birthday Celebrations</li>
            <li>Corporate Events</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact Us</h4>
          <p>📍 Godhavarikhani, Telangana</p>
          <p>📞 +91 XXXXX XXXXX</p>
          <p>📧 veeradharmajaevents@gmail.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Veera Dharmaja Events. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
