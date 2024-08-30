import { FaWindowClose } from "react-icons/fa";
import OrderDetailCard from "./components/OrderDetailCard";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
const ShowOrder = () => {
  const location = useLocation();
  const { order } = location.state || {};
  return (
    <>
      <div className="  grid place-content-center text-black z-[300]">
        <div className="overflow-auto pt-0 w-fit bg-white rounded relative">
          <div className="md:w-[600px] lg:w-[700px] bg-white">
            {/* title */}
            <div className="px-6  sticky top-0 bg-white z-10">
              <div className="pb-3 pt-5 mb-4 border-b-4 border-orange-400  bg-white flex justify-between items-center gap-4 ">
                <h2 className="text-2xl font-bold text-orange-500">
                  Order Detail
                </h2>

                <div className="cursor-pointer text-orange-500">
                  <Link to="/admin/order">
                    <FaWindowClose size={18} />
                  </Link>
                </div>
              </div>
            </div>

            {/* order detail information */}
            <div className="p-6 pt-1">
              <OrderDetailCard {...order} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ShowOrder.propTypes = {
  order: PropTypes.object,
};

export default ShowOrder;
