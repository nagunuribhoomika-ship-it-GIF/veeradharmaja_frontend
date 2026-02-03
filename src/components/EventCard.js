import { Link } from "react-router-dom";

function EventCard({ title, description, link }) {
  return (
    <div style={styles.card}
    onMouseEnter={(e) =>
    (e.currentTarget.style.transform = "translateY(-4px)")
  }
  onMouseLeave={(e) =>
    (e.currentTarget.style.transform = "translateY(0)")
  }
    >
      <Link to={link} style={styles.link}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.desc}>{description}</p>
        <span style={styles.openText}>View Details →</span>
      </Link>
    </div>
  );
}

const styles = {
  card: {
  borderRadius: "16px",
  background: "linear-gradient(135deg, #dae5e6, #2eb444)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
},

  link: {
    display: "block",
    padding: "20px",
    textDecoration: "none",
    color: "#333",
    height: "100%"
  },
  title: {
    marginBottom: "10px",
    color: "#4a4a4a"
  },
  desc: {
    color: "#391fce",
    fontSize: "14px"
  },
  openText: {
    display: "inline-block",
    marginTop: "15px",
    color: "#667eea",
    fontWeight: "600"
  }
};


export default EventCard;
