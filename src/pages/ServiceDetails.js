import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/services.css";
import bgImage from "../assets/bgimage.jpg"
import { getFileUrl, getServiceById } from "../services/Api";

const ServiceDetails = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);

    useEffect(() => {
        fetchService();
    }, [id]);

    const fetchService = async () => {
        try {
            const data = await getServiceById(id);
            setService(data);
        } catch (err) {
            console.log(err);
        }
    };

    if (!service) return <h3 className="text-center mt-5">Loading...</h3>;

    return (
        <>
            {/* ===== HERO BANNER ===== */}
            <div className="services-hero">
                <section
                    className="service-hero d-flex align-items-center text-center text-white"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                    }}
                >
                    <Container>
                        <h1 className="display-4 fw-bold">{service.title}</h1>
                        <p>Home &gt; {service.title}</p>
                    </Container>
                </section>
            </div>

            {/* ===== DETAILS SECTION ===== */}
            <div className="services-section">
                <Container>
                    <h2 className="section-title">{service.title}</h2>

                    <Row className="align-items-center mt-4">

                        {/* LEFT IMAGE */}
                        <Col md={6}>
                            <img
                                src={getFileUrl(service.image)}
                                alt={service.title}
                                className="details-image"
                            />
                        </Col>

                        {/* RIGHT CONTENT */}
                        <Col md={6}>
                            <p className="service-description">
                                {service.description}
                            </p>

                            <ul className="feature-list">
                                {service.features?.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </Col>

                    </Row>
                </Container>
            </div>
        </>
    );
};

export default ServiceDetails;
