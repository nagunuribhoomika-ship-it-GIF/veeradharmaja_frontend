import Cards from "./Cards";
import "../styles/Portfolio.css";
import bgImage from "../assets/bgimage.jpg";   // same image style
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
    const navigate = useNavigate();
  return (
    <>
      {/* ===== HERO BANNER ===== */}
      <div className="portfolio-hero">
        <section
          className="portfolio-banner d-flex align-items-center text-center text-white"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        >
          <div className="container">
            <h1 className="display-4 fw-bold">Our Portfolio</h1>
            <p>Home &gt; Our Portfolio</p>
          </div>
        </section>
      </div>

      {/* Cards */}
      <Cards />

      {/* ===== CTA SECTION ===== */}
<div className="portfolio-cta-section">
  <div className="cta-container">
    <div className="cta-text">
      <h2>Let’s create the wedding of your dreams together!</h2>
      <p>
        Schedule a consultation to discuss your vision and explore our stunning decor options.
      </p>
    </div>

    <div className="cta-button">
      <button onClick={() => navigate("/contact#contact-form")}>
  Book your consultation today!
</button>
    </div>
  </div>
</div>

    </>
  );
};

export default Portfolio;
