import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <h2 className="site-title">Veera Dharmaja Events</h2>

        {/* Desktop menu */}
        <nav className="nav-links desktop-only">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Our Services</Link>
          <Link to="/portfolio">Our Portfolio</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>

        {/* Profile icon */}
        <Link to="/profile" className="header-profile desktop-only">
          👤
        </Link>

        {/* Mobile hamburger */}
        <button
          className="hamburger mobile-only"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      {/* ✅ MOBILE MENU MUST BE HERE */}
      {menuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)}>Our Services</Link>
            <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Our Portfolio</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>

            <Link
              to="/profile"
              className="mobile-profile"
              onClick={() => setMenuOpen(false)}
            >
              👤 Profile
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
