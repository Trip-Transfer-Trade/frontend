import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTripGoals } from "../../redux/tripSlice";
import { CheckCircle } from "lucide-react";
import TripList from "./TripList";

export default function TransferPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tripGoals, status } = useSelector((state) => state.trip);

  const [searchParams] = useSearchParams();
  const initialTripId = searchParams.get("trip");
  const [selectedTripId, setSelectedTripId] = useState(initialTripId);

  const account = { accountNumber: "123-456-789", balance: 5000000 };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTripGoals());
    }
  }, [dispatch, status]);

  const handleConfirmSelection = () => {
    if (!selectedTripId) {
      alert("이체할 여행 목표를 선택하세요!");
      return;
    }
    navigate(`/trip/transfer/amount?trip=${selectedTripId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-5">
      <h1 className="text-xl font-bold mb-4">이체하기</h1>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">내 계좌</p>
            <p className="text-xs text-gray-500">{account.accountNumber}</p>
          </div>
          <p className="text-xl font-bold">{account.balance.toLocaleString()} 원</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-3">입금할 여행 목표를 선택하세요.</h3>
      {status === "loading" && <p>여행 목표 불러오는 중...</p>}
      {status === "failed" && <p>여행 목표를 불러오는데 실패했습니다.</p>}
      {tripGoals.length > 0 ? (
        <TripList tripGoals={tripGoals} selectedTripId={selectedTripId} setSelectedTripId={setSelectedTripId} />
      ) : (
        <p>여행 목표가 없습니다.</p>
      )}

      <button
        onClick={handleConfirmSelection}
        className={`w-full py-4 mt-6 rounded-lg text-white font-medium transition ${
          selectedTripId ? "bg-blue-600" : "bg-gray-300"
        }`}
        disabled={!selectedTripId}
      >
        확인
      </button>
    </div>
  );
}
