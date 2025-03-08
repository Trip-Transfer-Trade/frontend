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
  return response.data.data.rates;
};

// 송금 내역 조회
export const fetchHistories = async (accountId) => {
  console.log("송금내역 조회 호출")
  const response = await apiClient.get(`/exchanges/transactions/${accountId}`);
  return response.data.data;
}

// 송금하기
export const fetchTransaction = async (transactionData)=>{
  console.log("송금 실행")
  try {
    await apiClient.post(`/exchanges/transactions`, transactionData);
  } catch (error) {
    console.error("송금 실패", error);
    throw error;
  }}

