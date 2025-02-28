import {
  getCountryCodeFromCurrency,
  getCountryNameFromCurrency,
  getCurrencySymbolFromCurrency,
} from "../../constants/currencyMappings";

export default function OwnedCurrencyItem({ currencyCode, amount }) {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <span className="flex items-center space-x-2">
        <img
          src={`https://flagsapi.com/${getCountryCodeFromCurrency(
            currencyCode
          )}/flat/64.png`}
          alt={`${getCountryCodeFromCurrency(currencyCode)} flag`}
          className="h-10"
        />
        <span className="font-bold">
          {getCountryNameFromCurrency(currencyCode)}
        </span>
      </span>
      <span className="text-right font-bold">
        {getCurrencySymbolFromCurrency(currencyCode)} {amount}
      </span>
    </div>
  );
}
``;
