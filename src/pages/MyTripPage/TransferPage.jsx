import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TripAll } from "../../redux/tripSlice";
import TripList from "./TripList";
import { TbHandClick } from "react-icons/tb";

export default function TransferPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tripGoals, status } = useSelector((state) => state.trip);
  const account = useSelector((state) => state.nomalAccount.account);

  const [searchParams] = useSearchParams();

  const initialTripId = searchParams.get("trip");
  const [selectedTripId, setSelectedTripId] = useState(initialTripId);



  useEffect(() => {
    if (status === "idle") {
      dispatch(TripAll());
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
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col min-h-screen bg-white p-5">
        <h1 className="text-xl font-bold mb-4">이체하기</h1>
        <div className="bg-white rounded-xl py-5 px-6 shadow-lg flex flex-col relative">
          <div className="flex items-center justify-between ">
              <div className="flex items-center gap-3">
              <img src="/assets/images/trip/ShinhanIcon.svg" alt="로그인" className="w-8 h-8" />
              <div>
                  <p className="text-sm font-medium text-black">내 메인 계좌</p>
                  <p className="text-xs text-gray-500">{account.accountNumber}</p>
              </div>
              </div>
              <TbHandClick className="text-xl text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
        </div>
        <h3 className="text-lg font-semibold items-center my-10">입금할 여행 목표를 선택하세요.</h3>
        <p className="text-gray-700 mb-4">
          여행 계좌 {tripGoals.length}
        </p>
        {status === "loading" && <p>여행 목표 불러오는 중...</p>}
        {status === "failed" && <p>여행 목표를 불러오는데 실패했습니다.</p>}
        {tripGoals.length > 0 ? (
          <TripList tripGoals={tripGoals}  account selectedTripId={selectedTripId} setSelectedTripId={setSelectedTripId} />
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
    </DndProvider>
  );
}
