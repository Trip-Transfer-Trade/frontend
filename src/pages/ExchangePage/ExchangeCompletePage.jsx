import { X } from "lucide-react"
import ExchangeCompleteResultCard from "../../components/ExchangeComponent/ExchangCompleteResultCard";
import { useLocation } from "react-router-dom";
import { getCurrencySymbolFromCurrency } from "../../constants/currencyMappings";
import { useNavigate } from "react-router-dom";

export default function ExchangeCompletePage() {
  const { state } = useLocation();
  const exchanges = state?.exchanges;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      
      <div className="absolute top-6 right-6">
        <button className="text-gray-400"
          onClick={() => {navigate(`/exchange`);}}>
          <X size={28} strokeWidth={1.5} />
        </button>
      </div>

      <div className="mt-16 mb-4">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      <h1 className="text-[24px] font-bold mb-2">환전 완료</h1>

      <div className="relative w-42 h-42 mb-6">
        <img
          src="/public/assets/images/exchange/completed.svg"
          alt="Cute character with coins"
          className="w-full h-full object-contain"
        />
      </div>
      {Object.keys(exchanges).map((currency) => {
        const data = exchanges[currency];
        console.log(currency, exchanges);
        return (
          <ExchangeCompleteResultCard
            key={currency}
            title={currency === "KRW" ? "국내 투자금" : "해외 투자금"}
            principal={currency === "KRW" ? `${data.amount.toLocaleString()}원` : `$${data.amount}`}
            exchangeRate={parseFloat(data.rate).toFixed(2)}
            exchangeAmount={`${data.toAmount.toLocaleString()}${getCurrencySymbolFromCurrency(data.currency)}`}
            bgColor={currency === "KRW" ? "bg-blue-50" : "bg-amber-50"}
            subBgColor={currency === "KRW" ? "bg-blue-100" : "bg-amber-100"}
          />
        );
      })}
    </div>
  );
}
