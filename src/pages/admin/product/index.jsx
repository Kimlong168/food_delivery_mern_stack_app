import { ProductProvider } from "../../../contexts/ProductContext";
import Category from "./Product";
const index = () => {
  return (
    <ProductProvider>
      <Category />
    </ProductProvider>
  );
};

export default index;
