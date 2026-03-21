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

function EventVideos() {

  const { slug } = useParams();

  const [eventId, setEventId] = useState(null);
  const [eventName, setEventName] = useState("");
  const [videos, setVideos] = useState([]);
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
    setVideos((prev) =>
      prev.filter((video) => video.id !== id)
    );

  };

  const handlers = useSwipeable({

    onSwipedLeft: () =>
      setCurrentIndex((prev) =>
        prev < videos.length - 1 ? prev + 1 : prev
      ),

    onSwipedRight: () =>
      setCurrentIndex((prev) =>
        prev > 0 ? prev - 1 : prev
      ),

    trackMouse: true

  });

  const showNext = () => {
    setCurrentIndex((prev) =>
      prev < videos.length - 1 ? prev + 1 : prev
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
        {eventName} Videos
      </h1>
          <p className="event-media-subtitle">
            Explore the event video collection and save the clips you want to
            include in your order.
          </p>
        </div>

      {isAdmin && (
        <div className="event-media-admin">
          <input
            className="event-media-file"
            type="file"
            accept="video/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />

          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className="event-media-upload"
          >
            Upload Video
          </button>
        </div>
      )}

        <div className="event-media-grid event-media-grid--video">

        {videos.map((vid, i) => {

          const isSelected = cart.some((item) => item.id === vid.id);

          return (

          <div key={vid.id} className="event-media-card event-media-card--video">

            {isAdmin && (
              <button
                onClick={() => handleDelete(vid.id)}
                className="event-media-delete"
              >
                X
              </button>
            )}

            <video
              src={getFileUrl(vid.file_path)}
              className="event-media-thumb event-media-thumb--video"
              onClick={() => setCurrentIndex(i)}
              muted
            />

            <button
              className={`event-media-cart${isSelected ? " is-selected" : ""}`}
              onClick={() => {
                if (isSelected) return;

                addToCart({
                  id: vid.id,
                  file: vid.file_path,
                  event: eventName,
                  mediaType: "video"
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

          <div {...handlers} className="event-media-viewer event-media-viewer--video">
            <video
              src={getFileUrl(videos[currentIndex].file_path)}
              controls
              autoPlay
              className="event-media-full-video"
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

export default EventVideos;
