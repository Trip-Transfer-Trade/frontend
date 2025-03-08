import apiClient from "./apiClient";

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

