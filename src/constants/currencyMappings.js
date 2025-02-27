export const currencyToCountryCodeMap = {
  // 유럽
  CHF: "CH", // 스위스
  DKK: "DK", // 덴마크
  EUR: "EU", // 유럽연합
  GBP: "GB", // 영국
  NOK: "NO", // 노르웨이
  SEK: "SE", // 스웨덴

  // 아시아
  AED: "AE", // 아랍에미리트
  BHD: "BH", // 바레인
  BND: "BN", // 브루나이
  CNY: "CN", // 중국
  HKD: "HK", // 홍콩
  IDR: "ID", // 인도네시아
  JPY: "JP", // 일본
  KRW: "KR", // 대한민국
  KWD: "KW", // 쿠웨이트
  MYR: "MY", // 말레이시아
  SAR: "SA", // 사우디아라비아
  SGD: "SG", // 싱가포르
  THB: "TH", // 태국

  // 북미
  CAD: "CA", // 캐나다
  USD: "US", // 미국

  // 오세아니아
  AUD: "AU", // 호주
  NZD: "NZ", // 뉴질랜드
};

export const currencyToCountryNameMap = {
  // 유럽
  CHF: "스위스",
  DKK: "덴마크",
  EUR: "유럽연합",
  GBP: "영국",
  NOK: "노르웨이",
  SEK: "스웨덴",

  // 아시아
  AED: "아랍에미리트",
  BHD: "바레인",
  BND: "브루나이",
  CNY: "중국",
  HKD: "홍콩",
  IDR: "인도네시아",
  JPY: "일본",
  KRW: "대한민국",
  KWD: "쿠웨이트",
  MYR: "말레이시아",
  SAR: "사우디아라비아",
  SGD: "싱가포르",
  THB: "태국",

  // 북미
  CAD: "캐나다",
  USD: "미국",

  // 오세아니아
  AUD: "호주",
  NZD: "뉴질랜드",
};

export const currencyToSymbolMap = {
  // 유럽
  CHF: "CHF", // 스위스 프랑
  DKK: "kr", // 덴마크 크로네
  EUR: "€", // 유로
  GBP: "£", // 영국 파운드
  NOK: "kr", // 노르웨이 크로네
  SEK: "kr", // 스웨덴 크로나

  // 아시아
  AED: "د.إ", // 아랍에미리트 디르함
  BHD: ".د.ب", // 바레인 디나르
  BND: "B$", // 브루나이 달러
  CNY: "¥", // 중국 위안
  HKD: "HK$", // 홍콩 달러
  IDR: "Rp", // 인도네시아 루피아
  JPY: "¥", // 일본 엔
  KRW: "₩", // 대한민국 원
  KWD: "د.ك", // 쿠웨이트 디나르
  MYR: "RM", // 말레이시아 링깃
  SAR: "﷼", // 사우디아라비아 리얄
  SGD: "S$", // 싱가포르 달러
  THB: "฿", // 태국 바트

  // 북미
  CAD: "C$", // 캐나다 달러
  USD: "$", // 미국 달러

  // 오세아니아
  AUD: "A$", // 호주 달러
  NZD: "NZ$", // 뉴질랜드 달러
};

// 통화 코드에서 국가 코드 반환
export const getCountryCodeFromCurrency = (currencyCode) => {
  return currencyToCountryCodeMap[currencyCode] || "UNKNOWN";
};

// 통화 코드에서 국가 이름 반환
export const getCountryNameFromCurrency = (currencyCode) => {
  return currencyToCountryNameMap[currencyCode] || "알 수 없음";
};

// 통화 코드에서 화폐 기호 반환
export const getCurrencySymbolFromCurrency = (currencyCode) => {
  return currencyToSymbolMap[currencyCode] || "UNKNOWN";
};
