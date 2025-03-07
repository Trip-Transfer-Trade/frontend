import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountNumber: "",
  memo: "",
  amount: 0,
};

const transfer = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    setAccountNumber: (state, action) => {
      state.accountNumber = action.payload;
    },
    setMemo: (state, action) => {
      state.memo = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    resetTransfer: () => initialState,
  },
});

export const { setAccountNumber, setMemo, setAmount, resetTransfer } =
  transfer.actions;
export default transfer.reducer;
