import apiClient from "./apiClient";

// 사용자 보유 통화 조회
export const fetchUserCurrencies = async () => {
  console.log("fetchUserCurrencies 호출");
  const response = await apiClient.get("/exchanges/wallet");
  return response.data.data;
};

// 환율 정보 조회
export const fetchExchangeRates = async () => {
  console.log("fetchExchangeRates 호출");
  const response = await apiClient.get("/exchanges/rate");
  return response.data.rates;
};
