import { getCountryCodeFromCountryName } from "../../constants/countryMappings";

export default function ExchangeRateItem({
  changePrice,
  changeRate,
  cur_nm,
  tts,
}) {
  function parseCountryName(cur_nm) {
    if (typeof cur_nm !== "string" || cur_nm.trim() === "") {
      return "UNKNOWN"; // 예외 처리: 빈 값 또는 문자열이 아닌 경우
    }
    return cur_nm.split(" ")[0]; // countryName
  }

  function isPositive(changePrice) {
    return !isNaN(changePrice) && changePrice > 0; // 숫자인지 확인 후 양수 여부 판별
  }

  return (
    <div className="flex items-center justify-between p-2">
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
        <span className="font-bold">{cur_nm}</span>
      </span>
      <span className="text-right font-bold">
        <span className="block text-lg">{tts}원</span>
        <span
          className={`text-sm ${
            isPositive(changePrice) ? "text-red-500" : "text-blue-500"
          }`}
        >
          {changePrice}원({changeRate}%)
        </span>
      </span>
    </div>
  );
}
