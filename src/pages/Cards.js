import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import {
  createEvent,
  deleteEvent,
  getEvents,
  getFileUrl,
  updateEvent,
  uploadEventMedia
} from "../services/Api";
import "./Cards.css";

function Cards() {
  const [events, setEvents] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [eventName, setEventName] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editingName, setEditingName] = useState("");

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
      const createdEvent = await createEvent({ name: eventName.trim() });

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
      window.alert(err?.data?.message || "Failed to create event");
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
      window.alert(err?.data?.message || "Failed to update cover image");
    }
  };

  const startEditing = (event) => {
    setEditingEventId(event.id);
    setEditingName(event.name);
  };

  const cancelEditing = () => {
    setEditingEventId(null);
    setEditingName("");
  };

  const handleUpdateEvent = async (eventId) => {
    if (!editingName.trim()) return;

    try {
      await updateEvent(eventId, { name: editingName.trim() });
      cancelEditing();
      loadEvents();
    } catch (err) {
      console.error("Failed to update event", err);
      window.alert(err?.data?.message || "Failed to update event");
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
        {events.map((event) => {
          const isEditing = editingEventId === event.id;

          return (
            <div key={event.id} className="card-wrapper">
              {isAdmin && (
                <div className="card-admin-panel">
                  <div className="card-admin-row">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleCoverUpdate(event.id, e.target.files[0])
                      }
                    />

                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="delete-btn"
                      title="Delete event"
                      aria-label="Delete event"
                      type="button"
                    >
                      X
                    </button>
                  </div>

                  <div className="card-admin-actions">
                    <button
                      type="button"
                      className="admin-link-btn"
                      onClick={() => startEditing(event)}
                    >
                      Edit Name
                    </button>

                    <Link
                      to={`/event/${event.slug}/gallery`}
                      className="admin-link-btn"
                    >
                      Photos
                    </Link>

                    <Link
                      to={`/event/${event.slug}/videos`}
                      className="admin-link-btn"
                    >
                      Videos
                    </Link>
                  </div>

                  {isEditing && (
                    <div className="admin-form admin-form--inline">
                      <input
                        placeholder="Card name"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => handleUpdateEvent(event.id)}
                      >
                        Save
                      </button>
                      <button type="button" onClick={cancelEditing}>
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )}

              <EventCard
                title={event.name}
                link={`/event/${event.slug}`}
                image={event.cover_image ? getFileUrl(event.cover_image) : null}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cards;
