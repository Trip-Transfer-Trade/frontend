import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoBell } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import LoginModal from "../pages/LoginPage/LoginModal";
import apiClient from "../apis/apiClient";

import "./Header.css";

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const { isLoggedIn, updateLoginStatus } = useAuth();

  function getTitle() {
    if (location.pathname === "/trip") return "마이 트립 ✈️";
    else if (location.pathname === "/exchange") return "환전 지갑";
    else if (location.pathname === "/mypage") return "마이페이지";
    else return "";
  }

  const title = getTitle();

  const handleProtectedClick = (callback) => {
    updateLoginStatus();
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      callback();
    }
  };

  useEffect(() => {
    apiClient
      .get("/accounts/count")
      .then((response) => {
        setCount(response.data);
      })
      .catch((err) => {
        console.error("목표 count 가져오기 실패", err);
      });
  }, []);

  return (
    <div>
      <header className="header flex w-full justify-between px-6">
        <div className="flex items-center">
          {location.pathname === "/" ? (
            <img src="/assets/images/logo.svg" alt="Logo" className="logo" />
          ) : (
            <h1 className="text-xl font-bold">{title}</h1>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <GoBell
            className="text-2xl cursor-pointer"
            onClick={() =>
              handleProtectedClick(() => navigate("/mypage/alarm"))
            }
          />
          <RxHamburgerMenu
            className="text-2xl cursor-pointer"
            onClick={() => handleProtectedClick(() => setIsMenuOpen(true))}
          />
        </div>
      </header>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {isMenuOpen && (
        <div className="side-menu fixed top-0 left-0 w-full h-full bg-white z-[1000]">
          <div className="p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">전체 메뉴</h2>
            <IoCloseOutline
              className="text-2xl cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>
          <nav className="p-6 space-y-4">
            <div className="mb-4">
              <h3 className="font-semibold text-lg border-b border-custom-gray-3 mb-2">
                마이 트립 ✈️
              </h3>
              <div className="pl-4 space-y-2">
                <button
                  className="w-full text-left py-2"
                  onClick={() => {
                    const destination = count < 1 ? "/trip" : "/trip/tripgoal";
                    navigate(destination);
                    setIsMenuOpen(false);
                  }}
                >
                  목표 생성
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-lg border-b border-custom-gray-3 mb-2">
                환전 지갑
              </h3>
              <div className="pl-4">
                <button
                  className="w-full text-left py-2"
                  onClick={() => {
                    navigate("/exchange?tab=지갑");
                    setIsMenuOpen(false);
                  }}
                >
                  내 지갑
                </button>
                <button
                  className="w-full text-left py-2"
                  onClick={() => {
                    navigate("/exchange?tab=환전");
                    setIsMenuOpen(false);
                  }}
                >
                  환전하기
                </button>
                <button
                  className="w-full text-left py-2"
                  onClick={() => {
                    navigate("/exchange?tab=환율");
                    setIsMenuOpen(false);
                  }}
                >
                  실시간 환율 조회
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg border-b border-custom-gray-3 mb-2">
                기타
              </h3>
              <div className="pl-4 space-y-2">
                <button
                  className="w-full text-left py-2"
                  onClick={() => {
                    navigate("/destination");
                    setIsMenuOpen(false);
                  }}
                >
                  여행지 Best10
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
