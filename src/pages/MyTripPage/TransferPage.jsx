import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TripAll } from "../../redux/tripSlice";
import { nomalAccount } from "../../redux/nomalAccountSlice";
import TripList from "./TripList";
import BackNavigation from "../../components/BackNavigation";
import FormattedAccountNumber from "../../components/FormattedAccountNumber";


export default function TransferPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sourceId = searchParams.get("sourceId");
  const preSelectedDestId = searchParams.get("destId");

  const [activeTab, setActiveTab] = useState("KRW");
  
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
    const found = tripGoals.find(
        (t) => String(t.accountId) === String(sourceId) &&
        (activeTab === "KRW" ? t.amount !== undefined : t.amountUS !== undefined));
    if (found) {
      sourceAccount = { ...found, isAccount: false };
    }
  }

  const [destinationAccounts, setDestinationAccounts] = useState([]);

  useEffect(() => {
    if (!tripGoals || !account) return;

    const normalAcc = { ...account, isAccount: true };
    const trips = tripGoals
      .filter((t) => (activeTab === "KRW" ? t.amount !== undefined : t.amountUS !== undefined))
      .map((t) => ({ ...t, isAccount: false }));;
    const combined = [normalAcc, ...trips];
    const filtered = combined.filter((acc) => String(acc.accountId) !== String(sourceId));
    setDestinationAccounts(filtered);
  }, [tripGoals, account, sourceId, activeTab]);

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
      `/trip/transfer/amount?sourceId=${sourceId}&destId=${selectedDestId}&tripId=${tripIdParam}&currency=${activeTab}`
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col">
        <BackNavigation text="이체하기"/>
        <div className="flex flex-col min-h-screen bg-white px-5 pb-5">
          <div className="ml-auto w-[160px] h-8 bg-gray-100 rounded-lg p-1 mb-5 flex space-x-2">
            <button
              className={`flex-1 text-xs rounded-lg flex items-center justify-center transition-colors ${
                activeTab === "KRW" ? "bg-white shadow-sm" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("KRW")}
            >
              원화
            </button>
            <button
              className={`flex-1 text-xs rounded-lg flex items-center justify-center transition-colors ${
                activeTab === "USD" ? "bg-white shadow-sm" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("USD")}
            >
              달러
            </button>
          </div>
          {sourceAccount ? (
            <div className="bg-white shadow-sm rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{sourceAccount.isAccount ?  "💰" : "🌍"}</span>
                <div>
                  <p className="text-sm text-gray-700 font-semibold">{sourceAccount.isAccount ? "내 메인 계좌" : sourceAccount.name}</p>
                  <p className="text-xs text-gray-500"><FormattedAccountNumber accountNumber={sourceAccount.accountNumber ?? "000000000000"} /></p>
                </div>
              </div>

              {/* 우측: 잔액 */}
              <div className="text-right">
                <p className="text-lg font-bold">
                  {activeTab === "KRW"
                    ? `${sourceAccount.amount?.toLocaleString()}원`
                    : `$${sourceAccount.amountUS?.toLocaleString()}`}
                </p>
              </div>
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
              activeTab={activeTab}
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
      </div>
    </DndProvider>
  );
}
