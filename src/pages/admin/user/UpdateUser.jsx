import { useLocation, useNavigate } from "react-router-dom";
import BackToPrevBtn from "../../../components/ui/BackToPrevBtn";
import { useUpdateUser } from "../../../hooks/user/useUser";
import { notify } from "../../../utils/toastify";
import UserForm from "./components/UserForm";
const UpdateUser = () => {
  const updateUser = useUpdateUser();
  const location = useLocation();
  const { user } = location.state || {};
  let navigate = useNavigate();

  const onSubmitFn = async (data) => {
    try {
      const result = await updateUser.mutateAsync({
        id: user._id,
        ...data,
      });

      navigate("/admin/user");

      if (result.status === "success") {
        notify("Create successfully", "success");
      } else {
        notify(result.error.message, "error");
      }
      console.log("Created item:", result);
    } catch (error) {
      notify("Create fail!", "error");
      console.error("Error creating item:", error);
    }
  };

  return (
    <div className="text-gray-900  border-gray-700 rounded shadow-xl p-4">
      {/* title */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-3xl underline text-orange-500 uppercase ">
          Update User
        </span>
        <BackToPrevBtn />
      </div>
      <br />

      <UserForm
        onSubmitFn={onSubmitFn}
        isSubmitting={updateUser.isLoading}
        initialData={user}
      />
    </div>
  );
};

export default UpdateUser;
