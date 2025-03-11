export const countryNameToCountryCodeMap = {
  // 유럽
  스위스: "CH",
  덴마크: "DK",
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
  말레이시아: "MY",
  사우디아라비아: "SA",
  싱가포르: "SG",
  태국: "TH",

  // 북미
  캐나다: "CA",
  미국: "US",

  // 오세아니아
  호주: "AU",
  뉴질랜드: "NZ",
};

// 국가 이름을 국가 코드로 변환하는 함수
export const getCountryCodeFromCountryName = (countryName) => {
  return countryNameToCountryCodeMap[countryName] || "UNKNOWN";
};
