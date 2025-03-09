import apiClient from "./apiClient";

//사용자 정보 조희 
export const fetchUserInfo = async () => {
  const response = await apiClient.get("/members/info");
  return response.data.data;
};

//로그아웃
export const logout = async () => {
    try {
        await apiClient.post("/members/logout");
        console.log("로그아웃 성공");
      } catch (error) {
        console.error("로그아웃 실패", error);
      }
}

