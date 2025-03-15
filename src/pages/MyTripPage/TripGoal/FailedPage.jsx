import React from "react";
import { useNavigate } from "react-router-dom";
import SharedModal from "../../../components/Modal";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTripByTripId } from "../../../apis/trips";
import { MessageCircleQuestionIcon as QuestionMarkCircle } from "lucide-react";
import BulkSellWarningModal from "../../../components/portfolio/BulkSellWarningModal";

export default function FailedPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tripGoal } = useParams();
  const [tripId, setTripId] = useState(1);
  const [trip, setTrip] = useState("");

  // const [amount, setAmount] = useState(1000000);
  // const [period, setPeriod] = useState(11);
  // const [returnRate, setReturnRate] = useState(32.9);

  const navigate = useNavigate();

  useEffect(() =>{
      setTripId(tripGoal.replace("tripGoal", ""));
      const getData = async () => {
        console.log(tripId);
        try {
          const response = await fetchTripByTripId(tripId);
          setTrip(response);
          console.log(response);
        } catch (error) {
          console.error("여행 정보를 가져오는 중 에러 발생", error);
        } finally{
          console.log("hrere")
        }
    }
      getData();
    },[]) 
  
    
  const handleExchangeClick = () => {
    console.log(tripId);
    setIsModalOpen(true);
  };

  const handleNextClick = () => {
    // 다음에 할게요 동작
    console.log("다음에 할게요");
    navigate(`/trip/${tripId}/portfolio`);
  };

  const handleDetailClick = (tripId) => {
    console.log("목표 내역 자세히 보기");
    navigate(`/trip/${tripId}/portfolio`);
  };

  const handleQuestionClick = () => {
    navigate("/trip/service/info");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex justify-end p-4">
        <button className="text-gray-500" onClick={handleQuestionClick}>
          <QuestionMarkCircle className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center justify-start px-4 pt-20">
        <div className="w-full max-w-md text-center font-['Pretendard-Medium']">
          <div>{trip.name || ""}</div>
          <h1 className="text-[22px] text-gray-900">
            목표 기간이 <span className="text-red-500">만료</span>됐어요
          </h1>
          <p className="text-[15px] mb-2">
            아쉽지만, 자동 매도 후 환전할 수 있어요
          </p>
          <div className="mb-2">
            <img
              src="/assets/images/trip/wallet.svg"
              alt="지갑"
              className="w-46 h-52 mx-auto object-contain"
            />
          </div>
          <div className="w-full text-center mb-8">
            <p className="text-2xl font-bold text-blue-600">
              {trip.goalAmount?.toLocaleString()}원
              <span className="text-sm font-normal text-gray-600 ml-1">
                을 모았어요
              </span>
            </p>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-left text-gray-600 mb-1">국내 평가 수익</p>
              <p className="text-lg text-right font-medium text-red-500">
              +{((trip.profit ?? 0) - (trip.realisedProfit ?? 0)).toLocaleString()}              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-left text-gray-600 mb-1">해외 평가 수익</p>
              <p className="text-lg font-medium text-right text-red-500">
              +{((trip.profitUs ?? 0) - (trip.realisedProfitUs ?? 0)).toLocaleString()}              </p>
            </div>
          </div>

          <button
            onClick={() => handleExchangeClick()}
            className="w-full mx-auto px-6 py-3 text-white text-[16px] font-['Pretendard-SemiBold'] bg-blue-600 rounded-2xl hover:bg-blue-700 focus:outline-none"
          >
            매도하기
          </button>
          <button
            onClick={()=> handleNextClick()}
            className="w-full mx-auto px-6 py-3 text-[#62626C] text-[16px] font-['Pretendard-SemiBold'] bg-white rounded-2xl hover:bg-blue-700 focus:outline-none"
          >
            다음에 할게요
          </button>
          <button
            onClick={handleDetailClick(tripId)}
            className="text-[13px] text-blue-600 underline mb-20"
          >
            목표 내역 자세히 보러가기
          </button>
        </div>
      </div>
      {isModalOpen && (
        <SharedModal onClose={() => setIsModalOpen(false)}>
          {isModalOpen && (
            <BulkSellWarningModal onClose={() => setIsModalOpen(false)}  tripId={tripId}/>
          )}
          </SharedModal>
      )}
    </div>
  );
}
