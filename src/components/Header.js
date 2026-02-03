import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={styles.header}>
      <h2 style={styles.title}>Veera Dharmaja Events</h2>

      <nav>
        <Link to="/" style={styles.link}>
          Home
        </Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    color: "#fff"
  },
  title: {
    margin: 0
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "500"
  }
};


export default Header;
