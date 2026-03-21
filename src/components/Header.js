import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clearAdminToken, isAdminLoggedIn, subscribeToAdminAuth } from "../services/auth";
import "./Header.css";
import logo from "../assets/hero/logo.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(isAdminLoggedIn());

  useEffect(() => {
    return subscribeToAdminAuth(() => {
      setIsAdmin(isAdminLoggedIn());
    });
  }, []);

  const handleLogout = () => {
    clearAdminToken();
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <h2 className="site-title">Veera Dharmaja Events</h2>

        <nav className="nav-links desktop-only">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Our Services</Link>
          <Link to="/portfolio">Our Portfolio</Link>
          <Link to="/contact">Contact Us</Link>
          {isAdmin && (
            <button
              type="button"
              className="header-admin-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </nav>

        <img src={logo} alt="Company Logo" className="header-logo" />

        <button
          className="hamburger mobile-only"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu-layer">
          <button
            className="mobile-menu-backdrop"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />

          <div className="mobile-menu">
            <nav className="mobile-nav">
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
              <Link to="/services" onClick={() => setMenuOpen(false)}>Our Services</Link>
              <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Our Portfolio</Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
              {isAdmin && (
                <button
                  type="button"
                  className="header-admin-btn header-admin-btn--mobile"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
