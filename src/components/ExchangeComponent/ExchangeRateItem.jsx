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

    const firstWord = cur_nm.split(" ")[0];
    if (firstWord === "위안화") return "중국";
    if (firstWord === "유로") return "유럽연합";

    return firstWord;
  }

  function handleClick() {
    const countryName = parseCountryName(cur_nm);
    const currencyCode = getCurrencyCodeFromCountryName(countryName);

    console.log("countryName", countryName);

    navigate(`/exchange/rates/${currencyCode}`, {
      state: { changePrice, changeRate, cur_nm, tts },
    });
  }

  const countryName = parseCountryName(cur_nm);
  const countryCode = getCountryCodeFromCountryName(countryName);
  const flagSrc =
    countryCode === "EU"
      ? "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
      : `https://flagsapi.com/${countryCode}/flat/64.png`;

  return (
    <div
      className="flex items-center justify-between px-2 py-4"
      onClick={handleClick}
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
        <span>{cur_nm}</span>
      </span>
      <span className="text-right">
        <span className="block text-lg">{tts}원</span>
        <span
          className={`text-sm ${
            changePrice > 0 ? "text-red-500" : "text-blue-500"
          }`}
        >
          {changePrice > 0 ? `+${changePrice}` : changePrice}원 (
          {changeRate > 0 ? `+${changeRate}` : changeRate}%)
        </span>
      </span>
    </div>
  );
}
