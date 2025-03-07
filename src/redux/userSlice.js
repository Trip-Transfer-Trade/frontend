import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const fetchUser = createAsyncThunk("user/fetchUser", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("/auth/detail"); //변경 가능 - 아직 api 없음ㅜ
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "사용자 정보 가져오기 실패");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    info: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.info = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
