import { useState, useEffect } from "react";
import LoginModal from "../components/LoginModal";

function Profile() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAdmin(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Profile</h1>

      {!isAdmin && (
        <>
          <p>You are viewing as guest</p>
          <button onClick={() => setShowLogin(true)}>
            Login
          </button>
        </>
      )}

      {isAdmin && (
        <>
          <p>Logged in as Admin</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={() => setIsAdmin(true)}
        />
      )}
    </div>
  );
}

export default Profile;
