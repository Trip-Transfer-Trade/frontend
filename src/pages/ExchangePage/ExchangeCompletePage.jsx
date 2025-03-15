import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchExchangeRates, fetchExchange, fetchWalletDetail } from "../../apis/exchanges";
import BackNavigation from "../../components/BackNavigation";

const countryCodeMap = {
  KRW: "KR",
  USD: "US",
};

function getCountryFlagURL(currency) {
  return `https://flagsapi.com/${countryCodeMap[currency]}/flat/64.png`;
}

export default function StockExchangePage() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ 기존 방식 유지 (location.state에서 받음)
  const { tripId, activeTab, depositKRW = 0, depositUSD = 0 } = location.state || {};
  console.log("🚀 [Stock] 초기 State:", location.state);

  // 통화 상태
  const [fromCurrency, setFromCurrency] = useState("KRW");
  const [toCurrency, setToCurrency] = useState("USD");

  // 환전 데이터 상태
  const [amountInput, setAmountInput] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);

  // ✅ API에서 불러온 최신 잔액 데이터
  const [apiKRW, setApiKRW] = useState(0);
  const [apiUSD, setApiUSD] = useState(0);

  // 🟢 내 지갑 데이터 가져오기 (API)
  useEffect(() => {
    async function fetchWallet() {
      try {
        const walletData = await fetchWalletDetail(fromCurrency);
        console.log("🚀 [Stock] 내 지갑 데이터:", walletData);

        const totalBalance = walletData.reduce((acc, item) => acc + item.amount, 0);
        if (fromCurrency === "KRW") {
          setApiKRW(totalBalance);
        } else {
          setApiUSD(totalBalance);
        }

        // 🔥 기존 값과 API 값 비교해서 다르면 경고 출력
        if (fromCurrency === "KRW" && depositKRW !== totalBalance) {
          console.warn(`⚠️ [Stock] KRW 잔액 불일치! (location: ${depositKRW}, API: ${totalBalance})`);
        }
        if (fromCurrency === "USD" && depositUSD !== totalBalance) {
          console.warn(`⚠️ [Stock] USD 잔액 불일치! (location: ${depositUSD}, API: ${totalBalance})`);
        }
      } catch (error) {
        console.error("❌ [Stock] 내 지갑 불러오기 실패:", error);
      }
    }
    fetchWallet();
  }, [fromCurrency]);

  // 🟢 환율 가져오기
  useEffect(() => {
    async function fetchRate() {
      try {
        const rates = await fetchExchangeRates();
        console.log("🚀 [Stock] 환율 데이터:", rates);

        const usdRate = rates.find(rate => rate.cur_nm === "미국 달러");
        setExchangeRate(usdRate ? parseFloat(usdRate.tts.replace(/,/g, "")) : 1);
      } catch (error) {
        console.error("❌ [Stock] 환율 정보 불러오기 실패", error);
      }
    }
    fetchRate();
  }, [fromCurrency, toCurrency]);

  // ✅ 사용 가능한 잔액 (API 값 우선 사용, 없으면 location.state 값 사용)
  const availableAmount = fromCurrency === "KRW" ? apiKRW || depositKRW : apiUSD || depositUSD;

  // 🟢 입력 값 변경 시 환산 금액 업데이트
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
      setConvertedAmount(fromCurrency === "KRW" ? availableAmount / exchangeRate : availableAmount * exchangeRate);
    } else {
      setAmountInput(value);
      setConvertedAmount(fromCurrency === "KRW" ? numericValue / exchangeRate : numericValue * exchangeRate);
    }
  };

  // 🟢 통화 변경 기능
  const handleCurrencySwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmountInput("");
    setConvertedAmount(0);
  };

  // 🟢 환전 API 호출
  const handleExchange = async () => {
    if (!amountInput || Number(amountInput) <= 0) {
      alert("환전할 금액을 입력하세요!");
      return;
    }

    try {
      const payload = {
        fromCurrency,
        toCurrency,
        amount: Number(amountInput),
        tripId, // 🚀 서버가 필요하면 포함
      };

      console.log("🚀 [Stock] 환전 요청 Payload:", JSON.stringify(payload, null, 2));

      const response = await fetchExchange(payload);
      console.log("✅ [Stock] 환전 응답:", response);

      alert(`${amountInput} ${fromCurrency}가 ${response.convertedAmount.toFixed(2)} ${toCurrency}로 환전되었습니다.`);
      navigate(`/trip/${tripId}/portfolio`);
    } catch (error) {
      console.error("❌ [Stock] 환전 실패:", error);
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

        {/* 출발 통화 정보 */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">출발 통화</p>
            <p className="text-lg font-bold">{fromCurrency}</p>
            <p className="text-sm text-gray-500">
              잔액 (State: {depositKRW} | API: {apiKRW}): {availableAmount.toLocaleString()} {fromCurrency}
            </p>
          </div>
          <img src={getCountryFlagURL(fromCurrency)} alt={fromCurrency} className="w-10 h-10" />
        </div>

        {/* 환전하기 버튼 */}
        <button onClick={handleExchange} className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg mt-4">
          환전하기
        </button>
      </div>
    </div>
  );
}
