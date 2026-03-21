import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../styles/about.css";

const highlights = [
  {
    title: "Proven Expertise",
    text: "From planning to execution, every detail is shaped around your vision with calm coordination.",
  },
  {
    title: "Creative Direction",
    text: "We blend styling and storytelling to create celebrations that feel personal and visually memorable.",
  },
];

const stats = [
  { value: "1000+", label: "Events delivered" },
  { value: "5+", label: "Years of experience" },
  { value: "24/7", label: "Planning support" },
];

export default function AboutUs() {
  return (
    <>
      <section className="about-hero">
        <Container>
          <div className="about-hero__content">
            <span className="about-eyebrow">Veeradharmaja Events</span>
            <h1>Designing celebrations with elegance, warmth, and unforgettable detail.</h1>
            <p>
              We turn weddings, private gatherings, and brand experiences into
              polished celebrations that feel effortless for you and memorable
              for everyone attending.
            </p>

            <div className="about-hero__actions">
              <Link to="/contact" className="about-btn about-btn--primary">
                Plan Your Event
              </Link>
              <Link to="/services" className="about-btn about-btn--secondary">
                Explore Services
              </Link>
            </div>

            <div className="about-stats">
              {stats.map((item) => (
                <div className="about-stat" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="about-intro">
        <Container>
          <Row className="g-4 align-items-stretch">
            <Col lg={7}>
              <div className="about-panel about-panel--intro">
                <span className="section-tag">About Us</span>
                <h2>Creating elegant events with heart and precision.</h2>
                <p>
                  At Veeradharmaja Events, we do not just plan events. We craft
                  memorable experiences through thoughtful planning, elegant
                  styling, and seamless coordination.
                </p>
                <p>
                  From weddings to private and corporate events, our mission is
                  to make every occasion meaningful, beautiful, and stress-free.
                </p>
              </div>
            </Col>

            <Col lg={5}>
              <div className="about-panel about-panel--quote">
                <span className="section-tag">Our Promise</span>
                <p className="about-quote">
                  Every celebration deserves a mood, a rhythm, and a story that
                  feels unmistakably yours.
                </p>
                <Link to="/contact" className="text-link">
                  Start your event journey
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="why-section">
        <Container>
          <Row className="g-4 align-items-center">
            <Col lg={6}>
              <div className="why-visual">
                <img
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
                  alt="Veeradharmaja Events celebration setup"
                  className="img-fluid"
                />
              </div>
            </Col>

            <Col lg={6}>
              <div className="section-heading section-heading--left">
                <span className="section-tag">Why Choose Us</span>
                <h2>We bring style, clarity, and care to every celebration.</h2>
              </div>

              <div className="features-list">
                {highlights.map((item, index) => (
                  <div className="feature-card" key={item.title}>
                    <span className="feature-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h5>{item.title}</h5>
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
