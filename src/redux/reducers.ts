import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import productSlice from "./slices/api/productSlice";

const rootReducer = combineReducers({ counter, product: productSlice });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
