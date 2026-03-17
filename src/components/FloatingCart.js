import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function FloatingCart() {

  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const hasSelections = cart.length > 0;

  return (
    <div
      style={{
        ...styles.cart,
        ...(hasSelections ? styles.cartActive : styles.cartIdle)
      }}
      onClick={() => navigate(hasSelections ? "/cart" : "/cards")}
    >
      {hasSelections ? `Cart (${cart.length})` : "Book Your Event"}
    </div>
  );
}

const styles = {
  cart: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "14px 20px",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "bold",
    zIndex: 9999,
    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.18)"
  },

  cartIdle: {
    background: "#d4af37",
    color: "#2b1d18"
  },

  cartActive: {
    background: "#4c1d95",
    color: "#fff"
  }
};

export default FloatingCart;
