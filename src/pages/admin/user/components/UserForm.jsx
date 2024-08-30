import { useState } from "react";

import { notify } from "../../../../utils/toastify";
import PropTypes from "prop-types";

const UserForm = ({ onSubmitFn, isSubmitting, initialData = {} }) => {
  const [data, setData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    password: initialData.password || "",
    isAdmin: initialData.name ? initialData.isAdmin : false,
  });

  console.log("initialData", initialData);

  const handleOnChange = (e) => {
    const { name, type, value, checked } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, // Handle checkboxes differently
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!data.name || !data.email || !data.password) {
      notify("Please fill all the fields!", "error");
      return;
    }
    onSubmitFn(data);
  };

  return (
    <div className="w-full flex flex-col  border border-white/50 rounded-3xl gap-3">
      {/* data title input */}

      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm">Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleOnChange}
          className="border p-2 rounded focus:outline-orange-500"
        />

        {!initialData.email && (
          <>
            <label className="font-medium text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              className="border p-2 rounded focus:outline-orange-500"
            />
          </>
        )}
        {!initialData.password && (
          <>
            <label className="font-medium text-sm">Password</label>
            <input
              type="text"
              value={data.password}
              name="password"
              onChange={handleOnChange}
              className="border p-2 rounded focus:outline-orange-500"
            />
          </>
        )}

        <div className="flex gap-3 items-center">
          {" "}
          <label className="font-medium text-sm">Is Admin</label>
          <input
            type="checkbox"
            name="isAdmin"
            className="border rounded focus:outline-orange-500"
            checked={data.isAdmin}
            onChange={handleOnChange}
          />
        </div>
      </div>

      {/*create data button */}
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold p-2 mt-2 rounded"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

UserForm.propTypes = {
  onSubmitFn: PropTypes.func,
  isSubmitting: PropTypes.bool,
  initialData: PropTypes.object,
};

export default UserForm;
