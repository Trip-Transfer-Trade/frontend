import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  fetchAvailableAmount,
  fetchCurrenciesByGoal,
} from "../../apis/exchanges";

import {
  getCountryCodeFromCurrency,
  getKoreanUnitFromCurrency,
} from "../../constants/currencyMappings";

import { getCurrencyCodeFromCountryName } from "../../constants/countryMappings";

import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdCurrencyExchange } from "react-icons/md";

export default function GoalTabContent() {
  const navigate = useNavigate();

  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState(null);
  const [tripGoals, setTripGoals] = useState([]);
  const [currencies, setCurrencies] = useState({});
  const [goalLoading, setGoalLoading] = useState(true);
  const [currencyLoading, setCurrencyLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAvailableAmount();
        setTripGoals(data);
      } catch (error) {
        console.error("목표 별 환전 가능 금액 불러오기 실패", error);
      } finally {
        setGoalLoading(false);
      }
    })();
  }, []);

  const toggleSelected = async (tripId) => {
    if (selectedGoalId === tripId) {
      setSelectedGoalId(null);
      setSelectedCurrencyCode(null);
      return;
    }

    setSelectedGoalId(tripId);
    setSelectedCurrencyCode(null);

    if (!currencies[tripId]) {
      setCurrencyLoading(true);
      try {
        const currencyData = await fetchCurrenciesByGoal(tripId);
        setCurrencies((prev) => ({ ...prev, [tripId]: currencyData }));
      } catch (error) {
        console.error("보유 통화 불러오기 실패", error);
      } finally {
        setCurrencyLoading(false);
      }
    }
  };

  const selectCurrency = (currencyCode) => {
    setSelectedCurrencyCode(
      currencyCode === selectedCurrencyCode ? null : currencyCode
    );
  };

  const handleExchangeNavigation = () => {
    if (!selectedGoalId || !selectedCurrencyCode) {
      alert("목표와 통화를 선택해주세요!");
      return;
    }

    const selectedGoal = tripGoals.find(
      (goal) => goal.tripId === selectedGoalId
    );

    navigate(`/exchange/currency`, {
      state: {
        goalId: selectedGoalId,
        fromCurrency: selectedCurrencyCode,
        toCurrency: getCurrencyCodeFromCountryName(selectedGoal?.country),
      },
    });
  };

  return (
    <div>
      {goalLoading ? (
        <p className="text-center text-gray-500">
          목표 별 환전 가능 금액 정보를 불러오는 중...
        </p>
      ) : (
        <div className="flex flex-col">
          <p className="text-lg font-bold">환전 하러 가기</p>
          <p className="flex items-center text-sm text-gray-400 mb-6">
            <AiOutlineQuestionCircle className="mr-1" />
            {/* 목표를 선택하면 환전 가능한 통화를 확인할 수 있어요. */}
            원하는 목표와 통화를 선택하고 환전을 진행해보세요.
          </p>
          <div className="w-full mx-auto space-y-2">
            {tripGoals.map((tripGoal) => (
              <div
                key={tripGoal.tripId}
                className={`bg-white rounded-lg border transition-all duration-300 ${
                  selectedGoalId === tripGoal.tripId
                    ? "border-brand-blue shadow-md"
                    : "border-gray-300"
                }`}
              >
                <div
                  onClick={() => toggleSelected(tripGoal.tripId)}
                  className="flex justify-between items-center px-4 py-6 cursor-pointer rounded-lg"
                >
                  <p>{tripGoal.tripName}</p>
                  <MdCurrencyExchange
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExchangeNavigation();
                    }}
                    className={`text-2xl cursor-pointer transition-colors duration-300 ${
                      selectedGoalId === tripGoal.tripId && selectedCurrencyCode
                        ? "text-brand-blue hover:text-blue-700"
                        : "text-gray-300"
                    }`}
                  />
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    selectedGoalId === tripGoal.tripId
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {selectedGoalId === tripGoal.tripId && (
                    <div className="p-4 bg-white border-t rounded-b-lg">
                      <p className="text-gray-700 font-semibold mb-3">
                        보유 통화{" "}
                        <span className="text-brand-blue">
                          {currencies[tripGoal.tripId]?.length || 0}
                        </span>{" "}
                        개
                      </p>

                      {currencyLoading ? (
                        <p className="text-gray-500">
                          보유 통화 목록 불러오는 중...
                        </p>
                      ) : currencies[tripGoal.tripId] &&
                        currencies[tripGoal.tripId].length > 0 ? (
                        <div>
                          {currencies[tripGoal.tripId].map(
                            (currency, index) => (
                              <div
                                key={index}
                                onClick={() =>
                                  selectCurrency(currency.currencyCode)
                                }
                                className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition-all duration-300
                                ${
                                  selectedCurrencyCode === currency.currencyCode
                                    ? "bg-blue-100 border border-brand-blue"
                                    : "border-gray-300 hover:border-gray-400"
                                }`}
                              >
                                <span className="flex items-center space-x-2">
                                  <img
                                    src={`https://flagsapi.com/${getCountryCodeFromCurrency(
                                      currency.currencyCode
                                    )}/flat/64.png`}
                                    alt={`${getCountryCodeFromCurrency(
                                      currency.currencyCode
                                    )} flag`}
                                    className="h-8"
                                  />
                                  <span>
                                    {getKoreanUnitFromCurrency(
                                      currency.currencyCode
                                    )}
                                  </span>
                                </span>
                                <span className="text-right font-semibold">
                                  {currency.availableAmount.toLocaleString()}{" "}
                                  {currency.currencyCode}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500">보유 통화가 없습니다.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
