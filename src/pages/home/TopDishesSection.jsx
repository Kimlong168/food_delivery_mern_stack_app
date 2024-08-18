import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import ProductCard from "../../components/ui/ProductCard";
import Loading from "../../components/ui/Loading";
import { useProducts } from "../../hooks/product/useProduct";

const TopDishesSection = ({ category }) => {
  const { data, isLoading } = useProducts();
  const { state: products, dispatch } = useContext(ProductContext);

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_PRODUCT", payload: data });
    }
  }, [data, dispatch]);

  return (
    <section>
      <h3 className="text-2xl font-semibold">Top dishes near you</h3>

      {/* food list */}

      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {products?.length === 0 ? (
            <div className="mt-5 text-xl font-bold text-center text-orange-500">
              No products found
            </div>
          ) : (
            <div className="grid auto-rows-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-7">
              {products
                .filter(
                  (product) =>
                    product.category?._id === category || category === "All"
                )
                .map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

TopDishesSection.propTypes = {
  category: PropTypes.string,
};

export default TopDishesSection;
