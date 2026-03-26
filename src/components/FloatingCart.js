import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function FloatingCart() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const hasSelections = cart.length > 0;
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        ...styles.cart,
        ...(isMobile ? styles.cartMobile : {}),
        ...(hasSelections ? styles.cartActive : styles.cartIdle)
      }}
      onClick={() => navigate(hasSelections ? "/cart" : "/cards")}
      role="button"
      aria-label={hasSelections ? `Open cart with ${cart.length} items` : "Book your event"}
    >
      <span
        style={{
          ...styles.cartIcon,
          ...(isMobile ? styles.cartIconMobile : {}),
          ...(hasSelections ? styles.cartIconActive : styles.cartIconIdle)
        }}
        aria-hidden="true"
      >
        {hasSelections ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={styles.cartIconSvg}
          >
            <circle cx="9" cy="19" r="1.5" />
            <circle cx="17" cy="19" r="1.5" />
            <path d="M3 5h2l2.2 9.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.7L20 8H7" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={styles.cartIconSvg}
          >
            <rect x="4" y="5" width="16" height="15" rx="3" />
            <path d="M8 3v4" />
            <path d="M16 3v4" />
            <path d="M7.5 10.5h9" />
            <path d="m10 15 1.5 1.5 3-3.5" />
            <path d="m17.8 7.6.45.92 1.01.15-.73.72.18 1.02-.91-.48-.91.48.17-1.02-.73-.72 1.01-.15Z" />
          </svg>
        )}
      </span>
      <span
        style={{
          ...styles.cartText,
          ...(isMobile ? styles.cartTextMobile : {}),
          ...(hasSelections ? styles.cartTextActive : styles.cartTextIdle)
        }}
      >
        {hasSelections ? `Cart (${cart.length})` : "Book Your Event"}
      </span>
    </div>
  );
}

const styles = {
  cart: {
    position: "fixed",
    top: "96px",
    right: "24px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 18px",
    borderRadius: "999px",
    border: "1px solid rgba(241, 230, 220, 0.24)",
    cursor: "pointer",
    fontWeight: "bold",
    zIndex: 9999,
    fontSize: "14px",
    letterSpacing: "0.2px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 14px 30px rgba(43, 29, 24, 0.22)"
  },

  cartMobile: {
    top: "84px",
    right: "12px",
    maxWidth: "calc(100vw - 24px)",
    padding: "10px 13px",
    gap: "8px",
    fontSize: "13px"
  },

  cartIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    lineHeight: 1,
    flexShrink: 0,
    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.18)"
  },

  cartIconMobile: {
    width: "30px",
    height: "30px",
    borderRadius: "10px"
  },

  cartIconSvg: {
    width: "16px",
    height: "16px"
  },

  cartIconIdle: {
    background: "linear-gradient(135deg, #caa13a 0%, #e6bf5b 100%)",
    color: "#4a221c"
  },

  cartIconActive: {
    background: "linear-gradient(135deg, rgba(241, 230, 220, 0.2) 0%, rgba(241, 230, 220, 0.1) 100%)",
    color: "#f1e6dc"
  },

  cartText: {
    fontSize: "15px",
    fontWeight: 700,
    letterSpacing: "0.15px",
    lineHeight: 1.1,
    whiteSpace: "nowrap"
  },

  cartTextMobile: {
    fontSize: "13px"
  },

  cartTextIdle: {
    color: "#4a221c"
  },

  cartTextActive: {
    color: "#f1e6dc"
  },

  cartIdle: {
    background: "linear-gradient(135deg, #f3e1bf 0%, #e4c98f 100%)",
    color: "#4a221c",
    border: "1px solid rgba(90, 42, 42, 0.22)",
    boxShadow: "0 16px 34px rgba(75, 45, 24, 0.24)"
  },

  cartActive: {
    background: "linear-gradient(135deg, #5b332c 0%, #2b1d18 100%)",
    color: "#f1e6dc"
  }
};

export default FloatingCart;
