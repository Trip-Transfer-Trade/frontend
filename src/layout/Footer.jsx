import { useState } from "react";

import { GoHomeFill } from "react-icons/go";
import { TbWorld } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";

import "./Footer.css";

export default function Footer() {
  const [selected, setSelected] = useState("home");

  function getIconClass(menu) {
    return selected === menu ? "footer-icon-selected" : "footer-icon";
  }

  return (
    <footer className="footer flex w-full items-center justify-around">
      <div
        onClick={() => setSelected("home")}
        className={`${getIconClass(
          "home"
        )} flex flex-col justify-center items-center w-16 h-16`}
      >
        <GoHomeFill className="text-2xl" />
        <span className="text-sm">홈</span>
      </div>
      <div
        onClick={() => setSelected("mytrip")}
        className={`${getIconClass(
          "mytrip"
        )} flex flex-col justify-center items-center w-16 h-16`}
      >
        <TbWorld className="text-2xl" />
        <span className="text-sm">마이트립</span>
      </div>
      <div
        onClick={() => setSelected("wallet")}
        className={`${getIconClass(
          "wallet"
        )} flex flex-col justify-center items-center w-16 h-16`}
      >
        <IoWalletOutline className="text-2xl" />
        <span className="text-sm">환전지갑</span>
      </div>
      <div
        onClick={() => setSelected("mypage")}
        className={`${getIconClass(
          "mypage"
        )} flex flex-col justify-center items-center w-16 h-16`}
      >
        <FaUser className="text-2xl" />
        <span className="text-sm">마이페이지</span>
      </div>
    </footer>
  );
}
