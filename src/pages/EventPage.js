import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function EventPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/events/slug/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <p>Loading event...</p>;
  }

  if (!event || !event.id) {
    return <p>Event not found</p>;
  }

  return (
   <div style={styles.page}>
     <h1 style={styles.title}>💍 {event.name}</h1>

<p style={styles.description}>
        {event.description || `${event.name} celebration`}
      </p>

      <div style={styles.actions}>

       <Link to={`/event/${slug}/gallery`} style={styles.link}>
          📸 View Photos
        </Link>

        <Link to={`/event/${slug}/videos`} style={styles.link}>
          🎥 View Videos
        </Link>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "70vh",
    background: "linear-gradient(135deg, #fdf2f8, #ede9fe)",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
  },

  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#4c1d95",
    marginBottom: "10px"
  },

  description: {
    color: "#6b21a8",
    fontSize: "16px",
    marginBottom: "30px"
  },

  actions: {
    display: "flex",
    gap: "20px"
  },

  link: {
    padding: "14px 22px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "10px",
    fontWeight: "600",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    transition: "transform 0.2s ease"
  }
};


export default EventPage;
