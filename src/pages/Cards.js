import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

function Cards() {
  const [events, setEvents] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [eventName, setEventName] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const isAdmin = !!localStorage.getItem("token");

  // Load events
  const loadEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // ✅ Add event WITH image (UI-side change only)
 const handleAddEvent = async () => {
  if (!eventName.trim()) return;

  try {
    // 1️⃣ Create event
    const res = await fetch("http://localhost:5000/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ name: eventName })
    });

    if (!res.ok) throw new Error("Event creation failed");

    const createdEvent = await res.json();

    // 2️⃣ Upload cover image
    if (coverImage) {
      const formData = new FormData();
      formData.append("file", coverImage);

      await fetch(
        `http://localhost:5000/api/media/upload/${createdEvent.id}?cover=true`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: formData
        }
      );
    }

    setEventName("");
    setCoverImage(null);
    setShowAdd(false);
    loadEvents();

  } catch (err) {
    console.error("Failed to create event", err);
  }
};

  // Delete event
  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      loadEvents();
    } catch (err) {
      console.error("Failed to delete event", err);
    }
  };

  const handleCoverUpdate = async (eventId, file) => {
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("file", file);

    await fetch(
      `http://localhost:5000/api/media/upload/${eventId}?cover=true`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
      }
    );

    loadEvents(); // refresh cards
  } catch (err) {
    console.error("Failed to update cover image", err);
  }
};


  return (
    <div className="cards-section">
      {/* <h1 className="cards-title">Our Services</h1> */}

      {/* ADMIN ADD EVENT */}
      {isAdmin && (
        <div className="admin-add">
          {!showAdd ? (
            <button onClick={() => setShowAdd(true)}>
              ➕ Add Event
            </button>
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

      {/* EVENT CARDS */}
      <div className="cards-grid">
        {events.map((event) => (
          <div key={event.id} className="card-wrapper">
            {isAdmin && (
              <button
                onClick={() => handleDeleteEvent(event.id)}
                className="delete-btn"
                title="Delete event"
              >
                ✕
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
              image={
                event.cover_image
                  ? `http://localhost:5000${event.cover_image}`
                  : null
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
