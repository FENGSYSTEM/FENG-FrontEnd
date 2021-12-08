import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import productSlice from "./slices/api/productSlice";
import orderSlice from "./slices/api/orderSlice";
import eventSlice from "./slices/api/eventSlice";
import configContentSlice from "./slices/api/configContentSlice";

const rootReducer = combineReducers({
  counter,
  product: productSlice,
  order: orderSlice,
  event: eventSlice,
  config: configContentSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
