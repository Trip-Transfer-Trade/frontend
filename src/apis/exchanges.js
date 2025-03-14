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

// 환전 가능 금액 조회
export const fetchAvailableAmount = async () => {
  console.log("fetchAvailableAmount 호출");
  const response = await apiClient.get("/exchanges/myWallet/trip");
  return response.data.data;
};

// 목표 별 보유 통화 조회
export const fetchCurrenciesByGoal = async (accountId) => {
  console.log(`fetchCurrenciesByGoal 호출: accountId=${accountId}`);
  const response = await apiClient.get("/exchanges/myWallet/trip/all", {
    params: { accountId },
  });

  return response.data.data;
};

// 환율 정보 조회
export const fetchExchangeRates = async () => {
  console.log("fetchExchangeRates 호출");
  const response = await apiClient.get("/exchanges/rate");
  return response.data.data.rates;
};

// 환율 차트 데이터 조회
export const fetchExchangeRateChart = async (currencyCode, days) => {
  console.log(
    `fetchExchangeRateChart 호출: code=${currencyCode}, days=${days}`
  );
  const response = await apiClient.get("/exchanges/chart", {
    params: { code: currencyCode, days },
  });

  console.log(response.data.data.rates);
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

export const fetchExchangeGoal = async (exchangeGoal) =>{
  console.log("즉시 환전 실행");
  try{
    const response = await apiClient.post(`/exchanges/goal`,exchangeGoal);
    return response.data.data;
  } catch (error) {
    console.error("즉시 환전 실패", error);
    throw error;
  }
}

export const fetchExchangeBatch = async (exchangeData) => {
  console.log("다른 목표까지 같이 환전하기");
  try{
    const response = await apiClient.post(`/exchanges/batch`,exchangeData);
    return response.data.data;
  } catch (error){
    console.error("환전하기 오류",error);
    throw error;
  }
}

export const fetchExchange = async (exchangeData) =>{
  console.log("환전하기");
  try{
    const response = await apiClient.post(`/exchanges`,exchangeData);
    return response.data.data;
  } catch (error){
    console.error("환전하기 오류",error);
    throw error;
  }
}

//전체 랭킹 조회
export const fetchRankAll = async (currencyCode) =>{
  console.log("랭킹 조회");
  try{
    const response = await apiClient.get(`/exchanges/ranking/all`,{
      params:{currencyCode:currencyCode}
    });
    return response.data.data;
  } catch(error){
    console.error("랭킹 조회 오류",error);
    throw error;
  }
}

//랭킹 조회
export const fetchRank = async (tripId, currencyCode) =>{
  console.log(tripId,"과 유사한 랭킹 조회");
  try{
    const response = await apiClient.get(`/exchanges/ranking/${tripId}`, {
      params: { currencyCode:  currencyCode}});
    return response.data.data;
  } catch(error){
    console.error("조회 오류");
    throw error;
  }
}