import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTripById } from "../../redux/tripSlice";
import { fetchAccountData } from "../../redux/accountSlice";
import { fetchExchangeRate } from "../../redux/exchangeSlice";
import BackNavigation from "../../components/BackNavigation";
import BulkSellWarningModal from "../../components/portfolio/BulkSellWarningModal";

const GoalProgressPage = () => {
  const { tripId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (tripId) {
      dispatch(fetchAccountData({ tripId, currency: "KRW" }));
      dispatch(fetchAccountData({ tripId, currency: "USD" }));
      dispatch(fetchTripById(tripId));
      dispatch(fetchExchangeRate());
    }
  }, [dispatch, tripId]);

  const selectedTrip = useSelector((state) => state.trip.selectedTrip) || {};
  const { data: accountData, status: accountStatus } = useSelector(
    (state) => state.account
  );
  const exchangeRate = useSelector((state) => state.exchange.rate);

  const krwDeposit = accountData?.KRW?.depositAmount || 0;
  const usdDeposit = accountData?.USD?.depositAmount || 0;
  const profitKRW = accountData?.KRW?.profit || 0;
  const profitUSD = accountData?.USD?.profit || 0;

  const {
    name = "목표 없음",
    endDate = "없음",
    goalAmount = 0,
    status: tripStatus,
    error,
  } = selectedTrip;

  const totalProfitConverted = profitKRW + profitUSD * exchangeRate;

  const [endGoalChecked, setEndGoalChecked] = useState(false);
  const [sellAfterEnd, setSellAfterEnd] = useState(false);

  if (accountStatus === "loading")
    return <div className="p-4 text-center">로딩 중...</div>;
  if (accountStatus === "failed")
    return <div className="p-4 text-center text-red-500">에러: {error}</div>;

  return (
    <div className="flex flex-col">
      <BackNavigation text={name} />

      <div className="flex-1 px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">목표 진행 상황</h2>
          <button
            className="text-sm text-gray-500"
            onClick={() => navigate(`/trip/${tripId}/portfolio/progress/edit`)}
          >
            목표 수정하기
          </button>
        </div>

        <div className="bg-white rounded-lg p-4 mb-6 shadow-lg">
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">목표 날짜</span>
            <span className="font-medium">{endDate}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">목표 금액</span>
            <span className="font-medium">{goalAmount.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">누적수익금</span>
            <span className="font-medium">
              {totalProfitConverted.toLocaleString()}원
            </span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">환화 예수금</span>
            <span className="font-medium">{krwDeposit.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-gray-600">달러 예수금</span>
            <span className="font-medium">{usdDeposit.toLocaleString()}$</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {/* <div
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer ${sellAfterEnd ? "text-gray-400" : "text-black"}`}
            onClick={() => { setEndGoalChecked(true); setSellAfterEnd(false); }}
          >
            <div
              className={`rounded-full border w-5 h-5 flex items-center justify-center shrink-0 ${
                endGoalChecked
                  ? "bg-blue-500 border-blue-500"
                  : "bg-white border-gray-300"
              }`}
            >
              {endGoalChecked && <span className="text-white text-sm">✓</span>}
            </div>
            <div>
              <p className="font-medium">목표만 종료하기</p>
              <p className="text-sm text-gray-500">
                목표만 종료할 경우, 투자 종목은 유지됩니다.
              </p>
            </div>
          </div> */}

          <div
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer ${
              endGoalChecked ? "text-gray-400" : "text-black"
            }`}
            onClick={() => {
              setSellAfterEnd(true);
              setEndGoalChecked(false);
            }}
          >
            <div
              className={`rounded-full border w-5 h-5 flex items-center justify-center shrink-0 ${
                sellAfterEnd
                  ? "bg-blue-500 border-blue-500"
                  : "bg-white border-gray-300"
              }`}
            >
              {sellAfterEnd && <span className="text-white text-sm">✓</span>}
            </div>
            <div className="w-auto">
              <p className="font-medium">목표 종료 후, 보유 종목 매도하기</p>
              <p className="text-sm text-gray-500">
                목표 종료 시, 해당 목표에서 투자한 종목은 모두 매도되어
                예수금으로 전환됩니다.
              </p>
            </div>
          </div>
        </div>

        <button
          className="w-full py-3 bg-gray-100 hover:bg-gray-300 text-gray-500 rounded-lg font-medium mt-auto mb-2"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          일괄 매도하기
        </button>
      </div>
      {/* 모달 렌더링 */}
      {/* {isModalOpen && (
        <GoalMidpointModal onClose={() => setIsModalOpen(false)} />
      )} */}
      {isModalOpen && (
        <BulkSellWarningModal onClose={() => setIsModalOpen(false)}  tripId={tripId} />
      )}
    </div>
  );
};

export default GoalProgressPage;
