import { Link } from "react-router-dom";

function EventCard({ title, link, image }) {
  return (
    <Link to={link} className="event-card">
      <div className="event-card-image">
        <img src={image} alt={title} />
        <div className="event-card-overlay">
          <h3>{title}</h3>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
