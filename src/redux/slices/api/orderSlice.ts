import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { API_ENDPOINT } from "src/utils/constant/api";

export const createOrder = createAsyncThunk(
  "createOrder",
  async (data: any) => {
    const res = await axios.post(`${API_ENDPOINT}/orders`, data);
    console.log(res.data);
    return res.data;
  }
);

const initialState = {
  createOrderLoading: false,
  showPopupOrder: false,
  cart: [],
  totalItemsInCart: 0,
  totalPriceInCart: 0,
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    updateCart: (state, { payload }) => {
      state.cart = payload;
    },
    emptyCart: (state) => {
      state.cart = [];
      state.totalItemsInCart = 0;
      state.totalPriceInCart = 0;
    },
    updateTotalItems: (state, { payload }) => {
      state.totalItemsInCart = payload;
    },
    updateTotalPrice: (state, { payload }) => {
      state.totalPriceInCart = payload;
    },
    setOpenPopupOrder: (state, { payload }) => {
      state.showPopupOrder = payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * @createOrder
     */
    builder.addCase(createOrder.pending, (state) => {
      state.createOrderLoading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, { payload }) => {
      message.success("Order created !");
      state.createOrderLoading = false;
      state.cart = [];
      state.totalItemsInCart = 0;
      state.totalPriceInCart = 0;
      state.showPopupOrder = true;
      localStorage.removeItem("cart");
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.createOrderLoading = false;
    });
  },
});

export const {
  updateCart,
  emptyCart,
  updateTotalItems,
  updateTotalPrice,
  setOpenPopupOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
