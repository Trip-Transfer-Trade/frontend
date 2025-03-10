import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../apis/apiClient"
import InputField from "../../components/InputField";
import LoginModal from "./LoginModal";

export default function LoginPage() {
  const logo = "/assets/images/logo.svg";
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  async function login() {
    setError(null);
    try {
      await apiClient.post("/members/login", { userName, password });
      navigate("/");
    } catch (error) {
      console.error("로그인 오류:", error);
    setError(error.response?.data?.message || "아이디 또는 비밀번호가 잘못되었습니다.");
    }
  }

  return (
    <div className="mx-auto p-6">
      <div className="flex flex-col items-center space-y-6">
        <div className="p-12">
          <img src={logo} alt="Logo" />
        </div>
        <div className="w-full space-y-4">
          <h2 className="text-xl font-bold">로그인</h2>
          <InputField
            label="아이디"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputField
            label="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="h-12 w-full rounded-md bg-brand-blue text-white font-bold"
            onClick={login}
          >
            로그인
          </button>

          <button
            className="h-12 w-full rounded-md bg-blue-100 text-brand-blue font-bold"
            onClick={() => {
              navigate("/auth/signup");
            }}
          >
            회원가입
          </button>

          <button onClick={() => setModalOpen(true)}>모달창</button>
          <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </div>
    </div>
  );
}
