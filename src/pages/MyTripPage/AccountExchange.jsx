import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchExchangeRates, fetchExchange } from "../../apis/exchanges";
import BackNavigation from "../../components/BackNavigation";

const countryCodeMap = {
  KRW: "KR",
  USD: "US",
};

function formatAmount(amount, currency) {
  return currency === "KRW"
    ? new Intl.NumberFormat("ko-KR").format(amount)
    : parseFloat(amount).toFixed(2);
}

function getCountryFlagURL(currency) {
  return `https://flagsapi.com/${countryCodeMap[currency]}/flat/64.png`;
}

export default function AccountExchangePage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { accountId, amount = 0, amountUS = 0 } = location.state || {};  

  const [fromCurrency, setFromCurrency] = useState("KRW");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amountInput, setAmountInput] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);

  const availableAmount = fromCurrency === "KRW" ? amount : amountUS;

  useEffect(() => {
    async function fetchRate() {
      try {
        const rates = await fetchExchangeRates();
        const usdRate = rates.find(rate => rate.cur_nm === "미국 달러");
        setExchangeRate(usdRate ? parseFloat(usdRate.tts.replace(/,/g, "")) : 1);
      } catch (error) {
        console.error("❌ 환율 정보 불러오기 실패", error);
      }
    }
    fetchRate();
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (isNaN(value) || value === "") {
      setAmountInput("");
      setConvertedAmount(0);
      return;
    }

    const numericValue = parseFloat(value);
    if (numericValue > availableAmount) {
      alert(`환전할 금액은 ${formatAmount(availableAmount, fromCurrency)} 이하로 입력해야 합니다.`);
      setAmountInput(availableAmount.toString());
      setConvertedAmount(fromCurrency === "KRW" ? availableAmount / exchangeRate : availableAmount * exchangeRate);
    } else {
      setAmountInput(value);
      setConvertedAmount(fromCurrency === "KRW" ? numericValue / exchangeRate : numericValue * exchangeRate);
    }
  };

  const handleExchange = async () => {
    if (!amountInput || Number(amountInput) <= 0) {
      alert("환전할 금액을 입력하세요!");
      return;
    }

    if (!accountId) {
      alert("계좌 정보를 찾을 수 없습니다.");
      return;
    }

    const payload = {
      accountId,
      fromAmount: Number(amountInput).toFixed(2),
      fromCurrency,
      toCurrency,
      toAmount: convertedAmount.toFixed(2),
      exchangeRate,
    };

    try {
      const response = await fetchExchange(payload);

      alert(`${amountInput} ${fromCurrency}가 ${response.toAmount.toFixed(2)} ${toCurrency}로 환전되었습니다.`);
      navigate(`/trip`);
    } catch (error) {
      console.error("❌ 환전 실패:", error);
      alert("환전 실패: " + error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BackNavigation text="환전" />
      <div className="px-6">
        <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">출발 통화</p>
            <p className="text-lg font-bold">{fromCurrency}</p>
            <p className="text-sm text-gray-500">
              잔액: {formatAmount(availableAmount, fromCurrency)} {fromCurrency}
            </p>
          </div>
          <img
            src={getCountryFlagURL(fromCurrency)}
            alt={fromCurrency}
            className="w-10 h-10"
          />
        </div>

        <button
          onClick={() => {
            setFromCurrency(toCurrency);
            setToCurrency(fromCurrency);
            setAmountInput("");
            setConvertedAmount(0);
          }}
          className="w-full py-2 bg-gray-200 text-gray-700 font-medium rounded-lg my-4"
        >
          통화 변경 (↔️)
        </button>

        <input
          type="number"
          value={amountInput}
          onChange={handleAmountChange}
          className="w-full text-lg font-bold outline-none border p-2 rounded-lg"
          placeholder="환전할 금액을 입력하세요."
        />

        <div className="text-center my-4">
          <p className="text-lg font-bold">↓</p>
          <p className="text-gray-500 text-sm">
                {fromCurrency === "KRW" 
                ? `1000 KRW = ${(1000 / exchangeRate).toFixed(2)} USD`
                : `1 USD = ${exchangeRate.toFixed(2)} KRW`
                }
          </p>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">도착 통화</p>
            <p className="text-lg font-bold">{toCurrency}</p>
            <p className="text-sm text-gray-500">
              환전 후 예상 금액: {formatAmount(convertedAmount, toCurrency)} {toCurrency}
            </p>
          </div>
          <img
            src={getCountryFlagURL(toCurrency)}
            alt={toCurrency}
            className="w-10 h-10"
          />
        </div>

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
