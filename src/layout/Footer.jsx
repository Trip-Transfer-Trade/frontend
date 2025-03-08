import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { GoHomeFill } from "react-icons/go";
import { TbWorld } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { useAuth } from "../context/AuthProvider";

import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState("home");

  //로그인 상태 가져오기 
  const { isLoggedIn, updateLoginStatus } = useAuth();

  // 현재 경로에 맞춰 초기 선택 상태 설정
  useEffect(() => {
    if (location.pathname.startsWith("/trip")) {
      setSelected("trip");
    } else if (location.pathname.startsWith("/exchange")) {
      setSelected("exchange");
    } else if (location.pathname.startsWith("/mypage")) {
      setSelected("mypage");
    } else {
      setSelected("home");
    }
  }, [location.pathname]);

  //로그인 체크 후 리디렉션 (home 제외)
  useEffect(() => {
    console.log("🔍 Footer - 현재 로그인 상태:", isLoggedIn);
    updateLoginStatus(); // 로그인 상태 즉시 반영

    if (isLoggedIn === false && selected !== "home") {
      console.warn("🚪 로그아웃 감지 - 로그인 페이지로 이동");
      navigate("/auth/login");
    }
  }, [isLoggedIn, selected, navigate]); // selected가 변경될 때마다 실행

  function getIconClass(menu) {
    return selected === menu ? "footer-icon-selected" : "footer-icon";
  }

  const menus = [
    {
      id: "home",
      icon: <GoHomeFill className="text-2xl" />,
      label: "홈",
      path: "/",
    },
    {
      id: "trip",
      icon: <TbWorld className="text-2xl" />,
      label: "마이트립",
      path: "/trip",
    },
    {
      id: "exchange",
      icon: <IoWalletOutline className="text-2xl" />,
      label: "환전지갑",
      path: "/exchange",
    },
    {
      id: "mypage",
      icon: <FaUser className="text-2xl" />,
      label: "마이페이지",
      path: "/mypage",
    },
  ];

  return (
    <footer className="footer flex w-full items-center justify-between px-6">
      {menus.map((menu) => (
        <div
          key={menu.id}
          onClick={() => {
            setSelected(menu.id);
            navigate(menu.path);
          }}
          className={`${getIconClass(
            menu.id
          )} flex flex-col justify-center items-center w-16 h-16`}
        >
          {menu.icon}
          <span className="text-xs">{menu.label}</span>
        </div>
      ))}
    </footer>
  );
}
