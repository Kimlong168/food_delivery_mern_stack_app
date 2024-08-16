import { useContext } from "react";
import { assets } from "../../assets/assets";
import { CartContext } from "../../contexts/CartContext";
const TableSection = () => {
  const {
    state: cartItems,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const removeItemFromCart = (item) => {
    if (item.quantity === 1) {
      removeItem(item.product._id);
      return;
    }
    decreaseQuantity(item.product._id);
  };

  const addItemToCart = (item) => {
    increaseQuantity(item.product._id);
  };

  return (
    <section className="overflow-x-auto">
      <table className="w-full min-w-[300px]">
        <thead>
          <tr className="border-b border-gray-300 text-gray-600 ">
            <th className="text-start pr-6 py-4">Items</th>
            <th className="text-start pr-6 py-4">Title</th>
            <th className="text-start pr-6 py-4">Price</th>
            <th className="text-start pr-6 py-4">Quantity</th>
            <th className="text-start pr-6 py-4">Total</th>
            <th className="text-start pr-6 py-4 w-[100px]">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems?.length === 0 && (
            <tr className="border-b border-gray-300">
              <td colSpan="6" className="text-center py-4">
                <p className="text-gray-600 mt-4">Your cart is empty</p>
              </td>
            </tr>
          )}
          {cartItems?.map((item, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className=" py-4">
                <img width={50} src={item.product.image} alt="" />
              </td>
              <td className="pr-3">{item.product.name}</td>
              <td className="pr-3">${item.product.price}</td>
              <td className="pr-3">
                {" "}
                <div className="flex items-center gap-1 md:gap-3">
                  <img
                    onClick={() => removeItemFromCart(item)}
                    className="w-7 h-7"
                    src={assets.remove_icon_red}
                    alt="remove_icon_red"
                  />
                  {item.quantity}
                  <img
                    onClick={() => addItemToCart(item)}
                    className="w-7 h-7"
                    src={assets.add_icon_green}
                    alt="add_icon_green"
                  />
                </div>
              </td>
              <td className="pr-3">
                ${(item.product.price * item.quantity).toFixed(2)}
              </td>
              <td
                className="cursor-pointer"
                onClick={() => removeItem(item.product._id)}
              >
                <img src={assets.cross_icon} alt="remove_icon_red" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TableSection;
