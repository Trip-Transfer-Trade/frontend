import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setCountry,
  setGoalAmount,
  setEndDate,
  submitTripGoal,
  fetchTripGoals,
} from "../../../redux/tripSlice";
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
  const [formData, setFormData] = useState({ name: "", amount: "", date: "" });

  function handleCountrySelect(country) {
    dispatch(setCountry(country));
    setStep(step + 1);
  }

  function handleTargetChange(name, amount, date) {
    setFormData({ name, amount, date });
  }

  function handleNextStep() {
    if (step === 1) {
      if (!formData.name) {
        alert("여행 이름을 입력해주세요!");
        return;
      }
      if (!formData.amount || Number(formData.amount) <= 0) {
        alert("목표 금액을 입력해주세요!");
        return;
      }
      if (!formData.date) {
        alert("목표 날짜를 선택해주세요!");
        return;
      }
      dispatch(setName(formData.name));
      dispatch(setGoalAmount(Number(formData.amount)));
      dispatch(setEndDate(formData.date));
    }
    setStep(step + 1);
  }

  function handlePrevStep() {
    if (step > 0) setStep(step - 1);
    else navigate(-1);
  }

  function handleConfirmGoal() {
    if (
      !tripData.name ||
      !tripData.country ||
      !tripData.goalAmount ||
      !tripData.endDate
    ) {
      alert("모든 정보를 입력해주세요!");
      return;
    }

    dispatch(submitTripGoal(tripData))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(fetchTripGoals());
          navigate("/trip");
        }
      })
      .catch((err) => {
        console.error("에러 발생:", err);
      });
  }

  return (
    <div className="flex flex-col min-h-screen">
      {step < 3 && (
        <BackNavigation
          text={`목표 생성 - ${steps[step]}`}
          onBack={handlePrevStep}
        />
      )}

      <div className="flex-grow w-full mx-auto px-6">
        {step === 0 && <CountrySelect onSelect={handleCountrySelect} />}
        {step === 1 && <TargetForm onChange={handleTargetChange} />}
        {step === 2 && <MyTripGoalSet />}
      </div>

      <div className="px-6 py-16">
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
          <NextConfirmButton
            text="목표 설정 완료"
            onClick={handleConfirmGoal}
          />
        )}
      </div>
    </div>
  );
}
