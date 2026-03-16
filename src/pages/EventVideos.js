import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import {
  deleteMedia,
  getEventBySlug,
  getEventMedia,
  getFileUrl,
  uploadEventMedia
} from "../services/Api";

function EventVideos() {
  const { slug } = useParams();

  const [eventId, setEventId] = useState(null);
  const [eventName, setEventName] = useState("");
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const isMobile = window.innerWidth <= 768;

  const isAdmin = !!localStorage.getItem("token");

  useEffect(() => {
    getEventBySlug(slug)
      .then((data) => {
        setEventId(data.id);
        setEventName(data.name);
      })
      .catch((err) => console.error(err));
  }, [slug]);

  const loadVideos = useCallback(async () => {
    if (!eventId) return;

    try {
      const data = await getEventMedia(eventId);
      setVideos(data.filter((media) => media.type === "video"));
    } catch (err) {
      console.error("Error loading videos", err);
    }
  }, [eventId]);

  useEffect(() => {
    if (eventId) loadVideos();
  }, [eventId, loadVideos]);

  const handleUpload = async () => {
    if (!selectedFile || !eventId) return;

    await uploadEventMedia(eventId, selectedFile);
    setSelectedFile(null);
    loadVideos();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video?")) return;

    await deleteMedia(id);
    setVideos((prev) => prev.filter((video) => video.id !== id));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prev) =>
        prev < videos.length - 1 ? prev + 1 : prev
      ),
    onSwipedRight: () =>
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev)),
    trackMouse: true
  });

  const showNext = () => {
    setCurrentIndex((prev) =>
      prev < videos.length - 1 ? prev + 1 : prev
    );
  };

  const showPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div style={styles.page}>
      <Link to={`/event/${slug}`} style={styles.back}>
        â† Back to {eventName}
      </Link>

      <h1 style={styles.title}>{eventName} Videos</h1>

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
              >
                âœ•
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
          >
            âœ•
          </span>

          {!isMobile && (
            <button style={styles.navLeft} onClick={showPrev}>
              â€¹
            </button>
          )}

          <div {...handlers}>
            <video
              src={getFileUrl(videos[currentIndex].file_path)}
              controls
              autoPlay
              style={styles.fullVideo}
            />
          </div>

          {!isMobile && (
            <button style={styles.navRight} onClick={showNext}>
              â€º
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
    paddingTop: "120px",
    maxWidth: "1100px",
    margin: "auto"
  },
  back: {
    textDecoration: "none",
    color: "#667eea",
    fontWeight: "500"
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
    inset: 0,
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },
  fullVideo: {
    width: "85vw",
    height: "85vh",
    borderRadius: "12px"
  },
  close: {
    position: "absolute",
    top: "20px",
    right: "25px",
    fontSize: "36px",
    color: "#272020",
    cursor: "pointer",
    zIndex: 10000
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "36px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    fontFamily: `"Playfair Display", serif`,
    color: "#2f1f1f"
  },
  navLeft: {
    position: "absolute",
    left: "30px",
    color: "#161515",
    fontSize: "50px",
    background: "none",
    border: "none",
    cursor: "pointer"
  },
  navRight: {
    position: "absolute",
    right: "30px",
    color: "#080808",
    fontSize: "50px",
    background: "none",
    border: "none",
    cursor: "pointer"
  }
};

export default EventVideos;
