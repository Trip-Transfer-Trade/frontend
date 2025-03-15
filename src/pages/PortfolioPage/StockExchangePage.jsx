import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchExchangeRates } from "../../apis/exchanges"; // 기존 API 활용
import { submitExchange } from "../../redux/exchangeSlice"; // Redux 액션 추가
import BackNavigation from "../../components/BackNavigation";

// 🔹 국가 코드 매핑
const countryCodeMap = {
  KRW: "KR",
  USD: "US",
};

// 🔹 국기 URL 가져오는 함수
function getCountryFlagURL(currency) {
  return `https://flagsapi.com/${countryCodeMap[currency]}/flat/64.png`;
}

export default function StockExchangePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // PortfolioAccount에서 받은 데이터
  const { tripId, activeTab, amount = 0, amountUS = 0 } = location.state || {};

  // 🔹 기본 통화 설정 (국내/해외 탭 기반)
  const [fromCurrency, setFromCurrency] = useState(activeTab === "k" ? "KRW" : "USD");
  const [toCurrency, setToCurrency] = useState(activeTab === "k" ? "USD" : "KRW");
  const availableAmount = activeTab === "k" ? amount : amountUS;

  const [amountInput, setAmountInput] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);

  // 🔹 KRW ↔ USD 환율 가져오기
  useEffect(() => {
    async function fetchRate() {
      try {
        const rates = await fetchExchangeRates();
        const usdRate = rates.find(rate => rate.cur_nm === "미국 달러");
        setExchangeRate(usdRate ? parseFloat(usdRate.tts.replace(/,/g, "")) : 1);
      } catch (error) {
        console.error("환율 정보 불러오기 실패", error);
      }
    }
    fetchRate();
  }, []);

  // 🔹 금액 입력 핸들링
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (isNaN(value) || value === "") {
      setAmountInput("");
      setConvertedAmount(0);
      return;
    }

    const numericValue = parseFloat(value);
    if (numericValue > availableAmount) {
      alert(`환전할 금액은 ${availableAmount.toLocaleString()} 이하로 입력해야 합니다.`);
      setAmountInput(availableAmount.toString());
      setConvertedAmount(availableAmount * exchangeRate);
    } else {
      setAmountInput(value);
      setConvertedAmount(numericValue * exchangeRate);
    }
  };

  // 🔹 환전 요청
  const handleExchange = async () => {
    if (!amountInput || Number(amountInput) <= 0) {
      alert("환전할 금액을 입력하세요!");
      return;
    }

    try {
      const payload = {
        tripId,
        fromCurrency,
        toCurrency,
        amount: Number(amountInput),
      };

      await dispatch(submitExchange(payload)).unwrap();

      alert(
        `${amountInput} ${fromCurrency}가 ${convertedAmount.toFixed(2)} ${toCurrency}로 환전되었습니다.`
      );
      navigate(`/trip/${tripId}/portfolio`);
    } catch (error) {
      alert("환전 실패: " + error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BackNavigation text="주식 투자용 환전" />
      <div className="px-6">
        <p className="text-lg font-bold text-center my-6">
          {tripId} 계좌 내 환전
        </p>

        {/* 🔹 출발 통화 정보 */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">출발 통화</p>
            <p className="text-lg font-bold">{fromCurrency}</p>
            <p className="text-sm text-gray-500">
              잔액: {availableAmount.toLocaleString()} {fromCurrency}
            </p>
          </div>
          <img
            src={getCountryFlagURL(fromCurrency)}
            alt={fromCurrency}
            className="w-10 h-10"
          />
        </div>

        {/* 🔹 환전 금액 입력 */}
        <input
          type="number"
          value={amountInput}
          onChange={handleAmountChange}
          className="w-full text-lg font-bold outline-none border p-2 rounded-lg"
          placeholder="환전할 금액을 입력하세요."
        />

        <div className="text-center my-4">
          <p className="text-lg font-bold">↓</p>
          <p className="text-gray-500 text-sm">{`1 ${fromCurrency} = ${exchangeRate.toFixed(4)} ${toCurrency}`}</p>
        </div>

        {/* 🔹 도착 통화 정보 */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">도착 통화</p>
            <p className="text-lg font-bold">{toCurrency}</p>
            <p className="text-sm text-gray-500">
              환전 후 예상 금액: {convertedAmount.toFixed(2)} {toCurrency}
            </p>
          </div>
          <img
            src={getCountryFlagURL(toCurrency)}
            alt={toCurrency}
            className="w-10 h-10"
          />
        </div>

        {/* 🔹 환전 버튼 */}
        <button
          onClick={handleExchange}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg mt-4"
        >
          환전하기
        </button>
      </div>
    </div>
  );
}
