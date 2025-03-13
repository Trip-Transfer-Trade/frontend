import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.triptransfertrade.shop/api",
  withCredentials: true, // 쿠키 기반 인증
});

export default apiClient;
