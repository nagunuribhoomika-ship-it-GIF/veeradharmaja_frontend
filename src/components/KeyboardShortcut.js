import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function KeyboardShortcut() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Debug (optional)
      console.log(e.key, e.code);

      // Ctrl + shift + A
     if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
  navigate("/profile");
}

    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return null;
}

export default KeyboardShortcut;
