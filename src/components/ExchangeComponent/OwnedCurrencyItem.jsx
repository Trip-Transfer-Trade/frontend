import {
  getCountryCodeFromCurrency,
  getKoreanUnitFromCurrency,
  getCurrencySymbolFromCurrency,
} from "../../constants/currencyMappings";

export default function OwnedCurrencyItem({ currencyCode, amount }) {
  return (
    <div className="flex justify-between items-center px-2 py-4 bg-white rounded-lg border border-gray-300">
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
        {getCurrencySymbolFromCurrency(currencyCode)} {amount}
      </span>
    </div>
  );
}
``;
