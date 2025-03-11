import React from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessDetailPage(){
    const navigate = useNavigate();

    const handleBack = () => {
        console.log('이전')
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex justify-end p-4">
                <button className="text-gray-500"
                    onClick={handleBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
  
        <div className="flex-grow flex flex-col items-center justify-start px-4 pt-32">
          <div className="w-full max-w-md text-center">
            <p className="font-['Pretendard-Bold'] text-[23px]">미국 여행 가기</p>
            <p className="mb-20 font-['Pretendard-Medium'] text-[20px]"> 목표에 도달 했어요!</p>
  
            <div className="mb-16">
              <img
                src="/assets/images/trip/good.svg"
                alt="칭찬"
                className="w-36 h-36 mx-auto object-contain"
              />
            </div>
  
            {/* <p className="text-sm text-gray-900 mb-2"></p> */}
            <p className="text-gray-900 text-[20px] font-['Pretendard-Medium']">
                <span className="text-brand-blue font-['Pretendard-Bold']">11개월</span> 동안 
                <span className="text-brand-blue font-['Pretendard-Bold']"> 32.4%</span>의 수익률로
                <span className="text-brand-blue font-['Pretendard-Bold']"> 1,000,000원</span>을 모았어요
                
            </p>
          </div>
        </div>
      </div>
    );
}