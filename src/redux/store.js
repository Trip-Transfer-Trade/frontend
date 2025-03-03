// src/app/store.js
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 비동기 회원가입 액션 (마지막 단계에서 서버에 전송할 때 사용)
export const submitSignup = createAsyncThunk(
    'signup/submitSignup',
    async (signupData, thunkAPI) => {
      try {
        // ✅ 스네이크 케이스 -> 카멜케이스 변환
        const formattedData = {
          userName: signupData.user_name,
          password: signupData.password,
          name: signupData.name,
          gender: signupData.gender,
          birthDate: signupData.birth_date,       // ✅ 변경 (birth_date → birthDate)
          phoneNumber: signupData.phone_number,   // ✅ 변경 (phone_number → phoneNumber)
          riskTolerance: signupData.risk_tolerance
        };
  
        console.log("🚀 전송할 데이터:", formattedData); // 디버깅용
  
        const response = await axios.post('/api/auth/signup', formattedData);
        return response.data;
      } catch (error) {
        console.error("❌ 서버 응답 에러:", error.response?.data || error.message);
        return thunkAPI.rejectWithValue(error.response?.data || "회원가입 실패");
      }
    }
  );
  

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    // 변수명 변경: birth → birth_date, phone → phone_number, id → user_name
    name: '',
    gender: '',
    birth_date: '',
    phone_number: '',
    user_name: '',
    password: '',

    // 요청 상태/에러 관리를 위한 상태
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    // step1에서 사용하는 액션
    setProfileData(state, action) {
      const { name, gender, birth_date } = action.payload;
      state.name = name;
      state.gender = gender;
      state.birth_date = birth_date;
    },
    // step2에서 사용하는 액션
    setVerificationData(state, action) {
      const { phone_number } = action.payload;
      state.phone_number = phone_number;
    },
    // step3에서 사용하는 액션
    setAccountData(state, action) {
      const { user_name, password } = action.payload;
      state.user_name = user_name;
      state.password = password;
    },
    // 필요 시 전역에서 쓰는 리셋 액션
    resetSignupState(state) {
      state.name = '';
      state.gender = '';
      state.birth_date = '';
      state.phone_number = '';
      state.user_name = '';
      state.password = '';
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // 회원가입 비동기 요청 시작
      .addCase(submitSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      // 회원가입 비동기 요청 성공
      .addCase(submitSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // action.payload에 서버 응답이 들어있음
      })
      // 회원가입 비동기 요청 실패
      .addCase(submitSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '회원가입 실패';
      });
  }
});

export const {
  setProfileData,
  setVerificationData,
  setAccountData,
  resetSignupState
} = signupSlice.actions;

// 리듀서
const store = configureStore({
  reducer: {
    signup: signupSlice.reducer
  }
});

export default store;
