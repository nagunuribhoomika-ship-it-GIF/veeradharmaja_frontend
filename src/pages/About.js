import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/about.css"; // create this css file (given below)
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <>
      {/* 🔶 HERO SECTION */}
      <div className="hero-banner d-flex align-items-center justify-content-center text-center">
        <div>
          <h1 className="text-white fw-bold">About Us</h1>
          <p className="text-white">Home &gt; About Us</p>
        </div>
      </div>

      {/* 🔶 ABOUT INTRO */}
      <Container className="py-5">
        <Row>
          <Col md={6}>
            <p>
              At Veera Dharmaja Events, we don’t just plan events — we craft timeless
              memories. We are a passionate team of event organisers, wedding
              planners, and creative storytellers dedicated to transforming
              ordinary occasions into extraordinary experiences.
            </p>

            <p>
              From grand weddings and intimate sangeets to corporate conferences
              and brand activations, our mission is to make every event meaningful,
              magical, and memorable.
            </p>
          </Col>

          {/* 🔶 CITY CARDS */}
          <Col md={6}>
            <Row>
              {["Hyderabad", "GodavariKhani", "Visakhapatnam", "Vijayawada"].map(
                (city, index) => (
                  <Col md={6} key={index}>
                    <Card className="city-card text-center p-4">
                      <div className="city-icon">📍</div>
                      <h5>{city}</h5>
                      <Link to="/contact" className="read-more">
                        Readmore
                      </Link>
                    </Card>
                  </Col>
                )
              )}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* 🔶 WHY CHOOSE US */}
      <div className="why-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3"
                alt="event"
                className="img-fluid rounded"
              />
            </Col>

            <Col md={6}>
              <h2 className="fw-bold mb-4">Why Choose Us?</h2>

              <div className="feature">
                <h5>Proven Expertise</h5>
                <p>
                  From planning to execution, every detail is tailored to your
                  vision. Expect flawless execution from a passionate team.
                </p>
              </div>

              <div className="feature">
                <h5>Results Driven</h5>
                <p>
                  We don’t just plan events — we create unforgettable experiences
                  crafted to match your personal style.
                </p>
              </div>

              <div className="feature">
                <h5>Success Stories</h5>
                <p>
                  Our commitment to creativity and client satisfaction speaks
                  through happy clients and memorable celebrations.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* 🔶 OUR STORY */}
      <div className="story-section py-5">
        <Container>
          <h2 className="fw-bold mb-3">Our Story</h2>

          <p>
            The journey of Prashasta Events began with a simple idea — to make
            every celebration feel personal, elegant, and effortless.
          </p>

          <p>
            What started as a small team of creative planners has grown into one
            of the top event organisers, serving clients across luxury weddings,
            corporate functions, and themed celebrations.
          </p>

          <p className="fw-semibold">
            With 5+ years of experience, we've handled more than 1,000 events,
            earning love, loyalty, and lasting relationships.
          </p>
        </Container>
      </div>
    </>
  );
}