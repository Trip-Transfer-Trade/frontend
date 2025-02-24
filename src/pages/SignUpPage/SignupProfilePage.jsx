import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BackHeader from "../../layout/BackHeader";

export default function SignupProfilePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birth: "",
  });

  const isFormComplete = formData.name && formData.gender && formData.birth;

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [key]: value,
    });
  }

  function next() {
    navigate("/auth/signup/verification");
  }

  return (
    <div>
      <BackHeader />
      <div className="mx-auto p-6">
        <h2 className="text-xl font-bold">개인정보를 입력해주세요.</h2>

        <div className="mt-8 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">이름</label>
            <input
              type="text"
              name="name"
              placeholder="이름 입력"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-12 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">성별</label>
            <select
              name="gender"
              value={formData.value}
              onChange={handleChange}
              className="w-full h-12 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
            >
              <option value="">성별 선택</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">생일</label>
            <div className="relative">
              <input
                type="date"
                name="birth"
                value={formData.birth}
                onChange={handleChange}
                className="w-full h-12 px-3 bg-gray-50 rounded-lg border border-gray-200 appearance-none focus:outline-none focus:border-blue-500"
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></svg>
            </div>
          </div>

          <button
            onClick={next}
            disabled={!isFormComplete}
            className="w-full p-3 rounded-lg text-white font-bold bg-blue-500"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
