import { createSlice } from "@reduxjs/toolkit";

interface ICounter {
  count: number;
  // cart: [];
  // totalItemsInCart: number;
  // totalPriceInCart: number;
}

const initialState: ICounter = {
  count: 20,
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
  },
});

export const {
  increase,
  decrease,
  // updateCart,
  // emptyCart,
  // updateTotalItems,
  // updateTotalPrice,
} = counterSlice.actions;

export default counterSlice.reducer;
