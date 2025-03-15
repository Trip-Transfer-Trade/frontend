import { useState } from "react";

import {
  getCountryCodeFromCurrency,
  getKoreanUnitFromCurrency,
  getCurrencySymbolFromCurrency,
} from "../../constants/currencyMappings";

import { fetchWalletDetail } from "../../apis/exchanges";

export default function OwnedCurrencyItem({ currencyCode, totalAmount }) {
  const [expandedCurrencyCode, setExpandedCurrencyCode] = useState(null);
  const [walletDetail, setWalletDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleDetails = async () => {
    if (expandedCurrencyCode === currencyCode) {
      setExpandedCurrencyCode(null);
      return;
    }

    setExpandedCurrencyCode(currencyCode);

    if (!walletDetail) {
      setLoading(true);
      try {
        const data = await fetchWalletDetail(currencyCode);
        setWalletDetail(data);
      } catch (error) {
        console.error("내 지갑 상세 정보 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const countryCode = getCountryCodeFromCurrency(currencyCode);
  const flagSrc =
    countryCode === "EU"
      ? "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
      : `https://flagsapi.com/${countryCode}/flat/64.png`;

  return (
    <div className="bg-white rounded-lg border border-gray-300">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={toggleDetails}
      >
        <span className="flex items-center space-x-2">
          <img
            src={flagSrc}
            alt={`${countryCode} flag`}
            className="h-8"
            style={{
              objectFit: "cover", // 국기 크기를 동일하게 조절
              aspectRatio: "4 / 3", // 비율 유지 (EU 국기와 다른 국기 통일)
            }}
          />
          <span>{getKoreanUnitFromCurrency(currencyCode)}</span>
        </span>
        <span className="text-right">
          {getCurrencySymbolFromCurrency(currencyCode)}{" "}
          {totalAmount?.toLocaleString()}
        </span>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expandedCurrencyCode === currencyCode
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        {expandedCurrencyCode === currencyCode && (
          <div className="p-4 bg-custom-gray-1 border-t border-gray-300 rounded-b-lg">
            {loading ? (
              <p className="text-gray-500">로딩 중...</p>
            ) : walletDetail && walletDetail.length > 0 ? (
              <div>
                {walletDetail.map((goal) => (
                  <div
                    key={goal.accountId}
                    className="flex justify-between items-center text-gray-800"
                  >
                    <span>{goal.tripName}</span>
                    <span className="text-right">
                      {getCurrencySymbolFromCurrency(currencyCode)}{" "}
                      {goal.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">보유 내역이 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
