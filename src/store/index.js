import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { OrdersReducer } from "./reducers/OrdersReducer";
import { DeliveryReducer } from "./reducers/DeliveryReducer";

const rootReducer = combineReducers({
  OrdersReducer: OrdersReducer,
  DeliveryReducer: DeliveryReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
