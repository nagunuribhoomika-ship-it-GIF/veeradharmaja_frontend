import { useEffect, useState, useCallback, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { CartContext } from "../context/CartContext";

import {
  deleteMedia,
  getEventBySlug,
  getEventMedia,
  getFileUrl,
  uploadEventMedia
} from "../services/Api";

function EventGallery() {

  const { slug } = useParams();

  const [eventId, setEventId] = useState(null);
  const [eventName, setEventName] = useState("");
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { cart, addToCart } = useContext(CartContext);

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

  const loadImages = useCallback(async () => {

    if (!eventId) return;

    try {
      const data = await getEventMedia(eventId);
      setImages(data.filter((media) => media.type === "image"));
    } catch (err) {
      console.error("Error loading images", err);
    }

  }, [eventId]);

  useEffect(() => {
    if (eventId) loadImages();
  }, [eventId, loadImages]);

  const handleUpload = async () => {

    if (!selectedFile || !eventId) return;

    await uploadEventMedia(eventId, selectedFile);
    setSelectedFile(null);
    loadImages();

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this image?")) return;

    await deleteMedia(id);
    setImages((prev) => prev.filter((img) => img.id !== id));

  };

  const handlers = useSwipeable({

    onSwipedLeft: () =>
      setCurrentIndex((prev) =>
        prev < images.length - 1 ? prev + 1 : prev
      ),

    onSwipedRight: () =>
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev)),

    trackMouse: true

  });

  const showNext = () => {
    setCurrentIndex((prev) =>
      prev < images.length - 1 ? prev + 1 : prev
    );
  };

  const showPrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : prev
    );
  };

  return (

    <div style={styles.page}>

      <Link to={`/event/${slug}`} style={styles.back}>
        {"< Back to "}
        {eventName}
      </Link>

      <h1 style={styles.title}>
        {eventName} Photo Gallery
      </h1>

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

      <div style={styles.grid}>

        {images.map((img, i) => {

          const isSelected = cart.some((item) => item.id === img.id);

          return (

          <div key={img.id} style={{ position: "relative" }}>

            {isAdmin && (

              <button
                onClick={() => handleDelete(img.id)}
                style={styles.deleteBtn}
              >
                X
              </button>

            )}

            <img
              src={getFileUrl(img.file_path)}
              alt={`${eventName} item ${i + 1}`}
              style={styles.image}
              onClick={() => setCurrentIndex(i)}
            />

            <button
              style={{
                ...styles.cartBtn,
                ...(isSelected ? styles.cartBtnSelected : {})
              }}
              onClick={() => {
                if (isSelected) return;

                addToCart({
                  id: img.id,
                  file: img.file_path,
                  event: eventName,
                  mediaType: "image"
                });
              }}
              disabled={isSelected}
            >
              {isSelected ? "Selected" : "Add to Cart"}
            </button>

          </div>

          );

        })}

      </div>

      {currentIndex !== null && (

        <div style={styles.overlay}>

          <span
            style={styles.close}
            onClick={() => setCurrentIndex(null)}
          >
            X
          </span>

          {!isMobile && (
            <button style={styles.navLeft} onClick={showPrev}>
              {"<"}
            </button>
          )}

          <div {...handlers} style={styles.zoomContainer}>

            <img
              src={getFileUrl(images[currentIndex].file_path)}
              alt="Full view"
              style={styles.fullImage}
            />

          </div>

          {!isMobile && (
            <button style={styles.navRight} onClick={showNext}>
              {">"}
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
    color: "#667eea"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },

  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
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
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
  },

  fullImage: {
    width: "85vw",
    height: "85vh",
    objectFit: "contain"
  },

  close: {
    position: "absolute",
    top: "20px",
    right: "25px",
    fontSize: "36px",
    cursor: "pointer"
  },

  navLeft: {
    position: "absolute",
    left: "30px",
    fontSize: "50px",
    background: "none",
    border: "none",
    cursor: "pointer"
  },

  navRight: {
    position: "absolute",
    right: "30px",
    fontSize: "50px",
    background: "none",
    border: "none",
    cursor: "pointer"
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "36px",
    fontWeight: "700"
  },

  zoomContainer: {
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "auto",
    touchAction: "pinch-zoom"
  },

  cartBtn: {
    marginTop: "8px",
    width: "100%",
    background: "#d4af37",
    color: "#fff",
    border: "none",
    padding: "6px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  cartBtnSelected: {
    background: "#2f855a",
    cursor: "default"
  }

};

export default EventGallery;
