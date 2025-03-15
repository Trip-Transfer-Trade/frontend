import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../apis/apiClient";

export const fetchExchangeRate = createAsyncThunk(
  "exchange/fetchExchangeRate",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get("/exchanges/rate/us");
      return parseFloat(response.data.rate);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "환율 데이터를 불러오는 데 실패했습니다.");
    }
  }
);

export const submitExchange = createAsyncThunk("exchange/submitExchange", async (payload, { rejectWithValue }) => {
  try {
    const response = await apiClient.post("/api/exchange", payload);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
const exchangeSlice = createSlice({
  name: "exchange",
  initialState: {
    rate: 1,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rate = action.payload;
      })
      .addCase(fetchExchangeRate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(submitExchange.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitExchange.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(submitExchange.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default exchangeSlice.reducer;
