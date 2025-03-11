import { useEffect, useState } from "react";

import { fetchWallet } from "../../apis/exchanges";

import OwnedCurrencyList from "../../components/ExchangeComponent/OwnedCurrencyList";

export default function WalletTabContent() {
  const [ownedCurrencies, setOwnedCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchWallet();
        setOwnedCurrencies(data);
      } catch (error) {
        console.error("내 지갑 정보 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      {loading ? (
        <p className="text-center text-gray-500">
          내 지갑 정보를 불러오는 중...
        </p>
      ) : (
        <div className="flex flex-col">
          <p className="text-lg font-bold mb-6">내 지갑</p>
          <OwnedCurrencyList ownedCurrencyData={ownedCurrencies} />
        </div>
      )}
    </div>
  );
}
