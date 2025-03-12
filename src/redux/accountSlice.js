import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../apis/apiClient";

export const fetchAccountData = createAsyncThunk(
  "account/fetchAccountData",
  async ({ tripId, currency }, thunkAPI) => {
    try {
      const response = await apiClient.get(`/exchanges/detail/${tripId}/${currency}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "계좌 데이터를 불러오는 데 실패했습니다.");
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAccountData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAccountData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default accountSlice.reducer;
