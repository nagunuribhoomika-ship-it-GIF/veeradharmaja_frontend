import Cards from "./Cards";
import "./Home.css";

function Home() {
  return (
    <div className="home-page service-home-page">
      <section className="services-showcase">
        <div className="services-showcase__intro">
          <span className="services-showcase__eyebrow">Our Services</span>
          <h1>Elegant event services crafted for memorable celebrations</h1>
          <p>
            Explore our curated event categories with a refined presentation
            designed to keep the focus on your services and signature work.
          </p>

          <div className="services-divider" aria-hidden="true">
            <span className="services-divider__line" />
            <span className="services-divider__diamond" />
            <span className="services-divider__line" />
          </div>
        </div>

        <div className="services-cards-wrap">
          <Cards />
        </div>
      </section>
    </div>
  );
}

export default Home;
