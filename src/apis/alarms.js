import apiClient from "./apiClient";

//알림 내역 조회
export const fetchAlarmHistory = async () => {
    console.log("알림 내역 조회")
    try{
        const response = await apiClient.get(`/alarms`);
        return response.data.data;
    } catch (error){
        console.error(error);
    }
}

//알림 읽음
export const fetchReadAlarm = async (alarmId) =>{
    console.log("알림 읽음");
    try{
        await apiClient.patch(`/alarms/${alarmId}`);
    } catch(error){
        console.error(error);
    }
}

//알림 전체 읽음
export const fetchReadAlarmAll = async () =>{
    console.log("알림 전체 읽음");
    try{
        await apiClient.patch(`/alarms`);
    } catch(error){
        console.error(error);
    }
}

//알림 삭제
export const fetchDeleteAlarm = async (alarmId) =>{
    console.log("알림 삭제");
    try{
        await apiClient.delete(`/alarms/${alarmId}`);
    } catch(error){
        console.error(error);
    }
}

//알림 전체 삭제
export const fetchDeleteAllAlarm = async () =>{
    console.log("알림 전체 삭제");
    try{
        await apiClient.delete(`/alarms`);
    } catch(error){
        console.error(error);
    }
    
}