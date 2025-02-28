import React from "react";
import { useNavigate } from "react-router-dom";

export default function InfoPage(){
    const navigate = useNavigate();

    const handleBack = () => {
        console.log('이전')
        navigate(-1); // 이전 페이지로 이동
    };
    
    return (
        <div className="min-h-screen bg-white flex flex-col font-['Pretendard-Medium']">
            <div className="flex justify-end p-4">
                <button className="text-gray-500"
                    onClick={handleBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

          <div className="bg-white w-full p-6 pt-25">
            <h1 className="text-[20px] mb-8">
              TTT에서 매도와 환전을 도와드려요
            </h1>
    
            <div className="mb-6">
              <h2 className="text-[18px] text-gray-900 mb-3">자동매도란?</h2>
              <p className="text-[15px] text-gray-700 leading-relaxed">
                지금까지 구매한 주식을 자동으로 판매해 드려요.
                <br />
                오늘 판매한 해외 종목은 2영업일 뒤에 원화로 바꾸거나 출금할 수 있어요.(미국 영업일 기준) 
                <br />
                당일 환전이 필요한 경우, 즉시 환전 서비스를 통해 수익을 바로 환전할 수 있어요. 
              </p>
            </div>
    
            <div className="mb-6 mt-10">
              <h2 className="text-[18px] text-gray-900 mb-3">즉시환전이란?</h2>
              <p className="text-[15px] text-gray-700 leading-relaxed">
                수익금은 자동으로 환전해 드려요.
                <br />
                즉시 환전으로 환전된 금액은 환전 지갑에서 확인할 수 있어요.
                <br />
                환전까지 이루어진 목표는 과거 여행에서 확인할 수 있어요.
              </p>
            </div>
          </div>
        </div>
      );
}