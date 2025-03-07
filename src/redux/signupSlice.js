import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../apis/apiClient";

export const submitSignup = createAsyncThunk("signup/submitSignup", async (signupData, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/members/signup", signupData);
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
export default signupSlice.reducer;
