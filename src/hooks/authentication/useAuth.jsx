import axios from "axios";
import axiosClient from "../../api/axiosClient";
// import { getAuthHeaders } from "../../utils/authHeaders";
const apiUrl = import.meta.env.VITE_API_URL;

// login function
export const login = async (credentials) => {
  try {
    const response = await axiosClient.post("/login", {
      email: credentials.email,
      password: credentials.password,
    });

    return response.data;
  } catch (error) {
    console.log("Login error: ", error.response.data);

    return error.response.data;
  }
};

// logout function
export const logout = async () => {
  try {
    const response = await axiosClient.post("/logout");

    console.log("data: ", response.data);

    return response.data;
  } catch (error) {
    console.log("Logout error: ", error.response.data);

    return error.response.data;
  }
};

export const register = async (credentials) => {
  try {
    const response = await axiosClient.post("/register", {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    });

    return response.data;
  } catch (error) {
    console.log("Register error: ", error.response.data);

    return error.response.data;
  }
};

export const getUser = async (id) => {
  try {
    const response = await axiosClient.get(`/users/${id}`);

    return response.data;
  } catch (error) {
    console.log("error: ", error.response.data);

    return error.response.data;
  }
};

// refresh token function
export const refreshToken = async () => {
  const user = JSON.parse(localStorage.getItem("user")); // Adjust this line based on how you store your token
  const tokenType = "Bearer";
  console.log("old token: ", user.token);
  console.log("old refresh token: ", user.refresh_token);

  if (user && user.refresh_token) {
    try {
      const response = await axios.get(`${apiUrl}/refresh_token`, {
        headers: {
          Authorization: `${tokenType} ${user.refresh_token}`,
          "Content-Type": "application/json",
        },
      });

      const storedUser = localStorage.getItem("user");

      // Parse the data to a JavaScript object
      let userData = storedUser ? JSON.parse(storedUser) : {};

      if (response.data?.header?.statusCode === 200) {
        // Update the token and refresh_token properties
        userData.token = response.data.body.token;
        userData.refresh_token = response.data.body.refresh_token;

        console.log("new  token:", userData.token);
        console.log("new refresh token:", userData.refresh_token);

        // Convert the updated object back to a JSON string
        const updatedData = JSON.stringify(userData);

        // Save the updated JSON string back to localStorage
        localStorage.setItem("user", updatedData);
        localStorage.setItem("token", userData.token);
        return response.data;
      } else {
        console.log("Token expired", response.data);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        alert("Token expired, please login again");
        window.location.href = "/login";
        return response.data;
      }
    } catch (error) {
      console.log("Error refreshing token", error);
      return false;
    }
  } else {
    console.log("Not Logged In, no refresh token available");
    return false;
  }
};
