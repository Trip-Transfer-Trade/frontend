import { useState } from "react";
import { useLocation } from "react-router-dom";

import { IoSearchOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";

import "./Header.css";

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function getTitle() {
    if (location.pathname === "/trip") return "마이 트립 ✈️";
    else if (location.pathname === "/exchange") return "환전 지갑";
    else if (location.pathname === "/mypage") return "마이페이지";
    else return "";
  }

  const title = getTitle();

  return (
    <div>
      <header className="header flex w-full items-center justify-between px-6">
        {/* 로고 또는 타이틀 표시 */}
        <div className="flex items-center">
          {location.pathname === "/" ? (
            <img src="/assets/images/logo.svg" alt="Logo" className="logo" />
          ) : (
            <h1 className="text-xl font-bold">{title}</h1>
          )}
        </div>

        {/* 아이콘 */}
        <div className="flex items-center space-x-4">
          <IoSearchOutline className="text-2xl" />
          <GoBell className="text-2xl" />
          <RxHamburgerMenu
            className="text-2xl"
            onClick={() => setIsMenuOpen(true)}
          />
        </div>
      </header>

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
            <button className="w-full text-left py-2 border-b">홈</button>
            <button className="w-full text-left py-2 border-b">
              마이 트립 ✈️
            </button>
            <button className="w-full text-left py-2 border-b">
              환전 지갑
            </button>
            <button className="w-full text-left py-2 border-b">
              마이페이지
            </button>
            {/* 여기에 필요한 기능 추가 */}
          </nav>
        </div>
      )}
    </div>
  );
}
