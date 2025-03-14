import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TripAll } from "../../redux/tripSlice";
import { nomalAccount } from "../../redux/nomalAccountSlice";
import TripList from "./TripList";


export default function TransferPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sourceId = searchParams.get("sourceId");
  const preSelectedDestId = searchParams.get("destId");

  const { tripGoals, status: tripStatus } = useSelector((state) => state.trip);
  const account = useSelector((state) => state.nomalAccount.account);
  const [selectedDestId, setSelectedDestId] = useState(null);

  useEffect(() => {
    dispatch(TripAll());
    dispatch(nomalAccount());
  }, [dispatch]);

  let sourceAccount = null;
  if (account && String(account.accountId) === String(sourceId)) {

    sourceAccount = { ...account, isAccount: true };
  } else {
    const found = tripGoals.find((t) => String(t.accountId) === String(sourceId));
    if (found) {

      sourceAccount = { ...found, isAccount: false };
    }
  }

  const [destinationAccounts, setDestinationAccounts] = useState([]);

  useEffect(() => {
    if (!tripGoals || !account) return;

    const normalAcc = { ...account, isAccount: true };
    const trips = tripGoals.map((t) => ({ ...t, isAccount: false }));
    const combined = [normalAcc, ...trips];
    const filtered = combined.filter((acc) => String(acc.accountId) !== String(sourceId));
    setDestinationAccounts(filtered);
  }, [tripGoals, account, sourceId]);

  useEffect(() => {
    if (destinationAccounts.length > 0 && preSelectedDestId) {
      const selected = destinationAccounts.find(
        (acc) =>
          String(acc.accountId) === String(preSelectedDestId) ||
          (!acc.isAccount && String(acc.tripId) === String(preSelectedDestId))
      );
      if (selected) {
        setSelectedDestId(selected.accountId);
      }
    }
  }, [destinationAccounts, preSelectedDestId]);

  const handleConfirm = () => {
    if (!selectedDestId) return;
    const selectedDestAccount = destinationAccounts.find(
      (acc) => String(acc.accountId) === String(selectedDestId)
    );
    const tripIdParam = selectedDestAccount && !selectedDestAccount.isAccount
      ? selectedDestAccount.tripId
      : "";
    navigate(
      `/trip/transfer/amount?sourceId=${sourceId}&destId=${selectedDestId}&tripId=${tripIdParam}`
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col min-h-screen bg-white p-5">
        <h1 className="text-xl font-bold mb-4">이체하기</h1>

        {sourceAccount ? (
          <div className="bg-gray-100 p-4 rounded-xl mb-4">
            <p className="text-sm text-gray-500">출발 계좌</p>
            <p className="text-lg font-bold">
              {sourceAccount.isAccount
                ? sourceAccount.amountNumber
                : sourceAccount.accountNumber}
            </p>
            <p className="text-md">
              {sourceAccount.totalAmountInKRW?.toLocaleString()}원
            </p>
            <p className="text-sm text-gray-600">
              {sourceAccount.isAccount ? "일반계좌" : sourceAccount.name}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">출발 계좌 정보를 찾을 수 없습니다.</p>
        )}

        <h3 className="text-lg font-semibold items-center my-10">입금할 계좌를 선택하세요.</h3>
        <p className="text-gray-700 mb-4">
          도착 계좌 {destinationAccounts.length}
        </p>
        {destinationAccounts.length > 0 ? (
          <TripList
            tripGoals={destinationAccounts}
            selectedTripId={selectedDestId}
            setSelectedTripId={setSelectedDestId}
          />
        ) : (
          <p>이체할 수 있는 계좌가 없습니다.</p>
        )}
        <button
          onClick={handleConfirm}
          className={`w-full py-4 mt-6 rounded-lg text-white font-medium transition ${
            selectedDestId ? "bg-blue-600" : "bg-gray-300"
          }`}
          disabled={!selectedDestId}
        >
          확인
        </button>
      </div>
    </DndProvider>
  );
}
