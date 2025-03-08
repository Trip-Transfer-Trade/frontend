import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../apis/apiClient";

export const submitTripGoal = createAsyncThunk("trip/submitTripGoal", async (tripData, thunkAPI) => {
  
  try {
    const response = await apiClient.post("/trips/goal", tripData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "여행 목표 저장 실패");
  }
});

export const fetchTripGoals = createAsyncThunk(
  "trip/fetchTripGoals",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get("/trips/all");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "여행 목표 조회 실패");
    }
  }
);

const tripSlice = createSlice({
  name: "trip",
  initialState: {
    name:"",
    country: "",
    goalAmount: null,
    endDate: null,
    tripGoals: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setName:(state, action)=>{
      state.name = action.payload;
    },
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
      .addCase(fetchTripGoals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTripGoals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tripGoals = action.payload;
      })
      .addCase(fetchTripGoals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(submitTripGoal.fulfilled, (state, action) => { 
        state.status = "succeeded";
        state.tripGoals = [...state.tripGoals, action.payload];
      })
      .addCase(submitTripGoal.rejected, (state, action) => { 
        state.error = action.payload; 
      });
  },
});

export const { setName, setCountry, setGoalAmount, setEndDate } = tripSlice.actions;
export default tripSlice.reducer;
