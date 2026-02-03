import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ padding: "20px", paddingBottom: "80px" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
