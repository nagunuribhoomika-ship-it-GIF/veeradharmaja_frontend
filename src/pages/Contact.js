import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../styles/ContactUs.css";
import bgImage from "../assets/bgimage.jpg";

const Contact = () => {
  // State for form
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    occasion: "",
    date: "",
    message: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
  alert("Enquiry sent successfully!");

  // WhatsApp message
  const whatsappMessage = `
Hello VeeraDharmaja Events,

Name: ${formData.name}
Phone: ${formData.phone}
Occasion: ${formData.occasion}
Event Date: ${formData.date}
Message: ${formData.message}
  `;

  const phoneNumber = "919849836691"; // your WhatsApp number

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  window.open(whatsappURL, "_blank");

  // Reset form
  setFormData({
    name: "",
    phone: "",
    occasion: "",
    date: "",
    message: "",
  });
}

      else {
        alert("Failed to send enquiry");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="page-background">
      {/* HERO */}
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
                <p>veeradharmajaevents@gmail.com</p>
              </div>
            </Col>

            <Col md={4} className="mb-4">
              <div className="info-card p-4">
                <h5 className="fw-bold">PHONE</h5>
                <p>+91 9849836691</p>
                <p>+91 9059909803</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* MAP + FORM */}
     <section className="map-form-section" id="contact-form">
        <Container>
          <Row>
            {/* MAP */}
            <Col md={6} className="mb-4">
              <div className="map-wrapper">
                <iframe
                  title="google-map"
                  src="https://www.google.com/maps?q=Godavarikhani&output=embed"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  loading="lazy"
                ></iframe>
              </div>
            </Col>

            {/* FORM */}
            <Col md={6}>
              <div className="form-wrapper p-4">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Occasion</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Occasion"
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Date of Event</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="submit-btn px-4 py-2"
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="cta-section py-5 text-center">
        <Container>
          <h2 className="fw-bold mb-3">
            Let’s create the wedding of your dreams together!
          </h2>
          <p className="mb-4">
            Schedule a consultation to discuss your vision and explore our
            stunning decor options.
          </p>
         <Button
  className="cta-btn px-5 py-2"
  onClick={() => {
    const element = document.getElementById("contact-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }}
>
  Book your consultation today!
</Button>

        </Container>
      </section>
    </div>
  );
};

export default Contact;
