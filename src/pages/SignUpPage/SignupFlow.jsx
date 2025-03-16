import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSignupData, submitSignup } from "../../redux/signupSlice";
import { useNavigate } from "react-router-dom";

import { sendSms, checkCode } from "../../apis/users";

import InputField from "../../components/InputField";
import NextConfirmButton from "../../components/NextConfirmButton";
import BackNavigation from "../../components/BackNavigation";

export default function SignupFlow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [isVerificationRequested, setIsVerificationRequested] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    passwordConfirm: "",
    name: "",
    gender: "",
    birthDate: "",
    phoneNumber: "",
    riskTolerance: "LOW",
  });

  async function handleRequestVerificationCode() {
    if (!formData.phoneNumber.trim()) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }
    try {
      await sendSms(formData.phoneNumber);
      setIsVerificationRequested(true);
    } catch {
      alert("인증 번호 요청에 실패했습니다.");
    }
  }

  async function handleCheckVerificationCode() {
    try {
      await checkCode({
        phoneNumber: formData.phoneNumber,
        code: formData.verificationCode,
      });
      setIsVerified(true);
      alert("인증이 완료되었습니다.");
    } catch {
      alert("인증 번호가 올바르지 않습니다.");
      setIsVerified(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validateStepInputs(step) {
    if (step === 0) {
      if (!formData.name.trim()) {
        alert("이름을 입력해주세요.");
        return false;
      }
      if (!formData.gender.trim()) {
        alert("성별을 선택해주세요.");
        return false;
      }
      if (!formData.birthDate.trim()) {
        alert("생년월일을 입력해주세요.");
        return false;
      }
    }

    if (step === 1) {
      if (!formData.phoneNumber.trim()) {
        alert("전화번호를 입력해주세요.");
        return false;
      }
      if (!isVerified) {
        alert("휴대폰 인증을 완료해주세요.");
        return false;
      }
    }

    if (step === 2) {
      if (!formData.userName.trim()) {
        alert("아이디를 입력해주세요.");
        return false;
      }
      if (!formData.password.trim()) {
        alert("비밀번호를 입력해주세요.");
        return false;
      }
      if (formData.password !== formData.passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
      }
    }
    return true;
  }

  async function nextStep() {
    // 현재 단계의 입력값이 유효한지 확인
    if (!validateStepInputs(step)) {
      return; // 입력값이 부족하면 진행 중단
    }

    if (step === 2) {
      const signupPayload = {
        userName: formData.userName,
        password: formData.password,
        name: formData.name,
        gender: formData.gender,
        birthDate: formData.birthDate,
        phoneNumber: formData.phoneNumber,
        riskTolerance: formData.riskTolerance,
      };

      try {
        const res = await dispatch(submitSignup(signupPayload)).unwrap(); // `unwrap()`을 사용하여 오류 발생 시 throw
        console.log("회원가입 성공:", res);
        setStep(step + 1); // 회원가입 성공 시 다음 단계로 이동
      } catch (error) {
        console.error("회원가입 실패:", error);
        alert(error?.message || "회원가입에 실패했습니다.");
        return; // 🚨 실패 시에는 진행 중단
      }
    } else {
      setStep(step + 1);
    }
  }

  function prevStep() {
    if (step > 0) setStep(step - 1);
    else navigate("/auth/login");
  }

  return (
    <div className="flex flex-col min-h-screen">
      {step < 3 && <BackNavigation text="회원가입" onBack={prevStep} />}

      <div className="flex-grow w-full mx-auto px-6">
        {step === 0 && (
          <div className="space-y-6">
            <InputField label="이름" name="name" value={formData.name} onChange={handleChange} />
            <InputField label="성별" name="gender" value={formData.gender} onChange={handleChange} type="select" options={["M", "F"]} />
            <InputField label="생년월일" name="birthDate" value={formData.birthDate} onChange={handleChange} type="date" />
          </div>
        )}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-end space-x-2">
              <InputField label="전화번호" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
              <button className="w-24 h-12 p-2 text-white text-sm font-medium rounded-md transition bg-brand-blue" type="button" onClick={handleRequestVerificationCode}>
                {isVerificationRequested ? "재요청" : "인증요청"}
              </button>
            </div>

            {isVerificationRequested && (
              <div className="flex items-end space-x-2">
                <InputField label="인증번호" name="verificationCode" value={formData.verificationCode} onChange={handleChange} />
                <button className="w-24 h-12 p-2 text-white text-sm font-medium rounded-md transition bg-brand-blue" onClick={handleCheckVerificationCode}>
                  인증하기
                </button>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <InputField label="아이디" name="userName" value={formData.userName} onChange={handleChange} />
            <InputField label="비밀번호" name="password" value={formData.password} onChange={handleChange} type="password" />
            <InputField label="비밀번호 확인" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} type="password" />
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center flex-grow">
              <div className="mb-4">
                <img src="/assets/images/complete.svg" alt="complete" />
              </div>
              <h2 className="text-xl font-bold">회원가입 완료</h2>
            </div>
            <div className="w-full px-6 pb-16">
              <NextConfirmButton text="시작하기" onClick={() => navigate("/auth/login")} />
            </div>
          </div>
        )}
      </div>

      <div className="px-6 pb-16">
        {step < 3 && <NextConfirmButton text={step === 2 ? "완료" : "다음"} onClick={nextStep} />}
      </div>
    </div>
  );
}
