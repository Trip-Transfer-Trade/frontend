import { useState } from "react";

export default function TargetForm({ onChange }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  function handleNameChange(e){
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
    <div className="p-4">
      <label className="block text-lg font-bold mb-2">여행 이름</label>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        className="w-full p-2 border rounded-lg"
        placeholder="여행 이름 입력"
      />
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
