import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SkipBackIcon } from "lucide-react";
import { submitTranfer, setTransferData } from "../../redux/transferSlice";
import BackNavigation from "../../components/BackNavigation";

export default function EnterAmountPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const sourceId = searchParams.get("sourceId");
  const destId = searchParams.get("destId");
  const tripId = searchParams.get("tripId");
  const initialCurrency = searchParams.get("currency") || "KRW";
  const [activeTab, setActiveTab] = useState(initialCurrency);

  const { tripGoals } = useSelector((state) => state.trip);
  const account = useSelector((state) => state.nomalAccount.account) || {};

  let sourceAccountInfo = null;
  if (account && String(account.accountId) === String(sourceId)) {
    sourceAccountInfo = { ...account, isAccount: true };
  } else {
    const found = tripGoals.find(
      (t) => String(t.accountId) === String(sourceId)
    );
    if (found) {
      sourceAccountInfo = { ...found, isAccount: false };
    }
  }

  let destinationAccountInfo = null;
  if (account && String(account.accountId) === String(destId)) {
    destinationAccountInfo = { ...account, isAccount: true };
  } else {
    const found = tripGoals.find(
      (t) => String(t.accountId) === String(destId)
    );
    if (found) {
      destinationAccountInfo = { ...found, isAccount: false };
    }
  }

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
    if (!sourceAccountInfo || !destinationAccountInfo) {
      alert("계좌 정보를 확인할 수 없습니다.");
      return;
    }

    const payload = {
      accountId: sourceAccountInfo.accountId,
      amount: Number(amount),
      targetAccountNumber: destinationAccountInfo.isAccount
        ? destinationAccountInfo.amountNumber
        : destinationAccountInfo.accountNumber,
      description: "",
      currencyCode: activeTab,
    };

    dispatch(submitTranfer(payload))
      .unwrap()
      .then(() => {
        alert(
          `${Number(amount).toLocaleString()} ${
            activeTab === "KRW" ? "원" : "$"
          }이(가) ${
            destinationAccountInfo.isAccount ? "내 일반 계좌" : destinationAccountInfo.name
          }로 이체되었습니다.`
        );
        navigate("/trip");
      })
      .catch((err) => {
        alert("이체 실패: " + err);
      });
    };

    const formattedSourceBalance = sourceAccountInfo
    ? activeTab === "KRW"
      ? `${sourceAccountInfo.amount?.toLocaleString() ?? 0}원`
      : `$${sourceAccountInfo.amountUS?.toLocaleString() ?? 0}`
    : "잔액 정보 없음";

    const formattedDestBalance = destinationAccountInfo
    ? activeTab === "KRW"
      ? `${destinationAccountInfo.amount?.toLocaleString() ?? 0}원`
      : `$${destinationAccountInfo.amountUS?.toLocaleString() ?? 0}`
    : "잔액 정보 없음";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BackNavigation  name="이체하기"/>
      <div className="ml-auto">
        <div className="w-[160px] h-8 bg-gray-100 rounded-lg p-1 flex">
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
      </div>

      <div className="flex flex-col mt-4 mx-4">
        <p className="text-base font-semibold">
          {destinationAccountInfo
            ? destinationAccountInfo.isAccount
              ? "내 일반 계좌"
              : destinationAccountInfo.name
            : "알 수 없음"}{" "}
          <span className="text-gray-500 text-sm">({formattedDestBalance})</span>
        </p>
        <p className="text-md font-medium text-black">
          {destinationAccountInfo?.accountNumber || destId}
        </p>
      </div>

      <div className="flex flex-col items-center mt-8">
        <p className="text-sm font-medium text-gray-400">이체할 금액을 입력하세요.</p>
      </div>

      <div className="flex flex-col items-center mt-6">
        <p className="text-3xl font-bold text-gray-600">
          {amount ? (activeTab === "KRW" ? `${Number(amount).toLocaleString()}원` : `$${Number(amount).toLocaleString()}`) : (activeTab === "KRW" ? "0원" : "$0")}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center mx-8 mt-5">
        <div>
          <p className="text-sm text-gray-500">
              출발 계좌: {sourceAccountInfo?.accountNumber || sourceId}
          </p>
          <p className="text-sm text-gray-500">잔액: {formattedSourceBalance}</p>
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
