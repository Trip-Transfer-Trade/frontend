import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ArrowLeft, SkipBackIcon } from "lucide-react";

export default function EnterAmountPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tripId = searchParams.get("trip");

  const { tripGoals } = useSelector((state) => state.trip);

  const selectedTrip = tripGoals.find((trip) => trip.id == tripId);

  // 내 메인 계좌 (이체하는 계좌)
  const account = { accountNumber: "123-456-789", balance: 5000000 };

  const [amount, setAmount] = useState("");

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
        <p className="text-l font-medium mt-10 ml-4">{selectedTrip ? selectedTrip.name : "알 수 없음"}</p>
        <p className="text-xl font-bold ml-4">신한 123-456</p>
      </div>

      <div className="flex flex-col items-center mt-8">
        <p className="text-sm font-medium text-gray-400">이체할 금액을 입력하세요.</p>
      </div>

      <div className="flex flex-col items-center mt-6">
        <p className="text-3xl font-bold text-gray-600">{amount ? `${Number(amount).toLocaleString()} 원` : "0원"}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center mx-8 mt-35">
        <div>
          <p className="text-sm text-gray-500 font-">내 계좌 {account.accountNumber}</p>
        </div>
        <p className="font-bold text-gray-900">{account.balance.toLocaleString()} 원</p>
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
        <button className="bg-white p-5 flex items-center justify-center rounded-lg" onClick={handleBackspace}>
          <SkipBackIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
