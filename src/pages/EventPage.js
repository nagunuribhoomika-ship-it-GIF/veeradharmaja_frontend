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

 const firstGalleryImage =
  event.media &&
  event.media.find(
    (m) => m.type === "image" && m.status === "active"
  );



  return (
   <div style={styles.page}>
     <h1 style={styles.title}>💍 {event.name}</h1>

<p style={styles.description}>
        {event.description || `${event.name} celebration`}
      </p>

      <div style={styles.mediaGrid}>
<Link
  to={`/event/${slug}/gallery`}
  style={{
    ...styles.mediaCard,
    ...(firstGalleryImage && {
      backgroundImage: `url(http://localhost:5000${firstGalleryImage.file_path})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#1f2937",
    }),
  }}
>
  <div style={styles.mediaIcon}>📸</div>
  <h3 style={styles.mediaTitle}>Photos</h3>
  <p style={styles.mediaText}>
    Explore beautiful moments from this event
  </p>
</Link>



  <Link to={`/event/${slug}/videos`} style={styles.mediaCard}>
    <div style={styles.mediaIcon}>🎥</div>
    <h3 style={styles.mediaTitle}>Videos</h3>
    <p style={styles.mediaText}>
      Watch highlights and memorable clips
    </p>
  </Link>
</div>

    </div>
  );
}

const styles = {
 page: {
  minHeight: "70vh",
  padding: "60px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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
  mediaGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "24px",
  marginTop: "30px",
  width: "100%",
  maxWidth: "600px",
},

mediaCard: {
  background: "rgba(199, 213, 223, 0.81)",
  backdropFilter: "blur(6px)",
  borderRadius: "18px",
  padding: "30px 20px",
  textDecoration: "none",
  color: "#1f2937",
  textAlign: "center",
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
},

mediaIcon: {
  fontSize: "40px",
  marginBottom: "12px",
},

mediaTitle: {
  fontSize: "20px",
  fontWeight: "700",
  marginBottom: "6px",
},

mediaText: {
  fontSize: "14px",
  color: "#555",
  lineHeight: "1.6",
},


  // actions: {
  //   display: "flex",
  //   gap: "20px"
  // },

  // link: {
  //   padding: "14px 22px",
  //   background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  //   color: "#fff",
  //   textDecoration: "none",
  //   borderRadius: "10px",
  //   fontWeight: "600",
  //   boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  //   transition: "transform 0.2s ease"
  // }
};


export default EventPage;
