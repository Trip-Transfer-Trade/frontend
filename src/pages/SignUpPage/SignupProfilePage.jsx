import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProfileData } from "../../redux/store";

import BackNavigation from "../../components/BackNavigation";
import NextConfirmButton from "../../components/NextConfirmButton";

export default function SignupProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 필드명 변경: birth → birth_date
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birth_date: "",
  });

  const isFormComplete =
    formData.name && formData.gender && formData.birth_date;

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function next() {
    // Redux에 DB 컬럼명과 동일하게 전달
    dispatch(
      setProfileData({
        name: formData.name,
        gender: formData.gender,
        birth_date: formData.birth_date,
      })
    );
    navigate("/auth/signup/verification");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <BackNavigation />
      <div className="flex-grow w-full mx-auto p-6">
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
              className="input-style"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">성별</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input-style"
            >
              <option value="">성별 선택</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">생일</label>
            <input
              type="date"
              name="birth_date" // 여기로 변경
              value={formData.birth_date}
              onChange={handleChange}
              className="input-style"
            />
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
