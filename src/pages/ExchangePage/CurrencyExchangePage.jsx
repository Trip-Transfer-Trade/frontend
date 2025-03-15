import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { fetchWalletDetail, fetchExchangeRates } from "../../apis/exchanges";

import BackNavigation from "../../components/BackNavigation";
import ExchangeRateChart from "../../components/ExchangeComponent/ExchangeRateChart";
import ExchangeCardSlider from "../../components/ExchangeComponent/ExchangeCardSlider";

import {
  currencyToKoreanUnitMap,
  getCountryCodeFromCurrency,
  getCurrencySymbolFromCurrency,
  getKoreanUnitFromCurrency,
} from "../../constants/currencyMappings";

// 선택 가능한 통화 목록
const availableCurrencies = currencyToKoreanUnitMap;

export default function CurrencyExchangePage() {
  const location = useLocation();
  const {
    fromCurrency: initialFromCurrency = "KRW",
    toCurrency: initialToCurrency = "USD",
    goalId,
  } = location.state || {};

  const [fromCurrency, setFromCurrency] = useState(initialFromCurrency);
  const [toCurrency, setToCurrency] = useState(initialToCurrency);
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);

  const [walletLoading, setWalletLoading] = useState(true);
  const [rateLoading, setRateLoading] = useState(true);

  const [amount, setAmount] = useState("");
  const [availableAmount, setAvailableAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [showChart, setShowChart] = useState(false);
  const [cards, setCards] = useState([]);

  const handleAmountChange = (e) => {
    const value = e.target.value;

    if (isNaN(value) || value === "") {
      setAmount("");
      setConvertedAmount(0); // 입력값이 없을 때 0으로 설정
      return;
    }

    const numericValue = parseFloat(value);

    if (numericValue > availableAmount) {
      alert(
        `환전할 금액은 ${getCurrencySymbolFromCurrency(
          fromCurrency
        )}${availableAmount.toLocaleString()} 이하로 입력해야 합니다.`
      );
      setAmount(availableAmount.toString());
      setConvertedAmount(availableAmount * (1 / exchangeRate));
    } else {
      setAmount(value);
      setConvertedAmount(numericValue * (1 / exchangeRate)); // 환산된 값 업데이트
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchWalletDetail(fromCurrency);
        setCards(data);

        // console.log("내 지갑 상세 정보", data);

        const total = data.reduce((acc, item) => acc + item.amount, 0);
        setAvailableAmount(total);
      } catch (error) {
        console.error("내 지갑 상세 정보 불러오기 실패", error);
      } finally {
        setWalletLoading(false);
      }
    })();
  }, [fromCurrency]);

  useEffect(() => {
    (async () => {
      try {
        const rates = await fetchExchangeRates();
        const filteredRates = rates.filter((rate) => rate.cur_nm !== "한국 원");
        console.log("filteredRates", filteredRates);

        let fromRate = 1;
        let toRate = 1;

        // 특정 통화(일본 엔, 인도네시아 루피아) 확인 후 보정 처리하는 함수
        const getAdjustedRate = (currency, rateObj) => {
          if (!rateObj) return NaN;
          let rate = parseFloat(rateObj.tts.replace(/,/g, ""));

          // 일본 엔(JPY) 또는 인도네시아 루피아(IDR)일 경우 100으로 나눠 보정
          if (currency === "JPY" || currency === "IDR") {
            rate /= 100;
          }

          return rate;
        };

        if (fromCurrency !== "KRW") {
          const fromRateObj = filteredRates.find(
            (rate) => rate.cur_nm === getKoreanUnitFromCurrency(fromCurrency)
          );

          if (!fromRateObj) {
            console.error(
              `"${fromCurrency}"에 대한 환율 정보를 찾을 수 없습니다.`
            );
            return;
          }

          fromRate = getAdjustedRate(fromCurrency, fromRateObj);
        }

        if (toCurrency !== "KRW") {
          const toRateObj = filteredRates.find(
            (rate) => rate.cur_nm === getKoreanUnitFromCurrency(toCurrency)
          );

          if (!toRateObj) {
            console.error(
              `"${toCurrency}"에 대한 환율 정보를 찾을 수 없습니다.`
            );
            return;
          }

          toRate = getAdjustedRate(toCurrency, toRateObj);
        }

        console.log("fromRate:", fromRate);
        console.log("toRate:", toRate);

        if (isNaN(fromRate) || isNaN(toRate)) {
          console.error("환율 값이 올바르지 않습니다.");
          return;
        }

        const rate = toRate / fromRate;
        console.log(`1 ${toCurrency} = ${rate.toFixed(4)} ${fromCurrency}`);

        setExchangeRate(rate);
      } catch (error) {
        console.error("환율 정보 불러오기 실패", error);
      } finally {
        setRateLoading(false);
      }
    })();
  }, [fromCurrency, toCurrency]);

  return (
    <div className="flex flex-col">
      <BackNavigation text="환전하기" />

      <div>
        {/* 금액 입력 섹션 */}
        <div className="px-6">
          {/* 환전 전 통화 섹션 */}
          <div className="relative mb-10">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setFromDropdownOpen(!fromDropdownOpen)}
            >
              <img
                src={
                  fromCurrency === "EUR"
                    ? "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" // EU 국기 (CDN 이미지)
                    : `https://flagsapi.com/${getCountryCodeFromCurrency(
                        fromCurrency
                      )}/flat/64.png`
                }
                alt={`${fromCurrency} flag`}
                className="h-8"
                style={{
                  objectFit: "cover", // 국기 크기를 동일하게 조절
                  aspectRatio: "4 / 3", // 비율 유지 (EU 국기와 다른 국기 통일)
                }}
              />
              <span className="text-lg font-bold">
                {getKoreanUnitFromCurrency(fromCurrency)}
              </span>
            </div>

            {fromDropdownOpen && (
              <div className="absolute w-52 bg-white border rounded-lg shadow-lg z-50 max-h-40 overflow-auto">
                {Object.entries(availableCurrencies).map(([code, name]) => (
                  <div
                    key={code}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center space-x-2"
                    onClick={() => {
                      setFromCurrency(code);
                      setFromDropdownOpen(false);
                    }}
                  >
                    <img
                      src={
                        code === "EUR"
                          ? "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
                          : `https://flagsapi.com/${getCountryCodeFromCurrency(
                              code
                            )}/flat/64.png`
                      }
                      alt={`${code} flag`}
                      className="h-5"
                      style={{
                        objectFit: "cover", // 국기 크기를 동일하게 조절
                        aspectRatio: "4 / 3", // 비율 유지 (EU 국기와 다른 국기 통일)
                      }}
                    />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4">
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="w-full text-lg text-custom-gray-3 font-bold outline-none"
                placeholder="환전할 금액을 입력해 주세요."
              />
              <p className="text-custom-gray-3 text-sm">
                환전 가능 금액 {getCurrencySymbolFromCurrency(fromCurrency)}
                {availableAmount.toLocaleString()}
              </p>
            </div>
          </div>

          {/* 환전 후 통화 섹션 */}
          <div className="relative">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setToDropdownOpen(!toDropdownOpen)}
            >
              <img
                src={
                  toCurrency === "EUR"
                    ? "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" // EU 국기 (CDN 이미지)
                    : `https://flagsapi.com/${getCountryCodeFromCurrency(
                        toCurrency
                      )}/flat/64.png`
                }
                alt={`${toCurrency} flag`}
                className="h-8"
                style={{
                  objectFit: "cover", // 국기 크기를 동일하게 조절
                  aspectRatio: "4 / 3", // 비율 유지 (EU 국기와 다른 국기 통일)
                }}
              />

              <span className="text-lg font-bold">
                {getKoreanUnitFromCurrency(toCurrency)}
              </span>
            </div>

            {toDropdownOpen && (
              <div className="absolute w-52 bg-white border rounded-lg shadow-lg z-50 max-h-40 overflow-auto">
                {Object.entries(availableCurrencies).map(([code, name]) => (
                  <div
                    key={code}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center space-x-2"
                    onClick={() => {
                      setToCurrency(code);
                      setToDropdownOpen(false);
                    }}
                  >
                    <img
                      src={
                        code === "EUR"
                          ? "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
                          : `https://flagsapi.com/${getCountryCodeFromCurrency(
                              code
                            )}/flat/64.png`
                      }
                      alt={`${code} flag`}
                      className="h-5"
                      style={{
                        objectFit: "cover", // 국기 크기를 동일하게 조절
                        aspectRatio: "4 / 3", // 비율 유지 (EU 국기와 다른 국기 통일)
                      }}
                    />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4">
              <p className="text-lg font-bold">
                {convertedAmount.toFixed(2)} {toCurrency}
              </p>

              {/* 환율 정보 표시 */}
              {isNaN(exchangeRate) || exchangeRate === 1 ? (
                <p className="text-custom-gray-3 text-sm">
                  환율 정보 불러오는 중...
                </p>
              ) : (
                <p className="text-custom-gray-3 text-sm">{`1 ${fromCurrency} = ${exchangeRate.toFixed(
                  4
                )} ${toCurrency}`}</p>
              )}
            </div>
          </div>
        </div>

        {/* 환율 차트 보기 */}
        <div className="w-full my-10">
          <button
            onClick={() => fromCurrency === "KRW" && setShowChart(!showChart)}
            className={`relative flex items-center justify-center w-full text-custom-gray-3 text-sm ${
              fromCurrency !== "KRW" ? "cursor-not-allowed" : ""
            }`}
            disabled={fromCurrency !== "KRW"}
          >
            {fromCurrency === "KRW" && (
              <span className="relative px-4 bg-custom-gray-2 rounded-full z-10">
                환율 차트 보기
              </span>
            )}
            <div className="absolute left-0 right-0 top-[calc(50%-2px)] h-[4px] bg-custom-gray-2 z-0"></div>
          </button>

          {showChart && fromCurrency === "KRW" && (
            <div className="px-6 pt-10 relative border-b-4 border-custom-gray-2">
              <ExchangeRateChart
                currencyCode={toCurrency}
                showPeriodButtons={false}
              />
            </div>
          )}
        </div>

        {/* 환전 카드 */}
        <div className="mb-10">
          <ExchangeCardSlider
            cards={cards}
            goalId={goalId}
            exchangeAmount={amount}
            rate={exchangeRate}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
          />
        </div>
      </div>
    </div>
  );
}
