import axios from "axios";

const apiClient = axios.create({
  //baseURL: "https://52.78.46.146:8080/api",
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // 쿠키 기반 인증
});

export default apiClient;
