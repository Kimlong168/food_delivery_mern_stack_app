import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <footer id="contact" className=" bg-gray-800 mt-12">
      <div className="container pt-16 pb-10">
        <div
          className="flex flex-col gap-10 md:flex-row justify-between md:gap-4  text-white"
          id="contact"
        >
          <div className="md:w-[50%] ">
            <div>
              <img src={assets.logo} alt="" />
            </div>
            <p className="text-sm  my-5 w-full md:w-[80%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              voluptatibus unde dicta, voluptate perferendis fuga eligendi,
              placeat aliquam, dolor nisi blanditiis laborum earum eum ducimus
              odio fugiat magnam error aliquid!
            </p>

            <div className="flex items-center gap-3">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="uppercase text-2xl font-bold">company</h3>
            <ul className="mt-5">
              <li className="hover:text-orange-400 cursor-pointer">Home</li>
              <li className="hover:text-orange-400 cursor-pointer">About Us</li>
              <li className="hover:text-orange-400 cursor-pointer">Delivery</li>
              <li className="hover:text-orange-400 cursor-pointer">
                Privacy policy
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="uppercase text-2xl font-bold">get in touch</h3>
            <ul className="mt-5">
              <li className="hover:text-orange-400 cursor-pointer">
                (+855) 86 961 256
              </li>
              <li className="hover:text-orange-400 cursor-pointer">
                kimlong5244@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[1px] bg-gray-500 w-full my-7 "></div>

        <div>
          <p className="text-center text-sm text-gray-500">
            &copy; 2021 All rights reserved. Designed by Kimlong
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
