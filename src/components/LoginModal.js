import { useState } from "react";
import { loginAdmin } from "../services/Api";
import { setAdminToken } from "../services/auth";

function LoginModal({ onClose, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginAdmin({ username, password });

      setAdminToken(data.token);
      onLogin();
      onClose();
    } catch (error) {
      setError(error.data?.message || "Server error");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Admin Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button style={styles.button}>Login</button>
        </form>

        <button onClick={onClose} style={styles.close}>Close</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    width: "320px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px"
  },
  close: {
    marginTop: "10px",
    background: "none",
    border: "none",
    color: "#555"
  }
};

export default LoginModal;
