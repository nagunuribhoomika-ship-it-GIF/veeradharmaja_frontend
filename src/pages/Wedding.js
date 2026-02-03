import { Link } from "react-router-dom";

function Wedding() {
  return (
    <div style={styles.page}>
      <Link to="/" style={styles.back}>← Back to all events</Link>

      <h1 style={styles.title}>Wedding Event</h1>

      {/* ABOUT */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>About the Event</h2>
        <p style={styles.text}>
          This wedding celebration includes traditional ceremonies,
          family gatherings, and unforgettable moments beautifully
          captured through photos and videos.
        </p>
      </div>

      {/* ACTIONS */}
      <div style={styles.card}>
        <Link to="/wedding/gallery" style={styles.action}>
          📸 View Photo Gallery →
        </Link>
      </div>

      <div style={styles.card}>
        <Link to="/wedding/videos" style={styles.action}>
          🎥 View Videos →
        </Link>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    maxWidth: "1000px",
    margin: "auto",
    fontFamily: "Segoe UI, sans-serif"
  },
  back: {
    textDecoration: "none",
    color: "#667eea",
    fontWeight: "500"
  },
  title: {
    marginTop: "20px",
    marginBottom: "30px",
    fontSize: "36px",
    fontWeight: "700"
  },
  sectionTitle: {
    marginBottom: "10px"
  },
  text: {
    color: "#555",
    lineHeight: "1.6"
  },
  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "25px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)"
  },
  action: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#667eea",
    textDecoration: "none"
  }
};

export default Wedding;
