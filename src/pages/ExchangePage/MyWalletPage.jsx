import { useLocation } from "react-router-dom";

import BackNavigation from "../../components/BackNavigation";
import OwnedCurrencyList from "../../components/ExchangeComponent/OwnedCurrencyList";

export default function MyWalletPage() {
  const location = useLocation();

  // const ownedCurrencyData = [
  //   { currencyCode: "USD", amount: 45.67 },
  //   { currencyCode: "JPY", amount: 5000 },
  //   { currencyCode: "EUR", amount: 30.5 },
  //   { currencyCode: "GBP", amount: 25.75 },
  //   { currencyCode: "KRW", amount: 100000 },
  // ];

  const ownedCurrencyData = location.state?.userCurrencies || [];

  return (
    <div className="flex flex-col">
      <BackNavigation text="내 지갑" />
      <div className="px-6">
        <OwnedCurrencyList ownedCurrencyData={ownedCurrencyData} />
      </div>
    </div>
  );
}
