import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import Loading from "../../components/ui/Loading";
import OrderDetailCard from "./OrderDetailCard";
import { OrderContext } from "../../contexts/OrderContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useOrders } from "../../hooks/order/useOrder";
import getStatusColor from "../../utils/getStatusColor";
const OrderHistorySection = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading } = useOrders();
  const { state: orders, dispatch, searchOrder } = useContext(OrderContext);
  const [isSearch, setIsSearch] = useState(false);

  const [showOrderDetail, setShowOrderDetail] = useState({
    status: false,
    id: null,
  });

  const [searchKeyword, setSearchKeyword] = useState("");

  console.log("dataaa", data);

  // update order history list
  useEffect(() => {
    if (data && user) {
      const filterOrder = data.filter((order) => order.user?._id == user._id);
      dispatch({ type: "SET_ORDER", payload: filterOrder });
    }
  }, [data, dispatch, user]);

  // search order by order id
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearch(true);
    searchOrder(searchKeyword);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

  return (
    <section className="mt-8">
      <div>
        <div className="flex flex-col md:flex-row md:items-end  gap-4 justify-between">
          {/* dragon with title */}
          <div className="flex items-end w-full">
            <h3 className="text-2xl font-semibold">Your orders</h3>
          </div>

          {/* search bar */}
          {/* <DrawOutlineButton> */}
          <form
            className="w-full lg:w-auto md:min-w-[300px]"
            onSubmit={handleSearch}
          >
            <div className="flex items-center gap-3 px-4 py-2 border rounded">
              {/* search input */}
              <input
                className="outline-none border-none p-1 w-full bg-transparent"
                type="text"
                placeholder={"Search by Order ID..."}
                name="search"
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  if (e.target.value.trim() === "") {
                    setIsSearch(false);
                    const filterOrder = data.filter(
                      (order) => order.user?._id == user._id
                    );
                    dispatch({ type: "SET_ORDER", payload: filterOrder });
                  }
                }}
              />

              {/* search icon */}
              <div onClick={handleSearch} className="cursor-pointer">
                <FaSearch />
              </div>
            </div>
          </form>
          {/* </DrawOutlineButton> */}
        </div>

        {/*table order history */}
        <div className="flex flex-col mt-5">
          <div
            className="overflow-x-auto sm:mx-0.5 lg:mx-0.5"
            id="orderHistory"
          >
            <div className="py-2 inline-block min-w-full ">
              <div className="overflow-hidden rounded">
                <table className="min-w-full">
                  <thead className="bg-orange-500 border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-md text-white font-bold px-6 py-4 text-left truncate"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="text-md text-white font-bold px-6 py-4 text-left truncate"
                      >
                        Customer Name
                      </th>

                      <th
                        scope="col"
                        className="text-md text-white font-bold px-6 py-4 text-left truncate"
                      >
                        Total
                      </th>
                      <th
                        scope="col"
                        className="text-md text-white font-bold px-6 py-4 text-left truncate"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="text-md text-white font-bold px-6 py-4 text-left truncate"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* if there is no order */}
                    {orders?.length === 0 &&
                      (isSearch ? (
                        <tr className="bg-gray-100 border-b">
                          <td
                            className="px-6 py-4 whitespace-nowrap font-medium dark:text-gray-400 dark:bg-gray-900 text-center text-lg"
                            colSpan="6"
                          >
                            Not Found!
                          </td>
                        </tr>
                      ) : (
                        <tr className="bg-gray-100 border-b">
                          <td
                            className="px-6 py-4 whitespace-nowrap font-medium dark:text-gray-400 dark:bg-gray-900 text-center text-lg"
                            colSpan="6"
                          >
                            You have no order history !
                          </td>
                        </tr>
                      ))}

                    {/* listing all the order history */}
                    {orders?.map((order) => {
                      return (
                        <>
                          <tr className="bg-gray-100 border-b" key={order._id}>
                            <td className="px-6 py-4 whitespace-nowrap  font-medium dark:text-gray-400 dark:bg-gray-900">
                              {order._id}
                            </td>
                            <td className=" dark:text-gray-400 dark:bg-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {order.user?.name}
                            </td>

                            <td className=" dark:text-gray-400 dark:bg-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              $ {order.totalPrice}
                            </td>
                            <td className=" dark:text-gray-400 dark:bg-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-center">
                              {getStatusColor(order.status)}
                            </td>
                            <td className=" dark:text-gray-400 dark:bg-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() =>
                                  setShowOrderDetail({
                                    status: true,
                                    id: order._id,
                                  })
                                }
                                className="text-orange-500 underline hover:text-blue-500"
                              >
                                View Detail
                              </button>
                            </td>
                          </tr>
                          {/* order detail popup */}

                          <div>
                            {showOrderDetail.status &&
                              showOrderDetail.id == order._id && (
                                <OrderDetail
                                  setShowOrderDetail={setShowOrderDetail}
                                  order={order}
                                  user={user}
                                />
                              )}
                          </div>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const OrderDetail = ({ setShowOrderDetail, order }) => {
  return (
    <>
      <div className="fixed inset-0 bg-slate-900/20 backdrop-blur grid place-content-center text-black z-[300]">
        <div
          className="overflow-auto my-10 pt-0 w-fit bg-white rounded relative"
          id="orderHistory"
        >
          <div className="md:w-[600px] lg:w-[700px] bg-white">
            {/* title */}
            <div className="px-6  sticky top-0 bg-white z-10">
              <div className="pb-3 pt-5 mb-4 border-b-4 border-gray-400  bg-white flex justify-between items-center gap-4 ">
                <h2 className="text-2xl font-bold">Order Detail</h2>

                <div
                  onClick={() =>
                    setShowOrderDetail({
                      status: false,
                      id: null,
                    })
                  }
                  className="cursor-pointer hover:text-primary"
                >
                  <FaWindowClose size={18} />
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

OrderDetail.propTypes = {
  setShowOrderDetail: PropTypes.func,
  language: PropTypes.string,
  order: PropTypes.object,
};

export default OrderHistorySection;
