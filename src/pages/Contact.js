function Contact() {
  return (
    <div style={styles.container}>
      <h1>Contact Us</h1>

      <div style={styles.card}>
        <p><strong>Name:</strong> Your Name</p>
        <p><strong>Email:</strong> your@email.com</p>
        <p><strong>Phone:</strong> +91 XXXXX XXXXX</p>
        <p><strong>Location:</strong> Your City</p>
      </div>

      <p style={styles.note}>
        You can reach out for any event-related queries.
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px"
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  note: {
    marginTop: "15px",
    color: "#555"
  }
};

export default Contact;
