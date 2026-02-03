import { Link } from "react-router-dom";

function Birthday() {
  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">← Back to all events</Link>

      <h1>Birthday Event</h1>
      <p>Date: 02 April 2026</p>
      <p>Location: Bangalore</p>

      <p>
        This page contains everything related to the birthday event.
        Only birthday edits will happen here.
      </p>

      <img
        src="https://via.placeholder.com/600x350"
        alt="birthday"
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <video
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        controls
        style={{ width: "100%" }}
      />
    </div>
  );
}

export default Birthday;
