import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import LoginForm from "../../components/authentication/LoginForm";
import SignUpForm from "../../components/authentication/SignUpForm";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import { getTotalItems } from "../../utils/cart";
import SearchPopup from "../../components/ui/SearchPopup";
import { TbMenu2 } from "react-icons/tb";
import SideBar from "./SideBar";
const Header = () => {
  const { user, showForm, setShowForm } = useContext(AuthContext);
  const { state: cartItems } = useContext(CartContext);
  const [activeTab, setActiveTab] = useState("home");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <>
      <header className="container flex justify-between items-center py-6 ">
        <div onClick={() => setActiveTab("home")}>
          <Link to="/">
            <div className="cursor-pointer">
              <img src={assets.logo} alt="logo" />
            </div>
          </Link>
        </div>
        <div className="hidden lg:block">
          <ul className="flex justify-center items-center gap-6">
            <li
              onClick={() => setActiveTab("home")}
              className={`${
                activeTab === "home" && "border-b-2 border-orange-500"
              }`}
            >
              <Link to="/">home</Link>
            </li>
            <li
              onClick={() => setActiveTab("menu")}
              className={`${
                activeTab === "menu" && "border-b-2 border-orange-500"
              }`}
            >
              <a href="#menu">menu</a>
            </li>
            <li
              onClick={() => setActiveTab("mobile-app")}
              className={`${
                activeTab === "mobile-app" && "border-b-2 border-orange-500"
              }`}
            >
              <a href="#mobile-app">mobile-app</a>
            </li>
            <li
              onClick={() => setActiveTab("contact")}
              className={`${
                activeTab === "contact" && "border-b-2 border-orange-500"
              }`}
            >
              <a href="#contact">contact us</a>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-end gap-4 md:gap-7">
          <div onClick={() => setShowSearchBar(true)}>
            <img className="w-6" src={assets.search_icon} alt="search_icon" />
          </div>
          <div
            className="relative hidden lg:block"
            onClick={() => setActiveTab("profile")}
          >
            <Link to="/cart">
              <img className="w-6" src={assets.basket_icon} alt="cart_icon" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-3 bg-orange-500 text-white rounded-full p-0.5 w-5 h-5 text-sm grid place-content-center">
                  {getTotalItems(cartItems)}
                </span>
              )}
            </Link>
          </div>

          {user ? (
            <div
              className="hidden lg:block"
              onClick={() => setActiveTab("profile")}
            >
              <Link to="/profile">
                <img
                  className="w-6 h-6 border border-orange-500 rounded-full p-0.5"
                  src={assets.profile_icon}
                  alt="cart_icon"
                />
              </Link>
            </div>
          ) : (
            <button
              onClick={() => setShowForm("login")}
              className="px-6 py-1.5 pb-2 rounded-full border-2 hidden lg:block"
            >
              sign in
            </button>
          )}

          <div
            className="lg:hidden text-3xl cursor-pointer hover:text-orange-500 relative"
            onClick={() => setShowSideBar(true)}
          >
            <TbMenu2 />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-3 bg-orange-500 text-white rounded-full p-0.5 w-5 h-5 text-sm grid place-content-center">
                {getTotalItems(cartItems)}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* sidebar */}
      <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      {/*login and signup form */}

      {showForm &&
        (showForm === "login" ? (
          <LoginForm setShowForm={setShowForm} />
        ) : (
          <SignUpForm setShowForm={setShowForm} />
        ))}

      {/* search form */}
      <SearchPopup
        setShowSearchBar={setShowSearchBar}
        showSearchBar={showSearchBar}
      />
    </>
  );
};

export default Header;
