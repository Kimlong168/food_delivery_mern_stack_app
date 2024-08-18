import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosClient from "../../api/axiosClient";

export const useProducts = () => {
  return useQuery(
    "product",
    async () => {
      const response = await axiosClient.get(`/products`);
      console.log("response result:", response.data);
      return response.data;
    },
    {
      select: (response) => {
        const formatedData = response.data;
        return formatedData;
      },
    }
  );
};

export const useProduct = (id) => {
  return useQuery(
    ["product", id],
    async () => {
      const response = await axiosClient.get(`/products/${id}`);
      return response.data;
    },
    {
      select: (response) => {
        const formatedData = response.data;
        return formatedData;
      },
    }
  );
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (product) => {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("image", product.image);

      const response = await axiosClient.post(`/products`, formData);

      console.log("product result:", response.data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("product");
      },
    }
  );
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (product) => {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("image", product.image);

      const response = await axiosClient.put(
        `/products/${product.id}`,
        formData
      );

      console.log("product result:", response.data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("product");
      },
    }
  );
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (productId) => {
      const response = await axiosClient.delete(`/products/${productId}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );
};
