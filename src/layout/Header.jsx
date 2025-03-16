import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoBell } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import LoginModal from "../pages/LoginPage/LoginModal";

import "./Header.css";

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    updateLoginStatus(); // 로그인 상태 즉시 반영
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      callback();
    }
  };

  return (
    <div>
      <header className="header flex w-full justify-between px-6">
        {/* 로고 또는 타이틀 표시 */}
        <div className="flex items-center">
          {location.pathname === "/" ? (
            <img src="/logo.svg" alt="Logo" className="logo" />
          ) : (
            <h1 className="text-xl font-bold">{title}</h1>
          )}
        </div>

        {/* 아이콘 */}
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

      {/* 로그인 모달 */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* 사이드 메뉴 */}
      {isMenuOpen && (
        <div className="side-menu fixed top-0 left-0 w-full h-full bg-white z-[1000]">
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-lg font-bold">전체 메뉴</h2>
            <IoCloseOutline
              className="text-2xl cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>
          <nav className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-lg border-b">마이 트립 ✈️</h3>
              <div className="pl-4 space-y-2">
                <button
                  className="w-full text-left py-2"
                  onClick={() => {
                    navigate("/trip/tripgoal");
                    setIsMenuOpen(false);
                  }}
                >
                  목표 생성
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg border-b">환전 지갑</h3>
              <div className="pl-4 space-y-2">
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
              <h3 className="font-semibold text-lg border-b">기타</h3>
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
