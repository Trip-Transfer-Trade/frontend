import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setVerificationData } from "../../redux/store";

import BackNavigation from "../../components/BackNavigation";
import NextConfirmButton from "../../components/NextConfirmButton";

export default function SignupVerificationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    carrier: "",
    phone_number: "",        // <== 이름 변경 (phone → phone_number)
    verificationCode: "",
  });

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function next() {
    // 인증로직 등을 수행 후 Redux에 저장
    dispatch(setVerificationData({ phone_number: formData.phone_number }));
    navigate("/auth/signup/account");
  }

  const isFormComplete =
    formData.carrier && formData.phone_number && formData.verificationCode;

  return (
    <div className="flex flex-col min-h-screen">
      <BackNavigation />
      <div className="flex-grow w-full mx-auto p-6">
        <h2 className="text-xl font-bold">본인 인증을 진행해주세요.</h2>

        <div className="mt-8 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">통신사</label>
            <select
              name="carrier"
              value={formData.carrier}
              onChange={handleChange}
              className="input-style"
            >
              <option value="">통신사 선택</option>
              <option value="SKT">SKT</option>
              <option value="KT">KT</option>
              <option value="LG U+">LG U+</option>
              <option value="알뜰폰">알뜰폰</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">전화번호</label>
            <input
              type="input"
              name="phone_number"
              placeholder="전화번호 입력"
              value={formData.phone_number}  // <== 변경
              onChange={handleChange}
              className="input-style"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">인증번호</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="verificationCode"
                placeholder="인증번호 입력"
                value={formData.verificationCode}
                onChange={handleChange}
                className="input-style flex-1"
              />
              <button
                className={`p-2 rounded-lg text-white font-bold ${
                  formData.phone_number
                    ? "bg-gray-500"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!formData.phone_number}
              >
                인증 요청
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <NextConfirmButton
          text="다음"
          onClick={next}
          disabled={!isFormComplete}
        />
      </div>
    </div>
  );
}
