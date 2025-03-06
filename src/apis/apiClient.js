import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // 쿠키 기반 인증
});

export default apiClient;
