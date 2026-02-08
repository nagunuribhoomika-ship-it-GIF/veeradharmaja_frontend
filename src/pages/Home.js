import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import heroBg from "../assets/hero/hero-bg.jpg";
import hero1 from "../assets/hero/hero1.jpg"
import hero2 from "../assets/hero/hero2.jpg"
import hero3 from "../assets/hero/hero3.jpg"
import hero4 from "../assets/hero/hero4.jpg"
import pageBg from "../assets/hero/background.jpg";
// or whatever exact image name you want


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
},[]);

useEffect(() => {
  const setHeroHeight = () => {
    const vh = window.innerHeight;

    if (window.innerWidth <= 768) {
      // Mobile
      document.documentElement.style.setProperty(
        "--hero-height",
        `${vh * 0.9}px`
      );
    } else if (window.innerWidth <= 1024) {
      // Tablet
      document.documentElement.style.setProperty(
        "--hero-height",
        `${vh * 0.95}px`
      );
    } else {
      // Desktop
      document.documentElement.style.setProperty(
        "--hero-height",
        `${vh}px`
      );
    }
  };

  setHeroHeight();
  window.addEventListener("resize", setHeroHeight);

  return () => window.removeEventListener("resize", setHeroHeight);
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
          <h1 className="hero-title">
  Event Organisers in Godhavarikhani
  <span className="brand-name">Veera Dharmaja Events</span>
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
    <h2 className="services-title">Our Services</h2><br/>
    <div className="services-divider"></div>
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
