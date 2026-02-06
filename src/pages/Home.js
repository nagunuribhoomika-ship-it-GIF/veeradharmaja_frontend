import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import heroBg from "../assets/hero/hero-bg.jpg";
import hero1 from "../assets/hero/hero1.jpg"
import hero2 from "../assets/hero/hero2.jpg"
import hero3 from "../assets/hero/hero3.jpg"
import hero4 from "../assets/hero/hero4.jpg"
import pageBg from "../assets/hero/background.jpg";
import divider from "../assets/hero/divider.png";


function Home({ events = [] }) {

  const heroImages = [heroBg,hero1, hero2, hero3, hero4];
const [currentImageIndex, setCurrentImageIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
    );
  }, 5000); // changes image every 5 seconds

  return () => clearInterval(interval);
}, []);

  return (
    <div
  className="home-page"
  style={{
    "--page-bg": `url(${pageBg})`
  }}
>
      {/* HERO SECTION */}
     <section
  className="hero-section"
  style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
>

        <div className="hero-overlay">
          <div className="hero-content">
           <h1>
  Event Organisers in Godhavarikhani<br />
  Veera Dharmaja Events
</h1>

<p>
  Based in Godhavarikhani, we deliver creative and flawless
  wedding, birthday, and corporate event planning services
  at any location — from concept to celebration.
</p>


            <div className="hero-buttons">
              <Link to="/contact" className="btn-primary">
  Speak With Us!
</Link>

              {/* <button className="btn-outline">Get Free Quotation</button> */}
            </div>
          </div>
        </div>
      </section>

 {/* SERVICE COVERAGE SECTION */}
<section className="service-coverage">
  {/* LEFT TEXT */}
  <div className="coverage-left">
    <h2>Based in Godhavarikhani</h2>
    <h3>Servicing Anywhere</h3>

    <p>
      Veera Dharmaja Events is proudly based in Godhavarikhani
      and provides professional event planning services at
      any location.
    </p>

    <p>
      From local celebrations to destination weddings and
      corporate events, our team ensures flawless execution
      wherever your event is held.
    </p>

   <Link to="/about" className="btn-primary">
  Read More
</Link>

  </div>

  {/* RIGHT ICON CARDS */}
  <div className="coverage-right">
    <div className="coverage-item">
      <span className="icon">📍</span>
      <p>Single Base Location</p>
    </div>

    <div className="coverage-item">
      <span className="icon">🌍</span>
      <p>Service Anywhere</p>
    </div>

    <div className="coverage-item">
      <span className="icon">🎉</span>
      <p>All Event Types</p>
    </div>

    <div className="coverage-item">
      <span className="icon">🚚</span>
      <p>On-Site Execution</p>
    </div>
  </div>
</section>

{/* SERVICES SECTION */}
<section className="services-section">
  <div className="services-header center">
    <h2 className="services-title">Our Services</h2>

    <img
      src={divider}
      alt="decorative divider"
      className="services-divider"
    />

    <p className="services-subtitle">
      Crafting beautiful celebrations with creativity, precision,
      and a deep passion for unforgettable moments.
    </p>
  </div>

  <Cards />
</section>


    </div>
  );
}

export default Home;
