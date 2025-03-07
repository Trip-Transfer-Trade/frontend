import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const fetchAssets = createAsyncThunk("assets/fetchAssets", async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/assets");
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
        { id: 1, name: "SOL 미국 S&P500", code: "433330", price: 15212, currentPrice: 21324, quantity: 50 },
        { id: 2, name: "TSLA 테슬라", code: "TSLA", price: 780000, currentPrice: 940000, quantity: 10 },
        { id: 3, name: "AAPL 애플", code: "AAPL", price: 150000, currentPrice: 180000, quantity: 20 },
        { id: 4, name: "NVDA 엔비디아", code: "NVDA", price: 500000, currentPrice: 620000, quantity: 5 },
        { id: 5, name: "MSFT 마이크로소프트", code: "MSFT", price: 310000, currentPrice: 355000, quantity: 7 },
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
  