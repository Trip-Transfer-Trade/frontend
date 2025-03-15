import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import { fetchWalletDetail } from "../../apis/exchanges";

import { getCountryCodeFromCountryName } from "../../constants/countryMappings";
import { getCurrencySymbolFromCurrency } from "../../constants/currencyMappings";

import BackNavigation from "../../components/BackNavigation";

export default function WalletDetailPage() {
  const { currencyCode } = useParams();

  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;

  const [walletDetail, setWalletDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchWalletDetail(currencyCode);
        setWalletDetail(data);
      } catch (error) {
        console.error("내 지갑 상세 정보 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [currencyCode]);

  if (loading)
    return (
      <p className="text-center text-gray-500">내 지갑 정보를 불러오는 중...</p>
    );
  if (!walletDetail)
    return (
      <p className="text-center text-gray-500">내 지갑 정보가 없습니다.</p>
    );

  return (
    <div className="flex flex-col">
      <BackNavigation text="내 지갑" />
      <div className="px-6">
        <div>
          <p className="text-custom-gray-3 font-bold mb-2">총 보유 금액</p>
          <p className="text-4xl font-bold">
            {getCurrencySymbolFromCurrency(currencyCode)}{" "}
            {totalAmount.toLocaleString()}
          </p>
        </div>

        <hr className="my-6 h-[2px] bg-custom-gray-2 border-none" />

        <p className="text-custom-gray-3 font-bold mb-4">보유 내역</p>
        <div className="space-y-4">
          {walletDetail.map((goal) => (
            <div
              key={goal.accountId}
              className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-300"
            >
              <div className="flex items-center space-x-2">
                <img
                  src={
                    goal.country === "European Union" || goal.country === "EU"
                      ? "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg" // EU 국기 (CDN 이미지)
                      : `https://flagsapi.com/${getCountryCodeFromCountryName(
                          goal.country
                        )}/flat/64.png`
                  }
                  alt={`${goal.country} flag`}
                  className="h-8"
                  style={{
                    objectFit: "cover", // 국기 크기를 동일하게 조절
                    aspectRatio: "4 / 3", // 비율 유지 (EU 국기와 다른 국기 통일)
                  }}
                />
                <span>{goal.tripName}</span>
              </div>
              <div className="text-right">
                {getCurrencySymbolFromCurrency(currencyCode)}{" "}
                {goal.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
