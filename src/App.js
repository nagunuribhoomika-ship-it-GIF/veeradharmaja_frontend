import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Cards from "./pages/Cards";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import EventPage from "./pages/EventPage";
import EventGallery from "./pages/EventGallery";
import EventVideos from "./pages/EventVideos";
import ServiceDetails from "./pages/ServiceDetails";

import KeyboardShortcut from "./components/KeyboardShortcut";

import { CartProvider } from "./context/CartContext";
import FloatingCart from "./components/FloatingCart";
import CartPage from "./pages/CartPage";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <CartProvider>

      <BrowserRouter>

        <KeyboardShortcut />

        <FloatingCart />

        <Layout>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />

            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetails />} />

            <Route path="/portfolio" element={<Portfolio />} />

            <Route path="/event/:slug" element={<EventPage />} />
            <Route path="/event/:slug/gallery" element={<EventGallery />} />
            <Route path="/event/:slug/videos" element={<EventVideos />} />

            {/* CART PAGE */}
            <Route path="/cart" element={<CartPage />} />

          </Routes>
        </Layout>

      </BrowserRouter>

    </CartProvider>
  );
}

export default App;