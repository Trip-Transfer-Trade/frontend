import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/images/logo.svg";

export default function LoginPage() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    console.log(id);
    console.log(password);
  }

  function signup() {
    console.log(id);
    console.log(password);
    navigate("/auth/signup/profile");
  }

  return (
    <div className="mx-auto p-6">
      <div className="flex flex-col items-center space-y-6">
        <div className="p-12">
          <img src={Logo} alt="Logo" />
        </div>

        <div className="w-full space-y-4">
          <h2 className="text-xl font-bold">로그인</h2>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="아이디 입력"
              className="h-12 w-full rounded-md border border-gray-300 bg-gray-50 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호 입력"
              className="h-12 w-full rounded-md border border-gray-300 bg-gray-50 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <button
              className="h-12 w-full rounded-md bg-blue-500 text-white"
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
