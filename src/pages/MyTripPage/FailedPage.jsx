import React from "react";
import { useNavigate } from "react-router-dom";

export default function FailedPage(){
  const navigate = useNavigate();
    const handleExchangeClick = () => {
        // 환전 하러 가기 동작
        console.log('환전하러 가기');
      };
    
    const handleNextClick = () => {
        // 다음에 할게요 동작
      console.log('다음에 할게요');
    };
    
    const handleQuestionClick = ()=>{
        navigate("/trip/info")
    }
    
      return (
        <div className="min-h-screen bg-white flex flex-col">
        {/* 상단 물음표 아이콘 */}
        <div className="flex justify-end p-4">
          <button className="text-gray-500"
            onClick={handleQuestionClick}>
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
  
        {/* 중앙 콘텐츠 영역 */}
        <div className="flex-grow flex flex-col items-center justify-start px-4 pt-36">
          <div className="w-full max-w-md text-center">
            <h1 className="text-xl font-semibold text-gray-900">목표 기간이 만료됐어요</h1>
  
            <div className="mb-2">
              <img
                src="/src/assets/images/trip/wallet.svg"
                alt="지갑"
                className="w-42 h-48 mx-auto object-contain"
              />
            </div>
  
            <p className="text-sm text-gray-900 mb-2">자동 매도 후 환전할 수 있어요</p>
  
            <button
              onClick={handleExchangeClick}
              className="w-2/3 mx-auto px-6 py-3 text-white bg-blue-600 rounded-2xl text-[16px] hover:bg-blue-700 focus:outline-none"
            >
              환전하러 가기
            </button>
            <button
              onClick={handleNextClick}
              className="w-full mt-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              다음에 할게요
            </button>
          </div>
        </div>
      </div>
    );
}