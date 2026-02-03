import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Cards from "./pages/Cards";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";

import EventPage from "./pages/EventPage";
import EventGallery from "./pages/EventGallery";
import EventVideos from "./pages/EventVideos";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Cards />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Contact */}
          <Route path="/contact" element={<Contact />} />

          {/* Dynamic event pages */}
          <Route path="/event/:slug" element={<EventPage />} />
          <Route path="/event/:slug/gallery" element={<EventGallery />} />
          <Route path="/event/:slug/videos" element={<EventVideos />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
