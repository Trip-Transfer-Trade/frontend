import { configureStore, createSlice } from "@reduxjs/toolkit";

import signupReducer from "./signupSlice";
import assetsReducer from "./assetsSlice";
import tripReducer from "./tripSlice";
import nomalAccountReducer from "./nomalAccountSlice";
import accountReducer from "./accountSlice";

// ✅ 이체 관련 transfer slice 추가
const transferSlice = createSlice({
  name: "transfer",
  initialState: {
    accountNumber: "",
    memo: "",
    amount: 0,
  },
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
    resetTransfer: () => ({
      accountNumber: "",
      memo: "",
      amount: 0,
    }),
  },
});

export const { setAccountNumber, setMemo, setAmount, resetTransfer } =
  transferSlice.actions;

// ✅ 최종 store 설정
export default configureStore({
  reducer: {
    signup: signupReducer,
    assets: assetsReducer,
    trip: tripReducer,
    nomalAccount: nomalAccountReducer,
    account: accountReducer,
    transfer: transferSlice.reducer,
  },
});
