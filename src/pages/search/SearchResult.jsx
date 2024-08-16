import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import { useProducts } from "../../hooks/product/useProduct";
import Loading from "../../components/ui/Loading";
import ProductCard from "../../components/ui/ProductCard";

const SearchResult = () => {
  const { data, isLoading } = useProducts();
  const { state: products, dispatch } = useContext(ProductContext);
  const location = useLocation();
  const searchKeyword = location.state?.searchKeyword || "";

  useEffect(() => {
    if (data) {
      const searchResults = data.filter((product) =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );

      dispatch({ type: "SEARCH_PRODUCT", payload: searchResults });
    }
  }, [data, dispatch, searchKeyword]);

  return (
    <div>
      <h3 className="text-2xl font-semibold">Search Resuslts:</h3>
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
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
