import { AxiosInstance } from "../../utils/AxiosInstance";
import { GET_EDITED_ORDERS, GET_ORDERS, UPDATE_ORDERS } from "../types";

export const getOrgers = (params) => async (dispatch) => {
  try {
    const { data } =
      params === undefined
        ? await AxiosInstance.get(`owner/orders/`)
        : await AxiosInstance.get(`owner/orders/${params}`);

    dispatch({
      type: GET_ORDERS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getEditedOrders = (id) => async (dispatch) => {
  try {
    const { data } = await AxiosInstance.get(`owner/orders/${id}`);
    dispatch({
      type: GET_EDITED_ORDERS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editOrders = (datas, id, type, ordersList) => async (dispatch) => {
  try {
    if (type === "notify") {
      const { data } = await AxiosInstance.put(`owner/orders/${id}`, datas);

      const dataIndex = ordersList.findIndex((item) => item.id == data.id);
      console.log(dataIndex);
      ordersList.splice(dataIndex, 1, data);

      dispatch({
        type: UPDATE_ORDERS,
        payload: dataIndex,
      });
    } else {
      const { data } = await AxiosInstance.post(`owner/orders/${id}`, datas);
      const dataIndex = ordersList.findIndex((item) => item.id == data.id);
      ordersList.splice(dataIndex, 1, data);

      dispatch({
        type: UPDATE_ORDERS,
        payload: dataIndex,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
