import { RxDashboard } from "react-icons/rx";
import { FaCalendarMinus, FaUniversity } from "react-icons/fa";
import { TbCategory2, TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FaSchoolCircleCheck } from "react-icons/fa6";
import GoToTop from "../components/ui/GoToTop";
import { assets } from "../assets/assets";
import { Outlet } from "react-router-dom";
import ConfirmModal from "../components/ui/ConfirmModal";
import { notify } from "../utils/toastify";
const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("dashoboard");
  const [showModal, setShowModal] = useState(false);
  const { user, setUser, logout } = useContext(AuthContext);

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    const result = logout();

    if (result) {
      notify("Logout successful");
      window.location.href = "/";
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // delay to show the notification
      setTimeout(() => {
        setUser(null);
      }, 2000);

      // Redirect them to the home page
    } else {
      notify("Logout failed", "error");
    }
  };

  const ListItems = ({ tabName, icon, pathName = "/", isBar = false }) => {
    return (
      <>
        {!isBar ? (
          <>
            <li
              className={
                activeTab === tabName
                  ? "bg-gray-800 border-l-8 border border-orange-600"
                  : " "
              }
              onClick={() => handleChangeTab(tabName)}
            >
              <Link
                to={`${pathName}`}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  {icon}
                </span>
                <span className="ml-2 text-sm tracking-wide capitalize truncate">
                  {tabName}
                </span>
              </Link>
            </li>
          </>
        ) : (
          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                ----------------------------------
              </div>
            </div>
          </li>
        )}
      </>
    );
  };

  ListItems.propTypes = {
    tabName: PropTypes.string,
    icon: PropTypes.node,
    pathName: PropTypes.string,
    isBar: PropTypes.bool,
  };

  const sideBarListItem = [
    {
      tabName: "dashbaord",
      icon: <RxDashboard />,
      pathName: "/admin/dashboard",
    },
    {
      tabName: "order",
      icon: <FaUniversity />,
      pathName: "/admin/order",
    },
    {
      tabName: "product",
      icon: <TbCategory2 />,
      pathName: "/admin/product",
    },
    {
      tabName: "category",
      icon: <FaCalendarMinus />,
      pathName: "/admin/category",
    },
    {
      tabName: "user",
      icon: <FaSchoolCircleCheck />,
      pathName: "/admin/user",
    },
    {
      tabName: "Promo Code",
      icon: <FaSchoolCircleCheck />,
      pathName: "/admin/promo_code",
    },
  ];

  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased  text-black">
        <div className="fixed w-full flex items-center justify-between h-14 text-white z-[1000]">
          <div className="flex items-center justify-start md:justify-center gap-5 pl-3 w-14 md:w-64 h-14 bg-gray-800 border-l-8 border-none">
            <div>
              <Link to="/">
                <img src={assets.logo} alt="logo" />
              </Link>
            </div>
          </div>

          <div className="flex justify-end items-center gap-5 h-14 bg-gray-800  header-right w-full px-5">
            <span>
              User:{" "}
              <span className="text-orange-500 font-bold">{user?.name}</span>
            </span>
            <button
              onClick={() => setShowModal(true)}
              className="px-3  py-1.5 rounded text-white font-bold bg-red-500 flex items-center gap-2 justify-center"
            >
              <TbLogout2 />
            </button>
          </div>
        </div>

        <div
          className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-gray-900 h-full text-white transition-all duration-300 border-none z-[900] sidebar"
          id="sidebar"
        >
          <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              <li className="px-5 hidden md:block">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                    Main
                  </div>
                </div>
              </li>

              {sideBarListItem.map((item, index) => (
                <ListItems
                  key={index}
                  tabName={item.tabName}
                  pathName={item.pathName}
                  icon={item.icon}
                  isBar={item.isBar}
                />
              ))}
            </ul>
            <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
              Copyright @pathfinder 2024
            </p>
          </div>
        </div>

        <div className="h-full ml-14 mt-14 mb-10 md:ml-64 p-2 md:p-4 lg:p-10 pt-5 relative ">
          <Outlet />
        </div>
      </div>

      <GoToTop />

      <ConfirmModal
        show={showModal}
        setShow={setShowModal}
        title="Logout"
        message="Are you sure you want to logout?"
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default AdminLayout;
