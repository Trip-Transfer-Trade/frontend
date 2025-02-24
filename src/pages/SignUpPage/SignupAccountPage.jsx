import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BackHeader from "../../layout/BackHeader";
import NextConfirmButton from "../../components/NextConfirmButton";

export default function SignupAccountPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
  });

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData, // 기존 데이터 유지
      [key]: value, // 해당 입력 필드 값 업데이트
    });
  }

  function next() {
    navigate("/auth/signup/complete");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <BackHeader />
      <div className="flex-grow w-full mx-auto p-6">
        <h2 className="text-xl font-bold">회원정보를 입력해주세요.</h2>

        <div className="mt-8 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">아이디</label>
            <input
              type="text"
              name="id"
              placeholder="아이디 입력"
              value={formData.id}
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
        </div>
      </div>
      <div className="p-6">
        <NextConfirmButton text="다음" onClick={next} />
      </div>
    </div>
  );
}
