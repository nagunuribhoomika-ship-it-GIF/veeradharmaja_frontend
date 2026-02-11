import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../styles/ContactUs.css"
import bgImage from "../assets/bgimage.jpg"

const Contact = () => {
  return (
    <>
      <div className="page-background">
        <section
          className="contact-hero d-flex align-items-center text-center text-white"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        >
          <Container>
            <h1 className="display-4 fw-bold">Contact Us</h1>
            <p>Home &gt; Contact Us</p>
          </Container>
        </section>


        {/* CONTACT INFO */}
        <section className="contact-info-section pt-5">
          <Container>
            <Row className="text-center">
              <Col md={4} className="mb-4">
                <div className="info-card p-4">
                  <h5 className="fw-bold">ADDRESS</h5>
                  <p>
                    Kalyan Nagar, Godhavarikhani
                    <br />
                    Karimnagar, Telangana 505209
                  </p>
                </div>
              </Col>

              <Col md={4} className="mb-4">
                <div className="info-card p-4">
                  <h5 className="fw-bold">EMAIL</h5>
                  <p>info@prashastaevents.com</p>
                </div>
              </Col>

              <Col md={4} className="mb-4">
                <div className="info-card p-4">
                  <h5 className="fw-bold">PHONE</h5>
                  <p>+91 9000992774</p>
                  <p>+91 9392572774</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* MAP + FORM SECTION */}
        <section className="map-form-section">
          <Container>
            <Row>
              {/* MAP */}
              <Col md={6} className="mb-4">
                <div className="map-wrapper">
                  <iframe
                    title="google-map"
                    src="https://www.google.com/maps/embed?pb=!1m18..."
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </Col>

              {/* FORM */}
              <Col md={6}>
                <div className="form-wrapper p-4">
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter Full Name" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="text" placeholder="Enter Phone Number" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Occasion</Form.Label>
                      <Form.Control type="text" placeholder="Enter Occasion" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Date of Event</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Message"
                      />
                    </Form.Group>

                    <Button className="submit-btn px-4 py-2">
                      Submit
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* CTA SECTION */}
        <section className="cta-section py-5 text-center">
          <Container>
            <h2 className="fw-bold mb-3">
              Let’s create the wedding of your dreams together!
            </h2>
            <p className="mb-4">
              Schedule a consultation to discuss your vision and explore our
              stunning decor options.
            </p>
            <Button className="cta-btn px-5 py-2">
              Book your consultation today!
            </Button>
          </Container>
        </section>
      </div>
    </>
  );
};

export default Contact;
