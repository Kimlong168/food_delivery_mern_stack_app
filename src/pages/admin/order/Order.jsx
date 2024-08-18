import { useContext, useEffect, useState } from "react";
import Pagination from "../../../components/table/Pagination";
import Table from "../../../components/table/Table";
import TableBody from "../../../components/table/TableBody";
import TableHeader from "../../../components/table/TableHeader";
import LoadingInTable from "../../../components/ui/LoadingInTable";
import {
  useDeleteOrder,
  useOrders,
  useUpdateOrder,
} from "../../../hooks/order/useOrder";
import { OrderContext } from "../../../contexts/OrderContext";
import { renderRows } from "./components/DataRow";
import PageTitle from "../../../components/ui/PageTitle";
import SelectNumberPerPage from "../../../components/form/SelectNumberPerPage";
import SearchBar from "../../../components/form/SearchBar";
import { notify } from "../../../utils/toastify";
import { handleDeleteFunction } from "../../../utils/handleDeleteFunction";

const Order = () => {
  const { data, isLoading } = useOrders();
  const deleteOrder = useDeleteOrder();
  const updateOrder = useUpdateOrder();
  const {
    state: orders,
    dispatch,
    searchOrder,
    removeOrder,
  } = useContext(OrderContext);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [numberOfRecordsPerPage, setNumberOfRecordsPerPage] = useState(5);

  //  order history list
  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_ORDER", payload: data });
    }
  }, [data, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyWord.trim() === "") {
      dispatch({ type: "SET_ORDER", payload: data });
    } else {
      searchOrder(searchKeyWord);
    }
  };

  // handle delete
  const handleDelete = async (id) => {
    handleDeleteFunction(async () => {
      try {
        const result = await deleteOrder.mutateAsync(id);

        if (result.status === "success") {
          notify("Delete successfully", "success");
          removeOrder(id);
        } else {
          notify("Delete fail!", "error");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        notify("Delete fail!", "error");
      }
    });
  };

  const handleStatusChange = async (e, item) => {
    item.status = e.target.value;

    // reformate data
    const data = {
      _id: item._id,
      status: e.target.value,
      totalPrice: item.totalPrice,
      user: item.user._id,
      products: item.products.map((product) => ({
        product: product.product._id,
        quantity: product.quantity,
      })),
    };

    try {
      const result = await updateOrder.mutateAsync(data);
      console.log("updating item:", result);
      if (result.status === "success") {
        notify("Update successfully", "success");
      } else {
        notify("Update fail!", "error");
      }
    } catch (error) {
      console.error("Error creating or updating item:", error);
      notify("Update fail!", "error");
    }
  };

  return (
    <div>
      {/* page title */}
      <PageTitle title={`Orders (${orders?.length || 0})`} link="/cart" />

      {/* search and filter */}
      <div className="flex flex-col md:flex-row items-center gap-5 py-5 ">
        <SelectNumberPerPage
          setNumberOfRecordsPerPage={setNumberOfRecordsPerPage}
          numberOfRecordsPerPage={numberOfRecordsPerPage}
          maxLength={orders?.length}
        />

        <SearchBar
          handleSearch={handleSearch}
          setSearchKeyWord={setSearchKeyWord}
          searchKeyWord={searchKeyWord}
        />
      </div>

      {/* Table */}
      <Table>
        <TableHeader
          theads={["No", "ID", "Customer", "Total Price", "Status", "Action"]}
        />
        <TableBody>
          {/* loading */}
          {isLoading ? (
            <LoadingInTable colSpan={7} />
          ) : (
            <>
              {orders?.length == 0 ? (
                <tr>
                  <td
                    className="py-10 dark:text-white text-orange-500 text-center"
                    colSpan={7}
                  >
                    No data
                  </td>
                </tr>
              ) : (
                <Pagination
                  data={orders}
                  deleteItemFn={handleDelete}
                  numberOfRecordsPerPage={numberOfRecordsPerPage}
                  renderRow={renderRows}
                  columns={6}
                  handleStatusChange={handleStatusChange}
                />
              )}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Order;
