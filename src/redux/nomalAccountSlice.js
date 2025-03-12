import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../apis/apiClient";

//일반 계좌 조회
export const nomalAccount = createAsyncThunk(
    "trip/account/nomal",
    async (_, thunkAPI) => {
        try {
            const response = await apiClient.get("/exchanges/normalAccount/info?currencyCodes=KRW,USD");
            return response.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response?.data || "일반 계좌 조회 실패");
        }
    }
);

const accountSlice = createSlice({
    name: "nomalAccount",
    initialState: {
      status: "idle",
      account: { amountNumber: "", totalAmountInKRW: 0 },
      error: null
    },
    reducers: {
        setTotalAmountInKRW:(state, action)=>{
            state.totalAmountInKRW = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(nomalAccount.pending, (state) => {
                state.status = "loading";
            })
            .addCase(nomalAccount.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.account = action.payload || { amountNumber: "", totalAmountInKRW: 0 };
            })
            .addCase(nomalAccount.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            });
    },
});

export const { setTotalAmountInKRW } = accountSlice.actions;
export default accountSlice.reducer;