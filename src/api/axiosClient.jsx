import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL: apiUrl,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    const { data } = response;
    console.log("response", data);
    return response;
  },
  (error) => {
    console.log("error: ", error.response);

    return error.response;
  }
);

export default axiosClient;
