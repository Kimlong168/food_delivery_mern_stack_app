import { FaSchoolCircleCheck } from "react-icons/fa6";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TbCategory2 } from "react-icons/tb";
import { FaCalendarMinus, FaUniversity } from "react-icons/fa";
const CardGroup = ({ itemNumber }) => {
  return (
    <div className="pb-4 ">
      <p className="text-xl font-semibold mb-2">Dashboard</p>
      <div className="grid gap-4 grid-cols-1 mb-4">
        <Card
          title="Order"
          subtitle="Manage orders"
          href="/admin/order"
          Icon={FaUniversity}
          numberOfItem={itemNumber?.university}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card
          title="Product"
          subtitle="Manage products"
          href="/admin/product"
          Icon={TbCategory2}
          numberOfItem={itemNumber?.major}
        />
        <Card
          title="Category"
          subtitle="Manage categories"
          href="/admin/category"
          Icon={FaCalendarMinus}
          numberOfItem={itemNumber?.admission}
        />
        <Card
          title="User"
          subtitle="Manage users"
          href="/admin/user"
          Icon={FaSchoolCircleCheck}
          numberOfItem={itemNumber?.scholarship}
        />
      
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, href, numberOfItem }) => {
  return (
    <Link
      to={href}
      className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-orange-400 group-hover:rotate-12 transition-transform duration-300" />
      <div className="flex items-center gap-4 mb-2 ">
        <Icon className="text-2xl text-orange-600 group-hover:text-white transition-colors relative z-10 duration-300" />
        {numberOfItem >= 0 && (
          <span className="text-red-500 ">{numberOfItem}</span>
        )}
      </div>
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-orange-200 relative z-10 duration-300">
        {subtitle}
      </p>
    </Link>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  Icon: PropTypes.element,
  numberOfItem: PropTypes.number,
  numberOfEachOrderStatus: PropTypes.object,
};

CardGroup.propTypes = {
  itemNumber: PropTypes.object,
};

export default CardGroup;
