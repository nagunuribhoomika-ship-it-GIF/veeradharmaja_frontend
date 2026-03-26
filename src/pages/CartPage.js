import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../context/CartContext";
import { getFileUrl, submitContactEnquiry } from "../services/Api";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const previousCartLength = useRef(cart.length);

  useEffect(() => {
    if (previousCartLength.current > 0 && cart.length === 0) {
      navigate("/");
    }

    previousCartLength.current = cart.length;
  }, [cart.length, navigate]);

  const getMediaType = (item) => {
    if (item.mediaType) return item.mediaType;

    return /\.(mp4|webm|ogg|mov)$/i.test(item.file)
      ? "video"
      : "image";
  };

  const getSelectedItemsText = () =>
    cart
      .map((item, i) => {
        const mediaType = getMediaType(item);
        return `${i + 1}. ${mediaType} - ${item.event} - ${item.file}`;
      })
      .join("\n");

  const getSelectedItemsWithLinksText = () =>
    cart
      .map((item, i) => {
        const mediaType = getMediaType(item);
        return (
          `${i + 1}. ${mediaType} - ${item.event}\n` +
          `File: ${item.file}\n` +
          `Link: ${getFileUrl(item.file)}`
        );
      })
      .join("\n\n");

  const handleWhatsAppBook = () => {

    const items = getSelectedItemsWithLinksText();

    const message = `
Hello VeeraDharmaja Events,

Name: ${name}
Phone: ${phone}

Selected Items:
${items}
`;

    const url =
      `https://wa.me/919849836691?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

  };

  const handleBookNow = async () => {
    const items = getSelectedItemsWithLinksText();

    if (!phone.trim()) {
      alert("Please enter mobile number.");
      return;
    }

    setIsSubmittingEmail(true);

    try {
      const data = await submitContactEnquiry({
        name: name || "Cart Booking Request",
        email: "veeradharmajaevents@gmail.com",
        phone,
        occasion: "Cart Booking",
        date: "",
        message: `Selected Items:\n${items}`
      });

      if (data.success) {
        handleWhatsAppBook();
        alert("Booking enquiry sent.");
        setName("");
        setPhone("");
      } else {
        alert("Failed to send booking enquiry.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <p style={styles.eyebrow}>Selected Memories</p>
        <h2 style={styles.title}>Your Cart</h2>
        <p style={styles.subtitle}>
          Review the photos and videos you picked before sending your booking
          request.
        </p>
      </div>

      {cart.length === 0 ? (
        <div style={styles.emptyState}>
          <h3 style={styles.emptyTitle}>No items selected yet</h3>
          <p style={styles.emptyText}>
            Go back to the gallery and choose the photos or videos you want.
          </p>
        </div>
      ) : (
        <>
          <div style={styles.summaryBar}>
            <span style={styles.summaryCount}>
              {cart.length} {cart.length === 1 ? "item" : "items"} selected
            </span>
          </div>

          <div style={styles.grid}>
            {cart.map((item, i) => {
              const mediaType = getMediaType(item);

              return (
                <div key={item.id} style={styles.card}>
                  <div style={styles.imageWrap}>
                    {mediaType === "video" ? (
                      <video
                        src={getFileUrl(item.file)}
                        style={styles.image}
                        controls
                        muted
                      />
                    ) : (
                      <img
                        src={getFileUrl(item.file)}
                        alt={`${item.event} selection ${i + 1}`}
                        style={styles.image}
                      />
                    )}
                    <span style={styles.badge}>
                      {mediaType === "video" ? "Video" : "Photo"}
                    </span>
                  </div>

                  <div style={styles.cardBody}>
                    <p style={styles.cardIndex}>
                      {mediaType === "video" ? "Video" : "Photo"} {i + 1}
                    </p>
                    <p style={styles.eventName}>{item.event}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={styles.removeBtn}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={styles.bookingCard}>
            <h3 style={styles.bookingTitle}>Send booking request</h3>
            <p style={styles.bookingText}>
              Add your name and mobile number, then book once to send the selected
              photos and videos by email and WhatsApp together.
            </p>

            <input
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />

            <input
              placeholder="Enter Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
            />

            <button
              onClick={handleBookNow}
              style={styles.bookBtn}
              disabled={isSubmittingEmail}
            >
              {isSubmittingEmail ? "Sending..." : "Book Now"}
            </button>
          </div>
        </>
      )}

    </div>
  );

}

const styles = {

  page: {
    minHeight: "100vh",
    padding: "120px 24px 48px",
    background:
      "linear-gradient(180deg, #fff8ec 0%, #fffdf8 45%, #f7f1e3 100%)"
  },

  header: {
    maxWidth: "1100px",
    margin: "0 auto 24px"
  },

  eyebrow: {
    margin: "0 0 8px",
    fontSize: "13px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "#b7791f",
    fontWeight: "700"
  },

  title: {
    margin: "0 0 10px",
    fontSize: "clamp(32px, 4vw, 48px)",
    color: "#2d1f13"
  },

  subtitle: {
    margin: 0,
    maxWidth: "680px",
    color: "#6b4f36",
    lineHeight: "1.6"
  },

  emptyState: {
    maxWidth: "720px",
    margin: "40px auto 0",
    padding: "48px 24px",
    borderRadius: "24px",
    background: "rgba(255, 255, 255, 0.85)",
    border: "1px solid rgba(212, 175, 55, 0.22)",
    textAlign: "center",
    boxShadow: "0 20px 50px rgba(93, 63, 26, 0.08)"
  },

  emptyTitle: {
    margin: "0 0 10px",
    fontSize: "28px",
    color: "#2d1f13"
  },

  emptyText: {
    margin: 0,
    color: "#6b4f36",
    lineHeight: "1.6"
  },

  summaryBar: {
    maxWidth: "1100px",
    margin: "0 auto 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  summaryCount: {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 16px",
    borderRadius: "999px",
    background: "#fff",
    color: "#8a6116",
    fontWeight: "700",
    boxShadow: "0 12px 30px rgba(93, 63, 26, 0.08)"
  },

  grid: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "22px"
  },

  card: {
    overflow: "hidden",
    borderRadius: "24px",
    background: "#fffdf9",
    border: "1px solid rgba(212, 175, 55, 0.2)",
    boxShadow: "0 18px 40px rgba(93, 63, 26, 0.12)"
  },

  imageWrap: {
    position: "relative"
  },

  image: {
    display: "block",
    width: "100%",
    height: "240px",
    objectFit: "cover"
  },

  badge: {
    position: "absolute",
    top: "14px",
    left: "14px",
    padding: "8px 12px",
    borderRadius: "999px",
    background: "rgba(47, 133, 90, 0.92)",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.4px"
  },

  cardBody: {
    padding: "18px"
  },

  cardIndex: {
    margin: "0 0 6px",
    fontSize: "12px",
    color: "#b7791f",
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    fontWeight: "700"
  },

  eventName: {
    margin: "0 0 16px",
    fontSize: "18px",
    color: "#2d1f13",
    fontWeight: "600"
  },

  removeBtn: {
    width: "100%",
    border: "none",
    borderRadius: "12px",
    padding: "12px 14px",
    background: "#fff1f0",
    color: "#c53030",
    fontWeight: "700",
    cursor: "pointer"
  },

  bookingCard: {
    maxWidth: "1100px",
    margin: "28px auto 0",
    padding: "24px",
    borderRadius: "24px",
    background: "#2d1f13",
    color: "#fff8ec",
    boxShadow: "0 20px 50px rgba(45, 31, 19, 0.2)"
  },

  bookingTitle: {
    margin: "0 0 8px",
    fontSize: "28px"
  },

  bookingText: {
    margin: "0 0 18px",
    color: "rgba(255, 248, 236, 0.82)",
    lineHeight: "1.6"
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "14px",
    padding: "14px 16px",
    borderRadius: "14px",
    border: "1px solid rgba(255, 248, 236, 0.2)",
    background: "rgba(255, 255, 255, 0.08)",
    color: "#fff",
    outline: "none"
  },

  bookBtn: {
    width: "100%",
    border: "none",
    borderRadius: "14px",
    padding: "14px 18px",
    background: "#d4af37",
    color: "#2d1f13",
    fontWeight: "800",
    cursor: "pointer",
    opacity: 1
  }

};

export default CartPage;
