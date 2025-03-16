import { useState } from "react";
import InputField from "../../../components/InputField";

export default function TargetForm({ onChange }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
    onChange(e.target.value, amount, date);
  }

  function handleAmountChange(e) {
    setAmount(e.target.value);
    onChange(name, e.target.value, date);
  }

  function handleDateChange(e) {
    setDate(e.target.value);
    onChange(name, amount, e.target.value);
  }

  return (
    <div className="space-y-6">
      <InputField
        label="여행 이름"
        value={name}
        onChange={handleNameChange}
        placeholder="여행 이름 입력"
      />
      <InputField
        label="목표 금액"
        type="number"
        value={amount}
        onChange={handleAmountChange}
        placeholder="금액 입력"
      />
      <InputField
        label="목표 기간"
        type="date"
        value={date}
        onChange={handleDateChange}
      />
    </div>
  );
}
