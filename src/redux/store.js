import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const submitSignup = createAsyncThunk("signup/submitSignup", async (signupData, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/auth/signup", signupData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "회원가입 실패");
  }
});

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    data: {
      userName: "",
      password: "",
      name: "",
      gender: "",
      birthDate: "",
      phoneNumber: "",
      riskTolerance: "LOW",
    },
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    setSignupData(state, action) {
      state.data = { ...state.data, ...action.payload };
    },
    resetSignupState(state) {
      state.data = {
        userName: "",
        password: "",
        name: "",
        gender: "",
        birthDate: "",
        phoneNumber: "",
        riskTolerance: "LOW",
      };
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitSignup.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setSignupData, resetSignupState } = signupSlice.actions;



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
        state.assets = action.payload; // API 데이터가 들어오면 업데이트됨
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setAssets } = assetsSlice.actions;



const tripSlice = createSlice({
  name: "trip",
  initialState: {
    destination: "미국",
    targetAmount: 1000000,
    targetDate: "2025년 6월 1일",
  },
  reducers: {
    updateDestination: (state, action) => {
      state.destination = action.payload;
    },
    updateTargetAmount: (state, action) => {
      state.targetAmount = action.payload;
    },
    updateTargetDate: (state, action) => {
      state.targetDate = action.payload;
    },
  },
});

export const { updateDestination, updateTargetAmount, updateTargetDate } = tripSlice.actions;



export default configureStore({
  reducer: {
    signup: signupSlice.reducer,
    assets: assetsSlice.reducer,
    trip: tripSlice.reducer,
  },
});
