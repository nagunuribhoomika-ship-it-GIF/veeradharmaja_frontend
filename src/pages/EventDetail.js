import { useParams, Link } from "react-router-dom";

function EventDetail({ events }) {
  const { id } = useParams();
  const event = events.find(e => e.id === Number(id));

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">← Back to events</Link>

      <h1>{event.title}</h1>
      <p>{event.type} | {event.date} | {event.location}</p>
      <p>{event.description}</p>

      {event.images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="event"
          style={{ width: "100%", marginBottom: "10px" }}
        />
      ))}

      {event.videos.map((vid, i) => (
        <video
          key={i}
          src={vid}
          controls
          style={{ width: "100%", marginBottom: "10px" }}
        />
      ))}
    </div>
  );
}

export default EventDetail;
