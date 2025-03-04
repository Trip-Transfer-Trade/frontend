import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { GoHomeFill } from "react-icons/go";
import { TbWorld } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";

import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState("home");

  // 현재 경로에 맞춰 초기 선택 상태 설정
  useEffect(() => {
    if (location.pathname.startsWith("/trip")) {
      setSelected("mytrip");
    } else if (location.pathname.startsWith("/exchange")) {
      setSelected("wallet");
    } else if (location.pathname.startsWith("/auth")) {
      setSelected("mypage");
    } else {
      setSelected("home");
    }
  }, [location.pathname]);

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
      id: "mytrip",
      icon: <TbWorld className="text-2xl" />,
      label: "마이트립",
      path: "/trip",
    },
    {
      id: "wallet",
      icon: <IoWalletOutline className="text-2xl" />,
      label: "환전지갑",
      path: "/exchange",
    },
    {
      id: "mypage",
      icon: <FaUser className="text-2xl" />,
      label: "마이페이지",
      path: "/auth/login",
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
