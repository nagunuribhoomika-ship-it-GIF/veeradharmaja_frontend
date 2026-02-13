import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/services.css";
import bgImage from "../assets/bgimage.jpg"


const Services = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* ================= HERO BANNER ================= */}
      <div className="services-hero">
        <section
          className="service-hero d-flex align-items-center text-center text-white"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        >
          <Container>
            <h1 className="display-4 fw-bold">Our Services</h1>
            <p>Home &gt; Services</p>
          </Container>
        </section>
      </div>

      {/* ================= SERVICES SECTION ================= */}
      <div className="services-section">
        <Container>
          <h2 className="section-title">
            End-to-End Event Planning Services
          </h2>

          <Row>
            {services.map((service) => (
              <Col md={2} className="mb-4" key={service.id}>
                <div
                  className="custom-service-card"
                  onClick={() => navigate(`/services/${service.id}`)}
                >
                  <img
                    src={`http://localhost:5000/${service.image}`}
                    alt={service.title}
                    className="service-image"
                  />

                  <h6 className="service-title">{service.title}</h6>
                </div>
              </Col>

            ))}
          </Row>
        </Container> <br/>
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
      </div>
    </>
  );
};

export default Services;
