import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCountry, setGoalAmount, setEndDate, submitTripGoal } from "../../../redux/tripSlice";
import { useNavigate } from "react-router-dom";
import CountrySelect from "./CountrySelect";
import TargetForm from "./TargetForm";
import MyTripGoalSet from "./MyTripGoalSet";
import NextConfirmButton from "../../../components/NextConfirmButton";
import BackNavigation from "../../../components/BackNavigation";

const steps = ["여행지 선택", "금액 및 기간 설정", "목표 설정 완료"];

export default function TripGoalFlow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tripData = useSelector((state) => state.trip);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ amount: "", date: "" });

  function handleCountrySelect(country) {
    dispatch(setCountry(country));
    setStep(step + 1);
  }

  function handleTargetChange(amount, date) {
    setFormData({ amount, date });
  }

  function handleNextStep() {
    if (step === 1) {
      if (!formData.amount || Number(formData.amount) <= 0) {
        alert("목표 금액을 입력해주세요!");
        return;
      }
      if (!formData.date) {
        alert("목표 날짜를 선택해주세요!");
        return;
      }
      dispatch(setGoalAmount(Number(formData.amount)));
      dispatch(setEndDate(formData.date));
    }
    setStep(step + 1);
  }

  function handlePrevStep() {
    if (step > 0) setStep(step - 1);
    else navigate(-1); // 이전 페이지로 이동
  }

  function handleConfirmGoal() {
    if (!tripData.country || !tripData.goalAmount || !tripData.endDate) {
      alert("모든 정보를 입력해주세요!");
      return;
    }

    dispatch(submitTripGoal(tripData))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("에러 발생:", err);
      });
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 🔹 단계별 네비게이션 추가 */}
      {step < 3 && <BackNavigation text={`여행 목표 - ${steps[step]}`} onBack={handlePrevStep} />}

      <div className="flex-grow w-full mx-auto p-6">
        {step === 0 && <CountrySelect onSelect={handleCountrySelect} />}
        {step === 1 && <TargetForm onChange={handleTargetChange} />}
        {step === 2 && <MyTripGoalSet />}
      </div>

      <div className="p-6">
        {step < 2 ? (
          <NextConfirmButton
            text="다음"
            onClick={handleNextStep}
            disabled={
              (step === 0 && !tripData.country) || 
              (step === 1 && (!formData.amount || !formData.date))
            }
          />
        ) : (
          <NextConfirmButton text="목표 설정 완료" onClick={handleConfirmGoal} />
        )}
      </div>
    </div>
  );
}
