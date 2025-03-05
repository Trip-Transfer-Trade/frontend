import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDestination, setTargetAmount, setTargetDate, submitTripGoal } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import CountrySelect from "./CountrySelect2";
import TargetForm from "./TargetForm2";
import GoalConfirmation from "./MyTripGoalSet";

const steps = ["여행지 선택", "금액 및 기간 설정", "목표 설정 완료"];

export default function TripGoalSetup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tripData = useSelector((state) => state.trip);
  const [step, setStep] = useState(0);

  function handleDestinationSelect(country) {
    dispatch(setDestination(country));
    setStep(step + 1);
  }

  function handleTargetSubmit(amount, date) {
    dispatch(setTargetAmount(Number(amount)));
    dispatch(setTargetDate(date));
    setStep(step + 1);
  }

  function handleConfirmGoal() {
    dispatch(submitTripGoal(tripData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/portfolio");
      }
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4 text-lg font-bold text-center border-b">
        {steps[step]}
      </div>

      <div className="flex-grow w-full mx-auto p-6">
        {step === 0 && <CountrySelect onSelect={handleDestinationSelect} />}
        {step === 1 && <TargetForm onSubmit={handleTargetSubmit} />}
        {step === 2 && <GoalConfirmation tripData={tripData} onConfirm={handleConfirmGoal} />}
      </div>
    </div>
  );
}
