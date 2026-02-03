import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

function Cards() {
  const [events, setEvents] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [eventName, setEventName] = useState("");

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

  // Add event
  const handleAddEvent = async () => {
    if (!eventName.trim()) return;

    try {
      await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ name: eventName })
      });

      setEventName("");
      setShowAdd(false);
      loadEvents();
    } catch (err) {
      console.error("Failed to create event", err);
    }
  };

  // Delete event (soft delete)
  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      // Reload cards
      loadEvents();
    } catch (err) {
      console.error("Failed to delete event", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>My Events</h1>

      {/* ADMIN ADD EVENT */}
      {isAdmin && (
        <div style={{ marginBottom: "25px" }}>
          {!showAdd ? (
            <button onClick={() => setShowAdd(true)}>
              ➕ Add Event
            </button>
          ) : (
            <div>
              <input
                placeholder="Event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                style={{ marginRight: "10px" }}
              />
              <button onClick={handleAddEvent}>Save</button>
              <button
                onClick={() => setShowAdd(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* EVENT CARDS */}
      <div style={styles.grid}>
        {events.map((event) => (
          <div key={event.id} style={{ position: "relative" }}>
            {/* DELETE BUTTON (ADMIN ONLY) */}
            {isAdmin && (
              <button
                onClick={() => handleDeleteEvent(event.id)}
                style={styles.deleteBtn}
                title="Delete event"
              >
                ✕
              </button>
            )}

            <EventCard
              title={event.name}
              description={`${event.name} celebration`}
              link={`/event/${event.slug}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px"
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
  }
};

export default Cards;
