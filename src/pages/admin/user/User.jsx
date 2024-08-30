import { useContext, useEffect, useState } from "react";
import Pagination from "../../../components/table/Pagination";
import Table from "../../../components/table/Table";
import TableBody from "../../../components/table/TableBody";
import TableHeader from "../../../components/table/TableHeader";
import LoadingInTable from "../../../components/ui/LoadingInTable";

import { renderRows } from "./components/DataRow";
import PageTitle from "../../../components/ui/PageTitle";
import SelectNumberPerPage from "../../../components/form/SelectNumberPerPage";
import SearchBar from "../../../components/form/SearchBar";
import { notify } from "../../../utils/toastify";
import { handleDeleteFunction } from "../../../utils/handleDeleteFunction";

import { useDeleteUser, useUsers } from "../../../hooks/user/useUser";
import { UserContext } from "../../../contexts/UserContext";

const User = () => {
  const { data, isLoading } = useUsers();
  const delelteUser = useDeleteUser();

  const {
    state: users,
    dispatch,
    removeUser,
    searchUser,
  } = useContext(UserContext);

  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [numberOfRecordsPerPage, setNumberOfRecordsPerPage] = useState(5);

 
  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_USER", payload: data });
    }
  }, [data, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyWord.trim() === "") {
      dispatch({ type: "SET_USER", payload: data });
    }
    searchUser(searchKeyWord);
  };

  // handle delete
  const handleDelete = async (id) => {
    handleDeleteFunction(async () => {
      try {
        const result = await delelteUser.mutateAsync(id);

        if (result.status === "success") {
          notify("Delete successfully", "success");
          removeUser(id);
        } else {
          notify("Delete fail!", "error");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        notify("Delete fail!", "error");
      }
    });
  };

  return (
    <div>
      {/* page title */}
      <PageTitle
        title={`Users (${users?.length || 0})`}
        link="/admin/createUser"
      />

      {/* search and filter */}
      <div className="flex flex-col md:flex-row items-center gap-5 py-5 ">
        <SelectNumberPerPage
          setNumberOfRecordsPerPage={setNumberOfRecordsPerPage}
          numberOfRecordsPerPage={numberOfRecordsPerPage}
          maxLength={users?.length}
        />

        <SearchBar
          handleSearch={handleSearch}
          setSearchKeyWord={setSearchKeyWord}
          searchKeyWord={searchKeyWord}
        />

      </div>

      {/* Table */}
      <Table>
        <TableHeader theads={["No", "Name", "Email", "Is Admin", "Action"]} />
        <TableBody>
          {/* loading */}
          {isLoading ? (
            <LoadingInTable colSpan={5} />
          ) : (
            <>
              {users?.length == 0 ? (
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
                  data={users}
                  deleteItemFn={handleDelete}
                  numberOfRecordsPerPage={numberOfRecordsPerPage}
                  renderRow={renderRows}
                  columns={5}
                />
              )}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default User;
