import { Link } from "react-router-dom";

function EventCard({ title, description, link, image }) {
  return (
    <Link to={link} className="event-card">
      {/* IMAGE SECTION */}
      <div className="event-card-image">
        <img src={image} alt={title} />
        <div className="event-card-overlay">
          <h3>{title}</h3>
        </div>
      </div>

      {/* TEXT SECTION */}
      <div className="event-card-body">
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default EventCard;
