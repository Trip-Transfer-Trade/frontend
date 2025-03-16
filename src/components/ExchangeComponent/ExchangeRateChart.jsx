import { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { fetchExchangeRateChart } from "../../apis/exchanges";

export default function ExchangeRateChart({
  currencyCode = "USD",
  showPeriodButtons = true,
}) {
  const [selectedPeriod, setSelectedPeriod] = useState("6M");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateStr) => {
    if (dateStr.length === 8) {
      return `${dateStr.substring(0, 4)}-${dateStr.substring(
        4,
        6
      )}-${dateStr.substring(6, 8)}`;
    }
    return dateStr;
  };

  const getPeriodDays = (period) => {
    switch (period) {
      case "1M":
        return 30;
      case "3M":
        return 90;
      case "6M":
        return 180;
      case "1Y":
        return 365;
      default:
        return 365;
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const days = getPeriodDays(selectedPeriod);

      // JPY 또는 IDR이면 (100) 붙이기
      const adjustedCurrencyCode = ["JPY", "IDR"].includes(currencyCode)
        ? `${currencyCode}(100)`
        : currencyCode;

      const response = await fetchExchangeRateChart(adjustedCurrencyCode, days);
      if (!response) {
        throw new Error("데이터가 없습니다.");
      }
      const formattedData = response
        .map((data) => ({
          date: formatDate(data.date),
          rate: Number.parseFloat(data.rate.replace(/,/g, "")), // 쉼표 제거 후 숫자로 변환
        }))
        .reverse();
      setChartData(formattedData);
    } catch (error) {
      console.error("❌ 환율 차트 불러오기 실패", error);
      setError("환율 데이터를 불러오는데 실패했습니다");
    } finally {
      setLoading(false);
    }
  }, [currencyCode, selectedPeriod]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const minData = chartData.reduce(
    (prev, curr) => (curr.rate < prev.rate ? curr : prev),
    { rate: Infinity }
  );
  const maxData = chartData.reduce(
    (prev, curr) => (curr.rate > prev.rate ? curr : prev),
    { rate: -Infinity }
  );

  const yPadding = (maxData.rate - minData.rate) * 0.1;
  const yMin = minData.rate - yPadding;
  const yMax = maxData.rate + yPadding;

  return (
    <div className="w-full">
      <div className="relative h-[300px] mb-10">
        {loading ? (
          <p className="text-center text-gray-500 pt-16">
            환율 데이터를 불러오는 중...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 pt-16">{error}</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ left: 40, right: 40 }}>
              <XAxis
                dataKey="date"
                angle={-45}
                height={100}
                textAnchor="end"
                tick={{ fontSize: 10 }}
              />
              <YAxis
                domain={[yMin, yMax]}
                tick={false}
                axisLine={false}
                width={0}
              />
              <Tooltip formatter={(value) => `${value.toLocaleString()}원`} />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      {showPeriodButtons && (
        <div className="flex justify-between space-x-2 px-6">
          {["1M", "3M", "6M", "1Y"].map((period) => (
            <button
              key={period}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                selectedPeriod === period
                  ? "bg-brand-blue text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedPeriod(period)}
            >
              {period === "1M"
                ? "1개월"
                : period === "3M"
                ? "3개월"
                : period === "6M"
                ? "6개월"
                : "1년"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
