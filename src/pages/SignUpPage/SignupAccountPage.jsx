import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Redux 관련
import { useDispatch, useSelector } from "react-redux";
import { setAccountData, submitSignup } from "../../redux/store";

import BackNavigation from "../../components/BackNavigation";
import NextConfirmButton from "../../components/NextConfirmButton";

export default function SignupAccountPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 이미 입력된 프로필/전화번호 데이터를 확인
  // 👉 birth → birth_date, phone → phone_number, id → user_name 로 변경
  const { name, gender, birth_date, phone_number, loading, error, success } = useSelector(
    (state) => state.signup
  );

  // 로컬 상태: user_name, password
  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
    passwordConfirm: "",
  });

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  // 비밀번호 일치 여부
  const isPasswordMatch =
    formData.password && formData.password === formData.passwordConfirm;

  function next() {
    // 1) 아이디(user_name), 비밀번호 저장
    dispatch(
      setAccountData({
        user_name: formData.user_name,
        password: formData.password,
      })
    );

    // 2) 백엔드 최종 전송 (Redux Thunk 예시)
    //    서버에 보낼 전체 데이터: name, gender, birth_date, phone_number, user_name, password
    dispatch(
      submitSignup({
        name,
        gender,
        birth_date,
        phone_number,
        user_name: formData.user_name,
        password: formData.password,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        // 성공하면 완료 페이지로 이동
        navigate("/auth/signup/complete");
      }
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <BackNavigation />
      <div className="flex-grow w-full mx-auto p-6">
        <h2 className="text-xl font-bold">회원정보를 입력해주세요.</h2>

        <div className="mt-8 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">아이디</label>
            <input
              type="text"
              name="user_name"            // 변경: id → user_name
              placeholder="아이디 입력"
              value={formData.user_name}  // 변경
              onChange={handleChange}
              className="input-style"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">비밀번호</label>
            <input
              type="password"
              name="password"
              placeholder="비밀번호 입력"
              value={formData.password}
              onChange={handleChange}
              className="input-style"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">비밀번호 확인</label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="비밀번호 입력"
              value={formData.passwordConfirm}
              onChange={handleChange}
              className="input-style"
            />
          </div>

          {/* 에러 및 로딩 상태 표시 */}
          {loading && <p>회원가입 처리 중...</p>}
          {error && <p className="text-red-500">오류: {error}</p>}
        </div>
      </div>
      <div className="p-6">
        <NextConfirmButton
          text="완료"
          onClick={next}
          disabled={!isPasswordMatch}
        />
      </div>
    </div>
  );
}
