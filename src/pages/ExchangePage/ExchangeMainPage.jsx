import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TripGoalSwiper from "../../components/TripGoalSwiper";
import ExchangeTabs from "../../components/ExchangeComponent/ExchangeTabs";
import ExchangeTab from "../../components/ExchangeComponent/ExchangeTab";
import OwnedCurrencyList from "../../components/ExchangeComponent/OwnedCurrencyList";
import ExchangeRateList from "../../components/ExchangeComponent/ExchangeRateList";
import ShowMoreButton from "../../components/ShowMoreButton";

import { fetchUserCurrencies, fetchExchangeRates } from "../../apis/exchanges";
import { getCountryCodeFromCountryName } from "../../constants/countryMappings";

export default function ExchangeMainPage() {
  const navigate = useNavigate();

  const [userCurrencies, setUserCurrencies] = useState([]);
  const [loadingUserCurrencies, setLoadingUserCurrencies] = useState(true);

  const [exchangeRates, setExchangeRates] = useState([]);
  const [loadingExchangeRates, setLoadingExchangeRates] = useState(true);

  const tripGoals = [
    {
      country: "미국",
      amountKRW: 1000000,
      amountUSD: 220.54,
    },
    {
      country: "일본",
      amountKRW: 1000000,
      amountUSD: 220.54,
    },
    {
      country: "영국",
      amountKRW: 1000000,
      amountUSD: 220.54,
    },
  ];

  useEffect(() => {
    const loadUserCurrencies = async () => {
      try {
        const data = await fetchUserCurrencies();
        setUserCurrencies(data);
      } catch (error) {
        console.error("내 지갑 정보 불러오기 실패", error);
      } finally {
        setLoadingUserCurrencies(false);
      }
    };

    const loadExchangeRates = async () => {
      try {
        const rates = await fetchExchangeRates();
        setExchangeRates(rates);
      } catch (error) {
        console.error("환율 정보 불러오기 실패", error);
      } finally {
        setLoadingExchangeRates(false);
      }
    };

    loadUserCurrencies();
    loadExchangeRates();
  }, []);

  console.log(exchangeRates);

  return (
    <div className="flex flex-col w-full mt-6">
      {/* 여행 목표 카드 */}
      <TripGoalSwiper>
        {tripGoals.map((tripGoal, index) => (
          <div key={index}>
            <div className="flex items-center mb-4 space-x-2">
              <img
                src={`https://flagsapi.com/${getCountryCodeFromCountryName(
                  tripGoal.country
                )}/flat/64.png`}
                alt={`${getCountryCodeFromCountryName(tripGoal.country)} flag`}
                className="h-10"
              />
              <p className="text-lg font-bold">{tripGoal.country}</p>
            </div>
            <div className="flex justify-between items-end mb-2">
              <div>
                <p className="text-sm font-bold">환전 가능 금액</p>
                <p className="text-sm">{tripGoal.amountKRW} 원</p>
              </div>
              <div>
                <img
                  src="/assets/images/exchange/wallet.svg"
                  alt="walletImg"
                  style={{ width: "130px" }}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="text-custom-gray-3 border-b"
                onClick={() => {
                  navigate("/exchange/currency", {
                    state: { country: tripGoal.country }, // 선택한 여행 목표의 나라 정보를 넘김
                  });
                }}
              >
                환전하러 가기
              </button>
            </div>
          </div>
        ))}
      </TripGoalSwiper>

      {/* 여행 목표 카드 하단 */}
      <ExchangeTabs>
        <ExchangeTab label="내 지갑">
          {loadingUserCurrencies ? (
            <p>내 지갑 정보를 불러오는 중...</p>
          ) : (
            <>
              <OwnedCurrencyList
                ownedCurrencyData={userCurrencies}
                showLimited={true}
              />
              <div className="py-2">
                <ShowMoreButton
                  onClick={() => {
                    navigate("/exchange/wallet", {
                      state: { userCurrencies },
                    });
                  }}
                />
              </div>
            </>
          )}
        </ExchangeTab>
        <ExchangeTab label="실시간 환율">
          {loadingExchangeRates ? (
            <p>환율 정보를 불러오는 중...</p>
          ) : (
            <>
              <ExchangeRateList
                exchangeRates={exchangeRates}
                showLimited={true}
              />
              <div className="py-2">
                <ShowMoreButton
                  onClick={() => {
                    navigate("/exchange/rates", {
                      state: { exchangeRates },
                    });
                  }}
                />
              </div>
            </>
          )}
        </ExchangeTab>
      </ExchangeTabs>
    </div>
  );
}
