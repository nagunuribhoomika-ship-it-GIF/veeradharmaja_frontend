import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

function WeddingGallery() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const isAdmin = !!localStorage.getItem("token");

  // Fetch images
  const loadImages = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/media/event/1"
      );
      const data = await res.json();
      setImages(data.filter((m) => m.type === "image"));
    } catch (err) {
      console.error("Error loading images", err);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  // Upload image
  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await fetch("http://localhost:5000/api/media/upload/1", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
      });

      setSelectedFile(null);
      loadImages();
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  // Delete image (soft delete)
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await fetch(`http://localhost:5000/api/media/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      // Update UI immediately
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex((prev) =>
        prev < images.length - 1 ? prev + 1 : prev
      );
    },
    onSwipedRight: () => {
      setCurrentIndex((prev) =>
        prev > 0 ? prev - 1 : prev
      );
    },
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <div style={styles.page}>
      <Link to="/wedding" style={styles.back}>
        ← Back to Wedding
      </Link>

      <h1 style={styles.title}>Wedding Photo Gallery</h1>

      {/* ADMIN UPLOAD */}
      {isAdmin && (
        <div style={{ marginBottom: "20px" }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
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

      {/* IMAGE GRID */}
      <div style={styles.grid}>
        {images.map((img, i) => (
          <div
            key={img.id}
            style={{ position: "relative" }}
          >
            {/* DELETE BUTTON (ADMIN ONLY) */}
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
              alt="wedding"
              style={styles.image}
              onClick={() => setCurrentIndex(i)}
            />
          </div>
        ))}
      </div>

      {/* LIGHTBOX */}
      {currentIndex !== null && (
        <div style={styles.overlay}>
          <span
            style={styles.close}
            onClick={() => setCurrentIndex(null)}
          >
            ✕
          </span>

          <div {...handlers}>
            <img
              src={`http://localhost:5000${images[currentIndex].file_path}`}
              alt="full view"
              style={styles.fullImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    maxWidth: "1100px",
    margin: "auto",
    fontFamily: "Segoe UI, sans-serif"
  },
  back: {
    textDecoration: "none",
    color: "#667eea",
    fontWeight: "500"
  },
  title: {
    margin: "20px 0"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px"
  },
  image: {
    width: "100%",
    borderRadius: "10px",
    cursor: "pointer",
    objectFit: "cover"
  },
  deleteBtn: {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    cursor: "pointer",
    zIndex: 2
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  fullImage: {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: "10px"
  },
  close: {
    position: "absolute",
    top: "20px",
    right: "30px",
    fontSize: "30px",
    color: "#fff",
    cursor: "pointer"
  }
};

export default WeddingGallery;
