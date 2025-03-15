export const countryNameToCountryCodeMap = {
  // 유럽
  스위스: "CH",
  덴마아크: "DK",
  유럽연합: "EU",
  영국: "GB",
  노르웨이: "NO",
  스웨덴: "SE",

  // 아시아
  아랍에미리트: "AE",
  바레인: "BH",
  브루나이: "BN",
  중국: "CN",
  홍콩: "HK",
  인도네시아: "ID",
  일본: "JP",
  대한민국: "KR",
  쿠웨이트: "KW",
  말레이지아: "MY",
  사우디: "SA",
  싱가포르: "SG",
  태국: "TH",

  // 북미
  캐나다: "CA",
  미국: "US",

  // 오세아니아
  호주: "AU",
  뉴질랜드: "NZ",
};

export const countryNameToCurrencyMap = {
  // 유럽
  스위스: "CHF",
  덴마아크: "DKK",
  유럽연합: "EUR",
  영국: "GBP",
  노르웨이: "NOK",
  스웨덴: "SEK",

  // 아시아
  아랍에미리트: "AED",
  바레인: "BHD",
  브루나이: "BND",
  중국: "CNH",
  홍콩: "HKD",
  인도네시아: "IDR",
  일본: "JPY",
  대한민국: "KRW",
  한국:"KRW",
  쿠웨이트: "KWD",
  말레이지아: "MYR",
  사우디: "SAR",
  싱가포르: "SGD",
  태국: "THB",

  // 북미
  캐나다: "CAD",
  미국: "USD",

  // 오세아니아
  호주: "AUD",
  뉴질랜드: "NZD",
};

// 국가 이름을 국가 코드로 변환하는 함수
export const getCountryCodeFromCountryName = (countryName) => {
  return countryNameToCountryCodeMap[countryName] || "UNKNOWN";
};

// 국가 이름을 통화 코드로 변환하는 함수
export const getCurrencyCodeFromCountryName = (countryName) => {
  return countryNameToCurrencyMap[countryName] || "UNKNOWN";
};
