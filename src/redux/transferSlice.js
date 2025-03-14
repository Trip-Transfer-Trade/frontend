import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../apis/apiClient";

export const submitTranfer = createAsyncThunk("transfer/submittransfer", async (transferData, thunkAPI) => {
    try {
      const response = await apiClient.post("/exchanges/transactions", transferData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "송금 실패");
    }
  });

  const transferSlice = createSlice({
    name: "transfer",
    initialState:{
        data: {
            accountId: null,
            amount: null,
            targetAccountNumber: "",
            description: "",
            currencyCode: ""
        },
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        setTransferData(state, action) {
            state.data = { ...state.data, ...action.payload};
        },
        resetTransferState(state){
            state.data = {
                accountId: "",
                amount: "",
                targetAccountNumber: "",
                description: "",
                currencyCode: "",
            };
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitTranfer.pending, (state) => {
                state.loading = true;
            })
            .addCase(submitTranfer.fulfilled, (state) => {
                    state.loading = false;
                    state.success = true;
            })
            .addCase(submitTranfer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
    },
  })
 ;
 
 export const { setTransferData, resetTransferState } = transferSlice.actions;
 export default transferSlice.reducer;