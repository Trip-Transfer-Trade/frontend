import { useNavigate } from "react-router-dom";

import {
  getCountryCodeFromCurrency,
  getKoreanUnitFromCurrency,
  getCurrencySymbolFromCurrency,
} from "../../constants/currencyMappings";

export default function OwnedCurrencyItem({ currencyCode, totalAmount }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-300"
      onClick={() => {
        navigate(`/exchange/wallets/${currencyCode}`, {
          state: { totalAmount },
        });
      }}
    >
      <span className="flex items-center space-x-2">
        <img
          src={`https://flagsapi.com/${getCountryCodeFromCurrency(
            currencyCode
          )}/flat/64.png`}
          alt={`${getCountryCodeFromCurrency(currencyCode)} flag`}
          className="h-10"
        />
        <span className="font-bold">
          {getKoreanUnitFromCurrency(currencyCode)}
        </span>
      </span>
      <span className="text-right font-bold">
        {getCurrencySymbolFromCurrency(currencyCode)} {totalAmount}
      </span>
    </div>
  );
}
``;
