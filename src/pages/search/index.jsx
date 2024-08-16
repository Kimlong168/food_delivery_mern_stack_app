import { ProductProvider } from "../../contexts/ProductContext";
import SearchResult from "./SearchResult";
const Search = () => {
  return (
    <ProductProvider>
      <SearchResult />
    </ProductProvider>
  );
};

export default Search;
