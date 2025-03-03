import { useLocation } from "react-router-dom";

import { IoSearchOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";

import "./Header.css";

export default function Header() {
  const location = useLocation();

  function getTitle() {
    if (location.pathname === "/trip") return "마이 트립 ✈️";
    else if (location.pathname === "/exchange") return "환전 지갑";
    else return "";
  }

  const title = getTitle();

  return (
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
        <RxHamburgerMenu className="text-2xl" />
      </div>
    </header>
  );
}
