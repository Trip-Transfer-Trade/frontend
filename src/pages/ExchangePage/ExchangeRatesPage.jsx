import { useLocation } from "react-router-dom";

import BackNavigation from "../../components/BackNavigation";
import ExchangeRateList from "../../components/ExchangeComponent/ExchangeRateList";

export default function ExchangeRatesPage() {
  const location = useLocation();

  // const exchangeRates = [
  //   {
  //     changePrice: 0.32,
  //     changeRate: 0.08,
  //     cur_nm: "아랍에미리트 디르함",
  //     tts: "393.74",
  //   },
  //   {
  //     changePrice: -5.01,
  //     changeRate: -0.55,
  //     cur_nm: "호주 달러",
  //     tts: "912.35",
  //   },
  //   {
  //     changePrice: 3.05,
  //     changeRate: 0.08,
  //     cur_nm: "바레인 디나르",
  //     tts: "3,836.97",
  //   },
  //   {
  //     changePrice: -0.91,
  //     changeRate: -0.08,
  //     cur_nm: "브루나이 달러",
  //     tts: "1,080.63",
  //   },
  //   {
  //     changePrice: -1.37,
  //     changeRate: -0.14,
  //     cur_nm: "캐나다 달러",
  //     tts: "1,008.55",
  //   },
  // ];

  const exchangeRates = location.state?.exchangeRates || [];
  console.log(exchangeRates);

  return (
    <div className="flex flex-col">
      <BackNavigation text="실시간 환율" />
      <div className="px-6">
        <ExchangeRateList exchangeRates={exchangeRates} />
      </div>
    </div>
  );
}
