import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const submitTripGoal = createAsyncThunk("trip/submitTripGoal", async (tripData, thunkAPI) => {
  
  try {
    const response = await axiosInstance.post("/trips/goal", tripData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "여행 목표 저장 실패");
  }
});
const tripSlice = createSlice({
  name: "trip",
  initialState: {
    country: "",
    goalAmount: null,
    endDate: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setGoalAmount: (state, action) => {
      state.goalAmount = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitTripGoal.fulfilled, (state) => { state.status = "succeeded"; })
      .addCase(submitTripGoal.rejected, (state, action) => { state.error = action.payload; });
  },
});

export const { setCountry, setGoalAmount, setEndDate } = tripSlice.actions;
export default tripSlice.reducer;
