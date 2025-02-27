import ExchangeRateItem from "./ExchangeRateItem";

export default function ExchangeRateList({
  exchangeRates,
  showLimited = false,
}) {
  const visibleData = showLimited ? exchangeRates.slice(0, 3) : exchangeRates; // 조건에 따라 3개 or 전체 표시

  return (
    <div className="flex-grow w-full mx-auto">
      {visibleData.map((item, index) => (
        <ExchangeRateItem key={index} {...item} />
      ))}
    </div>
  );
}
