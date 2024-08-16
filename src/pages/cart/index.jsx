import TableSection from "./TableSection";
import CartTotalSection from "./CartTotalSection";
import { OrderProvider } from "../../contexts/OrderContext";
import OrderHistorySection from "./OrderHistorySection";
const Cart = () => {
  return (
    <OrderProvider>
      <TableSection />
      <CartTotalSection />
      <OrderHistorySection />
    </OrderProvider>
  );
};

export default Cart;
