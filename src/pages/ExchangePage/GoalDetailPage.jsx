import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { fetchCurrenciesByGoal } from "../../apis/exchanges";

import {
  getCountryCodeFromCurrency,
  getKoreanUnitFromCurrency,
} from "../../constants/currencyMappings";

import BackNavigation from "../../components/BackNavigation";
import ExchangeModal from "../../components/ExchangeComponent/ExchangeModal";

export default function GoalDetailPage() {
  const { goalId } = useParams();

  const location = useLocation();
  const country = location.state?.country || "KR";
  const tripName = location.state?.tripName || "";
  const availableAmount = location.state?.availableAmount || 0;

  const [currencies, setCurrencies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCurrenciesByGoal(goalId);
        setCurrencies(data);
      } catch (error) {
        console.error("목표 별 보유 통화 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [goalId]);

  if (loading)
    return (
      <p className="text-center text-gray-500">보유 통화 정보 불러오는 중...</p>
    );
  if (!currencies)
    return (
      <p className="text-center text-gray-500">보유 통화 정보가 없습니다.</p>
    );

  return (
    <div className="flex flex-col">
      <BackNavigation text={tripName} />
      <div className="px-6">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-custom-gray-3 font-bold mb-2">환전 가능 금액</p>
            <p className="text-4xl font-bold">
              {availableAmount.toLocaleString()}원
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-custom-gray-1 border border-custom-gray-2 rounded-lg p-2"
          >
            환전하러가기
          </button>
        </div>

        <hr className="my-6 h-[2px] bg-custom-gray-2 border-none" />

        <p className="text-custom-gray-3 font-bold mb-4">
          보유 통화 <span className="text-brand-blue">{currencies.length}</span>
          개
        </p>
        {currencies.map((currency, index) => (
          <div key={index} className="flex justify-between items-center p-4">
            <span className="flex items-center space-x-2">
              <img
                src={`https://flagsapi.com/${getCountryCodeFromCurrency(
                  currency.currencyCode
                )}/flat/64.png`}
                alt={`${getCountryCodeFromCurrency(
                  currency.currencyCode
                )} flag`}
                className="h-10"
              />
              <span className="font-bold">
                {getKoreanUnitFromCurrency(currency.currencyCode)}
              </span>
            </span>
            <span className="text-right font-bold">
              {currency.availableAmount.toLocaleString()}{" "}
              {currency.currencyCode}
            </span>
          </div>
        ))}
      </div>
      {/* 모달 렌더링 */}
      {isModalOpen && (
        <ExchangeModal
          onClose={() => setIsModalOpen(false)}
          toCurrency={country}
        />
      )}
    </div>
  );
}
