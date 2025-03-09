import apiClient from "./apiClient";

// 내 지갑 조회
export const fetchWallet = async () => {
  console.log("fetchWallet 호출");
  const response = await apiClient.get("/exchanges/myWallet");
  return response.data.data;
};

// 내 지갑 상세 조회
export const fetchWalletDetail = async (currencyCode) => {
  console.log(`fetchWalletDetail 호출: currencyCode=${currencyCode}`);

  const response = await apiClient.get("/exchanges/myWallet/detail", {
    params: { currencyCode },
  });

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
  console.log("송금내역 조회 호출");
  const response = await apiClient.get(`/exchanges/transactions/${accountId}`);
  return response.data.data;
};

// 송금하기
export const fetchTransaction = async (transactionData) => {
  console.log("송금 실행");
  try {
    await apiClient.post(`/exchanges/transactions`, transactionData);
  } catch (error) {
    console.error("송금 실패", error);
    throw error;
  }
};
