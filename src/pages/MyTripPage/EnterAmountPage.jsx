import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SkipBackIcon } from "lucide-react";

export default function EnterAmountPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const sourceId = searchParams.get("sourceId");
  const sourceType = searchParams.get("sourceType");
  const destId = searchParams.get("destId");
  const destType = searchParams.get("destType");
  const tripId = searchParams.get("tripId");

  const [amount, setAmount] = useState("");
  const { tripGoals } = useSelector((state) => state.trip);
  const account = useSelector((state) => state.nomalAccount.account) || {};

  const selectedTrip = tripGoals.find((trip) => trip.tripId == tripId);

  const handleNumberPress = (num) => {
    if (amount.length < 10) {
      setAmount((prev) => prev + num);
    }
  };

  const handleBackspace = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const handleTransfer = () => {
    if (!amount) {
      alert("이체할 금액을 입력하세요!");
      return;
    }
    alert(`${amount}원이 여행 목표 "${selectedTrip?.name}"로 이체되었습니다.`);
    navigate("/trip");
  };



  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-col mt-4">
        <p className="text-l font-medium mt-10 ml-4">
          {selectedTrip ? selectedTrip.name : "알 수 없음"}
        </p>
      </div>

      <div className="flex flex-col items-center mt-8">
        <p className="text-sm font-medium text-gray-400">이체할 금액을 입력하세요.</p>
      </div>

      <div className="flex flex-col items-center mt-6">
        <p className="text-3xl font-bold text-gray-600">
          {amount ? `${Number(amount).toLocaleString()} 원` : "0원"}
        </p>
      </div>
      {/* 출발 계좌 정보 */}
      <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center mx-8 mt-5">
        <div>
          <p className="text-sm text-gray-500">출발 계좌 {sourceId}</p>
        </div>
      </div>
      {/* 도착 계좌 정보 (여행 계좌) */}
      <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center mx-8 mt-3">
        <div>
          <p className="text-sm text-gray-500">도착 계좌 {destId}</p>
          <p className="text-sm font-medium text-gray-600">{selectedTrip ? selectedTrip.name : "알 수 없음"}</p>
        </div>
      </div>

      <div className="p-6 mt-auto px-0">
        <button
          onClick={handleTransfer}
          className={`w-full py-3 text-white font-medium transition ${
            amount ? "bg-blue-600" : "bg-gray-300"
          }`}
          disabled={!amount}
        >
          확인
        </button>
      </div>

      <div className="grid grid-cols-3 gap-px p-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0].map((num, index) => (
          <button
            key={index}
            className="bg-white p-5 text-center text-xl font-medium rounded-lg"
            onClick={() => handleNumberPress(num.toString())}
          >
            {num}
          </button>
        ))}
        <button
          className="bg-white p-5 flex items-center justify-center rounded-lg"
          onClick={handleBackspace}
        >
          <SkipBackIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
