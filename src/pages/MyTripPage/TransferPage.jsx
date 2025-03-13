import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TripAll } from "../../redux/tripSlice";
import TripList from "./TripList";


export default function TransferPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tripGoals, status } = useSelector((state) => state.trip);
  const account = useSelector((state) => state.nomalAccount.account);
  const [searchParams] = useSearchParams();

  const sourceId = searchParams.get("sourceId");
  const sourceType = searchParams.get("sourceType");
  const destId = searchParams.get("destId");
  const destType = searchParams.get("destType");
  const tripId = searchParams.get("tripId");

  useEffect(() => {
    dispatch(TripAll());
  }, [dispatch]);

  const tripListWithAccount = [
    {
      tripId: account.amountNumber,
      name: "내 일반 계좌",
      goalAmount: account.totalAmountInKRW,
      isAccount: true,
    },
    ...tripGoals.map(trip => ({ ...trip, isAccount: false })),
  ];

  const initialSelectedTripId = destType === "account" ? account.amountNumber : destId;
  const [selectedTripId, setSelectedTripId] = useState(initialSelectedTripId);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col min-h-screen bg-white p-5">
        <h1 className="text-xl font-bold mb-4">이체하기</h1>

        {sourceId && (
          <div className="bg-gray-100 p-4 rounded-xl mb-4">
            <p className="text-sm text-gray-500">출발 계좌</p>
            <p className="text-lg font-bold">{sourceId}</p>
          </div>
        )}

        <h3 className="text-lg font-semibold items-center my-10">입금할 계좌를 선택하세요.</h3>
        <p className="text-gray-700 mb-4">
          도착 계좌 {tripListWithAccount.length}
        </p>
        {tripListWithAccount.length > 0 ? (
          <TripList
            tripGoals={tripListWithAccount}
            selectedTripId={selectedTripId}
            setSelectedTripId={setSelectedTripId}
          />
        ) : (
          <p>이체할 수 있는 계좌가 없습니다.</p>
        )}

        <button
          onClick={() =>
            navigate(
              `/trip/transfer/amount?sourceId=${sourceId}&sourceType=${sourceType}&destId=${selectedTripId}&destType=trip&tripId=${tripId}`
            )
          }
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
