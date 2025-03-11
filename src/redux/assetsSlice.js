import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../apis/apiClient";

export const fetchAssets = createAsyncThunk("assets/fetchAssets", async (_, thunkAPI) => {
    try {
      const response = await apiClient.get("/assets");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "자산 데이터를 불러오는 데 실패했습니다.");
    }
  });
  
  const assetsSlice = createSlice({
    name: "assets",
    //테스트를 위한 데이터 api 연결 시 삭제
    initialState: {
      assets: [
        { id: 1, name: "SOL", code: "433330", price: 15212, currentPrice: 21324, quantity: 50 },
        { id: 2, name: "TSLA", code: "TSLA", price: 780000, currentPrice: 940000, quantity: 10 },
        { id: 3, name: "AAPL", code: "AAPL", price: 150000, currentPrice: 180000, quantity: 20 },
        { id: 4, name: "NVDA", code: "NVDA", price: 500000, currentPrice: 620000, quantity: 5 },
        { id: 5, name: "MSFT", code: "MSFT", price: 310000, currentPrice: 355000, quantity: 7 },
        { id: 6, name: "SOXL", code: "SOXL", price: 210000, currentPrice: 255000, quantity: 3 },
        { id: 7, name: "QQQM", code: "QQQM", price: 110000, currentPrice: 155000, quantity: 2 },
        
        
      ],
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
  