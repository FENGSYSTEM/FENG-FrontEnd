import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "src/utils/constant/api";

export const getProductBySubCategory = createAsyncThunk(
  "getProductBySubCategory",
  async (id: any) => {
    console.log(id);
    const res = await axios.get(`${API_ENDPOINT}/products`, {
      params: {
        subCategoryId: id,
      },
    });
    console.log(res.data);
    return res.data;
  }
);

const initialState = {
  listProduct: [],
  listProductLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * @getProductBySubCategory
     */
    builder.addCase(getProductBySubCategory.pending, (state) => {
      state.listProductLoading = true;
    });
    builder.addCase(getProductBySubCategory.fulfilled, (state, { payload }) => {
      state.listProductLoading = false;
      state.listProduct = payload;
    });
    builder.addCase(getProductBySubCategory.rejected, (state) => {
      state.listProductLoading = false;
    });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
