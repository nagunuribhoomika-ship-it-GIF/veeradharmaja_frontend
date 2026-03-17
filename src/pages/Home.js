import { Link } from "react-router-dom";
import Cards from "./Cards";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div
      className="home-page"
      style={{
        minHeight: "100vh",
        paddingTop: "120px"
      }}
    >

      {/* ================= SERVICES ================= */}
      <section className="text-center">
        <div className="container">

          <h2 className="fw-bold mb-2">Our Services</h2>

          <div
            style={{
              width: "80px",
              height: "3px",
              background: "#ffc107",
              margin: "0 auto 15px",
            }}
          ></div>

          {/* Cards Grid */}
          <Cards />

        </div>
      </section>

    </div>
  );
}

export default Home;
