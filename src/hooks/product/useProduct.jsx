import { useQuery } from "react-query";
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
