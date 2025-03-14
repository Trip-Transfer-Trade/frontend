import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../apis/apiClient";
import InputField from "../../components/InputField";

export default function LoginPage() {
  const logo = "/assets/images/logo.svg";
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function login() {
    setError(null);
    try {
      await apiClient.post("/members/login", { userName, password });
      navigate("/");
    } catch (error) {
      console.error("로그인 오류:", error);
      setError(
        error.response?.data?.message ||
          "아이디 혹은 비밀번호가 잘못 입력되었습니다."
      );
    }
  }

  return (
    <div className="mx-auto p-6">
      <div className="flex flex-col items-center">
        <div className="p-16">
          <img src={logo} alt="Logo" />
        </div>

        <div className="w-full ">
          <h2 className="text-xl font-bold mb-4">로그인</h2>
          <div className="space-y-2">
            <InputField
              placeholder="아이디 입력"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <InputField
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="mt-8 space-y-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}
