import { GET_DELIVERY } from "../types";

const initialState = {
  delivery: [],
};

export const DeliveryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DELIVERY:
      return {
        ...state,
        delivery: action.payload,
      };

    default:
      return state;
  }
};
