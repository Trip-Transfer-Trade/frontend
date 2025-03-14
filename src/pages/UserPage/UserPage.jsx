import MenuItem from "../../components/UserComponent/MenuItem";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUserInfo } from "../../apis/users";
import { logout } from "../../apis/users";
import { useDispatch } from "react-redux";
import { resetTrips } from "../../redux/tripSlice";

export default function UserPage() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserInfo = async () => {
      const userData = await fetchUserInfo();
      if (userData) {
        setUser(userData);
        console.log(userData);
      }
    };
    loadUserInfo();
  }, []);

  const menuItems = [
    { icon: "📊", label: "내 주식", path: "/" },
    { icon: "💳", label: "전체 계좌", path: "/mypage/transfer/recipient" },
    { icon: "📂", label: "환전 지갑", path: "/exchange" },
    { icon: "💰", label: "환율 정보", path: "/exchange/rates" },
    { icon: "📈", label: "포트폴리오", path: "/" },
    { icon: "🔔", label: "알림 설정", path: "/" },
    { icon: "📅", label: "여행 기록", path: "/" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 프로필 */}
      <div className="flex items-center justify-between mb-6 px-6 space-x-4">
        <img
          src="/assets/images/user/user.svg"
          alt="프로필"
          className="w-24 h-24 rounded-lg"
        />

    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-bold">{user ? user.name : "로딩 중..."}</p>

        {/* 내 정보 & 로그아웃 버튼 */}
        <div className="flex items-center space-x-2">
          <button
            className="text-custom-gray-3 text-xs flex items-center"
            onClick={() => navigate("profile", { state: { user } })}
          >
            <span>내 정보</span>
          </button>

          {/* 얇은 선 */}
          <div className="h-4 w-[1px] bg-gray-200"></div>

          <button
            className="text-custom-gray-3 text-xs flex items-center"
            onClick={async () => {
              dispatch(resetTrips());
              await logout();
              navigate("/auth/login"); // 로그인 페이지로 이동
            }} 
          >
            <span>로그아웃</span>
          </button>
        </div>
      </div>

  <div className="bg-gray-100 rounded-lg px-4 py-2 flex justify-between items-center">
    <span className="text-xs text-gray-600">목표 달성</span>
    <span className="text-xs">3회</span>
  </div>
</div>

      </div>

      <div className="left-0 right-0 top-[calc(50%-2px)] h-[4px] bg-custom-gray-2 z-0"></div>

      {/* 바로가기 */}
      <div className="grid grid-cols-2 gap-4 p-6">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            path={item.path}
          />
        ))}
      </div>
    </div>
  );
}
