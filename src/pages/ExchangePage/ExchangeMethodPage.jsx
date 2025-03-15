import React, { useState, useEffect } from "react";
import { fetchExchangeGoal } from "../../apis/exchanges";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExchangeMethodPage({ onClose ,tripId, currencyCode}) {
  const [selectedOption, setSelectedOption] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  const handleExchangeClick = async () => {
    console.log("id" , tripId,"code", currencyCode);   
    try {
      //즉시 환전
      const response = await fetchExchangeGoal({
        tripId : tripId,
        toCurrency : currencyCode
      }); 
      console.log(response.exchanges)
      navigate('/exchange/complete',{state: { exchanges: response.exchanges , goal:true}});
    } catch (error) {
      console.error("환전 완료 데이터 가져오기 실패", error);
    }          
  };

  const handleExchangeAfter = () =>{
    navigate(`/exchange?tab=환전`);
  }

  const handleButtonClick = (option) => {
    if (selectedOption !== option) {
      setSelectedOption(option);
    } else {
      if (option === 0) {
        handleExchangeClick();
      } else if (option === 1) {
        handleExchangeAfter();
      }
    }
  };

  return (
    <div 
      className={`w-auto bg-white rounded-t-3xl relative transition-transform duration-300 ease-out h-[350px] ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      onClick={(e) => e.stopPropagation()} 
    >     
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      <div 
        className={`bg-white rounded-t-3xl w-full max-w-md relative transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="absolute right-6 top-6">
        <button onClick={onClose}>
          <X size={20} className="text-gray-400" />
        </button>
      </div>

        <div className="p-5 pt-12">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-7 h-7 rounded-full flex items-center justify-center">
            <img
                src="/assets/images/trip/coin.svg"
                alt="동전"
                className="w-10 mx-auto object-contain"
              />
            </div>
            <span className="font-bold text-[20px]">환전하러 가기</span>
          </div>

          <button
            className={`w-full rounded-xl mb-4 transition-all duration-300 ${
                selectedOption === 0 
                  ? "bg-blue-600 text-white border-0" 
                  : "bg-custom-gray-1 text-gray-700"
              }`}
                onClick={() => {handleButtonClick(0)}}>

            <div className="p-5 text-left">
              <div className="font-medium text-[17px]">즉시 환전하기</div>
              {selectedOption === 0 && (
                <div className="flex items-center gap-x-8  mt-2">
                    <div className="text-[14px] text-blue-100">
                    TTT가 매도금을 즉시 입금해 드려요 (수수료 0.07%)
                    
                    </div>
                    <div>
                        <img
                        src="/assets/images/trip/exchange.svg"
                        alt="지갑"
                        className="w-30 mx-auto object-contain"
                        />
                    </div>
                </div>
              )}
            </div>
          </button>

          <button 
            className={`w-full rounded-xl text-left mb-4 transition-all duration-300 ${
                selectedOption === 1 
                  ? "bg-blue-600 text-white border-0" 
                  : "bg-custom-gray-1 text-gray-700"
              }`}
            onClick={() => {handleButtonClick(1);}}
          >
            <div className="p-5">
              <div className="font-medium text-[17px]">3일 뒤에 하기</div>
              {selectedOption === 1 && (
                <div className="text-[14px] mt-2 text-blue-100">
                  매도한 금액이 영업일 기준 2일 후에 들어와요
                  <br/>
                    
                    <br/>
                </div>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
