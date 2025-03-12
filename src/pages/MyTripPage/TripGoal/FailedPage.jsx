import React from "react";
import { useNavigate } from "react-router-dom";
import SharedModal from "../../../components/Modal";
import ExchangeMethod from "../../ExchangePage/ExchangeMethodPage";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrencyCodeFromCountryName } from "../../../constants/countryMappings";
import { fetchTripByTripId } from "../../../apis/trips";

export default function FailedPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tripGoal } = useParams();
  const tripId = tripGoal.replace("tripGoal","");

  const navigate = useNavigate();

  const [modalData, setModalData] = useState({
    tripId: "",
    currencyCode: "",
  });
  const handleExchangeClick = async () => {
    console.log(tripId);
    try {
      const response = await fetchTripByTripId(tripId);
      const currencyCode = getCurrencyCodeFromCountryName(response.country);
      setModalData({ tripId, currencyCode });
      setIsModalOpen(true);
    } catch (error) {
      console.error("여행 정보를 가져오는 중 에러 발생", error);
    }
  };
  
  const handleNextClick = () => {
    // 다음에 할게요 동작
    console.log("다음에 할게요");
    // navigate("/trip");
  };

  const handleQuestionClick = () => {
    navigate("/trip/service/info");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex justify-end p-4">
        <button className="text-gray-500" onClick={handleQuestionClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center justify-start px-4 pt-36">
        <div className="w-full max-w-md text-center font-['Pretendard-Medium']">
          <h1 className="text-[22px] text-gray-900">목표 기간이 만료됐어요</h1>

          <div className="mb-2">
            <img
              src="/assets/images/trip/wallet.svg"
              alt="지갑"
              className="w-46 h-52 mx-auto object-contain"
            />
          </div>

          <p className="text-[15px] mb-2">자동 매도 후 환전할 수 있어요</p>

          <button
            onClick={handleExchangeClick}
            className="w-3/5 mx-auto px-6 py-3 text-white text-[16px] font-['Pretendard-Bold'] bg-blue-600 rounded-2xl hover:bg-blue-700 focus:outline-none"
          >
            환전하러 가기
          </button>
          <button
            onClick={handleNextClick}
            className="w-full mt-1 text-[13px] text-gray-500 hover:text-gray-700 transition-colors"
          >
            다음에 할게요
          </button>
        </div>
      </div>
      {isModalOpen && (
        <SharedModal onClose={() => setIsModalOpen(false)}>
          <ExchangeMethod           
          tripId={modalData.tripId}
          currencyCode={modalData.currencyCode}/>
        </SharedModal>
      )}
    </div>
  );
}
