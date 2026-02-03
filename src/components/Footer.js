import { Link } from "react-router-dom";
import { FiHome, FiPhone, FiUser } from "react-icons/fi";

function Footer() {
  return (
    <footer style={styles.footer}>
      <Link to="/" style={styles.icon}>
        <FiHome size={22} />
      </Link>

      <Link to="/contact" style={styles.icon}>
        <FiPhone size={22} />
      </Link>

      <Link to="/profile" style={styles.icon}>
        <FiUser size={22} />
      </Link>
    </footer>
  );
}

const styles = {
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "60px",
    background: "#b693d7",
    borderTop: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  icon: {
    color: "#764ba2",
    textDecoration: "none"
  }
};


export default Footer;
