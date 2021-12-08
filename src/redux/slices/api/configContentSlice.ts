import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "src/utils/constant/api";

export const getConfigs = createAsyncThunk("getConfigs", async () => {
  const res = await axios.get(`${API_ENDPOINT}/configs`, {});
  console.log(res.data);
  return res.data;
});

const initialState = {
  getConfigsLoading: false,
  configsData: null,
};

const configContentSlice = createSlice({
  name: "configContentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * @getConfigs
     */
    builder.addCase(getConfigs.pending, (state) => {
      state.getConfigsLoading = true;
    });
    builder.addCase(getConfigs.fulfilled, (state, { payload }) => {
      state.getConfigsLoading = false;
      state.configsData = payload;
    });
    builder.addCase(getConfigs.rejected, (state) => {
      state.getConfigsLoading = false;
    });
  },
});

export const {} = configContentSlice.actions;
export default configContentSlice.reducer;
