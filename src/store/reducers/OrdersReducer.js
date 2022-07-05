import { GET_EDITED_ORDERS, GET_ORDERS } from "../types";

const initialState = {
  orders: [],
  editedOrders: {},
  total: 0,
  commission: 0,
};

export const OrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      console.log(action.payload);
      return {
        ...state,
        total: action.payload.total,
        orders: action.payload.orders.data,
        commission: action.payload.commission,
      };

    case GET_EDITED_ORDERS:
      return {
        ...state,
        editedOrders: action.payload,
      };

    default:
      return state;
  }
};
