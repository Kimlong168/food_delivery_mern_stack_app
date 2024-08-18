import { useState } from "react";

import { notify } from "../../../../utils/toastify";
import PropTypes from "prop-types";

const ProductForm = ({
  onSubmitFn,
  isSubmitting,
  categories,
  initialData = {},
}) => {
  const [data, setData] = useState({
    name: initialData.name || "",
    image: initialData.image || "",
    price: initialData.price || "",
    category: initialData.category?._id || "",
    description: initialData.description || "",
  });

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: e.target.type === "file" ? files[0] : value, // Handle file input and text input
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !data.name ||
      !data.price ||
      !data.category ||
      (!initialData.image && !data.image)
    ) {
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

        <label className="font-medium text-sm">Image</label>
        <input
          type="file"
          name="image"
          onChange={handleOnChange}
          className="border p-2 rounded focus:outline-orange-500"
        />

        <label className="font-medium text-sm">Price</label>
        <input
          type="number"
          value={data.price}
          min={0}
          step="0.01"
          name="price"
          onChange={handleOnChange}
          className="border p-2 rounded focus:outline-orange-500"
        />

        <label className="font-medium text-sm">Category</label>
        <select
          className="border p-2 rounded focus:outline-orange-500"
          name="category"
          value={data.category}
          onChange={handleOnChange}
        >
          <option value="" className="text-gray-400">
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <label className="font-medium text-sm">Description</label>
        <textarea
          name="description"
          value={data.description}
          onChange={handleOnChange}
          className="border p-2 rounded focus:outline-orange-500"
        />
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

ProductForm.propTypes = {
  onSubmitFn: PropTypes.func,
  isSubmitting: PropTypes.bool,
  categories: PropTypes.array,
  initialData: PropTypes.object,
};

export default ProductForm;
