import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // Vite Proxy를 사용해 자동 변환
  withCredentials: true, // 모든 요청에 쿠키 포함
});

export default axiosInstance;
