import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import {
  deleteMedia,
  getEventMedia,
  getFileUrl,
  uploadEventMedia
} from "../services/Api";

function WeddingVideos() {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const isAdmin = !!localStorage.getItem("token");

  const loadVideos = async () => {
    try {
      const data = await getEventMedia(1);
      setVideos(data.filter((media) => media.type === "video"));
    } catch (err) {
      console.error("Error loading videos", err);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      await uploadEventMedia(1, selectedFile);
      setSelectedFile(null);
      loadVideos();
    } catch (err) {
      console.error("Video upload failed", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video?")) return;

    try {
      await deleteMedia(id);
      setVideos((prev) => prev.filter((video) => video.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex((prev) =>
        prev < videos.length - 1 ? prev + 1 : prev
      );
    },
    onSwipedRight: () => {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    },
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  return (
    <div style={styles.page}>
      <Link to="/wedding" style={styles.back}>
        {"< Back to Wedding"}
      </Link>

      <h1 style={styles.title}>Wedding Videos</h1>

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

      <div style={styles.grid}>
        {videos.map((vid, i) => (
          <div key={vid.id} style={{ position: "relative" }}>
            {isAdmin && (
              <button
                onClick={() => handleDelete(vid.id)}
                style={styles.deleteBtn}
                aria-label="Delete video"
              >
                X
              </button>
            )}

            <video
              src={getFileUrl(vid.file_path)}
              style={styles.thumbnail}
              onClick={() => setCurrentIndex(i)}
              muted
            />
          </div>
        ))}
      </div>

      {currentIndex !== null && (
        <div style={styles.overlay}>
          <span
            style={styles.close}
            onClick={() => setCurrentIndex(null)}
            role="button"
            aria-label="Close preview"
          >
            X
          </span>

          <div {...handlers}>
            <video
              src={getFileUrl(videos[currentIndex].file_path)}
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
