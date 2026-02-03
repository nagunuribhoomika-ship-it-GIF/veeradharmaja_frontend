import { useState } from "react";
import EventCard from "../components/EventCard";

function Home({ events }) {
  const [openCardId, setOpenCardId] = useState(null);

  const handleCardClick = (id) => {
    setOpenCardId(openCardId === id ? null : id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Events</h1>

      {events.map(event => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.title}
          type={event.type}
          date={event.date}
          location={event.location}
          description={event.description}
          isOpen={openCardId === event.id}
          onClick={handleCardClick}
          link={`/event/${event.id}`}
        />
      ))}
    </div>
  );
}

export default Home;
