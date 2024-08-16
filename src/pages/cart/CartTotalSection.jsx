import { useContext, useState } from "react";
import { getTotalPrice } from "../../utils/cart";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useCreateOrder } from "../../hooks/order/useOrder";
import { notify } from "../../utils/toastify";
import ConfirmModal from "../../components/ui/ConfirmModal";
const CartTotalSection = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  const { state: cartItems, clearCart } = useContext(CartContext);
  const createOrder = useCreateOrder();

  const validateOrder = () => {
    if (cartItems?.length === 0) {
      notify("No items in the cart!", "error");

      return;
    }
    if (!user) {
      notify("Please login in to order!", "error");
      return;
    }

    setShowModal(true);
  };

  const processOrder = async () => {
    setShowModal(false);
    const products = cartItems.map((item) => {
      return {
        product: item.product._id,
        quantity: item.quantity,
      };
    });
    const result = await createOrder.mutateAsync({
      user: user,
      products: products,
      totalPrice: getTotalPrice(cartItems).toFixed(2),
    });

    console.log("result:", result);

    if (result.status === "success") {
      notify("Order placed successfully!");
      localStorage.removeItem("cartItems");
      clearCart();
    } else {
      console.log("Order fail!:", result);
      return notify("Order fail!", "error");
    }
  };

  return (
    <section className="mt-12">
      <div className="flex flex-col md:flex-row justify-between gap-10 w-full">
        <div className="md:w-[45%]  order-2 md:order-1">
          <h3 className="text-2xl font-semibold">Cart Total</h3>
          <table className="w-full mt-3">
            <tbody>
              <tr className="border-b">
                <td className="font-semibold pb-3 text-gray-600">Subtotal</td>
                <td className="text-end">
                  $ {getTotalPrice(cartItems).toFixed(2)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold pb-3 text-gray-600">Delivery</td>
                <td className="text-end">$ 0</td>
              </tr>
              <tr>
                <td className="font-bold pb-3">Total</td>
                <td className="text-end font-bold">
                  $ {getTotalPrice(cartItems).toFixed(2)}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr
                onClick={validateOrder}
                className="bg-orange-500 py-3 px-4 rounded text-white font-bold uppercase inline-block cursor-pointer"
              >
                <td>Proceed to checkout</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="md:w-[40%] order-1 md:order-2">
          <p>if you have promote code, please enter here </p>
          <div className="flex items-center mt-4">
            <input
              className="p-3 border w-full outline-none rounded -mr-3"
              placeholder="promo code"
              type="text"
            />
            <div className="py-3 px-5 bg-black text-white rounded">Submit</div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showModal}
        setShow={setShowModal}
        title="Conform Order"
        message="Are you sure you want to order?"
        onConfirm={processOrder}
      />
    </section>
  );
};

export default CartTotalSection;
