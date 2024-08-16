import { useQuery } from "react-query";
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

export const useProduct = (id) => {
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
      }
    }
  );
};
