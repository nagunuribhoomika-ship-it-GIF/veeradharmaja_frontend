import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import {
  createEvent,
  deleteEvent,
  getEvents,
  getFileUrl,
  uploadEventMedia
} from "../services/Api";

function Cards() {
  const [events, setEvents] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [eventName, setEventName] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const isAdmin = !!localStorage.getItem("token");

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleAddEvent = async () => {
    if (!eventName.trim()) return;

    try {
      const createdEvent = await createEvent({ name: eventName });

      if (coverImage) {
        await uploadEventMedia(createdEvent.id, coverImage, {
          cover: true
        });
      }

      setEventName("");
      setCoverImage(null);
      setShowAdd(false);
      loadEvents();
    } catch (err) {
      console.error("Failed to create event", err);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await deleteEvent(id);
      loadEvents();
    } catch (err) {
      console.error("Failed to delete event", err);
    }
  };

  const handleCoverUpdate = async (eventId, file) => {
    if (!file) return;

    try {
      await uploadEventMedia(eventId, file, { cover: true });
      loadEvents();
    } catch (err) {
      console.error("Failed to update cover image", err);
    }
  };

  return (
    <div className="cards-section">
      {isAdmin && (
        <div className="admin-add">
          {!showAdd ? (
            <button onClick={() => setShowAdd(true)}>Add Event</button>
          ) : (
            <div className="admin-form">
              <input
                placeholder="Event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files[0])}
              />

              <button onClick={handleAddEvent}>Save</button>
              <button onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          )}
        </div>
      )}

      <div className="cards-grid">
        {events.map((event) => (
          <div key={event.id} className="card-wrapper">
            {isAdmin && (
              <button
                onClick={() => handleDeleteEvent(event.id)}
                className="delete-btn"
                title="Delete event"
                aria-label="Delete event"
              >
                X
              </button>
            )}

            {isAdmin && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleCoverUpdate(event.id, e.target.files[0])
                }
              />
            )}

            <EventCard
              title={event.name}
              description={`Creating joyful ${event.name.toLowerCase()} celebrations with elegant themes and seamless arrangements.`}
              link={`/event/${event.slug}`}
              image={event.cover_image ? getFileUrl(event.cover_image) : null}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
