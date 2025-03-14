import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountData } from "../../redux/accountSlice";
import { useParams, useNavigate } from "react-router-dom";
import ModalCenter from "../../components/ModalCenter";

export default function PortfolioAccount({activeTab}) {

  const { tripId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.account);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (tripId) {
      const currency = activeTab === "k" ? "KRW" : "US";
      dispatch(fetchAccountData({ tripId, currency }));
    }
  }, [dispatch, tripId, activeTab]);

  if (status === "loading") return <p>로딩 중...</p>;
  if (status === "failed") return <p>계좌 데이터를 불러오는 데 실패했습니다.</p>;
  if (!data) return <p>계좌 데이터가 없습니다.</p>;
  
  const formatCurrency = (amount) => (activeTab === "k" ? `${amount.toLocaleString()}원` : `$${amount.toLocaleString()}`);


  const handleInvestClick = () => {
    if (activeTab === "u" && data.depositAmount === 0) {
      setIsModalOpen(true);
    } else {
      navigate(`/trip/${tripId}/stocks`);
    }
  };

  return (
    <div className="m-4 bg-white rounded-lg shadow-lg p-3 mb-4">
      <div className="flex justify-between items-center px-3">
        <span className="text-lg font-medium">누적수익금</span>
        <div className="flex items-center">
          <span className="text-lg font-medium text-red-500">
            {formatCurrency(data.profit)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 px-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">평가금액</span>
          <span>{formatCurrency(data.evaluationAmount)}</span>

        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">매입금액</span>
          <span>{formatCurrency(data.purchaseAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">총 자산</span>
          <span>{formatCurrency(data.totalAssets)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">예수금</span>
          <span>{formatCurrency(data.depositAmount)}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <button className="py-1 border border-gray-300 rounded-md text-sm" 
          onClick={() => navigate(`/mypage/transfer/recipient`)}>
          이체하기
        </button>
        <button className="py-1 border border-gray-300 rounded-md text-sm" 
          onClick={handleInvestClick}>
          투자하기
        </button>
        <button className="py-1 border border-gray-300 rounded-md text-sm" 
          onClick={() => navigate(`/exchange/goals/${tripId}`)}>
          환전하기
        </button>
      </div>
      <ModalCenter isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold text-center mt-5">미국 달러가 없어요!</h2>
        <p className="text-sm text-gray-500 text-center mb-5 mt-3 mb-10">
          해외 주식 투자를 위해 환전을 진행해주세요.
        </p>

        <div className="flex flex-col space-y-2 w-10/12 my-3 mx-auto">
          <button 
            className="w-full py-[10px] bg-blue-500 text-white text-base rounded-md transition-all hover:bg-blue-600"
            onClick={() => navigate('/trip')} //투자를 위한 환전 페이지 만들기기
          >
            환전하러 가기
          </button>

          <button 
            className="w-full py-[10px] bg-gray-100 text-gray-700 text-base rounded-md transition-all hover:bg-gray-300"
            onClick={() => setIsModalOpen(false)}
          >
            나중에 하기
          </button>
        </div>
      </ModalCenter>

    </div>
  );
}