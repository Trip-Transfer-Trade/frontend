import OwnedCurrencyItem from "./OwnedCurrencyItem";

export default function OwnedCurrencyList({
  ownedCurrencyData = [],
  showLimited = false,
}) {
  const visibleData = showLimited
    ? ownedCurrencyData.slice(0, 3)
    : ownedCurrencyData; // 조건에 따라 3개 or 전체 표시

  return (
    <div className="w-full mx-auto space-y-2">
      {visibleData.length === 0 ? (
        <p className="text-center text-gray-500">내 지갑 정보가 없습니다.</p>
      ) : (
        visibleData.map((item, index) => (
          <OwnedCurrencyItem key={index} {...item} />
        ))
      )}
    </div>
  );
}
