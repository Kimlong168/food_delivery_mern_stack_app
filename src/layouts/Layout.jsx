import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import GoToTop from "../components/ui/GoToTop";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
      <GoToTop />
    </div>
  );
};

export default Layout;
