import { useNavigate } from "react-router-dom";
import {
  getCountryCodeFromCountryName,
  getCurrencyCodeFromCountryName,
} from "../../constants/countryMappings";

export default function ExchangeRateItem({
  changePrice,
  changeRate,
  cur_nm,
  tts,
}) {
  const navigate = useNavigate();

  function parseCountryName(cur_nm) {
    if (!cur_nm || typeof cur_nm !== "string") return "UNKNOWN";

    if (cur_nm.split(" ")[0] === "위안화") {
      return "중국";
    } else if (cur_nm.split(" ")[0] === "유로") {
      return "유럽연합";
    } else {
      return cur_nm.split(" ")[0];
    }
  }

  function handleClick() {
    const countryName = parseCountryName(cur_nm);
    const currencyCode = getCurrencyCodeFromCountryName(countryName);
    console.log("countryName", countryName);

    navigate(`/exchange/rates/${currencyCode}`, {
      state: { changePrice, changeRate, cur_nm, tts },
    });
  }

  return (
    <div
      className="flex items-center justify-between px-2 py-4"
      onClick={handleClick}
    >
      <span className="flex items-center space-x-2">
        <img
          src={`https://flagsapi.com/${getCountryCodeFromCountryName(
            parseCountryName(cur_nm)
          )}/flat/64.png`}
          alt={`${getCountryCodeFromCountryName(
            parseCountryName(cur_nm)
          )} flag`}
          className="h-10"
        />
        <span>{cur_nm}</span>
      </span>
      <span className="text-right">
        <span className="block text-lg">{tts}원</span>
        <span
          className={`text-sm ${
            changePrice > 0 ? "text-red-500" : "text-blue-500"
          }`}
        >
          {changePrice}원 ({changeRate}%)
        </span>
      </span>
    </div>
  );
}
