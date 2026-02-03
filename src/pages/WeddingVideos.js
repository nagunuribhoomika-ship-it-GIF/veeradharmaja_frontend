import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

function WeddingVideos() {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const isAdmin = !!localStorage.getItem("token");

  // Load videos from backend
  const loadVideos = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/media/event/1"
      );
      const data = await res.json();
      setVideos(data.filter((m) => m.type === "video"));
    } catch (err) {
      console.error("Error loading videos", err);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  // Upload video (admin only)
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
      loadVideos();
    } catch (err) {
      console.error("Video upload failed", err);
    }
  };

  // Delete video (soft delete)
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video?")) return;

    try {
      await fetch(`http://localhost:5000/api/media/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setVideos((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex((prev) =>
        prev < videos.length - 1 ? prev + 1 : prev
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

      <h1 style={styles.title}>Wedding Videos</h1>

      {/* ADMIN UPLOAD */}
      {isAdmin && (
        <div style={{ marginBottom: "20px" }}>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            style={{ marginLeft: "10px" }}
          >
            Upload Video
          </button>
        </div>
      )}

      {/* VIDEO GRID */}
      <div style={styles.grid}>
        {videos.map((vid, i) => (
          <div
            key={vid.id}
            style={{ position: "relative" }}
          >
            {/* DELETE (ADMIN ONLY) */}
            {isAdmin && (
              <button
                onClick={() => handleDelete(vid.id)}
                style={styles.deleteBtn}
              >
                ✕
              </button>
            )}

            <video
              src={`http://localhost:5000${vid.file_path}`}
              style={styles.thumbnail}
              onClick={() => setCurrentIndex(i)}
              muted
            />
          </div>
        ))}
      </div>

      {/* FULL SCREEN VIDEO */}
      {currentIndex !== null && (
        <div style={styles.overlay}>
          <span
            style={styles.close}
            onClick={() => setCurrentIndex(null)}
          >
            ✕
          </span>

          <div {...handlers}>
            <video
              src={`http://localhost:5000${videos[currentIndex].file_path}`}
              controls
              autoPlay
              style={styles.fullVideo}
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
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
  },
  thumbnail: {
    width: "100%",
    borderRadius: "10px",
    cursor: "pointer"
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
  fullVideo: {
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

export default WeddingVideos;
