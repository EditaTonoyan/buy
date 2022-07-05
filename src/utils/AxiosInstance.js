import axios from "axios";

export const AxiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:8000/api/",
  baseURL: "http://192.168.0.60:8000/api/",
});
AxiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      config.headers.authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
