import apiClient from "./apiClient";

// 신규 계좌 개설
export const createAccount = async (accountType) => {
    console.log("createAccount 호출");
    const response = await apiClient.post("/accounts", { accountType }); // 인증 헤더 제거
    return response.data; // 계좌번호 반환
  };

  
export const checkLoginStatus = async () => {
    try {
        const response = await apiClient.get("/members/status", {
            withCredentials: true, // 쿠키 포함 요청
        });

        console.log("🔍 로그인 상태 응답 (백엔드 API):", response.data);
        return response.data; // `true` 또는 `false`
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.warn(" 401 Unauthorized - 로그아웃 상태로 설정");
            return false; // 401이면 로그아웃 상태
        }
        console.error("로그인 상태 확인 실패:", error);
        return false; // 기타 오류 시 기본적으로 로그아웃 상태 처리
    }
};

//로그인, 계좌 상태 확인 
export const getAccountStatus = async () => {
    try {
      const response = await apiClient.get("/accounts/status");
      
      // 🔥 status가 객체라면 문자열 값만 반환
      if (response.data && typeof response.data === "object" && response.data.status) {
        return response.data.status;
      }
      
      return response.data; // 문자열이 바로 오면 그대로 반환
    } catch (error) {
      console.error("계좌 상태 조회 실패:", error);
      return "NOT_LOGGED_IN"; // 🚀 오류 발생 시 기본값 설정
    }
};

  
  