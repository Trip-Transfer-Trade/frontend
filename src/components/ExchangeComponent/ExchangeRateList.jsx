import ExchangeRateItem from "./ExchangeRateItem";

export default function ExchangeRateList({
  exchangeRates = [],
  showLimited = false,
}) {
  const visibleData = showLimited ? exchangeRates.slice(0, 3) : exchangeRates; // 조건에 따라 3개 or 전체 표시

  return (
    <div className="w-full mx-auto">
      {visibleData.length === 0 ? (
        <p className="text-center text-gray-500">환율 정보가 없습니다.</p>
      ) : (
        visibleData.map((item, index) => (
          <ExchangeRateItem key={index} {...item} />
        ))
      )}
    </div>
  );
}
