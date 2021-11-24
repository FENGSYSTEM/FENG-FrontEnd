import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import productSlice from "./slices/api/productSlice";
import orderSlice from "./slices/api/orderSlice";

const rootReducer = combineReducers({
  counter,
  product: productSlice,
  order: orderSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
