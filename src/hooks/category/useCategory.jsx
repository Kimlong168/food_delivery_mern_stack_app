import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosClient from "../../api/axiosClient";

export const useCategories = () => {
  return useQuery(
    "category",
    async () => {
      const response = await axiosClient.get(`/categories`);
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

export const useCategory = (id) => {
  return useQuery(
    ["category", id],
    async () => {
      const response = await axiosClient.get(`/categories/${id}`);
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

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (category) => {
      const formData = new FormData();

      formData.append("name", category.name);
      formData.append("description", category.description);
      formData.append("image", category.image);

      const response = await axiosClient.post(`/categories`, formData);  

      console.log("category result:", response.data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
      },
    }
  );
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (category) => {
      const formData = new FormData();

      formData.append("name", category.name);
      formData.append("description", category.description);
      formData.append("image", category.image);

      const response = await axiosClient.put(
        `/categories/${category.id}`,
        formData
      );

      console.log("category result:", response.data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
      },
    }
  );
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (categoryId) => {
      const response = await axiosClient.delete(`/categories/${categoryId}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
      },
    }
  );
};
