import { useState, useEffect } from "react";
import LoginModal from "../components/LoginModal";
import "../styles/admin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function Profile() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // NEW states
  const [showEnquiries, setShowEnquiries] = useState(false);
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAdmin(true);
  }, []);

  const handleLogout = () => {
  localStorage.removeItem("token");
  setIsAdmin(false);
  setShowEnquiries(false);
  toast.info("Logged out successfully");
};


  // Load enquiries from backend
  const loadEnquiries = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/enquiries");
      const data = await res.json();
      setEnquiries(data);
      setShowEnquiries(true);
    } catch (err) {
      console.log("Failed to load enquiries", err);
    }
  };

return (
  <div className="admin-page">
    <div className="admin-container">
      <h1 className="admin-title">Dashboard</h1>

      {!isAdmin && (
        <div className="admin-card">
          <p>You are viewing as Guest</p>
          <button
            className="admin-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        </div>
      )}

      {isAdmin && (
        <div className="admin-card">
          <p className="admin-status">Logged in as Admin</p>

          <div className="admin-actions">
            <button className="admin-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>

            <button className="admin-btn" onClick={loadEnquiries}>
              View Enquiries
            </button>
          </div>
        </div>
      )}

      {showEnquiries && (
        <div className="enquiry-card">
          <h3>Customer Enquiries</h3>

          <div className="table-wrapper">
            <table className="enquiry-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Occasion</th>
                  <th>Date</th>
                  <th>Message</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e) => (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td>{e.phone}</td>
                    <td>{e.occasion}</td>
                    <td>{e.event_date}</td>
                    <td>{e.message}</td>
                    <td>
                      {new Date(e.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showLogin && (
  <LoginModal
  onClose={() => setShowLogin(false)}
  onLogin={() => {
    setIsAdmin(true);
    setShowLogin(false);
    toast.success("Admin logged in successfully");
  }}
  
/>


      )}
    </div>
      {/* Toast Container */}
  <ToastContainer
    position="top-right"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
    theme="colored"
  />
  </div>
  
);

}

export default Profile;
