import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { message } from "antd";
import axios from "axios";
import { API_ENDPOINT } from "src/utils/constant/api";

export const getEvent = createAsyncThunk("getEvent", async () => {
  const res = await axios.get(`${API_ENDPOINT}/events`, {});
  console.log(res.data);
  return res.data;
});

const initialState = {
  eventLoading: false,
  eventCreateLoading: false,
  eventDeleteLoading: false,
  eventData: null,
};

const eventSlice = createSlice({
  name: "eventSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * @getEvent
     */
    builder.addCase(getEvent.pending, (state) => {
      state.eventLoading = true;
    });
    builder.addCase(getEvent.fulfilled, (state, { payload }) => {
      state.eventLoading = false;
      state.eventData = payload;
    });
    builder.addCase(getEvent.rejected, (state) => {
      state.eventLoading = false;
    });
  },
});

export const {} = eventSlice.actions;
export default eventSlice.reducer;
