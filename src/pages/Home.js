import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import "bootstrap/dist/css/bootstrap.min.css";

import heroBg from "../assets/hero/hero-bg.jpg";
import hero1 from "../assets/hero/hero1.jpg";
import hero2 from "../assets/hero/hero2.jpg";
import hero3 from "../assets/hero/hero3.jpg";
import hero4 from "../assets/hero/hero4.jpg";
import pageBg from "../assets/hero/background.jpg";

function Home({ events = [] }) {
  const heroImages = [heroBg, hero1, hero2, hero3, hero4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hero Image Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="home-page"
      style={{
        backgroundImage: `url(${pageBg})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ================= HERO SECTION ================= */}
      <section
        className="hero-section d-flex align-items-center text-center text-white"
        style={{
          backgroundImage: `url(${heroImages[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
         // minHeight: "60vh",
          position: "relative",
          paddingTop: "90px" 
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
          }}
        ></div>

        <div className="container position-relative">
          <h1 className="display-4 fw-bold">
            Event Organisers in Godhavarikhani
            <br />
            <span className="text-warning">
              Veera Dharmaja Events
            </span>
          </h1>

          <p className="lead mt-3 mb-4">
            Delivering creative and flawless wedding, birthday,
            and corporate event planning services — from concept
            to celebration.
          </p>

          <Link to="/contact" className="btn btn-warning px-4 py-2 fw-semibold">
            Speak With Us
          </Link>
        </div>
      </section>

      {/* ================= SERVICE COVERAGE ================= */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">

            {/* LEFT */}
            <div className="col-lg-6">
              <h2 className="fw-bold">Based in Godhavarikhani</h2>
              <h4 className="text-muted mb-3">Servicing Anywhere</h4>

              <p>
                Veera Dharmaja Events provides professional
                event planning services at any location —
                from local celebrations to destination weddings.
              </p>

              <p>
                Our experienced team ensures flawless
                execution wherever your event is held.
              </p>

              <Link to="/about" className="btn btn-dark mt-3">
                Read More
              </Link>
            </div>

            {/* RIGHT ICON CARDS */}
            <div className="col-lg-6">
              <div className="row text-center g-4">
                <div className="col-6">
                  <div className="p-4 shadow-sm rounded bg-white">
                    <div className="fs-2">📍</div>
                    <p className="mt-2 mb-0">Single Base Location</p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-4 shadow-sm rounded bg-white">
                    <div className="fs-2">🌍</div>
                    <p className="mt-2 mb-0">Service Anywhere</p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-4 shadow-sm rounded bg-white">
                    <div className="fs-2">🎉</div>
                    <p className="mt-2 mb-0">All Event Types</p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-4 shadow-sm rounded bg-white">
                    <div className="fs-2">🚚</div>
                    <p className="mt-2 mb-0">On-Site Execution</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">Our Services</h2>
          <div
            style={{
              width: "80px",
              height: "3px",
              background: "#ffc107",
              margin: "0 auto 20px",
            }}
          ></div>

          <p className="text-muted mb-5">
            Crafting beautiful celebrations with creativity,
            precision, and a passion for unforgettable moments.
          </p>

          <Cards />
        </div>
      </section>
    </div>
  );
}

export default Home;
