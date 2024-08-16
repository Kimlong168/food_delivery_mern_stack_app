import { useContext, useEffect } from "react";

import PropTypes from "prop-types";
import { useCategories } from "../../hooks/category/useCategory";
import { CategoryContext } from "../../contexts/CategoryContext";
import Loading from "../../components/ui/Loading";
import { assets } from "../../assets/assets";
const MenuListSection = ({ category, setCategory }) => {
  const { data, isLoading } = useCategories();
  const { state: categories, dispatch } = useContext(CategoryContext);

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_CATEGORY", payload: data });
    }
  }, [data, dispatch]);

  const handleCategory = (id) => {
    setCategory(id);
  };
  return (
    <section id="menu">
      <h3 className="text-2xl font-semibold mt-7">Explore our menu</h3>
      <p className="lg:w-[55%] mt-3">
        choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satify your cravings and evaluate your dining experience,
        one delicious meal at a time.
      </p>
      {/* list of menu */}

      {isLoading && <Loading />}
      <div className="flex gap-6 mt-7 hide-scrollbar overflow-auto">
        <div onClick={() => handleCategory("All")}>
          <div
            className={`w-[80px] h-[80px] md:w-[110px] md:h-[110px] rounded-full overflow-hidden cursor-pointer ${
              category === "All" && "border-[3px] border-orange-500 p-[1px]"
            }`}
          >
            <img
              className="w-full h-full rounded-full object-cover"
              src={assets.food_1}
              alt="food_1"
            />
          </div>
          <div
            className={`text-center mt-2 ${
              category === "All" && "text-orange-500 font-semibold"
            }`}
          >
            All
          </div>
        </div>
        {categories?.map((menu, index) => (
          <div key={index} onClick={() => handleCategory(menu._id)}>
            <div
              className={`w-[80px] h-[80px] md:w-[110px] md:h-[110px] rounded-full overflow-hidden cursor-pointer ${
                category === menu._id &&
                "border-[3px] border-orange-500 p-[1px]"
              }`}
            >
              <img
                className="w-full h-full rounded-full object-cover"
                src={menu.image}
                alt="food_1"
              />
            </div>
            <div
              className={`text-center mt-2 ${
                category === menu._id && "text-orange-500 font-semibold"
              }`}
            >
              {menu.name}
            </div>
          </div>
        ))}
      </div>
      <div className="h-[1.5px] w-full bg-gray-300 rounded-full my-10"></div>
    </section>
  );
};

MenuListSection.propTypes = {
  category: PropTypes.string,
  setCategory: PropTypes.func,
};

export default MenuListSection;
