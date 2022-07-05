import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  // baseURL: "http://192.168.0.60:8000/api/", // local from another server
  // baseURL: "https://back.buyforme.ru/api/", // live server
  baseURL: "http://127.0.0.1:8000/api/", // my local server
});

api.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get("auth-token");
    if (authToken) {
      config.headers.authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
