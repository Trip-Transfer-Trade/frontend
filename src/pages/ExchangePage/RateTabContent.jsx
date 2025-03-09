import { useEffect, useState } from "react";

import { fetchExchangeRates } from "../../apis/exchanges";

import { AiOutlineQuestionCircle } from "react-icons/ai";

import ExchangeRateList from "../../components/ExchangeComponent/ExchangeRateList";

export default function RateTabContent() {
  const [exchangeRates, setExchangeRates] = useState([
    // 수정 필요
    {
      changePrice: 0.32,
      changeRate: 0.08,
      cur_nm: "아랍에미리트 디르함",
      tts: "393.74",
    },
    {
      changePrice: -5.01,
      changeRate: -0.55,
      cur_nm: "호주 달러",
      tts: "912.35",
    },
    {
      changePrice: 3.05,
      changeRate: 0.08,
      cur_nm: "바레인 디나르",
      tts: "3,836.97",
    },
    {
      changePrice: -0.91,
      changeRate: -0.08,
      cur_nm: "브루나이 달러",
      tts: "1,080.63",
    },
    {
      changePrice: -1.37,
      changeRate: -0.14,
      cur_nm: "캐나다 달러",
      tts: "1,008.55",
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const rates = await fetchExchangeRates();
        setExchangeRates(rates);
      } catch (error) {
        console.error("환율 정보 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      {loading ? (
        <p className="text-center text-gray-500">환율 정보를 불러오는 중...</p>
      ) : (
        <div className="flex flex-col">
          <p className="text-lg font-bold">실시간 환율</p>
          <p className="flex items-center text-sm text-gray-400">
            <AiOutlineQuestionCircle className="mr-1" />
            통화 선택 시 환율 차트를 확인할 수 있어요.
          </p>

          <ExchangeRateList exchangeRates={exchangeRates} />
        </div>
      )}
    </div>
  );
}
