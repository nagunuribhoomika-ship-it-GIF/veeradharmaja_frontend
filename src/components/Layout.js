import Header from "./Header";
import Footer from "./Footer";
import pageBg from "../assets/hero/background.jpg";


function Layout({ children }) {
  return (
    <div
      className="app-page"
      style={{ "--page-bg": `url(${pageBg})` }}
    >
      <Header />

      <main className="app-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
