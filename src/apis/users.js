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
export const sendSms = async (phoneNumber) => {
    console.log("문자 전송");
    try {
        await apiClient.post("/members/send",{phoneNumber});
    } catch (error) {
        console.error("전송 실패", error);
        throw error;
      }
}

export const checkCode = async (checkData) =>{
    console.log("번호 인증");
    try{
        await apiClient.post("/members/check",checkData);
    } catch(error){
        console.log("인증 실패");
        throw error;
    }
}

