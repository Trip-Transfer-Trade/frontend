import { useLocation } from "react-router-dom";

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
    <header className="header flex w-full items-center justify-between">
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
        <img
          src="/assets/images/header/search.svg"
          alt="Search"
          className="icon"
        />
        <img
          src="/assets/images/header/notification.svg"
          alt="Notification"
          className="icon"
        />
        <img src="/assets/images/header/menu.svg" alt="Menu" className="icon" />
      </div>
    </header>
  );
}
