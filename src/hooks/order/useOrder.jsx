import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosClient from "../../api/axiosClient";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (newOrder) => {
      const response = await axiosClient.post("/orders", newOrder);
      console.log("order result:", response.data);
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the orders query to ensure fresh data
        queryClient.invalidateQueries("orders");
      },
    }
  );
};

export const useOrders = () => {
  return useQuery(
    "orders",
    async () => {
      const response = await axiosClient.get(`/orders`);
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
