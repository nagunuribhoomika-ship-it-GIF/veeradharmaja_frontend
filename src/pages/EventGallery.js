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
import "./EventMedia.css";

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
    <div className="event-media-page">
      <div className="event-media-shell">
        <div className="event-media-header">
          <Link to={`/event/${slug}`} className="event-media-back">
        {"< Back to "}
        {eventName}
      </Link>

          <h1 className="event-media-title">
        {eventName} Photo Gallery
      </h1>
          <p className="event-media-subtitle">
            Browse the full gallery and add your favorite moments to the cart.
          </p>
        </div>

      {isAdmin && (
        <div className="event-media-admin">
          <input
            className="event-media-file"
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />

          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className="event-media-upload"
          >
            Upload Image
          </button>
        </div>
      )}

        <div className="event-media-grid">

        {images.map((img, i) => {

          const isSelected = cart.some((item) => item.id === img.id);

          return (

          <div key={img.id} className="event-media-card">

            {isAdmin && (
              <button
                onClick={() => handleDelete(img.id)}
                className="event-media-delete"
              >
                X
              </button>
            )}

            <img
               src={img.file_path}
              alt={`${eventName} item ${i + 1}`}
              className="event-media-thumb event-media-thumb--image"
              onClick={() => setCurrentIndex(i)}
            />

            <button
              className={`event-media-cart${isSelected ? " is-selected" : ""}`}
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
        <div className="event-media-overlay">
          <span className="event-media-close" onClick={() => setCurrentIndex(null)}>
            X
          </span>

          {!isMobile && (
            <button className="event-media-nav event-media-nav--left" onClick={showPrev}>
              {"<"}
            </button>
          )}

          <div {...handlers} className="event-media-viewer event-media-viewer--image">
            <img
             src={images[currentIndex].file_path}
              alt="Full view"
              className="event-media-full-image"
            />
          </div>

          {!isMobile && (
            <button className="event-media-nav event-media-nav--right" onClick={showNext}>
              {">"}
            </button>
          )}
        </div>
      )}
      </div>
    </div>
  );
}

export default EventGallery;
