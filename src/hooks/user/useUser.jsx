import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosClient from "../../api/axiosClient";

export const useUsers = () => {
  return useQuery(
    "users",
    async () => {
      const response = await axiosClient.get(`/users`);
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

export const useUser = (id) => {
  return useQuery(
    ["user", id],
    async () => {
      const response = await axiosClient.get(`/users/${id}`);
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

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (newUser) => {
      const response = await axiosClient.post("/users", newUser);
      console.log("user result:", response.data);
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the users query to ensure fresh data
        queryClient.invalidateQueries("users");
      },
    }
  );
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (user) => {
      const response = await axiosClient.put(`/users/${user._id}`, user);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (userId) => {
      const response = await axiosClient.delete(`/users/${userId}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
};
