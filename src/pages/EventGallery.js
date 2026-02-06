import { useEffect, useState , useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

function EventGallery() {
  const { slug } = useParams();

  const [eventId, setEventId] = useState(null);
  const [eventName, setEventName] = useState("");
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const isMobile = window.innerWidth <= 768;


  const isAdmin = !!localStorage.getItem("token");

  // Load event info
  useEffect(() => {
    fetch(`http://localhost:5000/api/events/slug/${slug}`)
      .then(res => res.json())
      .then(data => {
        setEventId(data.id);
        setEventName(data.name);
      })
      .catch(err => console.error(err));
  }, [slug]);

  // Load images
  const loadImages = useCallback(async () => {

    if (!eventId) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/media/event/${eventId}`
      );
      const data = await res.json();
      setImages(data.filter(m => m.type === "image"));
    } catch (err) {
      console.error("Error loading images", err);
    }
}, [eventId]);

 useEffect(() => {
  if (eventId) loadImages();
}, [eventId, loadImages]);


  // Upload image
  const handleUpload = async () => {
    if (!selectedFile || !eventId) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    await fetch(
      `http://localhost:5000/api/media/upload/${eventId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
      }
    );

    setSelectedFile(null);
    loadImages();
  };

  // Delete image
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    await fetch(`http://localhost:5000/api/media/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex(prev =>
        prev < images.length - 1 ? prev + 1 : prev
      ),
    onSwipedRight: () =>
      setCurrentIndex(prev => (prev > 0 ? prev - 1 : prev)),
    trackMouse: true
  });

 const showNext = () => {
  setCurrentIndex((prev) =>
    prev < images.length - 1 ? prev + 1 : prev
  );
};

const showPrev = () => {
  setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
};

 
  return (
    <div style={styles.page}>
      <Link to={`/event/${slug}`} style={styles.back}>
        ← Back to {eventName}
      </Link>

     <h1 style={styles.title}>
  {eventName} Photo Gallery
</h1>


      {isAdmin && (
        <div style={{ marginBottom: "20px" }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setSelectedFile(e.target.files[0])
            }
          />
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            style={{ marginLeft: "10px" }}
          >
            Upload Image
          </button>
        </div>
      )}

      <div style={styles.grid}>
        {images.map((img, i) => (
          <div key={img.id} style={{ position: "relative" }}>
            {isAdmin && (
              <button
                onClick={() => handleDelete(img.id)}
                style={styles.deleteBtn}
              >
                ✕
              </button>
            )}

           <img
  src={`http://localhost:5000${img.file_path}`}
  alt={`${eventName} image ${i + 1}`}
  style={styles.image}
  onClick={() => setCurrentIndex(i)}
/>

          </div>
        ))}
      </div>

     {currentIndex !== null && (
  <div style={styles.overlay}>
    <span
      style={styles.close}
      onClick={() => setCurrentIndex(null)}
    >
      ✕
    </span>

    {/* Previous */}
  {!isMobile && (
  <button style={styles.navLeft} onClick={showPrev}>
    ‹
  </button>
)}
    <div {...handlers} style={styles.zoomContainer}>
      <img
        src={`http://localhost:5000${images[currentIndex].file_path}`}
        alt="Full view"
        style={styles.fullImage}
      />
    </div>

    {/* Next */}
   {!isMobile && (
  <button style={styles.navRight} onClick={showNext}>
    ›
  </button>
)}
  </div>
)}

    </div>
  );
}

const styles = {
 page: {
  padding: "30px",
  paddingTop: "120px",   // 👈 pushes content below header
  maxWidth: "1100px",
  margin: "auto"
},

  back: { textDecoration: "none", color: "#667eea" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },
  image: {
  width: "100%",
  height: "200px",        // 👈 same height for all images
  objectFit: "cover",    // 👈 keeps image nicely cropped
  borderRadius: "10px",
  cursor: "pointer"
},

  deleteBtn: {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "red",
    color: "#fff",
    borderRadius: "50%",
    border: "none"
  },
  overlay: {
  position: "fixed",
  inset: 0,
  background: "rgba(255, 255, 255, 0.85)", // 👈 light white
  backdropFilter: "blur(6px)",             // 👈 soft blur (pro look)
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
},

fullImage: {
  width: "85vw",     // 👈 BIGGER image
  height: "85vh",
  objectFit: "contain",
},

 close: {
  position: "absolute",
  top: "20px",
  right: "25px",
  color: "#272020",
  fontSize: "36px",
  fontWeight: "bold",
  cursor: "pointer",
  zIndex: 10000,
},

  navLeft: {
  position: "absolute",
  left: "30px",
  color: "#161515",
  fontSize: "50px",
  background: "none",
  border: "none",
  cursor: "pointer",
},

navRight: {
  position: "absolute",
  right: "30px",
  color: "#080808",
  fontSize: "50px",
  background: "none",
  border: "none",
  cursor: "pointer",
},
title: {
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "36px",
  fontWeight: "700",
  letterSpacing: "0.5px",
  fontFamily: `"Playfair Display", serif`,
  color: "#2f1f1f",
},
zoomContainer: {
  maxWidth: "100%",
  maxHeight: "100%",
  overflow: "auto",          // 👈 allows zoom + pan
  touchAction: "pinch-zoom", // 👈 enables pinch zoom on mobile
},
};

export default EventGallery;
