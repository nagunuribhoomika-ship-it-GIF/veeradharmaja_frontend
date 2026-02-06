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

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Cards page (if you still want it separately) */}
          <Route path="/cards" element={<Cards />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Contact */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
<Route path="/services" element={<Services />} />
<Route path="/portfolio" element={<Portfolio />} />


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
