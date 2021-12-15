import { createSlice } from "@reduxjs/toolkit";

interface ICounter {
  count: number;
  openDrawer: boolean;
  // priceType: string;
  isVnPrice: boolean;
  paymentMethod: string;
  // cart: [];
  // totalItemsInCart: number;
  // totalPriceInCart: number;
}

const initialState: ICounter = {
  count: 20,
  openDrawer: false,
  // priceType: "vn",
  isVnPrice: true,
  paymentMethod: "BANKING",
  // cart: [],
  // totalItemsInCart: 0,
  // totalPriceInCart: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // updateCart: (state, { payload }) => {
    //   state.cart = payload;
    // },
    // emptyCart: (state) => {
    //   state.cart = [];
    //   state.totalItemsInCart = 0;
    //   state.totalPriceInCart = 0;
    // },
    // updateTotalItems: (state, { payload }) => {
    //   state.totalItemsInCart = payload;
    // },
    // updateTotalPrice: (state, { payload }) => {
    //   state.totalPriceInCart = payload;
    // },
    increase: (state) => {
      state.count++;
    },
    decrease: (state) => {
      state.count--;
    },
    setOpenDrawer: (state, { payload }) => {
      state.openDrawer = payload;
    },
    setIsVnPrice: (state, { payload }) => {
      state.isVnPrice = payload;
      localStorage.setItem("priceType", payload ? "vn" : "us");
    },
    setPaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload;
    },
  },
});

export const {
  increase,
  decrease,
  setOpenDrawer,
  setIsVnPrice,
  setPaymentMethod,
  // updateCart,
  // emptyCart,
  // updateTotalItems,
  // updateTotalPrice,
} = counterSlice.actions;

export default counterSlice.reducer;
