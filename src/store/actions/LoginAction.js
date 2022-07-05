import { Login } from "@mui/icons-material";
import { AxiosInstance } from "../../utils/AxiosInstance";

export const setToken = async (params, navigate) => {
  try {
    const { data } = await AxiosInstance.post(`login`, params);
    const { token } = data.data;

    localStorage.setItem("token", token);
    navigate("/buy-for-me");
  } catch (error) {
    console.log(error);
  }
};
