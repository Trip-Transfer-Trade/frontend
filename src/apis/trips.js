import apiClient from "./apiClient";

export const fetchTripByTripId = async (tripId) =>{
    console.log("trip 정보 가져오기기")
    try {
        const response = await apiClient.get(`/trips/${tripId}`);
        return response.data.data;
      } catch (error) {
        console.error("여행 정보 가져오기 실패", error);
        throw error;
      }
}