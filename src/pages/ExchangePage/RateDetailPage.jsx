import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import ExchangeRateChart from "../../components/ExchangeComponent/ExchangeRateChart";
import BackNavigation from "../../components/BackNavigation";
import ExchangeModal from "../../components/ExchangeComponent/ExchangeModal";

import { getCountryCodeFromCurrency } from "../../constants/currencyMappings";

export default function RateDetailPage() {
  const { currencyCode } = useParams();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    changePrice = 0,
    changeRate = 0,
    cur_nm = "알 수 없음",
    tts = "N/A",
  } = location.state || {};

  console.log("currencyCode", currencyCode);
  return (
    <div className="flex flex-col">
      <BackNavigation
        text={
          <span>
            <img
              src={`https://flagsapi.com/${getCountryCodeFromCurrency(
                currencyCode
              )}/flat/64.png`}
              alt={`${getCountryCodeFromCurrency(currencyCode)} flag`}
              className="h-8 inline-block mr-2"
            />
            {cur_nm} 환율
          </span>
        }
      />
      <div className="w-full mt-6 flex flex-col items-center">
        <div className="w-full flex justify-between items-end mb-20 px-6">
          <p className="text-4xl font-bold">{tts}원</p>
          <p
            className={`text-lg ${
              changePrice > 0 ? "text-red-500" : "text-blue-500"
            }`}
          >
            {changePrice}원 ({changeRate}%)
          </p>
        </div>
        <div className="w-full mb-10">
          <ExchangeRateChart currencyCode={currencyCode} />
        </div>
        {/* <button
          onClick={() => setIsModalOpen(true)}
          className="bg-custom-gray-1 border border-custom-gray-2 rounded-lg p-2"
        >
          환전하러가기
        </button> */}
      </div>
      {/* 모달 렌더링 */}
      {isModalOpen && (
        <ExchangeModal
          onClose={() => setIsModalOpen(false)}
          toCurrency={currencyCode}
        />
      )}
    </div>
  );
}
