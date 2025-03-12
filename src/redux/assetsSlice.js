import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../apis/apiClient";

export const fetchAssets = createAsyncThunk( "assets/fetchAssets",
  async ({ tripId, country }, thunkAPI) => {
    try {
      const response = await apiClient.get(`/exchanges/stocks/holding?tripId=${tripId}&country=${country}`);
      return response.data.data.stockHoldings;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "자산 데이터를 불러오는 데 실패했습니다.");
    }
  }
);

  
  const assetsSlice = createSlice({
    name: "assets",
    initialState: {
      id: "", 
      stockName: "", 
      stockCode: "", 
      avgPrice: "", 
      currencyPrice: "", 
      quantity: "",
      assets: [],
      status: "idle",
      error: null,
    },
    reducers: {
      setAssets(state, action) {
        state.assets = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAssets.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchAssets.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.assets = action.payload;
        })
        .addCase(fetchAssets.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
    },
  });
  export const { setAssets } = assetsSlice.actions;
  export default assetsSlice.reducer;
  