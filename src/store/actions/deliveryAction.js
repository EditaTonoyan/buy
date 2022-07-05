import { Action } from "history";
import { AxiosInstance } from "../../utils/AxiosInstance";
import { GET_DELIVERY } from "../types";

export const getDelivery = () => (dispatch) => {
  try {
    const { data } = AxiosInstance.get("/owner/delivery");
    dispatch({
      type: GET_DELIVERY,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
