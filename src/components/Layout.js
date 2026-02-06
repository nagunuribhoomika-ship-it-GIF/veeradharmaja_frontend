import Header from "./Header";
import pageBg from "../assets/hero/background.jpg";

function Layout({ children }) {
  return (
    <div
      className="app-page"
      style={{ "--page-bg": `url(${pageBg})` }}
    >
      <Header />

      <main style={{ padding: "20px", paddingBottom: "80px" }}>
        {children}
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
