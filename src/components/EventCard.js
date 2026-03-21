import { Link } from "react-router-dom";

function EventCard({ title, link, image }) {
  return (
    <Link to={link} className="event-card">
      <div className="event-card-image">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className="event-card-fallback" aria-hidden="true">
            <span>{title}</span>
          </div>
        )}
        <div className="event-card-overlay">
          <div className="event-card-meta">
            <h3>{title}</h3>
            <div className="event-card-footer">
              <span>View Collection</span>
              <span className="event-card-arrow" aria-hidden="true">
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
