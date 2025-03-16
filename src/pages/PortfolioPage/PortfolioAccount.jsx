import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountData } from "../../redux/accountSlice";
import { useParams, useNavigate } from "react-router-dom";
import ModalCenter from "../../components/ModalCenter";

function formatAmount(amount, currency) {
  return currency === "KRW"
    ? new Intl.NumberFormat("ko-KR").format(amount) + "원"
    : "$" + parseFloat(amount).toFixed(2);
}

export default function PortfolioAccount({ activeTab }) {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedTrip = useSelector((state) => state.trip.selectedTrip);
  const accountId = selectedTrip?.accountId || "";

  const accountData = useSelector((state) => state.account.data) || {};
  const currency = activeTab === "k" ? "KRW" : "USD";
  const currentData = activeTab === "k" ? accountData.KRW : accountData.USD;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (tripId) {
      dispatch(fetchAccountData({ tripId, currency: "KRW" }));
      dispatch(fetchAccountData({ tripId, currency: "USD" }));
    }
  }, [dispatch, tripId]);

  if (!currentData) return <p>계좌 데이터가 없습니다.</p>;

  const handleInvestClick = () => {
    if (activeTab === "u" && currentData.depositAmount === 0) {
      setIsModalOpen(true);
    } else {
      const nation = activeTab === "k" ? "국내" : "미국";
      navigate(`/trip/${tripId}/stocks`, { state: { nation } });
    }
  };
  

  return (
    <div className="m-4 bg-white rounded-lg shadow-lg p-3 mb-4">
      <div className="flex justify-between items-center px-3">
        <span className="text-lg font-medium">누적수익금</span>
        <span
          className={`text-lg font-medium ${
            currentData.profit < 0 ? "text-blue-500" : "text-red-500"
          }`}
        >
          {formatAmount(currentData.profit, currency)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 px-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">평가금액</span>
          <span>{formatAmount(currentData.evaluationAmount, currency)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">매입금액</span>
          <span>{formatAmount(currentData.purchaseAmount, currency)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">총 자산</span>
          <span>{formatAmount(currentData.totalAssets, currency)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">예수금</span>
          <span>{formatAmount(currentData.depositAmount, currency)}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <button className="py-1 border border-gray-300 rounded-md text-sm" 
          onClick={() => navigate(`/trip/transfer?sourceType=trip&sourceId=${accountId}`)}>
          이체하기
        </button>
        <button className="py-1 border border-gray-300 rounded-md text-sm" onClick={handleInvestClick}>
          투자하기
        </button>
        <button className="py-1 border border-gray-300 rounded-md text-sm" 
          onClick={() => navigate(`/trip/${tripId}/portfolio/exchange`, {
            state: { tripId, activeTab, depositKRW: accountData.KRW?.depositAmount || 0, depositUSD: accountData.USD?.depositAmount || 0 }
          })}>
          환전하기
        </button>
      </div>
    </div>
  );
}
