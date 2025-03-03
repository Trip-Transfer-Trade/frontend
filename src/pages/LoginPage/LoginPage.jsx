import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

import logo from "../../assets/images/logo.svg";

export default function LoginPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function login() {
    setError(null); // 이전 에러 초기화
    try {
      console.log("🚀 로그인 요청:", { userName, password });

      // ✅ 로그인 API 요청 (httpOnly 쿠키 사용)
      await axiosInstance.post(
        "/auth/login",
        { userName, password },
        { withCredentials: true } // ✅ 쿠키 저장 허용
      );

      console.log("✅ 로그인 성공 (쿠키 저장됨)");

      // ✅ 로그인 성공 후 대시보드로 이동
      navigate("/");
    } catch (err) {
      console.error("❌ 로그인 실패:", err.response?.data || err.message);
      setError("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  }

  function signup() {
    navigate("/auth/signup/profile");
  }

  return (
    <div className="mx-auto p-6">
      <div className="flex flex-col items-center space-y-6">
        <div className="p-12">
          <img src={logo} alt="Logo" />
        </div>

        <div className="w-full space-y-4">
          <h2 className="text-xl font-bold">로그인</h2>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="아이디 입력"
              className="h-12 w-full rounded-md border border-gray-300 bg-gray-50 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호 입력"
              className="h-12 w-full rounded-md border border-gray-300 bg-gray-50 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>} {/* 로그인 실패 시 오류 표시 */}

          <div className="space-y-4">
            <button
              className="h-12 w-full rounded-md bg-brand-blue text-white"
              onClick={login}
            >
              로그인하기
            </button>
            <button
              className="h-12 w-full rounded-md bg-blue-100 text-blue-600"
              onClick={signup}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
