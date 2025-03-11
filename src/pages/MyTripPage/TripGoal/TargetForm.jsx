import { useState } from "react";

export default function TargetForm({ onChange }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  function handleAmountChange(e) {
    setAmount(e.target.value);
    onChange(e.target.value, date);
  }

  function handleDateChange(e) {
    setDate(e.target.value);
    onChange(amount, e.target.value);
  }

  return (
    <div className="p-4">
      <label className="block text-lg font-bold mb-2">목표 금액</label>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        className="w-full p-2 border rounded-lg"
        placeholder="금액 입력"
      />

      <label className="block text-lg font-bold mt-4 mb-2">목표 기간</label>
      <input 
        type="date" 
        value={date} 
        onChange={handleDateChange} 
        className="w-full p-2 border rounded-lg" 
      />
    </div>
  );
}
