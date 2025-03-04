import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSignupData, submitSignup } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import NextConfirmButton from "../../components/NextConfirmButton";
import BackNavigation from "../../components/BackNavigation";


const steps = ["Profile", "Verification", "Account", "Complete"];

export default function SignupFlow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupData = useSelector((state) => state.signup);

  const [step, setStep] = useState(0);
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

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function nextStep() {
    if (step === 2) {
      if (!formData.userName || !formData.password || formData.password !== formData.passwordConfirm) {
        alert("아이디와 비밀번호를 정확히 입력해주세요.");
        return;
      }

      const signupPayload = {
        userName: formData.userName,
        password: formData.password,
        name: formData.name,
        gender: formData.gender,
        birthDate: formData.birthDate,
        phoneNumber: formData.phoneNumber,
        riskTolerance: formData.riskTolerance,
      };

      dispatch(setSignupData(signupPayload));
      dispatch(submitSignup(signupPayload)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setStep(step + 1);
        }
      });
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
      {step < 3 && <BackNavigation text={`회원가입 - ${steps[step]}`} onBack={prevStep} />}

      <div className="flex-grow w-full mx-auto p-6">
        {step === 0 && (
          <>
            <InputField label="이름" name="name" value={formData.name} onChange={handleChange} />
            <InputField label="성별" name="gender" value={formData.gender} onChange={handleChange} type="select" options={["M", "F"]} />
            <InputField label="생년월일" name="birthDate" value={formData.birthDate} onChange={handleChange} type="date" />
          </>
        )}
        {step === 1 && (
          <>
            <InputField label="전화번호" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            <InputField label="인증번호" name="verificationCode" value={formData.verificationCode} onChange={handleChange} />
          </>
        )}
        {step === 2 && (
          <>
            <InputField label="아이디" name="userName" value={formData.userName} onChange={handleChange} />
            <InputField label="비밀번호" name="password" value={formData.password} onChange={handleChange} type="password" />
            <InputField label="비밀번호 확인" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} type="password" />
          </>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center flex-grow">
              <div className="p-6">
                <img src="/src/assets/images/complete.svg" alt="complete" />
              </div>
              <h2 className="text-xl font-bold">회원가입 완료</h2>
            </div>
            <div className="w-full max-w-sm p-6">
              <NextConfirmButton text="시작하기" onClick={() => navigate("/")} />
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        {step < 3 ? (
          <NextConfirmButton text={step === 2 ? "완료" : "다음"} onClick={nextStep} disabled={step === 2 && formData.password !== formData.passwordConfirm} />
        ) : null}
      </div>
    </div>
  );
}
