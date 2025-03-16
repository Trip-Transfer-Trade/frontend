import React from "react";

const ExchangeCompleteResultCard = ({
    title,
    principal,
    countryCode,
    goal,
    exchangeRate,
    exchangeAmount,
    icon,
    bgColor = "bg-blue-50",       
    subBgColor = "bg-blue-100",    
  }) => {
    const flagSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    console.log(flagSrc);

    return (
      <div className={`w-full max-w-md ${bgColor} rounded-xl p-4 mb-2`}>
        {goal&&
          <div className="flex items-center mb-4">
            <div className={`rounded-full mr-3`}>
              <img
                  src={flagSrc}
                  alt="icon"
                  className= {`${countryCode === "KR" ? "w-8" : "w-6"} object-contain`}
              />
          </div>

            <span className="font-medium text-[14px]">{title}</span>
          </div>
        }
  
        <div className="px-2">
            <div className="flex justify-between text-[12px]">
            <span className="text-gray-700 text-[12px]">원금</span>
            <span className="font-medium">{principal}</span>
            </div>
  
            <div className="flex justify-between mb-4 text-[12px]">
            <span className="text-gray-700 ">적용 환율</span>
            <span className="font-medium text-red-500">{exchangeRate}</span>
            </div>
        </div>
        <div className={`${subBgColor} rounded-lg p-3 flex justify-between text-[14px]`} >
          <span className="font-medium">환전 금액</span>
          <span className="font-medium">{exchangeAmount}</span>
        </div>
      </div>
    );
  };

export default ExchangeCompleteResultCard;