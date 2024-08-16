import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useContext, useRef } from "react";
import PropTypes from "prop-types";
import { FiArrowRight } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";
import { assets } from "../../assets/assets";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import { getTotalItems } from "../../utils/cart";

const SideBar = ({ setShowSideBar, showSideBar }) => {
  const { user, setShowForm } = useContext(AuthContext);
  const { state: cartItems } = useContext(CartContext);
  return (
    <div>
      <div
        id="sideBar"
        className={`fixed h-full bg-black/90 inset-0 z-[1000] overflow-hidden transition-all duration-300 ease-in-out transform ${
          showSideBar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <section className=" p-4 md:p-8">
          <div className="mx-auto max-w-5xl " onClick={scrollToTop}>
            <div onClick={() => setShowSideBar(false)}>
              <LinkContainer
                heading="Home"
                subheading={"Welcome to Tomato"}
                imgSrc={assets.food_1}
                href="/"
              />
            </div>
            <div className="relative" onClick={() => setShowSideBar(false)}>
              <LinkContainer
                heading="Cart"
                subheading={"View your cart"}
                imgSrc={assets.food_1}
                href="/cart"
              />
              {cartItems?.length > 0 && (
                <span className="absolute top-[50%] -translate-y-[50%] right-3 bg-orange-500 text-white rounded-full p-0.5 w-7 h-7 text-sm grid place-content-center z-[20]">
                  {getTotalItems(cartItems)}
                </span>
              )}
            </div>
            {user ? (
              <div onClick={() => setShowSideBar(false)}>
                <LinkContainer
                  heading="Profile"
                  subheading={"View your profile"}
                  imgSrc={assets.food_1}
                  href="/profile"
                />
              </div>
            ) : (
              <div
                onClick={() => {
                  setShowSideBar(false);
                  setShowForm("login");
                }}
              >
                <LinkContainer
                  heading="Sign In"
                  subheading={"Sign in to your account"}
                  imgSrc={assets.food_1}
                  href="#"
                />
              </div>
            )}
          </div>
        </section>

        {/* close icon */}
        <div
          onClick={() => setShowSideBar((prev) => !prev)}
          className="fixed top-2 right-3 md:top-4 md:right-5 z-[10] p-2 text-white hover:bg-neutral-800"
        >
          <IoMdClose className="w-10 h-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const LinkContainer = ({ heading, imgSrc, subheading, href }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <Link to={href}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        initial="initial"
        whileHover="whileHover"
        className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8"
      >
        <div>
          <motion.span
            variants={{
              initial: { x: 0 },
              whileHover: { x: -16 },
            }}
            transition={{
              type: "spring",
              staggerChildren: 0.075,
              delayChildren: 0.25,
            }}
            className="relative z-10 block text-4xl font-bold text-white transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl"
          >
            <span>{heading}</span>
          </motion.span>
          <span className="relative z-10 mt-2 block text-base text-white/90 transition-colors duration-500 group-hover:text-neutral-50">
            {subheading}
          </span>
        </div>

        <motion.img
          style={{
            top,
            left,
            translateX: "-50%",
            translateY: "-50%",
          }}
          variants={{
            initial: { scale: 0, rotate: "-12.5deg" },
            whileHover: { scale: 1, rotate: "12.5deg" },
          }}
          transition={{ type: "spring" }}
          src={imgSrc}
          className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
          alt={`Image representing a LinkContainer for ${heading}`}
        />

        <motion.div
          variants={{
            initial: {
              x: "25%",
              opacity: 0,
            },
            whileHover: {
              x: "0%",
              opacity: 1,
            },
          }}
          transition={{ type: "spring" }}
          className="relative z-10 p-4"
        >
          <FiArrowRight className="text-5xl text-neutral-50" />
        </motion.div>
      </motion.div>
    </Link>
  );
};

LinkContainer.propTypes = {
  heading: PropTypes.string,
  imgSrc: PropTypes.string,
  subheading: PropTypes.string,
  href: PropTypes.string,
};
SideBar.propTypes = {
  setShowSideBar: PropTypes.func.isRequired,
  showSideBar: PropTypes.bool.isRequired,
};
export default SideBar;
